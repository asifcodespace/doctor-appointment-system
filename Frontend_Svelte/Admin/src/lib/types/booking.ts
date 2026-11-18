import type { PatientRecord } from './patient';

export interface BookingDoctor {
	id: string;
	name: string;
	specialty: string;
	initials: string;
	avatarBg: string;
	nextFree: string;
}

export type BookingStartStatus = 'Confirmed' | 'Pending' | 'Follow-up';

export interface BookingPayload {
	patient: PatientRecord | null;
	doctor: BookingDoctor;
	date: string;
	time: string;
	startAs: BookingStartStatus;
	reason: string;
}

export const BOOKING_DOCTORS: BookingDoctor[] = [
	{
		id: 'dr-kh',
		name: 'Dr. Karim Hasan',
		specialty: 'Cardiology',
		initials: 'KH',
		avatarBg: '#2DD4BF',
		nextFree: 'Tue 17 Nov'
	},
	{
		id: 'dr-nj',
		name: 'Dr. Nusrat Jahan',
		specialty: 'General medicine',
		initials: 'NJ',
		avatarBg: '#E6C27A',
		nextFree: 'Tue 17 Nov'
	},
	{
		id: 'dr-fs',
		name: 'Dr. Farhana Sultana',
		specialty: 'Dermatology',
		initials: 'FS',
		avatarBg: '#F472B6',
		nextFree: 'Wed 18 Nov'
	}
];

export const BOOKING_TIME_SLOTS = ['09:00', '09:45', '10:30', '11:15', '14:00', '14:45', '15:30', '16:15'];

export const BOOKING_START_STATUSES: BookingStartStatus[] = ['Confirmed', 'Pending', 'Follow-up'];
