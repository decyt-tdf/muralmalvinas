FROM node:alpine
ADD . /muralmalvinas/
WORKDIR /muralmalvinas/
RUN apk update && apk add graphicsmagick
RUN npm install
CMD ["node","server.js"]
