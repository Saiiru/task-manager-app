# Build stage
FROM golang:1.23-alpine AS builder

WORKDIR /app

# Copy go.mod and go.sum files and download dependencies
COPY go.mod go.sum ./
RUN go mod download

# Copy the entire backend source code
COPY . .

# Run tests
RUN go test ./...

# Build the Go application
RUN go build -o task-manager-app ./cmd/main.go

# Final image
FROM alpine:latest

WORKDIR /root/

# Copy the compiled binary from the builder stage
COPY --from=builder /app/task-manager-app .

# Expose the port the app will run on
EXPOSE 8080

# Command to run the application
CMD ["./task-manager-app"]