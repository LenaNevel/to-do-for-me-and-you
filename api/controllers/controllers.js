let DBservices = require('../services/db-services');

const editList = async (req, res) => {  
    const data = req.body.payload;
    // move list title getting to utils since we do the same thing in db-services;
    const listTitle = (data.find((x) => x && x.title) || {}).title;
    if (!listTitle) {
        console.log('TITLE is required to create a to do list');
        return res.status(400).send({message: 'Title is REQUIRED to create a list'});
    }
    const result = DBservices.editList(data);
};

const deleteList = async (req, res) => {  
    const data = req.body.payload;
    // move list title getting to utils since we do the same thing in db-services;
    const projectID = data.projectID;
    if (!projectID) {
        console.log('projectID is required to delete a to do list');
        return res.status(400).send({message: 'projectID is REQUIRED to delete a list'});
    }
    const result = DBservices.deleteList(data);
};

const getAllLists = async (req, res) => {
    const result = await DBservices.getAllLists();
    res.send(result);
}

const updateTask = async (req, res) => {
    DBservices.updateTask(req.body);
}

module.exports = {
    editList,
    deleteList,
    getAllLists,
    updateTask
}