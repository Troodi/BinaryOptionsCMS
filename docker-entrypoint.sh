#!/bin/bash
echo "Entry point started!"
service supervisor start
php-fpm &
echo "PHP-FPM started!"
if [ ! -d /var/www/node_modules ]; then
  echo "Install composer and node_modules with npm compiling!"
  composer install
  npm install
  npm run production
  php /var/www/artisan migrate
  php /var/www/artisan install
fi
find /var/www -type d -exec chmod 0775 '{}' \;
/bin/bash
