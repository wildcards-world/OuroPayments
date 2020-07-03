# Installing Raiden

- Install [Raiden](https://docs.raiden.network/installation/starting-raiden-manually)

  - Pro tip don't use quickstart, that takes you to the Raiden Wizard which is only for mainnet

- `sudo spctl --master-disable` - on mac to temp enable running
- `sudo spctl --master-enable` - required to re-enable

To create a keystore.json file use myetherwallet.com

https://github.com/raiden-network/awesome-raiden <- A few resources

```
sudo ./raiden --address 0xe028334D9b4168cF7411Db8862d1A50d146Ae603 --keystore-path ./ --password-file ./password.txt --eth-rpc-endpoint "https://goerli.infura.io/v3/d72f8e8bf3d847f5bd8800bc961e392b" --network-id goerli --environment-type development
`
```

visit: http://localhost:5001
