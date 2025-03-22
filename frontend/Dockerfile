# Build Stage
FROM node:16.13.1 as build
WORKDIR /app
COPY package*.json ./
RUN rm -rf dist/
RUN npm install
COPY . .
RUN npm run build --prod

# Nginx Stage
FROM nginx:stable
COPY --from=build /app/dist/figurines-app /usr/share/nginx/html/figurines
COPY nginx.conf /etc/nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
