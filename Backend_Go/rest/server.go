package rest

import (
	"doctors-app/config"
	"doctors-app/rest/handlers/appointment"
	"doctors-app/rest/handlers/server_status"
	middleware "doctors-app/rest/middlewares"
	"fmt"
	"net/http"
	"os"
	"strconv"
)

type Server struct {
	cnf                *config.Config
	appointmentHandler *appointment.Handler
	serverstatusHndler *server_status.Handler
}

func NewServer(
	cnf *config.Config,
	appointmentHandler *appointment.Handler,
	serverstatusHndler *server_status.Handler,
) *Server {
	return &Server{
		cnf:                cnf,
		appointmentHandler: appointmentHandler,
		serverstatusHndler: serverstatusHndler,
	}
}

func (server *Server) Start() {
	manager := middleware.NewManager()
	manager.Use(
		middleware.Preflight,
		middleware.Cors,
		middleware.Logger,
	)

	mux := http.NewServeMux()
	wrappedMux := manager.WrapMux(mux)

	server.appointmentHandler.RegisterRoutes(mux, manager)
	server.serverstatusHndler.RegisterRoutes(mux, manager)

	addr := ":" + strconv.Itoa(server.cnf.HttpPort)
	fmt.Println("Server running on port", addr)
	err := http.ListenAndServe(addr, wrappedMux)
	if err != nil {
		fmt.Println("Error starting the server", err)
		os.Exit(1)
	}

}
