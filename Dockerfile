FROM node:9.3-alpine
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install && yarn cache clean
COPY . .
ENV SERVICE_PORT 5000
CMD ["node", "app.js"]