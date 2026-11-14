package appointment

import (
	"doctors-app/domain"
	"strconv"
	"strings"
	"time"
)

var avatarColors = []string{
	"#6D5EF5",
	"#14B8A6",
	"#F472B6",
	"#F59E0B",
	"#38BDF8",
	"#A78BFA",
}

type patientView struct {
	Name     string `json:"name"`
	ID       string `json:"id"`
	Initials string `json:"initials"`
	AvatarBg string `json:"avatarBg"`
}

// appointmentView includes only fields stored on the booking.
// Doctor and status are not in the database, so they are left out
// and the Admin UI fills them with defaults.
type appointmentView struct {
	ID       string      `json:"id"`
	Patient  patientView `json:"patient"`
	DateTime string      `json:"dateTime,omitempty"`
	Type     string      `json:"type,omitempty"`
}

func toAppointmentView(item domain.Appointment) appointmentView {
	id := strconv.Itoa(item.ID)
	name := strings.TrimSpace(item.Name)

	return appointmentView{
		ID: id,
		Patient: patientView{
			Name:     name,
			ID:       "#APT-" + id,
			Initials: initials(name),
			AvatarBg: avatarColors[item.ID%len(avatarColors)],
		},
		DateTime: formatDateTime(item.CreatedAt),
		Type:     strings.TrimSpace(item.Reason),
	}
}

func initials(name string) string {
	parts := strings.Fields(name)
	if len(parts) == 0 {
		return "P"
	}
	if len(parts) == 1 {
		runes := []rune(parts[0])
		if len(runes) >= 2 {
			return strings.ToUpper(string(runes[:2]))
		}
		return strings.ToUpper(string(runes))
	}

	first := []rune(parts[0])
	second := []rune(parts[1])
	return strings.ToUpper(string(first[0]) + string(second[0]))
}

func formatDateTime(t time.Time) string {
	if t.IsZero() {
		return ""
	}

	// created_at is stored as timestamp without time zone in the clinic's local clock.
	now := time.Now()
	clock := t.Format("15:04")

	if sameDay(t, now) {
		return "Today · " + clock
	}
	if sameDay(t, now.AddDate(0, 0, 1)) {
		return "Tomorrow · " + clock
	}

	return t.Format("2 Jan · 15:04")
}

func sameDay(a, b time.Time) bool {
	ay, am, ad := a.Date()
	by, bm, bd := b.Date()
	return ay == by && am == bm && ad == bd
}
