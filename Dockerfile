FROM node:18.6-buster-slim

WORKDIR /app
COPY Backend /app/
RUN cd reveal.me && npm install

COPY Frontend /app/
RUN cd reveal.me && npm install --legacy-peer-deps

COPY Socket /app/

EXPOSE 5000