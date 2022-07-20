require('dotenv').config({ path: './.env' });

const mongoose = require('mongoose');

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! Server Shutting down....');
  console.log(err.name, err.message);
  process.exit(1);
});

const app = require('./app');

const DB = process.env.DATABASE_URL.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB)
  .then(() => {
    console.log('MONGODB DATABASE CONNECTED SUCCESSFULLY.....');
  })
  .catch(err => {
    console.log('MONGODB DISCONNECTED', err);
  });

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log('Server running on port', port);
});

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! Shutting down server.....');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
