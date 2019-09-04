require('dotenv').config();
const express = require('express');
const passport = require('passport');
const database = require('./database');
const session = require('express-session');
const authRoutes = require('./routes/auth.routes');
const MongoStore = require('connect-mongo')(session);

require('./passport');

const app = express();
database.connect();

app.set('port', process.env.PORT || 3000);

// Express-session middleware
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: database.mongoose.connection
    })
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.send('Ready');
});

app.use('/auth', authRoutes);

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
