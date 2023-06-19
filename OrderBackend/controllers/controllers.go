package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/victoryeo/ticketNFT/models"
)

// POST /orders
func CreateOrder(c *gin.Context) {
	var input models.CreateOrderInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	order := models.Order{Type: input.Type,
		TokenID: input.TokenID, Price: input.Price}

	// TODO: order matching
	matchOrder := models.Process(order)
	c.JSON(http.StatusOK, gin.H{"data": matchOrder})
}

// GET /orders
func ListOrder(c *gin.Context) {
	var input models.ListOrderInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	matchOrder := models.ListOrder(input)

	c.JSON(http.StatusOK, gin.H{"data": matchOrder})
}
