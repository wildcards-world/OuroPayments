ETH_ADDRESS ?= 0x351359fd8D35555b24d6C013E7060ABdcD3b43ED
KEYSTORE_FILE ?= ./password.txt
INFURA_KEY ?= d72f8e8bf3d847f5bd8800bc961e392b
NETWORK ?= goerli

.PHONY:start
start:
	./raiden --address ${ETH_ADDRESS} --keystore-path ./keystore --password-file ${KEYSTORE_FILE} --eth-rpc-endpoint "https://${NETWORK}.infura.io/v3/${INFURA_KEY}" --network-id goerli --environment-type development --accept-disclaimer

# This will be different for mainnet. 