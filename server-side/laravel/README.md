# Installation
## PHP
Install PHP 8.1 or newer.

* MacOS
```bash
brew install php
```
* Linux
```bash
sudo add-apt-repository ppa:ondrej/php
sudo apt install php8.2
```
## Composer

To quickly install Composer in the current directory, run the following script in your terminal.

```bash
#!/bin/sh

EXPECTED_CHECKSUM="$(php -r 'copy("https://composer.github.io/installer.sig", "php://stdout");')"
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
ACTUAL_CHECKSUM="$(php -r "echo hash_file('sha384', 'composer-setup.php');")"

if [ "$EXPECTED_CHECKSUM" != "$ACTUAL_CHECKSUM" ]
then
    >&2 echo 'ERROR: Invalid installer checksum'
    rm composer-setup.php
    exit 1
fi

php composer-setup.php --quiet
RESULT=$?
rm composer-setup.php
exit $RESULT
```

After this, ```composer.phar``` should appear in the folder from which the command was executed.

# Setup

To install dependencies use this command:

```bash
php composer.phar install
```

# Development

For development you need to have Docker Engine on your PC. If you don't have, follow official installation[docker guide](https://docs.docker.com/engine/install/).

1. Run following command:
```bash
./vendor/bin/sail build --no-cache
```
This command will build docker image for the project.

---

3. After building execute following command:
```bash
./vendor/bin/sail up -d
```
This will launch a development server at http://localhost.
