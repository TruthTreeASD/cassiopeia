FROM node:latest

RUN git clone https://github.com/TruthTreeASD/frontend

WORKDIR /frontend
RUN npm i && npm run build
CMD /frontend/node_modules/.bin/forever server.js

EXPOSE 3000
