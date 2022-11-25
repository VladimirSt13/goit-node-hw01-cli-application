# Получаем и выводим весь список контактов в виде таблицы (console.table)

node index.js --action list

![list](./screen-1.png)

# Получаем контакт по id

node index.js --action get --id 5

![get](./screen-2.png)

# Добавялем контакт

node index.js --action add --name Mango --email mango@gmail.com --phone 322-22-22

![add](./screen-3.png)

# Удаляем контакт

node index.js --action remove --id=3

![remove](./screen-4.png)
