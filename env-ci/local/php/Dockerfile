FROM php:8.1-fpm
USER root

RUN apt-get update && apt-get install -y libpq-dev && docker-php-ext-install pdo pdo_pgsql
RUN docker-php-ext-install mysqli pdo pdo_mysql
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt -y install nodejs

COPY --chown=www-data:www-data . /var/www
WORKDIR /var/www
EXPOSE 9000
CMD ["php-fpm"]
