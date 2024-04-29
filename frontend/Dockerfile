FROM node:18.12.1-alpine

WORKDIR /app/frontend

COPY . .

RUN npm install && \
    npm run build

CMD ["npm", "run", "dev", "--host", "0.0.0.0"]