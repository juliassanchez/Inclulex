FROM node:18.12.1-alpine

WORKDIR /app/frontend

COPY . .

RUN npm install
RUN npm run build

CMD ["npm", "dev", "--host", "0.0.0.0"]