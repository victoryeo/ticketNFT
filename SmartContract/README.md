## compile
npx hardhat compile
## deploy
npx hardhat deploy

## mint NFT and currency token
copy .env.sample to .env
update contract address in .env, and run:  
npx hardhat run scripts/mintNft_web3.ts  
npx hardhat run scripts/mintCurrency_web3.ts  

## unit test
npx hardhat test

