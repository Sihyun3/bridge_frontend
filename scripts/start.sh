#!/usr/bin/env bash

PROJECT_ROOT="/home/ubuntu/react"


APP_LOG="$PROJECT_ROOT/application.log"
ERROR_LOG="$PROJECT_ROOT/error.log"
DEPLOY_LOG="$PROJECT_ROOT/deploy.log"

TIME_NOW=$(date +%c)


cp $PROJECT_ROOT/conf.d /

cp $PROJECT_ROOT/build /usr/share/nginx/html/
echo "$TIME_NOW : copy build" >> $DEPLOY_LOG


echo "$TIME_NOW : run nginx" >> $DEPLOY_LOG
nginx -g daemon off
# chmod 111 JAR_FILE
# nohup java -jar $JAR_FILE > $APP_LOG 2> $ERROR_LOG &
