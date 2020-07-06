Create stream:
`curl -i -X POST http://localhost:5000/create-stream -H 'Content-Type: application/json' -d '{"recipient": "0x4AA554636eBAf8C2d42dE1b20DaB91441b8d2eCF", "addressTokenStream":"2456", "lengthOfPayment": 2345, "interval": 123, "rate": "1234", "deposit": "123"}'`

`curl -i -X POST http://localhost:5000/create-stream-test -H 'Content-Type: application/json' -d '{"recipient": "0x4AA554636eBAf8C2d42dE1b20DaB91441b8d2eCF", "addressTokenStream":"2456", "lengthOfPayment": 2345, "interval": 123, "rate": "1234", "deposit": "123"}'`

`curl -i -X PUT http://localhost:5001/api/v1/channels -H 'Content-Type: application/json' -d '{ "partner_address": "0x61C808D82A3Ac53231750daDc13c777b59310bD9", "token_address": "0xb38981469B7235c42DDa836295bE8825Eb4A6389", "total_deposit": "20", "settle_timeout": "500", "reveal_timeout": "50" }'`

`[%raw "require('isomorphic-fetch')"]; Fetch.fetchWithInit( "https://www.cryptovoxels.com/grid/parcels/2324", Fetch.RequestInit.make( ~method_=Put, ~body= Fetch.BodyInit.make( Js.Json.stringifyAny({ name: Js.Nullable.null, description: Js.Nullable.null, images: [||], sandbox: false, contributors: newOwner ->Js.Json.decodeString ->Option.mapWithDefault([||], addressStr => [|addressStr|] ), content: { scripting: false, }, }) ->Option.mapWithDefault("{}", a => a), ), ~headers= Fetch.HeadersInit.make({ "Accept": "application/json", "Cache-Control": "no-cache", "Content-Type": "application/json", "Pragma": "no-cache", "Cookie": cvAuthString, }), (), ), ) |> then_(Fetch.Response.json) |> then_(json => { let result = json->cvResponse_decode; result |> resolve; }) )`

curl -i -X POST \
http://localhost:5001/api/v1/payments/0xb38981469B7235c42DDa836295bE8825Eb4A6389/0x4AA554636eBAf8C2d42dE1b20DaB91441b8d2eCF \
-H 'Content-Type: application/json' \
--data-raw '{"amount":"1"}'

// Cron job....
Raiden command.

- recipient
- amount

Person comes on.
-amount = \$1000
-month = 30 days (over how long)
-interval = 1 minutes [ONLY]

1000 / 80 000 every minute

1440 minutes in a day.

1440 \* 30

mapping(recipent => cronjobInfo)
{amountOfMicroPayment, amountTotal, recipient, endTime, sendCronJob, interval}

1minCronJob = {
listOfRecipents =
P
}

1HourCronJob
