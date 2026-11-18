export type PatientStatus = 'Active' | 'Follow-up' | 'New' | 'Inactive';

export interface PatientNextAppointment {
	date: string;
	time: string;
	doctor: string;
	department: string;
}

export interface VisitHistoryItem {
	date: string;
	title: string;
	doctor: string;
	status: 'Completed' | 'Pending' | 'Cancelled';
}

export interface PrescriptionItem {
	name: string;
	dosage: string;
	date: string;
}

export interface PatientRecord {
	id: string; // e.g. "PT-3100"
	name: string;
	initials: string;
	avatarBg: string;
	age: number;
	gender: 'Female' | 'Male' | 'Other';
	bloodGroup: string;
	phone?: string;
	email?: string;
	address?: string;
	totalVisits: number;
	lastVisit: string;
	nextAppointmentText: string;
	status: PatientStatus;
	patientSince: string;
	nextAppointmentDetails?: PatientNextAppointment;
	notes: string;
	allergiesAndConditions?: string[];
	doctorNotes?: string;
	visitHistory?: VisitHistoryItem[];
	prescriptions?: PrescriptionItem[];
}

export interface PatientStats {
	totalPatients: number;
	newThisMonth: number;
	newSinceDateText: string;
	followUpsDue: number;
	inactiveCount: number;
}
