FROM registry.redhat.io/ubi8/nodejs-12

ADD server.js .
ADD package.json .
RUN npm install

CMD npm run -d start
