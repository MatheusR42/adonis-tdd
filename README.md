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
