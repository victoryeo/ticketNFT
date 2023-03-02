# syntax=docker/dockerfile:1

# Alpine is chosen for its small footprint
# compared to Ubuntu
FROM golang:1.18-alpine

WORKDIR /app

RUN apk update && apk add git
RUN go clean -modcache

# Download necessary Go modules
COPY go.mod ./
COPY go.sum ./
RUN go mod download

# copy all files
COPY . ./

RUN go build -o /docker-go

EXPOSE 9090

CMD [ "/docker-go" ]