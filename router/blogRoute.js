const express = require("express");
const blogRoute = express.Router();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

// mongodb database connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.fgklesn.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const postCollection = client.db("BlogUI_Database").collection("User_Post");
    blogRoute
      .route("/")
      .get(async (req, res) => {
        const query = {};
        const cursor = await postCollection.find(query);
        const result = await cursor.toArray();
        res.send(result);
      })
      .put(async (req, res) => {
        const id = req.query.id;
        const query = { _id: ObjectId(id) };
        const options = { upsert: true };
        const updateDoc = {
          $set: req.body,
        };
        const result = await postCollection.updateOne(
          query,
          updateDoc,
          options
        );
        res.send(result);
      })
      .post(async (req, res) => {
        const post = req.body;
        const result = await postCollection.insertOne(post);
        res.send(result);
      });
    // parameter router by id
    blogRoute
      .route("/:id")
      .get(async (req, res) => {
        const id = req.params.id;
        const query = { _id: ObjectId(id) };
        const cursor = await postCollection.find(query);
        const result = await cursor.toArray();
        res.send(result);
      })

      .delete(async (req, res) => {
        const id = req.params.id;
        const query = { _id: ObjectId(id) };
        const result = await postCollection.deleteOne(query);
        res.send(result);
      });
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

module.exports = blogRoute;
