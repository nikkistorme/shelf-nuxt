// import { MongoClient, ServerApiVersion } from "mongodb";
// const uri =
//   "mongodb+srv://nikkistorme:drv.wae0xkh.QVG8pbn@shelf-1.oiymp.mongodb.net/Shelf?retryWrites=true&w=majority";
// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   serverApi: ServerApiVersion.v1,
// });
// client.connect((err) => {
//   const collection = client.db("shelf").collection("books");
//   console.log("🚀 ~ collection", collection);
//   // perform actions on the collection object
//   client.close();
// });
import mongoose from "mongoose";
mongoose.connect(
  "mongodb+srv://nikkistorme:drv.wae0xkh.QVG8pbn@shelf-1.oiymp.mongodb.net/Shelf?retryWrites=true&w=majority"
);
const db = mongoose.connection;
db.on("error", (err) => console.log("connection error", err));
db.once("open", () => {
  console.log("👍 db connection successful");
});

export default defineEventHandler((event) => {
  return {
    api: "works",
  };
});
