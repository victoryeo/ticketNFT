package main

import (
	"fmt"
	"log"
	"net/http"
	"sync/atomic"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/victoryeo/ticketNFT/controllers"
	"github.com/victoryeo/ticketNFT/models"
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

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}

// 0 1 1 2 3 5 8
func fibonacci(n uint) uint {
	var result uint

	if n > 1 {
		result = fibonacci(n-1) + fibonacci(n-2)
	} else {
		result = 1
	}

	return result
}

type ServerConn struct {
	ID  string
	age uint
}

func main() {
	fmt.Print("Order Backend ", "started.\n")
	models.InitOrder()

	// golang uint variable cannot go to negative value
	var ans uint = 0
	var topNum uint = 5
	for i := topNum; i >= 1; i-- {
		ans += i
	}
	fmt.Print("ans ", ans, "\n")

	// golang array
	buildTags := []string{"cli_no_docs", "cli_docs"}
	buildTags = append(buildTags, "osusergo", "netgo")
	if len(buildTags) > 0 {
		log.Printf("buildTags > 0")
		log.Printf("%v", buildTags)
	}

	// golang atomic pointer
	p := atomic.Pointer[ServerConn]{}
	s := ServerConn{ID: "first_conn", age: 5}
	p.Store(&s)
	log.Printf("%v", p)
	fmt.Println(p.Load())

	// fibanacci
	fmt.Println("fibanocci", fibonacci(4))

	router := gin.Default()
	router.LoadHTMLGlob("templates/*")
	router.GET("/", getRoot)
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"POST", "GET"},
		AllowHeaders:     []string{"*"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))
	router.POST("/order", controllers.CreateOrder)

	router.Run("0.0.0.0:9090")
}
