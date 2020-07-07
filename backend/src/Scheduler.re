open BsCron;
open Globals;
open Async;
open Mongo;

[@decco.encode]
type makePaymentRequest = {
  amount: string,
  identifier: option(string),
};

let dummyData = [|
  {
    recipient: "0xc788F08a2aAf539111e2a2D85BD4B324FBE37B15",
    addressTokenStream: "0xb38981469B7235c42DDa836295bE8825Eb4A6389",
    lengthOfPayment: 86400, // seconds [86400 equals one day.] Must be a multiple of 60
    interval: 60, // this will always be 60 for our demo
    // TODO: these values should be BigInt and use `@decco.codec` as the conversion function
    rate: "1",
    deposit: "7200",
    numerOfPaymentsMade: 0,
    totalNumberOfPaymentsToMake: 1440,
  },
  // {
  //   recipient: "0xc788F08a2aAf539111e2a2D85BD4B324FBE37B15",
  //   addressTokenStream: "0xb38981469B7235c42DDa836295bE8825Eb4A6389",
  //   lengthOfPayment: 86400, // seconds [86400 equals one day.] Must be a multiple of 60
  //   interval: 60, // this will always be 60 for our demo
  //   // TODO: these values should be BigInt and use `@decco.codec` as the conversion function
  //   rate: "1",
  //   deposit: "14400",
  //   numerOfPaymentsMade: 0,
  //   totalNumberOfPaymentsToMake: 1440,
  // },
|];

let makePayment = (recipientAddress, amount) => {
  let requestString =
    "http://localhost:5001/api/v1/payments/0xb38981469B7235c42DDa836295bE8825Eb4A6389/"
    ++ recipientAddress;
  Js.log(amount);
  Fetch.fetchWithInit(
    requestString,
    Fetch.RequestInit.make(
      ~method_=Post,
      ~body=
        Fetch.BodyInit.make(
          {amount, identifier: None}
          ->makePaymentRequest_encode
          ->Js.Json.stringify,
        ),
      ~headers=Fetch.HeadersInit.make({"Content-Type": "application/json"}),
      (),
    ),
  )
  |> Js.Promise.then_(Fetch.Response.json)
  |> Js.Promise.then_(json => {
       Js.log2("THE RESULT:", json) |> Js.Promise.resolve
     });
};

let paymentHandler = (item: recipientDbData) =>
  if (item.numerOfPaymentsMade == item.totalNumberOfPaymentsToMake) {
    ();
  } else {
    let _ = makePayment(item.recipient, item.rate);
    // If it was a success, item.numerOfPaymentsMade ++;
    // Otherwise print out little shit error
    ();
  };

let startProcess = collection => {
  let job =
    CronJob.make(
      `CronString("* * * * *"), // every minute
      _ => {
        let _aysncronousScope = {
          Js.log("Printing every minute");
          let%Async streams = Mongo.getStreamss(. collection);
          // Grab mongoData instead of dummy data later...
          let _ = Array.map(streams, item => {item->paymentHandler});
          ()->async;
        };
        ();
      },
      (),
    );

  start(job);
} /* execute micropayment amount to recipientAddress [POST request with parameters*/;

// (1) Get list of payments to be made from mongoDB
// Query mongoDB for streams,
// if no data exists, simply pass/ return
// Otherwise a json response of the listOfRecipents will be returned
// Returned data to look something like this:
// {
//  "recipientAddres": 0x4AA554636eBAf8C2d42dE1b20DaB91441b8d2eCF
//   "totalAmount": 1000
//   "paymentLengthDays": 30
//   "endTimeStamp" : 1594044683
// }, ...
/*
 type recipientData = {
 recipient: string,
 addressTokenStream: string,
 lengthOfPayment: int,
 interval: int,
 // TODO: these values should be BigInt and use `@decco.codec` as the conversion function
 rate: string,
 deposit: string,
 timeLastPayed: int
 noOfPayments: 25
 totalNoOfPayments: 30 * 140
 };
 */
// NOTE: we either use endTimeStamp, which is calculated and put in MongoDb when request is made
// There are other ways for the stopping logic to work too. Since its a demo, I recommend we do it
// as simple as possible, and just loop through the entire mongoDB each time, and finished payments
// wont be executed. In future we can filter on thinga etc.
// (2) Loop through and execute payments...
// Logic: Loop through payments list
// If passed endTimeStamp: do nothing
// Else: calculate amount of micropayment. [totalamount/ (paymentLengthDays* minutesInDay)]
