#!/bin/bash

cd /root/web/
# npm run serve:dev &
pm2-runtime start npm --name "groupher_web" -- run serve:dev &

while true
do
    sleep 100
done
