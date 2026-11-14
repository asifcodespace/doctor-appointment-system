import type {
	DashboardData,
	DoctorOnDuty,
	StatCardData,
	StatusSegment,
	UpcomingAppointmentItem,
	WeeklyBar,
} from './dashboard';

export const INITIAL_METRICS: StatCardData[] = [
	{
		label: 'Appointments today',
		value: 24,
		changeText: '+4 vs last Monday',
		color: '#2DD4BF',
		polylinePoints: '0,26 16,20 32,24 48,12 64,16 80,6 96,9',
	},
	{
		label: 'New patients',
		value: 7,
		changeText: '+2 this week',
		color: '#E6C27A',
		polylinePoints: '0,22 16,24 32,16 48,20 64,10 80,14 96,5',
	},
	{
		label: 'Awaiting approval',
		value: 6,
		changeText: 'Needs your attention',
		color: '#FBBF24',
		polylinePoints: '0,8 16,12 32,6 48,18 64,14 80,24 96,20',
	},
	{
		label: 'Cancellation rate',
		value: '12%',
		changeText: 'Down from 17%',
		color: '#7DD3FC',
		polylinePoints: '0,6 16,10 32,8 48,16 64,20 80,22 96,28',
	},
];

export const INITIAL_WEEKLY: WeeklyBar[] = [
	{ day: 'Mon', count: 24, isHighlight: true },
	{ day: 'Tue', count: 18 },
	{ day: 'Wed', count: 22 },
	{ day: 'Thu', count: 28 },
	{ day: 'Fri', count: 20 },
	{ day: 'Sat', count: 12 },
	{ day: 'Sun', count: 6 },
];

export const INITIAL_STATUS_SEGMENTS: StatusSegment[] = [
	{ label: 'Confirmed', count: 15, color: '#34D399' },
	{ label: 'Pending', count: 6, color: '#FBBF24' },
	{ label: 'Cancelled', count: 3, color: '#FCA5A5' },
];

export const INITIAL_UPCOMING: UpcomingAppointmentItem[] = [
	{
		time: '09:30',
		patientName: 'Amina Rahman',
		doctorName: 'Dr. Karim Hasan',
		status: 'Confirmed',
		statusColor: '#34D399',
	},
	{
		time: '10:15',
		patientName: 'Tanvir Islam',
		doctorName: 'Dr. Nusrat Jahan',
		status: 'Pending',
		statusColor: '#FBBF24',
	},
	{
		time: '11:00',
		patientName: 'Sadia Akter',
		doctorName: 'Dr. Karim Hasan',
		status: 'Confirmed',
		statusColor: '#34D399',
	},
	{
		time: '12:45',
		patientName: 'Mahin Hossain',
		doctorName: 'Dr. Farhana Sultana',
		status: 'Checked in',
		statusColor: '#7DD3FC',
	},
];

export const INITIAL_DOCTORS: DoctorOnDuty[] = [
	{
		name: 'Dr. Karim Hasan',
		specialty: 'Cardiology',
		bookedPercentage: 80,
		barColor: '#2DD4BF',
	},
	{
		name: 'Dr. Nusrat Jahan',
		specialty: 'General',
		bookedPercentage: 62,
		barColor: '#E6C27A',
	},
	{
		name: 'Dr. Farhana Sultana',
		specialty: 'Dermatology',
		bookedPercentage: 45,
		barColor: '#7DD3FC',
	},
	{
		name: 'Dr. Imran Chowdhury',
		specialty: 'Pediatrics',
		bookedPercentage: 30,
		barColor: '#A78BFA',
	},
];

export const INITIAL_DASHBOARD_DATA: DashboardData = {
	greeting: {
		dateStr: 'MONDAY, 9 NOVEMBER',
		headline: 'Good morning, Admin',
		subline: '24 appointments today, 6 waiting for your approval.',
	},
	metrics: INITIAL_METRICS,
	weeklyAppointments: INITIAL_WEEKLY,
	statusSummary: {
		totalToday: 24,
		segments: INITIAL_STATUS_SEGMENTS,
	},
	upcomingAppointments: INITIAL_UPCOMING,
	doctorsOnDuty: INITIAL_DOCTORS,
	serverStatus: {
		connected: false,
		lastSyncSeconds: 0,
	},
};

