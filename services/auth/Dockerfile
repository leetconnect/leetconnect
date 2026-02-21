FROM node:20-alpine
WORKDIR /app
COPY packages/shared/ ./shared/
COPY services/auth/package.json ./
RUN npm install --production
COPY services/auth/src/ ./src/
EXPOSE 3001
CMD ["node", "src/index.js"]