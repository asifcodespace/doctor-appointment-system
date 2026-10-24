package domain

type Appointment struct {
	ID      int    `json:"id" db:"id"`
	Name    string `json:"name" db:"name"`
	Phone   string `json:"phone" db:"phone"`
	Reason  string `json:"reason" db:"reason"`
	Message string `json:"message" db:"message"`
}
