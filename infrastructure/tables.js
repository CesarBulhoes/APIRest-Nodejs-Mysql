class Tables {
    init(connection) {
        this.connection = connection
        this.createUsers()
        this.createFiles()
        // this.showTables()
    }

    createUsers(){
        const sql = `CREATE TABLE IF NOT EXISTS users( 
        id int NOT NULL AUTO_INCREMENT,
        name varchar(50) NOT NULL,
        email varchar(50) NOT NULL UNIQUE,
        password varchar(50) NOT NULL,
        minutes int DEFAULT 0 NOT NULL,
        created_at datetime DEFAULT NOW() NOT NULL,
        updated_at datetime DEFAULT NOW() NOT NULL,
        deleted boolean DEFAULT FALSE,
        PRIMARY KEY (id))`
        this.connection.query(sql, (error, result) => {
            if (error) console.log(error)
        })
    }

    createFiles(){
        const sql = `CREATE TABLE IF NOT EXISTS files( 
        id int NOT NULL AUTO_INCREMENT,
        userId int NOT NULL,
        path varchar(255) NOT NULL UNIQUE,
        created_at datetime DEFAULT NOW() NOT NULL,
        PRIMARY KEY (id))`
        this.connection.query(sql, (error, result) => {
            if (error) console.log(error)
        })
    }

    showTables(){
        const sql = `SHOW TABLES`
            this.connection.query(sql, (error,response) => {
                if (error) console.log(error)
                else console.log(response)
            })
    }
}

module.exports = new Tables()