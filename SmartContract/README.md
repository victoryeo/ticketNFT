## compile
npx hardhat compile
## deploy to goerli testnet
npx hardhat deploy --network goerli

## mint NFT and currency token
copy .env.sample to .env
update contract address (both nft and currency contract) in .env, and run:  
npx hardhat run scripts/mintNft_web3.ts  
npx hardhat run scripts/mintCurrency_web3.ts  

## approve NFT for sale (required by ERC721) because there is the checking of _isApprovedOrOwner in safeTransferFrom method
npx hardhat run scripts/approveNft_web3.ts

## unit test
npx hardhat test

