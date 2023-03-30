FROM php:8.1-fpm
USER root

RUN apt-get update && apt-get install -y libpq-dev && docker-php-ext-install pdo pdo_pgsql

COPY --chown=www-data:www-data . /var/www
WORKDIR /var/www
EXPOSE 9000
CMD ["php-fpm"]
