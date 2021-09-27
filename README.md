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

Create a ".env" file, in root folder, for setting the port number that the server will run on and the company owning the api, as showed below:

    # Server
    API_PORT=[PORT]

    # Developer
    DEVELOPED_BY=[DEVELOPER NAME OR COMPANY]

    # Authorization
    AUTHORIZATION_SECRET=[YOUR SECRET]

    # Database enviroment
    NODE_ENV=[dev | prod]

    # Database 
    DB_USERNAME=root
    DB_PASSWORD=admin
    DB_DATABASE=tutorial
    DB_HOST=127.0.0.1

    # Database DEV
    DB_USERNAME_DEV=root
    DB_PASSWORD_DEV=admin
    DB_DATABASE_DEV=tutorial
    DB_HOST_DEV=127.0.0.1

Tip: If port is not specified then it will try to run on port 443.
Tip²: If NODE_ENV is not specified then it will run in dev mode.

#Step 3

For instaling NodeJS dependencies you need to go to root folder using the terminal (where we can find the "package.json" file), then simply run "npm install". You have to have NPM installed, I strongly recommend using NVM to install it. 

After all modules are installed you can run the project using "npm test" to run using Nodemon in developer mode or you can use "npm start" to run using PM2 in production mode. "Ctrl + C" to stop Nodemon and "npm stop" to stop the server running on PM2. 





