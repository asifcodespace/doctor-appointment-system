import type { ServerStatus } from '#lib/api';

export interface StatCardData {
	label: string;
	value: string | number;
	changeText: string;
	color: string;
	polylinePoints: string;
}

export interface WeeklyBar {
	day: string;
	count: number;
	isHighlight?: boolean;
}

export interface StatusSegment {
	label: 'Confirmed' | 'Pending' | 'Cancelled';
	count: number;
	color: string;
}

export interface UpcomingAppointmentItem {
	time: string;
	patientName: string;
	doctorName: string;
	status: 'Confirmed' | 'Pending' | 'Checked in' | 'Cancelled';
	statusColor: string;
}

export interface DoctorOnDuty {
	name: string;
	specialty: string;
	bookedPercentage: number;
	barColor: string;
}

export interface DashboardData {
	greeting: {
		dateStr: string;
		headline: string;
		subline: string;
	};
	metrics: StatCardData[];
	weeklyAppointments: WeeklyBar[];
	statusSummary: {
		totalToday: number;
		segments: StatusSegment[];
	};
	upcomingAppointments: UpcomingAppointmentItem[];
	doctorsOnDuty: DoctorOnDuty[];
	serverStatus: ServerStatus;
}

