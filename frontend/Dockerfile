# Build Stage
FROM node:16.13.1 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN rm -rf dist/ && npm run build --prod

# Nginx Stage
FROM nginx:stable
COPY --from=build /app/dist/figurines-app /usr/share/nginx/html/figurines
COPY nginx.conf /etc/nginx
COPY figurines.at_ssl_certificate.cer /etc/ssl
COPY _.figurines.at_private_key.key /etc/ssl

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
