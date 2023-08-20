import moment from 'moment-timezone';

export interface RequestedAppointment {
    appointmentTimeStart: string;
    appointmentTimeEnd: string;
}

export interface Slot {
    start: moment.Moment,
    end: moment.Moment,
}

export function validateSlots(
    userTimezone: string,
    currentTime: string,
    lastFreeDate: string,
    requestedAppointmentTimes: RequestedAppointment[],
    slots: any[]
): [Date, Date][] {
    const currentMoment = moment(new Date(currentTime).toISOString()).tz(userTimezone);
    const lastFreeMoment = moment(new Date(lastFreeDate).toISOString()).tz(userTimezone);

    let results: [Date, Date][] = [];

    for (let s of slots) {
        const slot: Slot = parseSlot(s, userTimezone);

        // IF the slot isn't at least an hour long ignore it
        if (slot.end.diff(slot.start, 'minutes') < 60) {
            continue;
        }

        for (let requestedTime of requestedAppointmentTimes) {
            if (requestedTime.appointmentTimeStart.length === 4) { // It's a time range
                // IF the slot start is at least an hour after the current time
                // AND the slot end is before the last free time
                // AND the slot is within the range of the requested appointment time
                // THEN the slot is valid
                if (slot.start.isSameOrAfter(currentMoment.clone().add(1, 'hours')) &&
                    slot.end.isSameOrBefore(lastFreeMoment) &&
                    isSlotWithinRange(slot, requestedTime)) {
                    results.push([slot.start.toDate(), slot.end.toDate()]);
                    break;  // Break out of inner loop once a match is found
                }
            } else { // It's a specific date time
                const requestedStart = moment(requestedTime.appointmentTimeStart).tz(userTimezone);
                const requestedEnd = moment(requestedTime.appointmentTimeEnd).tz(userTimezone);

                // IF the slot start is before the requested appointment start time
                // AND the slot end is after the requested appoint end time
                // THEN the slot is valid
                if (slot.start.isSameOrBefore(requestedStart) &&
                    slot.end.isSameOrAfter(requestedEnd)) {
                    results.push([slot.start.toDate(), slot.end.toDate()]);
                    break;  // Break out of inner loop once a match is found
                }
            }
        }
    }

    return results;
}

export function parseSlot(slot: any, userTimezone: string): Slot {
    const slotDate = moment(slot.date, 'MM/DD/YYYY').tz(userTimezone);
    const hyphenSplit = slot.text.split(' - ');
    const [startHour, startMin] = hyphenSplit[0].split(':');
    const [endHour, endMin] = hyphenSplit[1].split(':');
    const slotStartMoment = slotDate.clone().hour(parseInt(startHour)).minute(parseInt(startMin));
    const slotEndMoment = slotDate.clone().hour(parseInt(endHour)).minute(parseInt(endMin));

    return { 
        start: slotStartMoment, 
        end: slotEndMoment,
    };
}

export function isSlotWithinRange(slot: Slot, requestedTime: RequestedAppointment) {
    const rangeStart = requestedTime.appointmentTimeStart;
    const rangeEnd = requestedTime.appointmentTimeEnd;

    const [startHour, startMinute] = parseHourAndMinute(rangeStart);
    const [endHour, endMinute] = parseHourAndMinute(rangeEnd);

    // Determines if the slot is within a range by hours and minutes
    return (slot.start.hours() > startHour || (slot.start.hours() === startHour && slot.start.minutes() >= startMinute)) &&
        (slot.end.hours() < endHour || (slot.end.hours() === endHour && slot.end.minutes() <= endMinute));
}

export function parseHourAndMinute(timeStr: string): [number, number] {
    return [
        parseInt(timeStr.substring(0, 2)), 
        parseInt(timeStr.substring(2)),
    ];
}
