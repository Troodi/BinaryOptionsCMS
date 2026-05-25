# BinaryOptionsCMS

Full-stack realtime trading platform for binary options, built as a Laravel and Vue application with dedicated workers for market data ingestion, order settlement, realtime notifications, payments, tournaments, KYC and administrative operations.

This repository represents a complete product architecture rather than a simple trading UI. It combines a user-facing trading terminal, an operational admin panel, background settlement services, payment-provider callbacks, dynamic payout management, private websocket events and risk-control workflows.

## Executive Summary

BinaryOptionsCMS is a monolith-first financial platform with separated runtime responsibilities. The Laravel application owns the domain model and HTTP/API surface, while long-running workers handle realtime quote ingestion, option settlement and scheduled maintenance. Vue powers the trading and admin interfaces, TradingView Charting Library provides the market terminal experience, and Laravel Echo Server delivers account and order updates in realtime.

The system was designed around several high-value product requirements:

- accept binary option trades only when symbol, market, expiration and account rules pass;
- ingest live quote data from TradingView through persistent websocket sessions;
- settle expired options against timestamped tick data outside the HTTP request lifecycle;
- keep balances, open positions and close results synchronized without polling;
- support real, demo and tournament trading modes;
- process deposits through multiple payment providers;
- enforce verification, turnover and anti-fraud constraints before withdrawals;
- give administrators operational controls over symbols, users, balances, payouts, KYC, tournaments and payment systems.

## Product Surface

| Area | Capabilities |
| --- | --- |
| Trading terminal | Real/demo/tournament trading, TradingView chart, expiration controls, dynamic payouts, open and latest orders |
| Market data | TradingView websocket ingestion, tick storage, market status tracking, historical bar loading |
| Settlement engine | Expiration scan, close-price lookup, win/loss/refund calculation, history records, balance updates |
| Realtime updates | Private balance channels, close-order channels, symbol payout broadcasts |
| Finance | Deposits, withdrawals, payment callbacks, exchange-rate conversion, bonus turnover |
| Growth | Promocodes, referral tracking, partner requests and reward accounting |
| Tournaments | Registration, isolated contest balance, tournament orders, ranking, rewards |
| Admin panel | User control, symbol configuration, KYC, deposits, payouts, settings, statistics |
| Security controls | Auth, admin middleware, CSRF, private channel authorization, IP/user-agent tracking, ban states |

## Screenshots

Screenshots are stored in `docs/screenshots`. The `docs/` directory is intentionally ignored by Git because it is used as a private documentation and O-1 evidence package. The links below render in local Markdown viewers when the screenshot folder exists.

### Trading And Admin Views

<p>
  <img width="1744" height="902" alt="Pasted image (2)" src="https://github.com/user-attachments/assets/8b9705e4-4ee6-44f9-9bce-42fe558e121d" />
  <img width="1751" height="898" alt="ChatGPT Image May 20, 2026, 11_38_47 AM" src="https://github.com/user-attachments/assets/4c48d2bc-2c94-417f-9192-6d117705dab9" />
</p>

<p>
  <img width="1920" height="950" alt="image_2026-05-18_23-44-19 (2)" src="https://github.com/user-attachments/assets/90c222f5-663c-4d88-b6a3-225147deb3e2" />
<img width="1918" height="951" alt="image_2026-05-18_23-44-19 (3)" src="https://github.com/user-attachments/assets/92e60f8f-5900-4faa-84c6-a91cb05e1b4c" />
</p>

### Supporting Product Screens

<p>
  <img width="1974" height="797" alt="ChatGPT Image May 20, 2026, 10_57_52 AM" src="https://github.com/user-attachments/assets/ec3eb773-ca29-4a8d-a11a-c566814955ec" />
  <img width="1900" height="937" alt="image_2026-05-18_23-44-18" src="https://github.com/user-attachments/assets/46e25b44-374e-41ea-9c8f-909a97d2adc4" />

</p>

<p>
  <img width="1903" height="943" alt="image_2026-05-18_23-44-19 (4)" src="https://github.com/user-attachments/assets/5b326f65-b2a8-4e5e-8baf-29e9b291d2f2" />
  <img width="3838" height="1747" alt="Pasted image" src="https://github.com/user-attachments/assets/1c3e6ec0-0fdb-4f5f-9f09-3571df547914" />
</p>

