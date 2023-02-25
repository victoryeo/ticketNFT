## compile
npx hardhat compile
## deploy to goerli testnet
npx hardhat deploy --network goerli

## mint NFT and currency token
copy .env.sample to .env
update contract address (both nft and currency contract) in .env, and run:  
npx hardhat run scripts/mintNft_web3.ts  
npx hardhat run scripts/mintCurrency_web3.ts  

## unit test
npx hardhat test

