# APIRest-Nodejs-Mysql-SequelizeCLI

This is an alternative to the "APIRest-Nodejs-Mysql" project. The difference is that here I am using Sequelize to create the models and migrations which gives us version control about the database. But we need to run some command lines using Sequelize-cli, as shown in file "infrastructure/database/README.md".

# Self signed ssl - only for development
go to C:\Program Files\Git\usr\bin\openssl.exe
& 'C:\Program Files\Git\usr\bin\openssl.exe' req -x509 -sha256 -nodes -newkey rsa:2048 -keyout privkey.pem -out cert.pem

# Step 1
Provide SSL configuration files in "bin/server.js" setting the PATH_TO_PRIVKEY and PATH_TO_CERT:

const keyPath = path.resolve([PATH_TO_PRIVKEY])
const certPath = path.resolve([PATH_TO_CERT])

const options = {
  key: fs.readFileSync(keyPath),
  cert: fs.readFileSync(certPath),
} 

# Step 2

Check "config/default.json" for setting the port number that the server will run on and the company owning the api, as showed below:

    {
        "api": {
            "port": 8888
        },
        "developed": {
            "by": "Cesar Bulhoes"
        }
    }

Tip: If port is not specified then it will try to run on port 443.

Check "infrasctructure/database/config/database.json" and set your database configuration for Sequelize node module:

    "development": {
        "username": "root",
        "password": "admin",
        "database": "tutorial",
        "host": "127.0.0.1",
        "dialect": "mysql",
        "logging": false
    }

Tip: If you want to run on another mode, you need to set NODE_ENV as "test" or "production" in environment variables.

#Step 3

For instaling NodeJS dependencies you need to go to root folder using the terminal (where we can find the "package.json" file), then simply run "npm install". You have to have NPM installed, I strongly recommend using NVM to install it. 

After all modules are installed you can run the project using "npm test" to run using Nodemon in developer mode or you can use "npm start" to run using PM2 in production mode. "Ctrl + C" to stop Nodemon and "npm stop" to stop the server running on PM2. 