## High-Level Architecture

```mermaid
flowchart LR
    Trader["Trader Browser / Vue SPA"] --> Nginx["Nginx HTTPS"]
    Admin["Admin Browser / Admin SPA"] --> Nginx

    Nginx --> PHP["Laravel PHP-FPM"]

    PHP --> MySQL["MySQL"]
    PHP --> Redis["Redis"]
    PHP --> Payments["Payment Providers"]
    PHP --> OAuth["Google / Facebook OAuth"]
    PHP --> Twilio["Twilio"]

    Parser["quotes-parser worker"] --> TradingView["TradingView WebSocket"]
    Parser --> MySQL
    Parser --> Redis

    Checker["order-checks worker"] --> MySQL
    Checker --> Redis

    Scheduler["scheduler worker"] --> MySQL
    Scheduler --> Redis

    Redis --> Echo["Laravel Echo Server"]
    Echo --> Trader
    Echo --> Admin
```

## Runtime Decomposition

The platform keeps the codebase cohesive but separates runtime responsibilities into dedicated long-running processes.

```mermaid
flowchart TB
    subgraph Web["HTTP Runtime"]
        Routes["Routes and middleware"]
        Controllers["Thin controllers"]
        Services["Domain services"]
        Models["Eloquent models"]
    end

    subgraph Workers["Long-Running Workers"]
        Quotes["tradingview:start"]
        Orders["check:orders"]
        Cron["schedule:work"]
    end

    subgraph Realtime["Realtime Layer"]
        Events["Broadcast events"]
        Redis["Redis"]
        Echo["Laravel Echo Server"]
    end

    subgraph Storage["Storage"]
        DB["MySQL"]
        Cache["Redis cache"]
    end

    Routes --> Controllers
    Controllers --> Services
    Services --> Models
    Models --> DB

    Quotes --> DB
    Orders --> DB
    Cron --> DB

    Services --> Events
    Orders --> Events
    Events --> Redis
    Redis --> Echo
    Echo --> UI["Vue clients"]
```

## Trade Lifecycle

```mermaid
sequenceDiagram
    participant UI as Vue Trading UI
    participant API as TradingController
    participant Service as TradingService
    participant DB as MySQL
    participant Worker as Settlement Worker
    participant Echo as Echo Server

    UI->>API: POST /binary/buy
    API->>Service: buySymbolServ()
    Service->>DB: Validate symbol, market, tick and balance
    Service->>DB: Debit balance
    Service->>DB: Insert open order
    Service->>Echo: Broadcast balance update
    Service-->>UI: Return open order

    Worker->>DB: Select expired open orders
    Worker->>DB: Find tick before expiration
    Worker->>Worker: Calculate win, loss or refund
    Worker->>DB: Insert history and latest order
    Worker->>DB: Update balance and statistics
    Worker->>Echo: Broadcast close event
    Echo-->>UI: Update orders and balance
```

## Order Settlement Engine

```mermaid
flowchart TD
    Start["Expired open order"] --> Tick["Find last tick before close_at"]
    Tick --> TickFound{"Tick found?"}
    TickFound -->|No| Refund["Refund stake"]
    TickFound -->|Yes| Market["Check market status and quote heartbeat"]
    Market --> MarketOk{"Market data valid?"}
    MarketOk -->|No| Refund
    MarketOk -->|Yes| Direction{"Order direction"}

    Direction -->|Up| UpCheck{"close_price > open_price?"}
    Direction -->|Down| DownCheck{"close_price < open_price?"}

    UpCheck -->|Yes| Win["Profit = amount + payout"]
    UpCheck -->|No| Loss["Profit = 0"]
    DownCheck -->|Yes| Win
    DownCheck -->|No| Loss

    Refund --> Persist["Persist history"]
    Win --> Persist
    Loss --> Persist
    Persist --> Balance["Update balance"]
    Balance --> Stats["Update statistics"]
    Stats --> Event["Broadcast settlement event"]
```

## Trading Modes

```mermaid
flowchart LR
    Request["Trade Request"] --> Mode{"Mode"}

    Mode --> Real["Real"]
    Mode --> Demo["Demo"]
    Mode --> Contest["Tournament"]

    Real --> RealBalance["users.balance"]
    Real --> RealOpen["open_orders"]
    Real --> RealHistory["order_history_1"]

    Demo --> DemoBalance["users.demo_balance"]
    Demo --> DemoOpen["open_demo_orders"]
    Demo --> DemoHistory["order_demo_history_1"]

    Contest --> ContestBalance["contest_users.balance"]
    Contest --> ContestOpen["contest_open_orders"]
    Contest --> ContestHistory["contest_histories"]
```

