let DBservices = require('../services/db-services');

const createList = async (req, res) => {  
    const data = req.body;
    if (!data.title) {
        console.log('TITLE is required to create a to do list');
        return res.status(400).send({message: 'Title is REQUIRED to create a list'});
    }
    const result = DBservices.createList(data);
};
module.exports = {
    createList,
}