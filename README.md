# Project Name

> Предпологается что вы воспроизводете все команды из коря проекта

## Frontend

### Установка зависимостей

```cmd
cd ./frontend/
npm install
```

### Запуск в dev режиме

```cmd
cd ./frontend/
npm run dev
```

## API

### Запуск

```cmd
cd ./api/
go run ./cmd/main.go
```

### Конфиг

Путь к конфигу настраивается в env файле, сам конфиг выглядит так:

```yaml
env: "local"
storage_path: "путь/к/бд"
http_server:
  addres: "localhost:8082"
  timeout: 4s
  idle_timeouts: 60s

```
