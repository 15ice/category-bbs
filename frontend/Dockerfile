FROM node:16.14.2 AS builder
COPY . /myapp
WORKDIR /myapp
RUN npm install
RUN npm run build

FROM nginx:latest
RUN rm -r -f /usr/share/nginx/html
COPY --from=builder /myapp/dist /usr/share/nginx/html
