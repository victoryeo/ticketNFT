### Rest API endpoint
##### POST("/order")
##### input
type 
tokenID
price
##### return
Order  
#### GET("/listOrder")
##### input
type
##### return
array of Order

### get dependencies of the program
go get -d ./...
### to run the application
go run main.go 

#### to generate go.mod and go.sum
go mod init github.com/victoryeo/ticketNFT  
go mod tidy