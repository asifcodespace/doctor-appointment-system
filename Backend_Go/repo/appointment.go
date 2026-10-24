package repo

import (
	"doctors-app/appointment"
	"doctors-app/domain"

	"github.com/jmoiron/sqlx"
)

type AppointmentRepo interface {
	appointment.AppointmentRepo
}

type appointmentRepo struct {
	db *sqlx.DB
}

func NewAppointmentRepo(db *sqlx.DB) AppointmentRepo {
	return &appointmentRepo{
		db: db,
	}
}

func (r *appointmentRepo) Create(a domain.Appointment) (*domain.Appointment, error) {
	query := `
		INSERT INTO appointments (
			name,
			phone,
			reason,
			message
		) VALUES (
			$1,
			$2,
			$3,
			$4
		)
		RETURNING id
	`

	row := r.db.QueryRow(query, a.Name, a.Phone, a.Reason, a.Message)
	err := row.Scan(&a.ID)
	if err != nil {
		return nil, err
	}

	return &a, nil
}
