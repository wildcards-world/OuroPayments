# Installing Raiden

- Install [Raiden](https://docs.raiden.network/installation/starting-raiden-manually)

  - Pro tip don't use quickstart, that takes you to the Raiden Wizard which is only for mainnet

## For mac only:

- `sudo spctl --master-disable` - on mac to temp enable running
- `sudo spctl --master-enable` - required to re-enable

To create a keystore.json file use myetherwallet.com

https://github.com/raiden-network/awesome-raiden <- A few resources

- Get address from keystore file (you can use the keystore provided in the repo
- make binary executable `chmod +x raiden`

**_On mac you may need to run this as 'sudo'._**

Or you will first need to give the requisite permissions to not run it using sudo.

```
sudo chmod 777 /Users/johanthan/Library/Logs/Raiden
sudo chmod 777 /Users/johanthan/.raiden
```

These were mine. Yours will show when running it without sudo.

```
./raiden --address 0x351359fd8D35555b24d6C013E7060ABdcD3b43ED --keystore-path ./ --password-file ./password.txt --eth-rpc-endpoint "https://goerli.infura.io/v3/c401b8ee3a324619a453f2b5b2122d7a" --network-id goerli --environment-type development
```

Alternatively you can run `make start` to run the default configuration.

The available configuration/environment variables (with default values) for `make start`:

```
ETH_ADDRESS = 0x351359fd8D35555b24d6C013E7060ABdcD3b43ED
KEYSTORE_FILE = ./password.txt
INFURA_KEY = d72f8e8bf3d847f5bd8800bc961e392b
```

visit: http://localhost:5001

for backend run

```
yarn re:watch
yarn watch
```

Also obviously have the raiden node running.
Then you can make api requests with the backend nicely :D
