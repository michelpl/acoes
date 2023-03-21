# defines variables
WEBAPI_PERMISSIONS ?= make permissions_webapi
WEBAPP_PERMISSIONS ?= make permissions_webapp
#include Make.config

install:
	cp src/.env.example src/.env
	docker-compose up -d 
	docker-compose exec webapi composer update -vvv
	docker-compose exec webapi php artisan migrate:fresh

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
	$ (PERMISSIONS_WEB_API)
	$ (PERMISSIONS_WEB_APP)

permissions-webapi:
	sudo find src/ -type d -exec chmod 775 {} \;
	sudo find src/ -type f -exec chmod 664 {} \;
	sudo chown -R www-data:${USER} src

permissions-webapp:
	$ echo 'Running webapp permissions'\;
	sudo find webapp/src/src/ -type d -exec chmod 775 {} \;
	sudo find webapp/src/src/ -type f -exec chmod 664 {} \;
	sudo chown -R root:${USER} webapp/src/src/

bash:
	docker-compose exec webapi bash

artisan:
	docker-compose exec webapi php artisan
