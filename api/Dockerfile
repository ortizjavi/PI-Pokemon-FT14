FROM node:18.13.0 as build
USER node
WORKDIR /app
COPY . .

RUN HUSKY=0 npm ci && npm run build

FROM node:18.13.0

WORKDIR /app
EXPOSE 3000

COPY --from=build /app/dist /app/package.json /app/package-lock.json /app/.env ./
RUN npm ci --omit=dev

CMD [ "node", "src/server.js" ]

