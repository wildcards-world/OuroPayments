[%raw "require('isomorphic-fetch')"];

open Serbet.Endpoint;
open Async;
// [@decco]
// type ethAddress = [@decco.codec (Obj.magic, Obj.magic)] string;

module CreateStream = {
  [@decco.decode]
  type body_in = {
    recipient: string,
    addressTokenStream: string,
    lengthOfPayment: int,
    interval: int,
    // TODO: these values should be BigInt and use `@decco.codec` as the conversion function
    rate: string,
    deposit: string,
  };
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

  let endpoint =
    Serbet.jsonEndpoint({
      verb: POST,
      path: "/create-stream",
      body_in_decode,
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
        Fetch.fetchWithInit(
          "http://localhost:5001/api/v1/channels",
          Fetch.RequestInit.make(
            ~method_=Put,
            ~body=
              Fetch.BodyInit.make(
                {
                  partner_address: recipient,
                  token_address: "0xb38981469B7235c42DDa836295bE8825Eb4A6389", // "0x4AA554636eBAf8C2d42dE1b20DaB91441b8d2eCF"
                  total_deposit: "2",
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
};

let app = Serbet.application(~port=5000, [CreateStream.endpoint]);
