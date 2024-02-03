const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const contactsRouter = require('./routes/contactsRouter.js');
require('dotenv').config();

const mongoose = require('mongoose');

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log('Database connection successful');
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running. Use our API on port: ${process.env.PORT}`);
});
