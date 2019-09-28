FROM node:latest
WORKDIR /usr/src/app
COPY client .
RUN npm install
RUN npm run build

FROM rust:latest
WORKDIR /usr/src/app
COPY server .
RUN cargo install --path .
COPY --from=0 /usr/src/app/public static
ENV PORT 8080
CMD ["rustgym-server"]
