# Boilerplate Node Server with Babel, Sequelize, bcrypt

### Getting Started

#### Install
```shell
$ npm install
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