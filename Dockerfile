FROM node:alpine
COPY . /app
WORKDIR /app
RUN npm install
EXPOSE 5000
CMD ["node", "app.js"]