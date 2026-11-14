package cmd

import (
	"doctors-app/appointment"
	"doctors-app/config"
	"doctors-app/infra/db"
	"doctors-app/repo"
	"doctors-app/rest"
	appointmentHandler "doctors-app/rest/handlers/appointment"
	srvrstatusHandler "doctors-app/rest/handlers/server_status"
	"fmt"
	"os"
)

func Serve() {
	cnf := config.GetConfig()

	dbCon, err := db.NewConnection(cnf.DB)
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}

	err = db.MigrateDB(dbCon, "./migrations")
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
	// repos
	appointmentRepo := repo.NewAppointmentRepo(dbCon)

	// domains
	appointmentSvc := appointment.NewService(appointmentRepo)

	//handlers
	apptHandler := appointmentHandler.NewHandler(appointmentSvc)
	serverstatusHndlr := srvrstatusHandler.NewHandler()

	server := rest.NewServer(
		cnf,
		apptHandler,
		serverstatusHndlr,
	)
	server.Start()

}
