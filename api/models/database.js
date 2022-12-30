var sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "db.sqlite";

const db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')
        console.log('Creating title table first')
        db.run(`CREATE TABLE title (
            id VARCHAR(10) PRIMARY KEY,
            name TEXT, 
            created DATE, 
            updated DATE
            )`,
        (err) => {
            if (err) {
                // Table already created
                console.log(err.message)
            }else{
                console.log('CREATE TABLE title')
            }
        });  
        console.log('Creating tasks table next...');
        db.run(`CREATE TABLE tasks (
            id VARCHAR(10) PRIMARY KEY,
            title VARCHAR(10), 
            task TEXT, 
            completed BOOLEAN
            )`,
        (err) => {
            if (err) {
                // Table already created
                console.log(err.message)
            }else{
                console.log('CREATED TABLE tasks')
            }
        });
        console.log('Creating attributes table next...');
        db.run(`CREATE TABLE attributes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            taskID VARCHAR(10),
            indent INTEGER,
            taskOrder INTEGER
            )`,
        (err) => {
            if (err) {
                // Table already created
                console.log(err.message)
            }else{
                console.log('CREATED TABLE attributes')
            }
        });   
    }
});


module.exports = db