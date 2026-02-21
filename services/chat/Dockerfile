FROM node:20-alpine
WORKDIR /app
COPY packages/shared/ ./shared/
COPY services/chat/package.json ./
RUN npm install --production
COPY services/chat/src/ ./src/
EXPOSE 3003
CMD ["node", "src/index.js"]