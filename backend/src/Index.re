[%raw "require('isomorphic-fetch')"];

open Serbet.Endpoint;
open Async;
// [@decco]
// type ethAddress = [@decco.codec (Obj.magic, Obj.magic)] string;

[@decco.decode]
type recipientData = {
  recipient: string,
  addressTokenStream: string,
  lengthOfPayment: int,
  interval: int,
  // TODO: these values should be BigInt and use `@decco.codec` as the conversion function
  rate: string,
  deposit: string,
};

module Endpoints = {
  [@decco.encode]
  type body_out = {
    success: bool,
    error: option(string),
  };

  [@decco.encode]
  type createChannelRequest = {
    partner_address: string,
    token_address: string,
    total_deposit: string,
    settle_timeout: string,
    reveal_timeout: string,
  };

  [@bs.module] external cors: (. unit) => Express.Middleware.t = "cors";

  let createStream = collection =>
    Serbet.jsonEndpoint({
      verb: POST,
      path: "/create-stream",
      body_in_decode: recipientData_decode,
      body_out_encode,
      handler:
        (
          {
            recipient,
            addressTokenStream,
            lengthOfPayment,
            interval,
            rate,
            deposit,
          },
          _req,
        ) => {
        Js.log(
          "recipient - "
          ++ recipient
          ++ ", addressTokenStream - "
          ++ addressTokenStream
          ++ ", lengthOfPayment - "
          ++ lengthOfPayment->string_of_int
          ++ ", interval - "
          ++ interval->string_of_int
          ++ ", rate"
          ++ rate
          ++ ", deposit - "
          ++ deposit,
        );

        let%Async resultMongoDb =
          Mongo.testMongo(.
            collection,
            recipient,
            {
              recipient,
              addressTokenStream,
              lengthOfPayment,
              interval,
              rate,
              deposit,
              numerOfPaymentsMade: 0,
              totalNumberOfPaymentsToMake: 100,
            },
          );
        Js.log2("result from mongodb:", resultMongoDb);

        Fetch.fetchWithInit(
          "http://localhost:5001/api/v1/channels",
          Fetch.RequestInit.make(
            ~method_=Put,
            ~body=
              Fetch.BodyInit.make(
                {
                  partner_address: recipient,
                  token_address: "0xb38981469B7235c42DDa836295bE8825Eb4A6389", // "0x4AA554636eBAf8C2d42dE1b20DaB91441b8d2eCF"
                  // token_address: addressTokenStream,
                  total_deposit: "20",
                  settle_timeout: "500",
                  reveal_timeout: "50",
                }
                ->createChannelRequest_encode
                ->Js.Json.stringify,
              ),
            ~headers=
              Fetch.HeadersInit.make({"Content-Type": "application/json"}),
            (),
          ),
        )
        |> Js.Promise.then_(Fetch.Response.json)
        |> Js.Promise.then_(json => {
             Js.log2("THE RESULT", json);
             {success: true, error: None} |> Js.Promise.resolve;
           });
      },
    });

  let createStreamTest = collection =>
    Serbet.jsonEndpoint({
      verb: POST,
      path: "/create-stream-test",
      body_in_decode: recipientData_decode,
      body_out_encode: Mongo.mongoResult_encode,
      handler:
        (
          {
            recipient,
            addressTokenStream,
            lengthOfPayment,
            interval,
            rate,
            deposit,
          },
          _req,
        ) => {
        Js.log(
          "recipient - "
          ++ recipient
          ++ ", addressTokenStream - "
          ++ addressTokenStream
          ++ ", lengthOfPayment - "
          ++ lengthOfPayment->string_of_int
          ++ ", interval - "
          ++ interval->string_of_int
          ++ ", rate"
          ++ rate
          ++ ", deposit - "
          ++ deposit,
        );

        let%Async result =
          Mongo.testMongo(.
            collection,
            recipient,
            {
              recipient,
              addressTokenStream,
              lengthOfPayment,
              interval,
              rate,
              deposit,
              numerOfPaymentsMade: 0,
              totalNumberOfPaymentsToMake: 100,
            },
          );
        result->async;
      },
    });
  let getStreamsEndpoint = collection =>
    Serbet.endpoint({
      verb: GET,
      path: "/get-streams",
      handler: _req => {
        let%Async result = Mongo.getStreamss(. collection);

        // Js.log("result");
        // Js.log(result);

        OkJson(result->Obj.magic)->async;
        // OkJson(result->recipientDbArray_encode)->async;
      },
    });

  [@decco.decode]
  type body_in_del = {id: string};

  let deleteStreamsEndpoint = collection =>
    Serbet.jsonEndpoint({
      verb: POST,
      path: "/delete-stream",
      body_in_decode: body_in_del_decode,
      body_out_encode: Mongo.mongoResult_encode,
      handler: ({id}, _req) => {
        Js.log(id);
        Mongo.deleteStreams(. collection, id);
      },
    });
};

Mongo.connectMongo(.)
|> Js.Promise.then_(mongoConnection => {
     Js.log("connected");
     let app =
       CustomSerbet.application(
         ~port=5000,
         [
           Endpoints.createStream(mongoConnection),
           Endpoints.createStreamTest(mongoConnection),
           Endpoints.getStreamsEndpoint(mongoConnection),
           Endpoints.deleteStreamsEndpoint(mongoConnection),
         ],
       );

     //  Scheduler.startProcess(mongoConnection);
     ()->async;
   });
