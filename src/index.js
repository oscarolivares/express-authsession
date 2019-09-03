require('dotenv').config();
const express = require('express');

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.send('Ready');
});

// Status 404 handler
app.use((req, res, next) => {
  res.status(404).send("Sorry, can't find that!");
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Listener
app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});
