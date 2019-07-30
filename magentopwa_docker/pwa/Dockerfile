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

# Add startup scripts for services
ADD build/nginx.sh /etc/service/nginx/run
RUN chmod +x /etc/service/nginx/run

ADD build/phpfpm.sh /etc/service/phpfpm/run
RUN chmod +x /etc/service/phpfpm/run

# Install nodejs
RUN apt-get update -yq \
    && apt-get install curl gnupg -yq \
    && curl -sL https://deb.nodesource.com/setup_10.x | bash \
    && apt-get install nodejs -yq \
    && apt-get install sudo

# Install yarn
RUN npm install -g yarn

# Install python 2.7
RUN apt-get install python

# Set WWW public folder
RUN mkdir -p /var/www/html

WORKDIR /var/www/html
# Set terminal environment
ENV TERM=xterm

# Port and settings
#EXPOSE 80

# Cleanup apt and lists
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Create node certificate (execute this manually once caontainers are up)
# openssl req -nodes -new -x509 -keyout /root/.config/devcert/certificate-authority/private-key.key -out /root/.config/devcert/certificate-authority/certificate.cert