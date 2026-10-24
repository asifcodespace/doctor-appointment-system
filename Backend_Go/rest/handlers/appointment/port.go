package appointment

import "doctors-app/domain"

type Service interface {
	Create(appointment domain.Appointment) (*domain.Appointment, error)
}
