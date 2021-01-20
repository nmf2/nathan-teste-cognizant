FROM node:12-alpine
ENV NODE_ENV=production
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install
COPY . /usr/src/app
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
