# MEGACOUNT-Test-task-Accounting-book-of-finance
MEGACOUNT Тестовое задание на вакансию программиста (Учетная книга финансов).

## Получить исходный код приложения
`git clone https://github.com/lawrence-il/MEGACOUNT-Test-task-Accounting-book-of-finance.git`

### Шаги для запуска сервера
---
#### Перейти в папку server
`cd server`
#### Скачать пакеты и их зависимости
`npm i`
##### При ошибки npm i
`npm i --legacy-peer-deps`
#### Для создания БД
`npx sequelize-cli db:create`
#### Запустить приложение
`npm start`

### Шаги для запуска web-приложения
---
#### Выйти из папки server
`cd ..`
#### Перейти в папку client
`cd client`
#### Скачать пакеты и их зависимости
`npm i`
##### При ошибки npm i
`npm i --legacy-peer-deps`
#### Запустить приложение
`npm start`
#### В запустившемся приложении зарегистрируйтесь
