### Rest API endpoint
#### POST("/order")
##### Description: send buy/sell order to the backend
##### input
type 
tokenID
price
##### return
Order  
#### GET("/listOrder")
##### Description: get buy/sell order from the backend
##### input
type
##### return
array of Order

### Golang specific
#### to get dependencies of the program
go get -d ./...
#### to run the application
go run main.go 
#### to generate go.mod and go.sum
go mod init github.com/victoryeo/ticketNFT  
go mod tidy
#### to build the executable binary
go build