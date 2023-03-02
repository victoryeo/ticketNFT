package main

import (
	"fmt"
	"net/http"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/victoryeo/ticketNFT/controllers"
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
	router.POST("/order", controllers.CreateOrder)

	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"https://0.0.0.0"},
		AllowMethods:     []string{"POST"},
		AllowHeaders:     []string{"Origin"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	router.Run("0.0.0.0:9090")
}
