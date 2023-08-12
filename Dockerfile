FROM golang:alpine AS builder

RUN apk add build-base
COPY . /src
RUN cd /src/cmd/booktr/ && CGO_ENABLED=0 go build -o /booktr .


FROM alpine

WORKDIR /app

RUN apk add --no-cache arp-scan tzdata \
    && mkdir /data/booktr

COPY --from=builder /booktr /app/

ENTRYPOINT ["./booktr"]