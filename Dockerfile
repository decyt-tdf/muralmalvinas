FROM node:alpine
ADD . /mural-malvinas/
WORKDIR /mural-malvinas/
RUN apk update && apk add graphicsmagick
RUN npm install
CMD ["node","server.js"]
