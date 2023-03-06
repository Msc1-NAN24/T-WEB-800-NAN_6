FROM node:18-alpine as build

RUN npm i -g nx serve pnpm

WORKDIR "/app"

COPY . .

RUN pnpm i

RUN pnpm run build

FROM nginx:stable-alpine
COPY --from=build /app/dist /bin/www
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]