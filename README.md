# CoverAI

> Предпологается что вы воспроизводете все команды из корня проекта

## Frontend

### Установка зависимостей frontetnd

```cmd
cd ./frontend/
npm install
```

### Запуск frontetnd

```cmd
cd ./frontend/
npm start
```

## API & BACKEND

### Установка зависимостей backend

#### PROD

```cmd
cd ./backend/
pip3 install -r ./requirements/prod.txt
```

#### DEV

```cmd
cd ./backend/
pip3 install -r ./requirements/dev.txt
```

#### TEST

```cmd
cd ./backend/
pip3 install -r ./requirements/test.txt
```

### Применение миграций

```cmd
cd ./backend/
python3 manage.py migrate
```

### Запуск backend

```cmd
cd ./backend/
python3 ./manage.py runserver
```
