* Create file .sequelizerc in root folder and configure it as below:

    const path = require('path');

    module.exports = {
    'config': path.resolve('infrastructure/database', 'config', 'database.json'),
    'models-path': path.resolve('infrastructure/database', 'models'),
    'seeders-path': path.resolve('infrastructure/database', 'seeders'),
    'migrations-path': path.resolve('infrastructure/database', 'migrations')
    }

* Creating folders [config, models, seeders, migrations] it will use the path configured before
    npx sequelize-cli init

* Generate Model and Migration
    npx sequelize-cli model:generate --name User --attributes name:string,email:string,password:string,minutes:integer

* Run Migrations
    npx sequelize-cli db:migrate

* Generating seeds
    npx sequelize-cli seed:generate --name demo-user

* Populate with seeds
    npx sequelize-cli db:seed:all

* Undoing Migragion
    npx sequelize-cli db:migrate:undo //Only for the last migration made
    db:migrate:undo --name [data-hora]-create-[nome-da-tabela].js //For skipping to older Migration