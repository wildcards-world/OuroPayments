ETH_ADDRESS ?= 0x351359fd8D35555b24d6C013E7060ABdcD3b43ED
KEYSTORE_FILE ?= ./password.txt
INFURA_KEY ?= d72f8e8bf3d847f5bd8800bc961e392b
NETWORK ?= goerli
ENDPOINT ?= localhost:5001

.PHONY:start
start:
	./raiden --address ${ETH_ADDRESS} --keystore-path ./keystore --password-file ${KEYSTORE_FILE} --eth-rpc-endpoint "https://${NETWORK}.infura.io/v3/${INFURA_KEY}" --network-id goerli --environment-type development --api-address ${ENDPOINT} --pathfinding-service-address "https://pfs-goerli.services-dev.raiden.network" --accept-disclaimer
	
	# sudo ./raiden --address "0xe028334D9b4168cF7411Db8862d1A50d146Ae603" --keystore-path ./ --password-file ./password.txt --eth-rpc-endpoint "https://goerli.infura.io/v3/d72f8e8bf3d847f5bd8800bc961e392b" --network-id goerli --environment-type development --api-address http://localhost:5001 --pathfinding-service-address "https://pfs-goerli.services-dev.raiden.network" --accept-disclaimer

# This will be different for mainnet. 
