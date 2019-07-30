FROM phusion/baseimage:0.10.1

# Phusion setup
ENV HOME /root
RUN /etc/my_init.d/00_regen_ssh_host_keys.sh

CMD ["/sbin/my_init"]

# Set terminal to non-interactive
ENV DEBIAN_FRONTEND=noninteractive

# Nginx-PHP Installation
RUN apt-get update -y && apt-get install -y wget .build-essential python-software-properties git-core vim nano
RUN add-apt-repository -y ppa:ondrej/php && add-apt-repository -y ppa:nginx/stable
RUN apt-get update -y && apt-get upgrade -y && apt-get install -q -y php7.1 php7.1-dev php7.1-fpm php7.1-mysqlnd \
	php7.1-curl php7.1-gd php7.1-mbstring php7.1-xml php7.1-cli php7.1-intl php7.1-imap php7.1-tidy \
	php7.1-xml php7.1-xmlrpc php7.1-gmp zip unzip php7.1-zip php7.1-bcmath php7.1-soap php7.1-mcrypt nginx-full ntp

# Create new symlink to UTC timezone for localtime
RUN unlink /etc/localtime
RUN ln -s /usr/share/zoneinfo/UTC /etc/localtime

# Update PECL channel listing
RUN pecl channel-update pecl.php.net

# Add build script
RUN mkdir -p /root/setup
ADD build/setup.sh /root/setup/setup.sh
RUN chmod +x /root/setup/setup.sh
RUN (cd /root/setup/; /root/setup/setup.sh)

# Copy files from repo
ADD build/default /etc/nginx/sites-available/default
ADD build/nginx.conf /etc/nginx/nginx.conf
ADD build/php-fpm.conf /etc/php/7.1/fpm/php-fpm.conf
ADD build/www.conf /etc/php/7.1/fpm/pool.d/www.conf
ADD build/.bashrc /root/.bashrc

#Files for connect to redis
#ADD build/php-files/php.ini /etc/php/7.1/fpm/php.ini

#a2enmod rewrite; \
RUN usermod -u 1000 www-data; \
  curl -o /tmp/composer-setup.php https://getcomposer.org/installer; \
  curl -o /tmp/composer-setup.sig https://composer.github.io/installer.sig; \
  php -r "if (hash('SHA384', file_get_contents('/tmp/composer-setup.php')) !== trim(file_get_contents('/tmp/composer-setup.sig'))) { unlink('/tmp/composer-setup.php'); echo 'Invalid installer' . PHP_EOL; exit(1); }"; \
  php /tmp/composer-setup.php --no-ansi --install-dir=/usr/local/bin --filename=composer; \
	rm /tmp/composer-setup.php; \
  chmod +x /usr/local/bin/composer; \
  curl -o n98-magerun2.phar http://files.magerun.net/n98-magerun2-latest.phar; \
  chmod +x ./n98-magerun2.phar; \
  mv n98-magerun2.phar /usr/local/bin/; \
  mkdir -p /root/.composer

# Add startup scripts for services
ADD build/nginx.sh /etc/service/nginx/run
RUN chmod +x /etc/service/nginx/run

ADD build/phpfpm.sh /etc/service/phpfpm/run
RUN chmod +x /etc/service/phpfpm/run

# Set WWW public folder
RUN mkdir -p /var/www/html
# nginx.conf.default from magento root 
#ADD ../magento/nginx.conf.default /var/www/html/nginx.conf.default

RUN chown -R www-data:www-data /var/www/html
RUN chmod -R 755 /var/www/html

WORKDIR /var/www/html
# Set terminal environment
ENV TERM=xterm

# Port and settings
#EXPOSE 80


# Cleanup apt and lists
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Install Xdebug
RUN apt-get update \
    && apt-get install php-xdebug
