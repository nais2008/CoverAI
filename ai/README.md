# coverai_ai_service

> [!WARNING]
> Предпологается что все действия будут происходить из корня проекта

Сервис нейросети, используемый в основном проекте

## Склонируйте репозиторий

```cmd
git clone https://github.com/nais2008/coverai_ai_service
cd ./coverai_ai_service/
```

## Установка виртуального оружения

```cmd
python3 -m venv venv
source ./venv/Scripts/activate
```

## Установка зависимостей

```cmd
pip3 install -r ./requirements.txt
```

## Запуск сервера

```cmd
cd ./ai/
uvicorn manage:app --reload
```
