const db = require('../models/database');

var { nanoid } = require("nanoid");

const createList = async (data) => {
    const insert = 'INSERT INTO "title" (id, name, created, updated) VALUES (?,?,?,?)';
    const id = nanoid(10);
    const date = new Date();
    db.run(insert, [id, data.title, date, date], (err) => {
        if (err) {
            console.log('Error saving a new title', data.title);
            console.log(err);
            return { success: false, error: err };
        } else {
            const sqlQuery = 'INSERT INTO "tasks" (title, task, completed) VALUES (?,?,?)';
            let anyErr = false;
            for (const task of data.tasks) {
                console.log(task)
                db.run(sqlQuery, [id, task.value, false], (err) => {
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

function getAll() {
   return new Promise ((resolve, reject) => {
    const getAllQuery = 'SELECT tasks.id as id, title.id as projectID, title.name as title, task, completed FROM tasks INNER JOIN title ON title.id = tasks.title';
    return db.all(getAllQuery, [], (err, rows) => {
        if (err) {
            console.log(err)
            return reject(err.message)
        } else {
            return resolve(rows)
        }
    })
   })
  }

const getAllLists = async () => {
    const result = await getAll();
    const groupByTitle = result.reduce((acc, task) => {
        let {id, projectID} = task;
        return {...acc, [projectID]: [...(acc[projectID] || []), task]};
    }, {});
    return groupByTitle
};
module.exports = {
    createList,
    getAllLists
}