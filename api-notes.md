# Notes about raide api

### [Primary source](https://docs.raiden.network/raiden-api-1/resources)

**NOTE: This is not a complete list of all api endpoints. Just those that we may use now or in the near future.**

Fetch address:
GET /api/v1/address

Create a channel:
PUT /api/v1/channels

Close a channel/Increase Deposit (update timeout)
PATCH /api/v1/channels/0xEA67...8ec8/0x61C8...0bD9

Increase Deposit:
POST /api/v1/channels/0xEA67...8ec8/0x61C8...0bD9

Initiate payment:
POST /api/v1/payments/0x2a65...8226/0x61C8...0bD9

Details of All Joined Token Networks:
GET http://localhost:5001/api/v1/connections

put
Join a Token Network
http://localhost:5001/api/v1/connections/0x2a65...8226

## May be useful:

Info about an existing channel:
GET /api/v1/channels/0xEA67...8ec8/0x61C8...0bD9

Payment history:
GET /api/v1/payments/0x0f11...b1ED/0x8264...5ba7

## To use in future versions:

Register a token
PUT /api/v1/tokens/0xEA67...8ec8

delete
Leave a Token Network
http://localhost:5001/api/v1/connections/0x2a65...8226
