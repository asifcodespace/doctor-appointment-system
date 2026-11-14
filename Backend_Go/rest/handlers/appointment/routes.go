package appointment

import (
	middleware "doctors-app/rest/middlewares"
	"net/http"
)

func (h *Handler) RegisterRoutes(mux *http.ServeMux, manager *middleware.Manager) {
	mux.Handle(
		"POST /appointments",
		manager.With(
			http.HandlerFunc(h.CreateAppointment),
		),
	)
	mux.Handle(
		"GET /appointments",
		manager.With(
			http.HandlerFunc(h.GetAppointments),
		),
	)
	mux.Handle(
		"GET /appointments/stats",
		manager.With(
			http.HandlerFunc(h.GetAppointmentStats),
		),
	)
}
