FROM node:13.12.0-alpine
WORKDIR /app
RUN npm i -g create-react-app
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# COPY ./api/start.sh /start.sh
# RUN chmod +x /start.sh
CMD ["npm", "start"]
