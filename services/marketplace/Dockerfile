FROM node:20-alpine
WORKDIR /app
COPY packages/shared/ ./shared/
COPY services/marketplace/package.json ./
RUN npm install --production
COPY services/marketplace/src/ ./src/
EXPOSE 3002
CMD ["node", "src/index.js"]