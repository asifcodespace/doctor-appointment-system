package appointment

import (
	"doctors-app/domain"
	"doctors-app/util"
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
)

type ReqCreateAppointment struct {
	Name    string `json:"name"`
	Phone   string `json:"phone"`
	Reason  string `json:"reason"`
	Message string `json:"message"`
}

func (h *Handler) CreateAppointment(w http.ResponseWriter, r *http.Request) {
	var req ReqCreateAppointment
	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&req)
	if err != nil {
		fmt.Println(err)
		util.SendError(w, http.StatusBadRequest, "Invalid req body")
		return
	}

	req.Name = strings.TrimSpace(req.Name)
	req.Phone = strings.TrimSpace(req.Phone)
	req.Reason = strings.TrimSpace(req.Reason)
	req.Message = strings.TrimSpace(req.Message)

	if req.Name == "" || req.Phone == "" {
		util.SendError(w, http.StatusBadRequest, "Name and phone are required")
		return
	}

	createdAppointment, err := h.svc.Create(domain.Appointment{
		Name:    req.Name,
		Phone:   req.Phone,
		Reason:  req.Reason,
		Message: req.Message,
	})
	if err != nil {
		util.SendError(w, http.StatusInternalServerError, "Internal Server Error")
		return
	}

	util.SendData(w, http.StatusCreated, createdAppointment)
}
