#!/bin/bash
source /etc/profile
BUILD_ID=dontKillMe
pm2 delete "payhub-interface-prod"
pm2 start npm --name "payhub-interface-prod" -- run start
echo "---------------------------运行成功--------------------------"

