FROM node:18-alpine

WORKDIR /app/frontend

COPY . .

RUN npm install
RUN npm run build

CMD ["npm", "run", "dev", "--host", "0.0.0.0"]
