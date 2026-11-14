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

func (svc *service) List(search string, page, limit int64) ([]domain.Appointment, error) {
	return svc.appointmentRepo.List(search, page, limit)
}

func (svc *service) CountToday() (int, error) {
	return svc.appointmentRepo.CountToday()
}

func (svc *service) TotalCount() (int64, error) {
	return svc.appointmentRepo.TotalCount()
}
