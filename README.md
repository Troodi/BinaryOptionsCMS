## Настройка nginx
Создаем поддомен chart.getoption.pro и прописываем в конфиге nginx
```
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
1. php artisan tradingview:start - запускает парсинг котировок
2. php artisan check:orders - запускает проверку на закрытие ордеров
3. php artisan schedule:run - запускает выполнение задач по крону (прописать в крон)
4. laravel-echo-server start - запускает вебсокет

## Необходимые зависимости
1. nodejs, npm
2. laravel-echo-server
3. nginx