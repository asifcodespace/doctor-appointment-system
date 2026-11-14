package server_status

import (
	"doctors-app/util"
	"net/http"
	"time"
)

type ServerStatusResponse struct {
	Connected       bool  `json:"connected"`
	LastSyncSeconds int   `json:"lastSyncSeconds"`
	Timestamp       int64 `json:"timestamp,omitempty"`
}

func (h *Handler) GetStatus(w http.ResponseWriter, r *http.Request) {
	util.SendData(w, http.StatusOK, ServerStatusResponse{
		Connected:       true,
		LastSyncSeconds: 0,
		Timestamp:       time.Now().Unix(),
	})
}
