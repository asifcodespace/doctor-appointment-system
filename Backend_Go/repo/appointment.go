package repo

import (
	"doctors-app/appointment"
	"doctors-app/domain"
	"strings"

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

func (r *appointmentRepo) List(search string, page, limit int64) ([]domain.Appointment, error) {
	offset := (page - 1) * limit

	query := `
		SELECT
			id,
			name,
			phone,
			reason,
			message,
			created_at
		FROM appointments
		WHERE (
			$1 = ''
			OR name ILIKE $2 ESCAPE '\'
			OR phone ILIKE $2 ESCAPE '\'
			OR COALESCE(reason, '') ILIKE $2 ESCAPE '\'
			OR COALESCE(message, '') ILIKE $2 ESCAPE '\'
		)
		ORDER BY created_at DESC, id DESC
		LIMIT $3 OFFSET $4
	`

	rows, err := r.db.Queryx(query, search, likePattern(search), limit, offset)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	appointments := make([]domain.Appointment, 0)
	for rows.Next() {
		var item domain.Appointment
		if err := rows.StructScan(&item); err != nil {
			return nil, err
		}
		appointments = append(appointments, item)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return appointments, nil
}

func (r *appointmentRepo) TotalCount() (int64, error) {
	query := `
		SELECT COUNT(*)
		FROM appointments
	`

	var count int64
	if err := r.db.Get(&count, query); err != nil {
		return 0, err
	}

	return count, nil
}

func (r *appointmentRepo) CountToday() (int, error) {
	query := `
		SELECT COUNT(*)
		FROM appointments
		WHERE created_at::date = CURRENT_DATE
	`

	var count int
	if err := r.db.Get(&count, query); err != nil {
		return 0, err
	}

	return count, nil
}

func likePattern(search string) string {
	replacer := strings.NewReplacer(`\`, `\\`, `%`, `\%`, `_`, `\_`)
	return "%" + replacer.Replace(search) + "%"
}
