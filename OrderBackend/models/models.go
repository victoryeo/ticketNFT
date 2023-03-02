package models

import (
	"fmt"
	"log"
)

type Order struct {
	ID      uint   `json:"id" gorm:"primary_key"`
	Type    string `json:"type"`
	TokenID string `json:"tokenID"`
	Price   string `json:"price"`
}

type CreateOrderInput struct {
	Type    string `json:"type" binding:"required"`
	TokenID string `json:"tokenID" binding:"required"`
	Price   string `json:"price" binding:"required"`
}

// OrderBook type
type OrderBook struct {
	BuyOrders  []Order
	SellOrders []Order
}

const ORDERBOOK_LEN = 1000

var Book OrderBook

func InitOrder() {
	// create the order book
	Book = OrderBook{
		BuyOrders:  make([]Order, 0, ORDERBOOK_LEN),
		SellOrders: make([]Order, 0, ORDERBOOK_LEN),
	}
	log.Printf("%v\n", Book)
}

// Process an order and return the order matched(if any)
func Process(order Order) Order {
	var matchOrder Order
	if order.Type == "buy" {
		fmt.Print("process buy order\n")
		matchOrder = processLimitBuy(order)
	} else if order.Type == "sell" {
		fmt.Print("process sell order\n")
		matchOrder = processLimitSell(order)
	} else {
		fmt.Print("wrong order type\n")
	}
	return matchOrder
}

func processLimitBuy(order Order) Order {
	//TODO: add processing logic

	return order
}

func processLimitSell(order Order) Order {
	//TODO: add processing logic
	return order
}
