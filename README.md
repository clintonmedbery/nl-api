# Boilerplate Node Server with Babel, Sequelize, bcrypt

### Getting Started

#### Setup Test Database

```shell
$ cd testdb/
```

```shell
$ docker build -t nu-database .
```

```shell
docker run --name nuleaf -e POSTGRES_PASSWORD=test_password -d -p 15432:5432 nu-database
```

#### Install
```shell
$ npm install
```
```shell
$ npm install -g sequelize-cli
```

```shell
$ sequelize init
```

```shell
$ cd config
```
Open config.json in a text editor or do 

```shell
$ vim config.json
```
Change the development object to:
```
"development": {
    "username": "dbadmin",
    "password": "test_password",
    "database": "nuleaf",
    "host": "127.0.0.1",
    "port": "15432",
    "dialect": "postgres"
  }
  ```
#### Run Migrations

```shell
$ node_modules/.bin/sequelize db:migrate
```

#### Backup Migrations

```shell
$ node_modules/.bin/sequelize db:migrate:undo
```

#### Backup to Specific Migrations

```shell
$ node_modules/.bin/sequelize db:migrate:undo:all --to XXXXXXXXXXXXXX-create-posts.js
```

#### Running Seeds

```shell
$ node_modules/.bin/sequelize db:seed:all
```

#### Undo Seeds

```shell
$ node_modules/.bin/sequelize db:seed:undo
```
