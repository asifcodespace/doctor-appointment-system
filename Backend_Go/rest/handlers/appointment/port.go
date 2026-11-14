package appointment

import "doctors-app/domain"

type Service interface {
	Create(appointment domain.Appointment) (*domain.Appointment, error)
	List(search string, page, limit int64) ([]domain.Appointment, error)
	TotalCount() (int64, error)
	CountToday() (int, error)
}
