import type { PatientRecord, PatientStats } from './patient';

export const INITIAL_PATIENT_STATS: PatientStats = {
	totalPatients: 1284,
	newThisMonth: 46,
	newSinceDateText: 'Since 1 November',
	followUpsDue: 18,
	inactiveCount: 93
};

export const INITIAL_PATIENTS: PatientRecord[] = [
	{
		id: 'PT-3100',
		name: 'Amina Rahman',
		initials: 'AR',
		avatarBg: '#6D5EF5',
		age: 34,
		gender: 'Female',
		bloodGroup: 'B+',
		totalVisits: 12,
		lastVisit: '02 Nov',
		nextAppointmentText: '19 Nov · 14:00',
		status: 'Active',
		patientSince: '2022',
		nextAppointmentDetails: {
			date: 'Thu 19 Nov',
			time: '14:00',
			doctor: 'Dr. Nusrat Jahan',
			department: 'General checkup'
		},
		notes: 'Seasonal allergies. Prefers morning slots. Follow-up blood pressure check due.'
	},
	{
		id: 'PT-3101',
		name: 'Tanvir Islam',
		initials: 'TI',
		avatarBg: '#14B8A6',
		age: 41,
		gender: 'Male',
		bloodGroup: 'O+',
		totalVisits: 6,
		lastVisit: '28 Oct',
		nextAppointmentText: 'Not booked',
		status: 'Follow-up',
		patientSince: '2023',
		nextAppointmentDetails: undefined,
		notes: 'Requires follow-up review for asthma inhaler dosage. Advised to book morning slot.'
	},
	{
		id: 'PT-3102',
		name: 'Sadia Akter',
		initials: 'SA',
		avatarBg: '#F472B6',
		age: 29,
		gender: 'Female',
		bloodGroup: 'A+',
		totalVisits: 8,
		lastVisit: '30 Oct',
		nextAppointmentText: '14 Nov · 11:00',
		status: 'Active',
		patientSince: '2021',
		nextAppointmentDetails: {
			date: 'Fri 14 Nov',
			time: '11:00',
			doctor: 'Dr. Nusrat Jahan',
			department: 'Dermatology consultation'
		},
		notes: 'Mild eczema treatment ongoing. Follow-up evaluation scheduled.'
	},
	{
		id: 'PT-3103',
		name: 'Mahin Hossain',
		initials: 'MH',
		avatarBg: '#F59E0B',
		age: 52,
		gender: 'Male',
		bloodGroup: 'AB+',
		totalVisits: 1,
		lastVisit: '12 Nov',
		nextAppointmentText: 'Not booked',
		status: 'New',
		patientSince: '2024',
		nextAppointmentDetails: undefined,
		notes: 'First visit completed. Comprehensive blood panel and cholesterol tests ordered.'
	},
	{
		id: 'PT-3104',
		name: 'Rafi Khan',
		initials: 'RK',
		avatarBg: '#38BDF8',
		age: 8,
		gender: 'Male',
		bloodGroup: 'B+',
		totalVisits: 4,
		lastVisit: '20 Oct',
		nextAppointmentText: '15 Nov · 09:00',
		status: 'Active',
		patientSince: '2023',
		nextAppointmentDetails: {
			date: 'Sat 15 Nov',
			time: '09:00',
			doctor: 'Dr. Nusrat Jahan',
			department: 'Pediatric wellness exam'
		},
		notes: 'Annual pediatric checkup. Vaccination booster due.'
	},
	{
		id: 'PT-3105',
		name: 'Lamia Begum',
		initials: 'LB',
		avatarBg: '#A78BFA',
		age: 63,
		gender: 'Female',
		bloodGroup: 'O-',
		totalVisits: 19,
		lastVisit: '03 Apr',
		nextAppointmentText: 'Not booked',
		status: 'Inactive',
		patientSince: '2020',
		nextAppointmentDetails: undefined,
		notes: 'No visit in past 6 months. Diabetic checkup reminder sent via SMS.'
	},
	{
		id: 'PT-3106',
		name: 'Nabila Sharmin',
		initials: 'NS',
		avatarBg: '#34D399',
		age: 37,
		gender: 'Female',
		bloodGroup: 'A-',
		totalVisits: 7,
		lastVisit: '08 Nov',
		nextAppointmentText: '26 Nov · 10:30',
		status: 'Follow-up',
		patientSince: '2022',
		nextAppointmentDetails: {
			date: 'Wed 26 Nov',
			time: '10:30',
			doctor: 'Dr. Nusrat Jahan',
			department: 'Routine blood pressure review'
		},
		notes: 'Monitoring mild hypertension. Medication adherence is regular.'
	}
];
