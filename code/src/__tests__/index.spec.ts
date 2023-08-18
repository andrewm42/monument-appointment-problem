import { validateSlots } from '../index';
import moment from 'moment-timezone';

describe('validateSlots function', () => {
  const userTimezone = 'America/New_York';

  test('should return available slots correctly', () => {
    const currentTime = "2023-07-20T08:05:00-06:00";
    const lastFreeDate = "2023-07-20T11:09:00-06:00";
    const bookedAppointmentTimes = [
      { appointmentTimeStart: '2023-07-20T01:00:00-06:00', appointmentTimeEnd: '2023-07-20T11:00:00-06:00' },
      { appointmentTimeStart: '2023-07-21T13:00:00-04:00', appointmentTimeEnd: '2023-07-21T15:00:00-04:00' }
    ];
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
        text: '10:00 - 12:00 (16)',
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
        text: '13:00 - 15:00 (15)',
        value: '815029',
        ContainerNo: 'TGBU5454043',
        date: '07/20/2023'
      }
    ];

    const result = validateSlots(userTimezone, new Date(currentTime), new Date(lastFreeDate), bookedAppointmentTimes, slots);

    const expected = [
      [new Date("2023-07-20T13:00:00-04:00"), new Date("2023-07-20T15:00:00-04:00")]
    ];

    expect(result).toEqual(expected);
  });

  // More test cases can be added here to test various scenarios.
});

