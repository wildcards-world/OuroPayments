[@decco.encode]
type mongoResult = {success: bool};

type collection;

[@bs.module "./Mongo.js"]
external connectMongo: (. unit) => Js.Promise.t(collection) = "MongoConnect";

[@decco.encode]
type recipientDbData = {
  recipient: string,
  addressTokenStream: string,
  lengthOfPayment: int,
  interval: int,
  // TODO: these values should be BigInt and use `@decco.codec` as the conversion function
  rate: string,
  deposit: string,
  numerOfPaymentsMade: int,
  totalNumberOfPaymentsToMake: int,
};

[@decco.encode]
type recipientDbArray = array(recipientDbData);

[@bs.module "./Mongo.js"]
external getStreamss: (. collection) => Js.Promise.t(array(recipientDbData)) =
  "getStreams";

[@bs.module "./Mongo.js"]
external deleteStreams: (. collection, string) => Js.Promise.t(mongoResult) =
  "deleteStream";

// [@bs.module "cors"] external setupCors: (. unit) => unit = "default";
[@bs.module "./Mongo.js"]
external testMongo:
  (. collection, string, recipientDbData) => Js.Promise.t(mongoResult) =
  "addStream";
