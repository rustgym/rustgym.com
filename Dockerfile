# Use the official Rust image.
# https://hub.docker.com/_/rust
FROM rust:latest

# Copy local code to the container image.
WORKDIR /usr/src/app

COPY ./Cargo.lock ./Cargo.lock

COPY ./Cargo.toml ./Cargo.toml

COPY ./src/lib.rs ./src/lib.rs

Run cargo build

COPY ./src ./src

# Install production dependencies and build a release artifact.
RUN cargo install --path .

# Service must listen to $PORT environment variable.
# This default value facilitates local development.
ENV PORT 8080

# Run the web service on container startup.
CMD ["rustgym-website"]
