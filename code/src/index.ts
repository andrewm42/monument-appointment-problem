import moment, { Moment } from 'moment-timezone';

interface BookedAppointments {
    appointmentTimeStart: string;
    appointmentTimeEnd: string;
}

export function validateSlots(
    userTimezone: string,
    currentTime: Date,
    lastFreeDate: Date,
    bookedAppointmentTimes: BookedAppointments[],
    slots: any[]
): [Date, Date][] {

    let currentMoment = moment.tz(currentTime, userTimezone).add(1, 'hours');
    let lastFreeMoment = moment.tz(lastFreeDate, userTimezone);

    let availableSlots: [Date, Date][] = [];

    for (let slot of slots) {
        let [slotStart, slotEnd] = extractSlotDates(slot, userTimezone);

        // If the slot start is at least an hour after the current time
        // and the end of the slot is after the last free moment
        // and the slot is at least an hour long 
        // and the slot is not booked
        // then mark the slot as available
        if (slotStart.isSameOrAfter(currentMoment) && lastFreeMoment.isSameOrBefore(slotEnd) && slotEnd.diff(slotStart, 'hours') >= 1) {
            if (!isSlotBooked(bookedAppointmentTimes, slotStart, slotEnd, userTimezone)) {
                availableSlots.push([slotStart.toDate(), slotEnd.toDate()]);
            }
        }
    }

    return availableSlots;
}

// Determines if a slot is booked by comparing the start time 
const isSlotBooked = (bookedAppointmentTimes: BookedAppointments[], slotStart: moment.Moment, slotEnd: moment.Moment, userTimezone: string): boolean => {
    for (let appointment of bookedAppointmentTimes) {
        let appStart = moment.tz(appointment.appointmentTimeStart, userTimezone);
        let appEnd = moment.tz(appointment.appointmentTimeEnd, userTimezone);
        if (slotStart.isBefore(appEnd) && slotEnd.isAfter(appStart)) {
            return true;
        }
    }
    return false;
};

// Parse the date and times from a slot
const extractSlotDates = (slot: any, userTimezone: string): [Moment, Moment] => {
    let slotDate = moment.tz(slot.date, 'MM/DD/YYYY', userTimezone);

    const [start, end] = slot.text.split('-').map(t => t.trim());
    const [startHour, startMinute] = start.split(':').map(Number);
    const [endHour, endMinute] = end.split(':').map(Number);

    let slotStart = slotDate.clone().hour(startHour).minute(startMinute);
    let slotEnd = slotDate.clone().hour(endHour).minute(endMinute);

    return [slotStart, slotEnd];
};


