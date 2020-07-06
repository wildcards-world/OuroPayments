const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();

const mongoUri = process.env.MONGO_URI;
const MongoConnect = async () => {
  const client = new MongoClient(mongoUri, { useNewUrlParser: true });

  try {
    await client.connect();
    const streamsCollection = await client.db("ouro").collection("streams");
    return streamsCollection;
  } catch (e) {
    console.error(e);
    // } finally {
    // await client.close();
    return "THERE WAS AN ERROR";
  }
};

const addStreamOld = (
  recipientAddress,
  streamInterval,
  streamLength,
  token,
  amount
) => {
  const streamEntry = {
    date: Date.now(),
    recipientAddress,
    streamInterval,
    streamLength,
    token,
    amount,
  };

  // const entry = await streamsCollection.insertOne(streamEntry);
};

//  MongoConnect();
//  addStream("addresss", "intervals", "lengths", 'token', 100 );

const addStream = async (streamsCollection, recipientAddress, data) => {
  console.log({ streamsCollection, recipientAddress, data });

  const streamEntry = {
    ...data,
    recipientAddress,
    date: Date.now(),
  };

  const entry = await streamsCollection.insertOne(streamEntry);

  return { success: true, response: entry };
};

// const getStreams = async (streamsCollection) => {
//   console.log("streams");
//   // let streams = await streamsCollection.findOne({ addressTokenStream: "2456" });
//   let streams = await streamsCollection.find({});
//   console.log(streams);
//   console.log(typeof streams);
//   return streams;
// };

const getStreams = async (streamsCollection) => {
  var MongoClient = require("mongodb").MongoClient;
  var url = mongoUri;

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("ouro");
    var query = { addressTokenStream: "2456" };
    dbo
      .collection("streams")
      .find()
      .toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
        return result;
        db.close();
      });
  });
  // return streams;
};

module.exports = { MongoConnect, addStream, getStreams };
