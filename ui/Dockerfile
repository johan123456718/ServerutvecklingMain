FROM node:13.12.0-alpine
EXPOSE 3000
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY . ./
CMD ["npm", "start"]
