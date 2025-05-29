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

### Установка виртуального оружения backend

```cmd
python3 -m venv venv
source ./venv/Scripts/activate
```

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

## AI

### Установка виртуального оружения AI

```cmd
python3 -m venv venv
source ./venv/Scripts/activate
```

### Установка зависимостей

```cmd
pip3 install -r ./requirements.txt
```

### Запуск сервера

```cmd
cd ./ai/
uvicorn manage:app --reload
```
