FROM node:18.4.0

RUN mkdir /root/web

ADD web.tar.gz /root/web
RUN npm i -g pm2 
RUN cd /root/web/ && npm i --omit=dev

# tmp fix aliyun build
# https://github.com/groupher/groupher_web/pull/1#issue-1437686131
RUN cd /root/web/src/pages && rm -f .__app.tsx
RUN cd /root/web/src/pages && rm -f publish/.__post.tsx
RUN cd /root/web/ && make build.prod

ADD loader.sh /usr/local/bin/loader.sh
RUN chmod +x /usr/local/bin/loader.sh
CMD ["/usr/local/bin/loader.sh"]