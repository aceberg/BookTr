FROM golang:alpine AS builder

RUN apk add build-base
COPY backend /src
RUN cd /src/cmd/BookTr/ && CGO_ENABLED=0 go build -o /BookTr .


FROM scratch

WORKDIR /app
COPY --from=builder /BookTr /app/

ENTRYPOINT ["./BookTr"]