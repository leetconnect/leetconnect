FROM nginx:1.27-alpine
RUN apk add --no-cache openssl && \
    mkdir -p /etc/nginx/ssl && \
    openssl req -x509 -nodes -days 365 \
      -subj "/C=MA/ST=State/L=City/O=LeetConnect/CN=localhost" \
      -newkey rsa:2048 \
      -keyout /etc/nginx/ssl/key.pem \
      -out /etc/nginx/ssl/cert.pem
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 443 80
CMD ["nginx", "-g", "daemon off;"]