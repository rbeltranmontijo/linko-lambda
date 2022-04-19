const mongoose = require("mongoose");

const dbConnection = async () => {
  mongoose
    .connect(
      "mongodb+srv://robinmontijo:robin@cluster0.jsamh.mongodb.net/linko?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then((db) => console.log("DB is connected"))
    .catch((err) => console.log(err));
};

module.exports = {
  dbConnection,
};