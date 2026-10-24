package appointment

import (
	"doctors-app/domain"
	appointmentHandler "doctors-app/rest/handlers/appointment"
)

type Service interface {
	appointmentHandler.Service
}

type AppointmentRepo interface {
	Create(appointment domain.Appointment) (*domain.Appointment, error)
}
