package models

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
