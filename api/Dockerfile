FROM node:9.11.1-alpine
MAINTAINER Agustin Carrasco <asermax@gmail.com>

WORKDIR /opt/app
COPY dist ./dist
COPY index.js package.json yarn.lock ./
COPY entrypoint.sh ./
COPY migrations ./migrations

VOLUME /opt/app/node_modules

ENV NODE_ENV production
ENTRYPOINT ["/opt/app/entrypoint.sh"]
CMD ["start-prod"]
