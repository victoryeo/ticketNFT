The ReactJS folder contains the web app.
Please see:
https://github.com/victoryeo/ticketNFT/blob/master/ReactJS/README.md

The SmartContract contains the smart contract.
Please see:
https://github.com/victoryeo/ticketNFT/blob/master/SmartContract/README.md

#### to build the ReactJS webapp docker image, 
#### cd to ReactJS folder, and run
docker build -f Dockerfile  -t server .
docker run -it -p 3000:3000 server

#### to run dockerised webapp, cd to root folder, and run
docker-compose up --build