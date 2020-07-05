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

        {success: true, error: None}->async;
      },
    });
};

let app = Serbet.application(~port=5000, [CreateStream.endpoint]);