## Market Data Pipeline

```mermaid
flowchart LR
    Command["php artisan tradingview:start"] --> Parser["TradingViewWebsocketService"]
    Parser --> Socket["TradingView WebSocket"]
    Socket --> Sessions["Quote and status sessions"]
    Sessions --> Symbols["Symbols from database"]
    Symbols --> Subscribe["Subscribe to instruments"]
    Subscribe --> Packets["qsd packets"]
    Packets --> Ticks["ticks table"]
    Packets --> Status["market_statuses table"]
    Status --> TradingAPI["Trade validation"]
    Ticks --> Settlement["Settlement worker"]
```

## Realtime Event Model

```mermaid
flowchart TD
    Events["Laravel Broadcast Events"] --> Balance["ChangeBalance"]
    Events --> DemoBalance["ChangeDemoBalance"]
    Events --> ContestBalance["ChangeContestBalance"]
    Events --> CloseReal["CloseOptionEvent"]
    Events --> CloseDemo["CloseDemoOptionEvent"]
    Events --> CloseContest["CloseContestOptionEvent"]
    Events --> Symbols["ChangeSymbol"]

    Balance --> Ch1["private balance.{id}"]
    DemoBalance --> Ch2["private demo_balance.{id}"]
    ContestBalance --> Ch3["private contest_balance.{id}.{contest_id}"]
    CloseReal --> Ch4["private closed.{id}"]
    CloseDemo --> Ch5["private closed_demo.{id}"]
    CloseContest --> Ch6["private closed_contest.{id}.{contest_id}"]
    Symbols --> Ch7["public symbols"]
```

## Payment Flow

```mermaid
flowchart TD
    UI["Deposit UI"] --> Start["Start deposit"]
    Start --> Deposit["Create pending deposit"]
    Deposit --> Provider{"Provider"}

    Provider --> Qiwi["QIWI"]
    Provider --> YooMoney["YooMoney"]
    Provider --> Cryptonator["Cryptonator"]
    Provider --> Payeer["Payeer"]
    Provider --> FreeKassa["FreeKassa"]

    Qiwi --> Callback["Provider callback"]
    YooMoney --> Callback
    Cryptonator --> Callback
    Payeer --> Callback
    FreeKassa --> Callback

    Callback --> Verify["Signature and allowlist verification"]
    Verify --> Valid{"Valid?"}
    Valid -->|No| Reject["Reject"]
    Valid -->|Yes| Settle["processDepositServ"]
    Settle --> Credit["Credit balance"]
    Credit --> Bonus["Apply bonus and turnover"]
    Bonus --> Referral["Apply referral reward"]
    Referral --> Event["Broadcast balance"]
```

## Tournament Lifecycle

```mermaid
flowchart TD
    Admin["Admin creates tournament"] --> Planned["Planned"]
    Planned --> Active{"started_at < now < ended_at"}
    Active -->|No| Waiting["Waiting or ended"]
    Active -->|Yes| Register["User registers"]
    Register --> EntryFee["Debit real balance"]
    EntryFee --> ContestUser["Create contest_users balance"]
    ContestUser --> Trading["Tournament trading"]
    Trading --> Orders["contest_open_orders"]
    Orders --> Settlement["Shared settlement worker"]
    Settlement --> Ranking["contest:check ranking"]
    Ranking --> Rewards{"ended_at passed?"}
    Rewards -->|No| Leaderboard["Update leaderboard"]
    Rewards -->|Yes| Credit["Credit winner rewards"]
```

## Core Backend Modules

| Module | Responsibility |
| --- | --- |
| `app/Services/MainHttp/TradingService.php` | Trade placement, open/latest orders, history, demo balance |
| `app/Services/Console/TradingViewWebsocketService.php` | TradingView quote ingestion and market status updates |
| `app/Services/Console/CheckOrdersForCloseService.php` | Expired order settlement and statistics updates |
| `app/Services/Console/SetSymbolsPercentService.php` | Dynamic payout recalculation |
| `app/Services/MainHttp/DepositService.php` | Deposit creation, provider callbacks, bonuses, referral credit |
| `app/Services/MainHttp/WithdrawalService.php` | Withdrawal requests, balance and KYC checks |
| `app/Services/MainHttp/ContestService.php` | Tournament registration, balances, rankings and histories |
| `app/Services/Admin/*` | Operational administration, KYC, users, symbols, payments, settings |

