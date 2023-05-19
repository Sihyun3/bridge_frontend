#!/usr/bin/env bash

PROJECT_ROOT="/home/ubuntu/react"


APP_LOG="$PROJECT_ROOT/application.log"
ERROR_LOG="$PROJECT_ROOT/error.log"
DEPLOY_LOG="$PROJECT_ROOT/deploy.log"

TIME_NOW=$(date +%c)


sudo chmod -R  777 $PROJECT_ROOT/build
# sudo cp -r $PROJECT_ROOT/build/ /usr/share/nginx/html/
echo "$TIME_NOW : copy build" >> $DEPLOY_LOG
sudo rm -rf  $PROJECT_ROOT/node_modules

echo "$TIME_NOW : restart nginx" >> $DEPLOY_LOG
sudo systemctl restart nginx 
# chmod 111 JAR_FILE
# nohup java -jar $JAR_FILE > $APP_LOG 2> $ERROR_LOG &
