# defines variables
WEBAPI_PERMISSIONS ?= make permissions-webapi
WEBAPP_PERMISSIONS ?= make permissions-webapp
MYSQL_PASSWORD ?= root
#include Make.config

install:
	rm webapi/src/.env
	cp webapi/.env webapi/src/.env
	make stop
	docker-compose up -d 
	docker-compose exec webapi composer update -vvv
	docker-compose exec webapi php artisan migrate:fresh
	make seed

import-data:
	docker-compose exec db mysql -u root -p$(MYSQL_PASSWORD) hcdb.stocks < ./stocks.sql;

mysql:
	docker-compose exec db mysql -u root -p$(MYSQL_PASSWORD)

run:
	docker-compose up -d
	docker-compose exec webapp npm start

stop:
	docker-compose down

test:
	docker-compose exec webapi php artisan test

showlogs:
	echo "Showing logs...... \n " && tail -f src/storage/logs/laravel.log

permissions:
	$ echo "Running permissions"
	$(WEBAPI_PERMISSIONS)
	$(WEBAPP_PERMISSIONS)

permissions-webapi:
	sudo find webapi/src/ -type d -exec chmod 775 {} \;
	sudo find webapi/src/ -type f -exec chmod 664 {} \;
	sudo chown -R www-data:${USER} webapi/src

permissions-webapp:
	$ echo 'Running webapp permissions'\;
	sudo find webapp/src/src/ -type d -exec chmod 775 {} \;
	sudo find webapp/src/src/ -type f -exec chmod 664 {} \;
	sudo chown -R root:${USER} webapp/src/src/
	sudo find webapp/src/public/ -type d -exec chmod 775 {} \;
	sudo find webapp/src/public/ -type f -exec chmod 664 {} \;
	sudo chown -R root:${USER} webapp/src/public/

bash:
	docker-compose exec webapi bash

artisan:
	docker-compose exec webapi php artisan

seed:
	cp ./stocks.sql webapi/src/public/sql/
	docker-compose exec webapi php artisan db:seed --class=StockSeeder
	rm webapi/src/public/sql/stocks.sql

make npm:
	docker-compose exec webapp npm
