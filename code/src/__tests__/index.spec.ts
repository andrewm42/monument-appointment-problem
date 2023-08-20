import moment from 'moment-timezone';
import { validateSlots, isSlotWithinRange, parseHourAndMinute, RequestedAppointment, Slot } from '../index';

const slots = [
  {
    key: '815007',
    text: '06:00 - 08:00 (1)',
    value: '815007',
    ContainerNo: 'TGBU5454043',
    date: '07/19/2023'
  },
  {
    key: '815008',
    text: '08:00 - 10:00 (5)',
    value: '815008',
    ContainerNo: 'TGBU5454043',
    date: '07/19/2023'
  },
  {
    key: '815009',
    text: '10:00 - 12:00 (12)',
    value: '815009',
    ContainerNo: 'TGBU5454043',
    date: '07/19/2023'
  },
  {
    key: '815010',
    text: '12:00 - 14:00 (12)',
    value: '815010',
    ContainerNo: 'TGBU5454043',
    date: '07/19/2023'
  },
  {
    key: '815011',
    text: '14:00 - 16:00 (9)',
    value: '815011',
    ContainerNo: 'TGBU5454043',
    date: '07/19/2023'
  },
  {
    key: '815025',
    text: '06:00 - 08:00 (9)',
    value: '815025',
    ContainerNo: 'TGBU5454043',
    date: '07/20/2023'
  },
  {
    key: '815026',
    text: '08:00 - 10:00 (17)',
    value: '815026',
    ContainerNo: 'TGBU5454043',
    date: '07/20/2023'
  },
  {
    key: '815027',
    text: '10:00 - 13:00 (16)',
    value: '815027',
    ContainerNo: 'TGBU5454043',
    date: '07/20/2023'
  },
  {
    key: '815028',
    text: '12:00 - 14:00 (15)',
    value: '815028',
    ContainerNo: 'TGBU5454043',
    date: '07/20/2023'
  },
  {
    key: '815029',
    text: '09:00 - 15:00 (15)',
    value: '815029',
    ContainerNo: 'TGBU5454043',
    date: '07/20/2023'
  }
];

describe('validateSlots', () => {
  const userTimezone = 'America/New_York';
  const currentTime = "Thu Jul 20 2023 06:05:00 GMT-0600";
  const lastFreeDate = "Thu Jul 20 2023 15:09:00 GMT-0600";

  test('should return available slots for a time range', () => {
    const requestedTimes: RequestedAppointment[] = [{ appointmentTimeStart: '0100', appointmentTimeEnd: '2100' }];
    const availableSlots = validateSlots(userTimezone, currentTime, lastFreeDate, requestedTimes, slots);
    expect(availableSlots).toEqual(
      [
        [
          new Date("2023-07-20T14:00:00.000Z"),
          new Date("2023-07-20T17:00:00.000Z"),
        ],
        [
          new Date("2023-07-20T16:00:00.000Z"),
          new Date("2023-07-20T18:00:00.000Z"),
        ],
      ],
    );
  });

  test('should return available slots for a specific time', () => {
    const requestedTimes: RequestedAppointment[] = [{ appointmentTimeStart: '2023-07-20T06:05:49-06:00', appointmentTimeEnd: '2023-07-20T07:50:49-06:00' }];
    const availableSlots = validateSlots(userTimezone, currentTime, lastFreeDate, requestedTimes, slots);

    expect(availableSlots).toEqual(
      [
        [
          new Date("2023-07-20T12:00:00.000Z"),
          new Date("2023-07-20T14:00:00.000Z")
        ],
      ],
    );
  });
});

describe('isSlotWithinRange', () => {
  test('should return true if slot is within range', () => {
    const slot = {
      start: moment.tz('07/20/2023 08:00', 'MM/DD/YYYY HH:mm', 'America/New_York'),
      end: moment.tz('07/20/2023 10:00', 'MM/DD/YYYY HH:mm', 'America/New_York')
    };
    const requestedTime: RequestedAppointment = {
      appointmentTimeStart: '0700',
      appointmentTimeEnd: '1200',
    };

    const result = isSlotWithinRange(slot, requestedTime);

    expect(result).toBe(true);
  });

  test('should return false for a slot outside the time range', () => {
    const slot: Slot = {
      start: moment.tz("2023-07-20T22:00:00.000Z", 'MM/DD/YYYY HH:mm', 'America/New_York'),
      end: moment.tz("2023-07-20T23:00:00.000Z", 'MM/DD/YYYY HH:mm', 'America/New_York')
    };

    const requestedTime: RequestedAppointment = {
      appointmentTimeStart: '0100',
      appointmentTimeEnd: '2100',
    };

    const result = isSlotWithinRange(slot, requestedTime);

    expect(result).toBe(false);
  });
});

describe('extractHourAndMinute', () => {
  test('should correctly extract hour and minute from military time format', () => {
    const timeStr = '0130';
    expect(parseHourAndMinute(timeStr)).toEqual([1, 30]);
  });
});
