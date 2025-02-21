FROM golang:alpine AS builder

RUN apk add build-base
COPY . /src
RUN cd /src/cmd/booktr/ && CGO_ENABLED=0 go build -o /booktr .


FROM scratch

WORKDIR /app
COPY --from=builder /booktr /app/

ENTRYPOINT ["./booktr"]