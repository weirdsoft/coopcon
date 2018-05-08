FROM nginx:1.13.12-alpine
MAINTAINER Agustin Carrasco <asermax@gmail.com>

COPY web/dist /usr/share/nginx/html
COPY nginx.prod.conf /etc/nginx/conf.d/default.conf
