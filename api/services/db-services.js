const db = require('../models/database');

var { nanoid } = require("nanoid");

const createList = async (data) => {
    const insert = 'INSERT INTO title (id, name, created, updated) VALUES (?,?,?,?)';
    const id = nanoid(10);
    const date = new Date();
    db.run(insert, [id, data.title, date, date], (err) => {
        if (err) {
            console.log('Error saving a new title', data.title);
            console.log(err);
            return { success: false, error: err };
        } else {
            const sqlQuery = 'INSERT INTO tasks (title, task, completed) VALUES (?,?,?)';
            let anyErr = false;
            for (const task in data.tasks) {
                db.run(sqlQuery, [id, task, false], (err) => {
                    if (err) {
                        console.log(err);
                        anyErr = true;
                    }
                })
            }
            return { success: !anyErr};
        }
    })
};
module.exports = {
    createList,
}