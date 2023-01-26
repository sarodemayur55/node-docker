FROM node:15
RUN npm install --global nodemon
WORKDIR /app
COPY package.json ./
RUN npm install
COPY ./ ./
EXPOSE 3000
CMD ["npm","run","dev"]