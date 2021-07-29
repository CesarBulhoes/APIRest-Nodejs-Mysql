# APIRest-Nodejs-Mysql-UploadOfFiles

# Step 1

Create a folder named as "Config" on the root.
Create a file named "default.json"
Then in "default.json" set your database configuration and the port number that the server will run on, as showed below:

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
    }
}

If port is not specified then it will try to run on 443