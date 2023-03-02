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
	n := len(Book.SellOrders)
	if n >= 1 {
		for i := n - 1; i >= 0; i-- {
			sellOrder := Book.SellOrders[i]
			if sellOrder.TokenID == order.TokenID {
				if sellOrder.Price <= order.Price {
					fmt.Println("order is matched")
					return sellOrder
				}
			}
		}
	}
	addBuyOrder(order)
	return order
}

func processLimitSell(order Order) Order {
	//TODO: add processing logic
	n := len(Book.BuyOrders)
	if n >= 1 {
		for i := n - 1; i >= 0; i-- {
			buyOrder := Book.BuyOrders[i]
			if buyOrder.TokenID == order.TokenID {
				if buyOrder.Price >= order.Price {
					fmt.Println("order is matched")
					return buyOrder
				}
			}
		}
	}
	addSellOrder(order)
	return order
}

func addBuyOrder(order Order) {
	Book.BuyOrders = append(Book.BuyOrders, order)
}

func addSellOrder(order Order) {
	Book.SellOrders = append(Book.SellOrders, order)
}
