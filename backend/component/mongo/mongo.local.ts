import mongoose from "mongoose";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: true,
//   poolSize: 10, // Maintain up to 10 socket connections
//   bufferMaxEntries: 0,
  connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
};
const connect = async () => {
  try {
    // await mongoose.connect('mongodb:27017/hespo');
    mongoose.connect(`mongodb://localhost:27017/hespo`, options)
     
    mongoose.connection.on('open', () => console.log('Connected'));
    mongoose.connection.on('error', (err) => console.log('Connection failed with - ',err));
    // If the Node process ends, close the Mongoose connection
    process.on("SIGINT", () => {
      console.log("Mongoose disconnected due to app termination");
      process.exit(0);
    });
  } catch (err) {
    console.log(err);
    console.log("Mongoose disconnected due to app termination");
    return process.exit(0);
  }
};
export default connect;
