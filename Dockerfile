FROM node:latest

RUN git clone https://github.com/TruthTreeASD/frontend
RUN git checkout -b feature/dockerization 

WORKDIR /frontend
RUN npm i && npm run build

WORKDIR /frontend/build/
CMD /frontend/node_modules/.bin/forever server.js

EXPOSE 3001
