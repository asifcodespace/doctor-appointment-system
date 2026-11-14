package appointment

import (
	"doctors-app/util"
	"net/http"
	"strconv"
	"strings"
)

type listAppointmentsResponse struct {
	Appointments []appointmentView `json:"appointments"`
}

func (h *Handler) GetAppointments(w http.ResponseWriter, r *http.Request) {
	reqQuery := r.URL.Query()

	searchprmAsStr := reqQuery.Get("search")
	pageAsStr := reqQuery.Get("page")
	limitAsStr := reqQuery.Get("limit")

	page, _ := strconv.ParseInt(pageAsStr, 10, 64)
	limit, _ := strconv.ParseInt(limitAsStr, 10, 64)

	if page <= 0 {
		page = 1
	}

	if limit <= 0 {
		limit = 10
	}

	if limit > 100 {
		limit = 100
	}

	search := strings.TrimSpace(searchprmAsStr)

	items, err := h.svc.List(search, page, limit)
	if err != nil {
		util.SendError(w, http.StatusInternalServerError, "Internal Server Error")
		return
	}

	views := make([]appointmentView, 0, len(items))
	for _, item := range items {
		views = append(views, toAppointmentView(item))
	}

	totalCnt, err := h.svc.TotalCount()
	if err != nil {
		util.SendError(w, http.StatusInternalServerError, "Internal Server Error")
		return
	}

	responseList := listAppointmentsResponse{
		Appointments: views,
	}

	util.SendPage(w, responseList, page, limit, totalCnt)

}
