const db = require('../models/database');

const { nanoid } = require('nanoid');

const editList = async (data) => {
    const upsertTitle = `
                            INSERT INTO "title" (id, name, created, updated) 
                            VALUES (?,?,?,?)
                            ON CONFLICT(id) DO UPDATE 
                            SET name=excluded.name, updated=excluded.updated
                        `;
    const listTitle = (data.find((x) => x && x.title) || {}).title;
    let projectID = (data.find((x) => x && x.projectID) || {}).projectID;
    if (!projectID) projectID = nanoid(10);
    const date = new Date();
    db.run(upsertTitle, [projectID, listTitle, date, date], (err) => {
        if (err) {
            console.log('Error saving a new title', listTitle);
            console.log(err);
            return { success: false, error: err };
        } else {
            const tasksQuery = `
                                    INSERT INTO "tasks" (id, title, task, completed, indent, taskOrder) 
                                    VALUES (?,?,?,?,?,?)
                                    ON CONFLICT(id) DO UPDATE 
                                    SET task=excluded.task, completed=excluded.completed, indent=excluded.indent, taskOrder=excluded.taskOrder
                                `;
            let anyErr = false;
            for (const task of data) {
                const taskId = task.id || nanoid(10);
                db.run(
                    tasksQuery,
                    [taskId, projectID, task.task, task.completed, task.indent, task.taskOrder],
                    (err) => {
                        if (err) {
                            console.log('Error saving a new task', task.task);
                            console.log(err);
                            anyErr = true;
                        }
                    }
                );
            }
            return { success: !anyErr };
        }
    });
};

const deleteList = async (data) => {
    const deleteTitle = `
                            DELETE FROM "title"
                            WHERE id=?;
                        `;
    const deleteTasks = `
                        DELETE FROM "tasks"
                        WHERE title=?;
                    `;
    const projectID = data.projectID;
    if (!projectID) return;
    db.run(deleteTitle, [projectID], (err) => {
        if (err) {
            console.log('Error deleting from title tasks for title  ', listTitle);
            console.log(err);
            return { success: false, error: err };
        } else {
            let anyErr = false;
            db.run(deleteTasks, [projectID], (err) => {
                if (err) {
                    console.log('Error saving a new task', task.task);
                    console.log(err);
                    anyErr = true;
                }
            });
            return { success: !anyErr };
        }
    });
};

function getAll() {
    return new Promise((resolve, reject) => {
        const getAllQuery = `
                        SELECT tasks.id as id, title.id as projectID, title.name as title, task, completed, indent, taskOrder 
                        FROM "tasks"
                        INNER JOIN title ON title.id = tasks.title
                        ORDER BY taskOrder ASC
                        `;
        return db.all(getAllQuery, [], (err, rows) => {
            if (err) {
                console.log(err);
                return reject(err.message);
            } else {
                return resolve(rows);
            }
        });
    });
}

const getAllLists = async () => {
    const result = await getAll();
    const groupByTitle = result.reduce((acc, task) => {
        let { id, projectID } = task;
        return { ...acc, [projectID]: [...(acc[projectID] || []), task] };
    }, {});
    return groupByTitle;
};

module.exports = {
    editList,
    deleteList,
    getAllLists
};