## Technology Stack

| Layer | Technologies |
| --- | --- |
| Backend | PHP 8, Laravel 8, Eloquent, Laravel Passport |
| Frontend | Vue 2, Vue Router, Bootstrap Vue, Axios, i18n |
| Charts | TradingView Charting Library, custom JavaScript datafeed |
| Realtime | Laravel Broadcasting, Redis, Laravel Echo Server, Socket.IO |
| Storage | MySQL, Redis, PostgreSQL config, ClickHouse config |
| Workers | Laravel Artisan commands, scheduler, Docker services |
| Payments | QIWI, YooMoney, Cryptonator, Payeer, FreeKassa |
| Integrations | Google OAuth, Facebook OAuth, Twilio, GeoIP, CBR rates |
| Build | Laravel Mix, Webpack, npm |
| Infrastructure | Docker Compose, Nginx, PHP-FPM |

## Operational Processes

| Command | Role |
| --- | --- |
| `php artisan tradingview:start` | Starts persistent quote parsing from TradingView |
| `php artisan check:orders` | Starts settlement loop for expired orders |
| `php artisan schedule:work` | Runs scheduled maintenance tasks |
| `php artisan clear:ticks` | Removes old tick data |
| `php artisan set:percent` | Recalculates symbol payout percentages |
| `php artisan exchange:rate` | Updates exchange rates |
| `php artisan contest:check` | Updates tournament ranking and rewards |
| `laravel-echo-server start` | Starts realtime event gateway |

## Why This Project Is O-1 Relevant

The project demonstrates engineering work across several complex areas that are usually separated across multiple teams:

- realtime financial UI with charting and websocket-driven updates;
- market data ingestion through a non-trivial websocket protocol;
- deterministic order settlement based on tick timestamps;
- financial account state transitions for real, demo and contest balances;
- payment callback verification across multiple providers;
- bonus and turnover accounting;
- private realtime event authorization;
- operational administration for users, symbols, KYC, payouts and contests;
- background workers and scheduler-driven maintenance;
- Dockerized deployment with separate runtime roles.

Strong article framing:

> I designed and implemented a realtime trading platform architecture that separated user-facing HTTP flows from market data ingestion and order-settlement workers. The platform accepted trades only after validating market state, symbol configuration, account balance and expiration rules, then settled expired options against timestamped tick data and synchronized balances through private realtime channels.

## Repository Structure

```text
app/
  Console/Commands        Artisan entrypoints for workers and scheduler tasks
  Events                  Broadcast events for balances, symbols and order closes
  Http/Controllers        Main, Admin, Auth and SPA controllers
  Http/Middleware         Auth, admin, locale and anti-fraud middleware
  Http/Requests           FormRequest validation classes
  Models                  Eloquent domain models
  Services                MainHttp, Admin and Console service layers

resources/
  vuejs                   User and admin Vue applications
  assets/js               TradingView datafeed and streaming integration
  views                   Blade layouts and panels

routes/
  web.php                 Main application, SPA, payment callback and admin routes
  api.php                 Passport API auth routes
  channels.php            Broadcast channel authorization

database/
  migrations              Domain schema evolution

env-ci/
  local, prod             Docker Compose environments and service Dockerfiles
```

## Private Documentation Package

The `docs/` directory is ignored by Git and can be used for private O-1 materials:

- architecture writeups;
- article drafts;
- screenshots;
- exported diagrams;
- evidence packages;
- translated summaries.

Current local documentation files:

- `docs/architecture-o1.md`
- `docs/technical-diagrams-o1.md`
- `docs/screenshots/*`

Because `docs/` is ignored, these files remain local unless they are manually copied into a separate portfolio package or uploaded somewhere public.

## Notes

This codebase is an older production-style Laravel application. Some implementation details reflect historical constraints and product iteration speed. The architecture is best evaluated by its end-to-end product scope: realtime trading, settlement, payments, tournaments, administration, KYC, anti-fraud controls and operational workers integrated into one platform.

