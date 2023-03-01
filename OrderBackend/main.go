package main

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

func getRoot(context *gin.Context) {
	fmt.Print("getRoot")
	// Call the HTML method of the Context to render a template
	context.HTML(
		http.StatusOK,
		"index.html",
		// Pass the data that the page uses (in this case, 'title')
		gin.H{
			"title": "Home Page",
		},
	)
}

func main() {
	fmt.Print("Order Backend ", "started.\n")

	router := gin.Default()
	router.LoadHTMLGlob("templates/*")
	router.GET("/", getRoot)

	router.Run("localhost:9090")
}
