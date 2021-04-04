apt-get update -y;\
apt-get upgrade -y;\
apt-get install -y curl;\
curl -fsSL https://deb.nodesource.com/setup_14.x | bash -;\
apt-get install -y nodejs;\
apt-get install -y npm;\
apt-get install -y supervisor;\
apt-get install -y redis-server;\
npm install laravel-echo-server -g;\
curl -fsSL http://repo.fastpanel.direct/install/debian.sh | bash -;\
printf "\n\033[0;32mLogin to fastpanel and create your domains! \n";\
printf "Create one mysql database and one postgresql database, first install (postgre 13, bind9, composer, php74, git, shellinabox) go to /modules url\n";\
printf "You need to create 2 domains. First for main trading platform (your-domain.com), and second 'chart.your-domain.com' with 7.4 PHP+Apache and chart* domain with PHP-FPM.\n";\
printf "Go to /ssl url and create 2 SSL Let's encrypt for two domains\n";\
printf "Go to /php url and install pgsql for all php versions\n";\
printf "\n\033[0m";\
read -n 1 -s -r -p "Then press any key..."
printf "\nWrite user for config (example \"fastuser\"): ";\
read -r webuser;\
echo "Write domain for config (example.com): ";\
read -r webdomain;\
crt=$(find /var/www/httpd-cert -name "${webdomain}*.crt" -exec readlink -f {} \;);\
key=$(find /var/www/httpd-cert -name "${webdomain}*.key" -exec readlink -f {} \;);\
touch "/var/www/${webuser}/data/www/${webdomain}/laravel-echo-server.json";\
printf "{\n\"authHost\": \"https://%s\",\n\"authEndpoint\": \"/broadcasting/auth\",\n\"clients\": [\n{\n\"appId\": \"5a5c3f78c70d9070\",\n\"key\": \"b5a507a73c5fd5ba35bc73fdb694ca94\"\n}\n],\n\"database\": \"redis\",\n\"databaseConfig\": {\n\"redis\": {},\n\"sqlite\": {\n\"databasePath\": \"/database/laravel-echo-server.sqlite\"\n}\n},\n\"devMode\": true,\n\"host\": \"%s\",\n\"port\": \"6001\",\n\"protocol\": \"https\",\n\"socketio\": {},\n\"secureOptions\": 67108864,\n\"sslCertPath\": \"%s\",\n\"sslKeyPath\": \"%s\",\n\"subscribers\": {\n\"http\": true,\n\"redis\": true\n},\n\"apiOriginAllow\": {\n\"allowCors\": true,\n\"allowOrigin\": \"https://%s:443\",\n\"allowMethods\": \"GET, POST\",\n\"allowHeaders\": \"Origin, Content-Type, X-Auth-Token, X-Requested-With, Accept, Authorization, X-CSRF-TOKEN, X-Socket-Id\"\n}\n}\n" "${webdomain}" "${webdomain}" "${crt}" "${key}" "${webdomain}" > "/var/www/${webuser}/data/www/${webdomain}/laravel-echo-server.json";\
sudo chown -R "$webuser":"$webuser" /var/www/"$webuser"/data/www/"$webdomain";\
touch /etc/supervisor/conf.d/orders.conf;\
touch /etc/supervisor/conf.d/tradingview.conf;\
touch /etc/supervisor/conf.d/websocket.conf;\
printf "[program:orders]\nprocess_name=%%(program_name)s_%%(process_num)02d\ncommand=php /var/www/${webuser}/data/www/${webdomain}/artisan check:orders\nautostart=true\nautorestart=true\nstopasgroup=true\nkillasgroup=true\nuser=${webuser}\nnumprocs=1\nredirect_stderr=true\nstdout_logfile=/var/log/orders.log\nstartsecs = 0\nstopwaitsecs=0\n" > /etc/supervisor/conf.d/orders.conf;\
printf "[program:tradingview]\nprocess_name=%%(program_name)s_%%(process_num)02d\ncommand=php /var/www/${webuser}/data/www/${webdomain}/artisan tradingview:start\nautostart=true\nautorestart=true\nstopasgroup=true\nkillasgroup=true\nuser=${webuser}\nnumprocs=1\nredirect_stderr=true\nstdout_logfile=/var/log/tradingview.log\nstartsecs = 0\nstopwaitsecs=0\n" > /etc/supervisor/conf.d/tradingview.conf;\
printf "[program:websocket]\nprocess_name=%%(program_name)s_%%(process_num)02d\ncommand=laravel-echo-server start --dir=/var/www/${webuser}/data/www/${webdomain} --force\nautostart=true\nautorestart=true\nstopasgroup=true\nkillasgroup=true\nuser=root\nnumprocs=1\nredirect_stderr=true\nstdout_logfile=/var/log/websocket.log\nstartsecs = 0\nstopwaitsecs=0\n" > /etc/supervisor/conf.d/websocket.conf;\
service supervisor restart;
touch "/var/www/${webuser}/data/www/${webdomain}/.env";\
echo "Enter mysql host: ";\
read -r mhost;\
echo "Enter mysql user: ";\
read -r muser;\
echo "Enter mysql name: ";\
read -r mname;\
echo "Enter mysql password: ";\
read -r mpass;\
echo "Enter postgre host: ";\
read -r phost;\
echo "Enter postgre user: ";\
read -r puser;\
echo "Enter postgre name: ";\
read -r pname;\
echo "Enter postgre password: ";\
read -r ppass;\
printf "APP_NAME=StartABroker\n\nAPP_TITLE=StartABroker\nAPP_DOMAIN=startabroker.com\nAPP_FIRST_TITLE=StartA\nAPP_SECOND_TITLE=Broker\nAPP_SUPPORT_MAIL=info@startabroker.com\nAPP_SUPPORT_TELEGRAM=@startabroker\nAPP_LOGO_URL=/images/logo/binaries-logo-2.png\nAPP_LOGO_URL_AUTH=/images/logo/binaries-logo.png\nAPP_ICON_URL=/images/logo/icon-binary.png\nAPP_CURRENCY=USD\n\nDEMO_MODE=false\n\nAPP_ENV=production\nAPP_KEY=\nAPP_DEBUG=false\nAPP_URL=https://%s\nWEBSOCKET_HOST=chart.%s\n\nRECAPTCHA_SITE_KEY=\nRECAPTCHA_SECRET_KEY=\n\nLOG_CHANNEL=daily\n\nDB_CONNECTION=pgsql\n\nMYSQL_DB_HOST=%s\nMYSQL_DB_PORT=3306\nMYSQL_DB_DATABASE=%s\nMYSQL_DB_USERNAME=%s\nMYSQL_DB_PASSWORD=%s\nPG_DB_HOST=%s\nPG_DB_PORT=5432\nPG_DB_DATABASE=%s\nPG_DB_USERNAME=%s\nPG_DB_PASSWORD=%s\n\nTRADINGVIEW_LOGIN=StartABinary\nTRADINGVIEW_PASSWORD=111qqq\n\nBROADCAST_DRIVER=redis\nCACHE_DRIVER=redis\nQUEUE_CONNECTION=sync\nSESSION_DRIVER=redis\nSESSION_LIFETIME=120\n\nREDIS_HOST=127.0.0.1\nREDIS_PASSWORD=null\nREDIS_PORT=6379\nREDIS_PREFIX=\n" "${webdomain}" "${webdomain}" "${mhost}" "${mname}" "${muser}" "${mpass}" "${phost}" "${pname}" "${puser}" "${ppass}" > "/var/www/${webuser}/data/www/${webdomain}/.env";\
printf "Upload a site files to domain directory.";\
read -n 1 -s -r -p "Then press any key..."
composer install --no-interaction --working-dir="/var/www/${webuser}/data/www/${webdomain}";\
php /var/www/$webuser/data/www/$webdomain/artisan migrate --force;\
php /var/www/$webuser/data/www/$webdomain/artisan install;\
php /var/www/$webuser/data/www/$webdomain/artisan key:generate;\
cd /var/www/$webuser/data/www/$webdomain || echo "Cant change dir!";\
printf "Now be long process, just wait...\n";\
npm install;\
npm run production;
