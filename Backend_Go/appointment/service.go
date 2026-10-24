package appointment

import "doctors-app/domain"

type service struct {
	appointmentRepo AppointmentRepo
}

func NewService(appointmentRepo AppointmentRepo) Service {
	return &service{
		appointmentRepo: appointmentRepo,
	}
}

func (svc *service) Create(appointment domain.Appointment) (*domain.Appointment, error) {
	return svc.appointmentRepo.Create(appointment)
}
