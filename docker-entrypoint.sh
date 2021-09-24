#!/bin/bash
apt-get update
apt-get install cron -y
echo "Entry point started!"
php-fpm &
echo "PHP-FPM started!"
if [ ! -d /var/www/node_modules ]; then
  echo "Install composer and node_modules with npm compiling!"
  composer install
  npm install
  npm run production
  php /var/www/artisan key:generate
  php /var/www/artisan migrate --force
  php /var/www/artisan install
fi
echo "SUPERVISOR started!"
service supervisor start
echo "CRON started!"
crontab /etc/cron.d/cjob
service cron start
/bin/bash
