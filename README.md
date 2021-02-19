## Настройка nginx
Создаем поддомен chart.getoption.pro и прописываем в конфиге nginx
```nginx
location / {
  proxy_ssl_server_name on;
  proxy_pass https://prodata.tradingview.com/socket.io/websocket;#prodata
  proxy_http_version 1.1;
  proxy_set_header Origin https://www.tradingview.com;
  proxy_set_header Host prodata.tradingview.com;
  proxy_set_header Upgrade "websocket";
  proxy_set_header Connection "Upgrade";
  proxy_set_header User-Agent "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36";
  proxy_set_header Pragma "no-cache";
  proxy_buffering off;
}
```

## Основные команды для запуска
1. `php artisan tradingview:start` - запускает парсинг котировок
2. `php artisan check:orders` - запускает проверку на закрытие ордеров
3. `php artisan schedule:run` - запускает выполнение задач по крону (прописать в крон)
4. `laravel-echo-server start` - запускает вебсокет
5. `npm run watch` - компиллирует все ресурсы

## Необходимые зависимости
1. nodejs, npm
2. laravel-echo-server
3. nginx

## Настройки payeer
1. URL успешной оплаты: `/payeer/success`
2. URL неуспешной оплаты: `/payeer/fail`
3. URL обработчика: `/payeer/status`

##Настройки киви
1. Переходим на `https://p2p.qiwi.com/`
2. После авторизации на `https://qiwi.com/p2p-admin/transfers/api`
3. Нажимаем внизу "Создать пару ключей и настроить"
4. Заполняем в .env `QIWI_KEY` и `QIWI_SECRET`
5. Устанавливаем серверные уведомления на `/qiwi/process`

##Настройка supervisor
Путь: `/etc/supervisor/conf.d/tradingview.conf` - парсинг котировок
```shell
[program:tradingview]
process_name=%(program_name)s_%(process_num)02d
command=php /var/www/www-root/data/www/getoption.pro/artisan tradingview:start
autostart=true
autorestart=true
stopasgroup=true
killasgroup=true
user=www-root
numprocs=1
redirect_stderr=true
stdout_logfile=/home/logs/tradingview.log
startsecs = 0
stopwaitsecs=0
```

Путь: `/etc/supervisor/conf.d/orders.conf` - проверка закрытия сделок
```shell
[program:orders]
process_name=%(program_name)s_%(process_num)02d
command=php /var/www/www-root/data/www/getoption.pro/artisan check:orders
autostart=true
autorestart=true
stopasgroup=true
killasgroup=true
user=www-root
numprocs=1
redirect_stderr=true
stdout_logfile=/home/logs/orders.log
startsecs = 0
stopwaitsecs=0
```

Путь: `/etc/supervisor/conf.d/websocket.conf` - вебсокет для оповещений
```shell
[program:websocket]
process_name=%(program_name)s_%(process_num)02d
command=laravel-echo-server start --dir=/var/www/www-root/data/www/getoption.pro
autostart=true
autorestart=true
stopasgroup=true
killasgroup=true
user=www-root
numprocs=1
redirect_stderr=true
stdout_logfile=/home/logs/websocket.log
startsecs = 0
stopwaitsecs=0
```

Создать путь для логов: `mkdir /home/logs`

##Настройка google
1. https://console.developers.google.com/apis/credentials
2. Идентификаторы клиентов OAuth 2.0
3. Создать учетные данные (сверху)
4. OAuth
5. Разрешенные URI перенаправления: `сам домен с https` и `/login/google/callback`

##Настройка facebook
1. https://developers.facebook.com/apps
2. Создать приложение
3. Создание кросс-сервисных функций
4. Вход через Facebook
5. Настройки
5. Действительные URI перенаправления для OAuth: `сам домен с https` и `/login/facebook/callback`

##Настройка afterlogic
Файл: `/modules/Licensing/Module.php`
```php
public function GetLicenseInfo($Module = 'System')
{
    $mResult = false;
    $aInfo = $this->GetPartKeyInfo($Module);
    if (isset($aInfo[2])){
        $mResult = array(
        'Count' => (int) $aInfo[0],
        'DateTime' => time() + 86400 * 365,
        'Type' => 0,
        'ExpiresIn' => 2000
        );
    }
    return $mResult;
}
```

##Настройка twilio
Необходимо включить интерналионализацию: https://www.twilio.com/console/voice/calls/geo-permissions/low-risk

##Реклама проекта
1. UTM метка для источника: `?utm_adv={source}`