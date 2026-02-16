import dayjs from 'dayjs';

export function disablePastdate(current: dayjs.Dayjs) {
  return current && current < dayjs().startOf('day');
}
export function disablePastTime(referenceTime: string | dayjs.Dayjs) {
  const now = dayjs(referenceTime);
  return function (selectedDate: dayjs.Dayjs | null) {
    if (!selectedDate) return {};
    return {
      disabledHours: () => (selectedDate.isSame(now, 'day') ? Array.from({ length: now.hour() }, (_, i) => i) : []),
      disabledMinutes: (hour: number) =>
        selectedDate.isSame(now, 'day') && hour === now.hour() ? Array.from({ length: now.minute() }, (_, i) => i) : [],
      disabledSeconds: (hour: number, minute: number) =>
        selectedDate.isSame(now, 'day') && hour === now.hour() && minute === now.minute()
          ? Array.from({ length: now.second() }, (_, i) => i)
          : [],
    };
  };
}
