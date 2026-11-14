package server_status

import (
	middleware "doctors-app/rest/middlewares"
	"net/http"
)

func (h *Handler) RegisterRoutes(mux *http.ServeMux, manager *middleware.Manager) {
	mux.Handle(
		"GET /server/status",
		manager.With(http.HandlerFunc(h.GetStatus)),
	)
}
