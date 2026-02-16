import dayjs, { Dayjs } from 'dayjs';

export const disableFutureDates = (current: Dayjs) => current && current > dayjs().endOf('day');

export function fromDateStartTime(fromDate: string) {
  const start = new Date(fromDate);
  start.setHours(0, 0, 0, 0);
  return start.toISOString();
}

export function toDateEndTime(toDate: string) {
  const nextDay = new Date(toDate);
  nextDay.setDate(nextDay.getDate() + 1);
  return nextDay.toISOString();
}

export async function dayjsExtend() {
  const utc = await import('dayjs/plugin/utc');
  const timezone = await import('dayjs/plugin/timezone');
  const duration = await import('dayjs/plugin/duration');
  const relativeTime = await import('dayjs/plugin/relativeTime');
  const updateLocale = await import('dayjs/plugin/updateLocale');
  const customParseFormat = await import('dayjs/plugin/customParseFormat');

  dayjs.extend(utc.default);
  dayjs.extend(timezone.default);
  dayjs.extend(duration.default);
  dayjs.extend(customParseFormat.default);
  dayjs.extend(relativeTime.default);
  dayjs.extend(updateLocale.default);

  dayjs.updateLocale('en', {
    relativeTime: {
      ...dayjs.Ls.en.relativeTime,
      mm: '%d min',
      s: 'just now', // convert `a few seconds ago` to `just now` when using `fromNow fn`
    },
  });
}
