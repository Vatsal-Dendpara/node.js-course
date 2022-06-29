const { ObjectID } = require("bson");
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const connectionURL = "mongodb://127.0.0.1:27017";
const database = "task-manager";

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log("Unable to connect to database");
    }

    const db = client.db("task-manager");
    // db.collection("users").insertOne({
    //   name: "vatsal",
    //   age: 21,
    // });

    // db.collection("users").insertMany(
    //   [
    //     {
    //       name: "John",
    //       age: 30,
    //     },
    //     {
    //       name: "Bob",
    //       age: 28,
    //     },
    //   ],
    //   (error, result) => {
    //     if (error) {
    //       return console.log("Unable to insert");
    //     }

    //     console.log(result.insertedIds);
    //   }
    // );

    // db.collection("tasks").insertMany(
    //   [
    //     {
    //       description: "Attend Meeting",
    //       completed: false,
    //     },
    //     {
    //       description: "Excercise",
    //       completed: true,
    //     },
    //     {
    //       description: "Lunch",
    //       completed: false,
    //     },
    //   ],
    //   (error, result) => {
    //     if (error) {
    //       return console.log("unable to insert");
    //     }

    //     console.log(result.insertedIds);
    //   }
    // );

    // db.collection("tasks").findOne(
    //   {
    //     _id: new ObjectID("62bac0a553b08237986d56c8"),
    //   },
    //   (error, user) => {
    //     if (error) {
    //       return console.log("Unable to find user");
    //     }

    //     console.log(user);
    //   }
    // );

    // db.collection("tasks")
    //   .find({ completed: false })
    //   .toArray((error, users) => {
    //     if (error) {
    //       return console.log("Unable to find users");
    //     }
    //     console.log(users);
    //   });

    // db.collection("tasks")
    //   .updateMany(
    //     {
    //       completed: false,
    //     },
    //     {
    //       $set: {
    //         completed: true,
    //       },
    //     }
    //   )
    //   .then((result) => {
    //     console.log(result);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    db.collection("tasks")
      .deleteOne({
        description: "Lunch",
      })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }
);
