const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();

const MongoConnect = async () => {
  const mongoUri = process.env.MONGO_URI;
  console.log("mongoUri");
  console.log(mongoUri);

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

module.exports = { MongoConnect, addStream };
