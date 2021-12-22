FROM php:7.4-cli

COPY --from=composer /usr/bin/composer /usr/bin/composer

RUN apt update && apt -y install zip unzip

WORKDIR /var/www/html

CMD [ "tail", "-f", "./composer.json" ]
