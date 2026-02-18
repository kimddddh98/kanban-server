FROM node:20-alpine

WORKDIR /app

# 의존성
COPY package*.json ./
RUN npm ci --only=production

# 소스
COPY . .

# 빌드
RUN npm run build

EXPOSE 3000

CMD ["node", "dist/main.js"]
