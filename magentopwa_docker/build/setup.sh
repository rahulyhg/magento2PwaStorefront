#!/usr/bin/env bash

##-------------------------------------------------------
# SETUP SELF SIGNED SSL CERTIFICATES
##-------------------------------------------------------
#mkdir -p /etc/nginx/certs.d
#openssl req -nodes -x509 -newkey rsa:4096 -keyout /etc/nginx/certs.d/localhost.key -out /etc/nginx/certs.d/localhost.cer -days 356 -subj /C=AU/ST=NSW/L=Sydney/O=IT/CN=localhost.com

##-------------------------------------------------------
# UPDATE CONFIG FILES
##-------------------------------------------------------

# Set timezone to UTC
sed -i "s/;date.timezone =.*/date.timezone = UTC/" /etc/php/7.1/fpm/php.ini
sed -i "s/;date.timezone =.*/date.timezone = UTC/" /etc/php/7.1/fpm/php.ini

# Setup php-fpm to not run as daemon (allow my_init to control)
sed -i -e "s/;daemonize\s*=\s*yes/daemonize = no/g" /etc/php/7.1/fpm/php-fpm.conf
sed -i "s/;cgi.fix_pathinfo=1/cgi.fix_pathinfo=0/" /etc/php/7.1/fpm/php.ini

# Setup permissions for php5-fpm
sed -i '/^;listen.mode = .*/alisten.mode = 0660' /etc/php/7.1/fpm/pool.d/www.conf
sed -i '/^listen.mode = .*/alisten.owner = www-data' /etc/php/7.1/fpm/pool.d/www.conf
sed -i '/^listen.mode = .*/alisten.group = www-data' /etc/php/7.1/fpm/pool.d/www.conf

##-------------------------------------------------------
# UPDATE FILES AND FOLDERS
##-------------------------------------------------------

# Add required php5-fpm folders
mkdir -p /var/run/php7.1-fpm && chown -R www-data:www-data /var/run/php7.1-fpm
mkdir -p /var/log/php7.1-fpm && chown -R www-data:www-data /var/log/php7.1-fpm