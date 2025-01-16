FROM golang:1.21-alpine AS builder

WORKDIR /app

COPY backend/go.mod backend/go.sum ./
RUN go mod download

COPY backend/ ./

RUN go build -o task-manager-app ./cmd/main.go

FROM alpine:latest

WORKDIR /root/

COPY --from=builder /app/task-manager-app .

EXPOSE 8080

CMD ["./task-manager-app"]