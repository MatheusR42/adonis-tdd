# Adonis API application

This is the boilerplate for creating an API server in AdonisJs, it comes pre-configured with.

1. Bodyparser
2. Authentication
3. CORS
4. Lucid ORM
5. Migrations and seeds

## Setup

Use the adonis command to install the blueprint

```bash
adonis new yardstick --api-only
```

or manually clone the repo and then run `npm install`.


### Migrations

Run the following command to run startup migrations.

```js
adonis migration:run
```

## Commands

### Config ESLint
Install the dependencies
```
yarn add eslint prettier eslint-config-prettier eslint-plugin-prettier -D
```

Initialize ESLint
```
yarn eslint --init
```

Config the ```.prettierrc``` and ```.eslintrc.json``` files

To fix all the files in a folder named "app"
```
yarn eslint --fix app --ext .js
```

### Create PostGres Database

```
docker network create --driver bridge postgres-network
docker run --name rsxp --network=postgres-network  -p 5432:5432 -d -t kartoza/postgis
docker run --name pgadmin --network=postgres-network  -p 15432:80 -e "PGADMIN_DEFAULT_EMAIL=test@test.com" -e "PGADMIN_DEFAULT_PASSWORD=123456" -d dpage/pgadmin4
```

Link de referência (não é exatamente igual, mas é parecido):
https://medium.com/@renato.groffe/postgresql-docker-executando-uma-inst%C3%A2ncia-e-o-pgadmin-4-a-partir-de-containers-ad783e85b1a4

To stop and remove all containers
```
docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)
```

### Creating model, migration and controller

```
adonis make:model Workshop -m -c
```


### Other cool commands
```
adonis make:validator Workshop
adonis make:provider CustomValidation
```
