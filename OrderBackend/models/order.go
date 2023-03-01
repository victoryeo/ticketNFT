package models

type Order struct {
	ID      uint   `json:"id" gorm:"primary_key"`
	TokenID string `json:"tokenID"`
	Price   string `json:"price"`
}

type CreateOrderInput struct {
	TokenID string `json:"tokenID" binding:"required"`
	Price   string `json:"price" binding:"required"`
}
