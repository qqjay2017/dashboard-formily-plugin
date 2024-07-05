FROM nginx:1.19.0-alpine

WORKDIR /usr/share/nginx/html/
COPY dist/ .
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
