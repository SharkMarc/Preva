FROM php:7-fpm

COPY --from=composer:1 /usr/bin/composer /usr/bin/composer

RUN apt-get update
RUN apt-get install -y git zip unzip curl

RUN apt-get install -y \
        libfreetype6-dev \
        libjpeg62-turbo-dev \
        libpng-dev \
        libpq-dev \
        libzip-dev \
        g++ \
        libicu-dev \
        libxml2-dev \
    && docker-php-ext-configure intl \
    && docker-php-ext-install mbstring \
    && docker-php-ext-install intl \
    && docker-php-ext-install zip \
    && docker-php-ext-install pdo_mysql \
    && docker-php-ext-install soap \
    && apt-get purge --auto-remove -y g++

# install GD and mcrypt
RUN apt-get install -y \
        libfreetype6-dev \
        libjpeg62-turbo-dev \
        libpng-dev \
    && docker-php-ext-configure gd --with-freetype-dir=/usr/include/ --with-jpeg-dir=/usr/include/ \
    && docker-php-ext-install gd

# install Imagemagick & PHP Imagick ext
RUN apt-get install -y \
        libmagickwand-dev --no-install-recommends
RUN pecl install imagick && docker-php-ext-enable imagick

# a little cleanup
RUN apt-get clean
