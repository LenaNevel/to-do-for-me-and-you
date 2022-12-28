const express = require('express');
const cors = require('cors')

const router = require('./routes/routes.js');

const app = express();


app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['POST', 'GET']
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use('/api', router);

app.get('[' * ']', (req, res) => {
  res.send('Welcome to the To Do For Me and You!');
});


app.listen(4000, () =>
  console.log(`ToDoList server app listening on port 4000!`),
);

