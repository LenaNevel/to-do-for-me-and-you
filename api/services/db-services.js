const db = require('../models/database');

const { nanoid } = require("nanoid");

const createList = async (data) => {
    const insert = 'INSERT INTO "title" (id, name, created, updated) VALUES (?,?,?,?)';
    const listTitle = (data.find((x) => x && x.title) || {}).title;
    let projectID = (data.find((x) => x && x.projectID) || {}).projectID;
    if (!projectID) projectID = nanoid(10);
    const date = new Date();
    db.run(insert, [projectID, listTitle, date, date], (err) => {
        if (err) {
            console.log('Error saving a new title', listTitle);
            console.log(err);
            return { success: false, error: err };
        } else {
            const tasksQuery = 'INSERT INTO "tasks" (id, title, task, completed) VALUES (?,?,?,?)';
            const attributesQuery = 'INSERT INTO "attributes" (taskID, indent, taskOrder) VALUES (?,?,?)'
            let anyErr = false;
            for (const task of data) {
                const taskId = data.id || nanoid(10);
                db.run(tasksQuery, [taskId, projectID, task.task, task.completed], (err) => {
                    if (err) {
                        console.log('Error saving a new task', task.task);
                        console.log(err);
                        anyErr = true;
                    }
                })
                db.run(attributesQuery, [taskId, task.indent, task.taskOrder], (err) => {
                    if (err) {
                        console.log('Error saving a new attribute for ', task.value)
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
    const getAllQuery = 'SELECT tasks.id as id, title.id as projectID, title.name as title, task, completed, attributes.indent as indent, attributes.taskOrder as taskOrder FROM tasks INNER JOIN title ON title.id = tasks.title INNER JOIN attributes ON attributes.taskID = tasks.id';
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
const updateTask = async (data) => {
    console.log(data);
    if (!data) return;
    let id = (data.condition || {}).id;
    // let projectID = (data.condition || {}).projectID;
    // rewrite for when there is multiple things to update;
    const update = `UPDATE "tasks" SET completed = ${data.update.completed} WHERE id = ${id}`;
    db.run(update, [], (err) => {
        if (err) {
            console.log('Failed updating tasks for id ', id);
            console.log(err);
        }
    })
    // add the update of the title table for updated column DATE;
};

module.exports = {
    createList,
    getAllLists,
    updateTask
}