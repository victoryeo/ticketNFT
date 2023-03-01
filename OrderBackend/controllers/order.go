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
	order := models.Order{TokenID: input.TokenID, Price: input.Price}
	c.JSON(http.StatusOK, gin.H{"data": order})
}
