FROM php:8.1-fpm
USER root

RUN apt-get update && apt-get install -y libpq-dev && docker-php-ext-install pdo pdo_pgsql
RUN docker-php-ext-install mysqli pdo pdo_mysql

COPY --chown=www-data:www-data . /var/www
WORKDIR /var/www

CMD ["php", "artisan", "check:orders"]
