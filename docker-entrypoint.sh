#!/bin/bash
apt-get update
apt-get install cron -y
echo "Entry point started!"
php-fpm &
echo "PHP-FPM started!"
if [ ! -d /var/www/node_modules ]; then
  (
    apt-get purge -y nodejs
  )
  curl -sL https://deb.nodesource.com/setup_14.x | bash -
  apt-get install -y nodejs
  echo "Install composer and node_modules with npm compiling!"
  composer install
  npm install
  npm run production
  php /var/www/artisan key:generate
  php /var/www/artisan install
fi
echo "SUPERVISOR started!"
service supervisor start
echo "CRON started!"
crontab /etc/cron.d/cjob
service cron start
/bin/bash
