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

```
./raiden --address 0x351359fd8D35555b24d6C013E7060ABdcD3b43ED --keystore-path ./ --password-file ./password.txt --eth-rpc-endpoint "https://goerli.infura.io/v3/d72f8e8bf3d847f5bd8800bc961e392b" --network-id goerli --environment-type development
```

Alternatively you can run `make start` to run the default configuration.

The available configuration/environment variables (with default values) for `make start`:

```
ETH_ADDRESS = 0x351359fd8D35555b24d6C013E7060ABdcD3b43ED
KEYSTORE_FILE = ./password.txt
INFURA_KEY = d72f8e8bf3d847f5bd8800bc961e392b
```

visit: http://localhost:5001
