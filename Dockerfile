FROM node:13.12.0-alpine
WORKDIR /app
# RUN npm i -g create-react-app
COPY package.json ./
COPY package-lock.json ./
RUN npm install
CMD ["npm", "start"]



# production environment
# FROM nginx:stable-alpine
# COPY --from=build /app/build /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]