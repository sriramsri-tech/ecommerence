const mongoose = require("mongoose");

const connectionDatabase = () => {
  mongoose
    .connect(process.env.DB_LOCAL_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((con) => {
      console.log(`MongoDB connected to host: ${con.connection.host}`);
    })
     
};

module.exports = connectionDatabase;
