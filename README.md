This is a project on using NFT to represent tickets.

The ReactJS folder contains the web app.
Please see:
https://github.com/victoryeo/ticketNFT/blob/master/ReactJS/README.md

The SmartContract contains the smart contract.
Please see:
https://github.com/victoryeo/ticketNFT/blob/master/SmartContract/README.md

#### to build the ReactJS webapp docker image, cd to ReactJS folder, and run
docker login
docker build -f Dockerfile  -t <docker_username>/server:latest .  
docker push <docker_username>/server:latest  

#### for order backend, cd to OrderBackend folder
docker build -f Dockerfile  -t <docker_username>/order_backend:latest .  
docker push <docker_username>/order_backend:latest  

#### to run dockerised webapp, cd to root folder, and run
docker-compose up  