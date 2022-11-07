FROM node:18.4.0

RUN mkdir /root/web

ADD web.tar.gz /root/web
RUN npm i -g pm2 
RUN cd /root/web/ && npm i --omit=dev
RUN cd /root/web/ && npm i typescript --save-dev
# https://stackoverflow.com/a/70250426/4050784
# RUN cd /root/web/ && npm install -D @swc/cli @swc/core

RUN cd /root/web/ && ls -lla
RUN cd /root/web/ && ls -lla src/pages
RUN cd /root/web/src/pages && rm .__app.tsx
RUN cd /root/web/ && make build.prod

ADD loader.sh /usr/local/bin/loader.sh
RUN chmod +x /usr/local/bin/loader.sh
CMD ["/usr/local/bin/loader.sh"]