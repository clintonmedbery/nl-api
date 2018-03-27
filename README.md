# Boilerplate Node Server with Babel, Sequelize, bcrypt

### Getting Started

#### Setup Test Database

```shell
$ cd testdb/```
```shell
$ docker build -t nu-database .```

#### Install
```shell
$ npm install
```
```shell
$ npm install -g sequelize-cli```

```shell
$ sequelize init```

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
