# APIRest-Nodejs-Mysql-UploadOfFiles

# Step 1
Provide SSL configuration files in "bin/server.js" setting the PATH_TO_PRIVKEY and PATH_TO_CERT:

const keyPath = path.resolve([PATH_TO_PRIVKEY])
const certPath = path.resolve([PATH_TO_CERT])

const options = {
  key: fs.readFileSync(keyPath),
  cert: fs.readFileSync(certPath),
} 

# Step 2
Check "Config/default.json" on the root folder, set your database configuration for Sequelize node module, the port number that the server will run on and the company owning the api, as showed below:

{
    "mysql": {
        "host": "localhost",
        "port": 3306,
        "user": "root",
        "password": "admin",
        "database": "tutorial"
    },
    "api": {
        "port": 8888
    },
    "developed": {
        "by": "César Bulhões"
    }
}

Tip: If port is not specified then it will try to run on port 443.

#Step 3

For instaling NodeJS dependencies you need to go to root folder using the terminal (where we can find the "package.json" file), then simply run "npm install". You have to have NPM installed, I strongly recommend using NVM to install it. 

After all modules are installed you can run the project using "npm test" to run using Nodemon in developer mode or you can use "npm start" to run using PM2 in production mode.





