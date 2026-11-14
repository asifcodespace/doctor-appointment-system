package appointment

import (
	"doctors-app/util"
	"net/http"
)

// statsResponse only includes counts the appointments table can support.
// Doctor count and status buckets are not stored, so the Admin UI defaults them.
type statsResponse struct {
	TotalToday int `json:"totalToday"`
}

func (h *Handler) GetAppointmentStats(w http.ResponseWriter, r *http.Request) {
	totalToday, err := h.svc.CountToday()
	if err != nil {
		util.SendError(w, http.StatusInternalServerError, "Internal Server Error")
		return
	}

	util.SendData(w, http.StatusOK, statsResponse{TotalToday: totalToday})
}
