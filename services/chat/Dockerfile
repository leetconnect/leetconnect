FROM node:20-alpine

# build shared pkgs
WORKDIR /app/shared
COPY packages/shared/ ./
RUN npm install
RUN npm run build

# build srvc
WORKDIR /app/service
COPY services/chat/package.json ./
RUN npm pkg set dependencies.@leetconnect/shared=file:../shared
RUN npm install
COPY services/chat/ ./
RUN npm run build

EXPOSE 3003
CMD ["node", "dist/index.js"]
