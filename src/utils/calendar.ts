import type { ScheduleItem, DaySchedule } from '../data/portalData';

// Format YYYYMMDDTHHmmss for iCal
const formatDateToICS = (dateStr: string, timeStr: string): string => {
  // dateStr is '05.10.2026'
  const [day, month, year] = dateStr.split('.');
  
  // timeStr is '11:20'
  const [hours, minutes] = timeStr.split(':');
  
  const pad = (n: string | number) => String(n).padStart(2, '0');
  return `${year}${pad(month)}${pad(day)}T${pad(hours)}${pad(minutes)}00`;
};

// Extract start and end time from string like '11:20 bis 12:00 Uhr'
const parseTimes = (timeStr: string): { start: string; end: string } => {
  const matches = timeStr.match(/(\d{1,2}:\d{2})\s*(?:bis|-)\s*(\d{1,2}:\d{2})/i);
  if (matches) {
    return { start: matches[1], end: matches[2] };
  }
  const single = timeStr.match(/(\d{1,2}:\d{2})/);
  if (single) {
    const startHour = parseInt(single[1].split(':')[0], 10);
    const startMin = single[1].split(':')[1];
    const endHour = (startHour + 1) % 24;
    return { start: single[1], end: `${endHour}:${startMin}` };
  }
  return { start: '12:00', end: '13:00' };
};

export const generateSingleICS = (item: ScheduleItem, dateStr: string): string => {
  const times = parseTimes(item.time);
  const dtStart = formatDateToICS(dateStr, times.start);
  const dtEnd = formatDateToICS(dateStr, times.end);
  const now = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//FaRaFIN//E-Woche Mentoren//DE
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
UID:${item.id}-202610@farafin.de
DTSTAMP:${now}
DTSTART:${dtStart}
DTEND:${dtEnd}
SUMMARY:FaRaFIN: ${item.title}
DESCRIPTION:WICHTIG: Treffzeit (-10 Min) ist ${item.meetingTime}!\\nOrt: ${item.location}\\nZuständig: ${item.responsible.join(', ')}\\n${item.description}
LOCATION:${item.location}
STATUS:CONFIRMED
BEGIN:VALARM
TRIGGER:-PT10M
ACTION:DISPLAY
DESCRIPTION:Erinnerung: Treffzeit in 10 Minuten (${item.meetingTime}) für ${item.title}
END:VALARM
END:VEVENT
END:VCALENDAR`;
};

export const generateFullWeekICS = (days: DaySchedule[]): string => {
  const now = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const events: string[] = [];

  for (const day of days) {
    for (const item of day.items) {
      const times = parseTimes(item.time);
      const dtStart = formatDateToICS(day.date, times.start);
      const dtEnd = formatDateToICS(day.date, times.end);

      events.push(`BEGIN:VEVENT
UID:${item.id}-202610@farafin.de
DTSTAMP:${now}
DTSTART:${dtStart}
DTEND:${dtEnd}
SUMMARY:FaRaFIN: ${item.title}
DESCRIPTION:WICHTIG: Treffzeit (-10 Min) ist ${item.meetingTime}!\\nOrt: ${item.location}\\nZuständig: ${item.responsible.join(', ')}\\n${item.description}
LOCATION:${item.location}
STATUS:CONFIRMED
BEGIN:VALARM
TRIGGER:-PT10M
ACTION:DISPLAY
DESCRIPTION:Erinnerung: Treffzeit in 10 Minuten (${item.meetingTime}) für ${item.title}
END:VALARM
END:VEVENT`);
    }
  }

  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//FaRaFIN//E-Woche Mentoren//DE
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:FaRaFIN E-Woche 2026/27 (Mentoren)
X-WR-TIMEZONE:Europe/Berlin
${events.join('\n')}
END:VCALENDAR`;
};

export const downloadICSFile = (content: string, filename: string): void => {
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const getGoogleCalendarUrl = (item: ScheduleItem, dateStr: string): string => {
  const times = parseTimes(item.time);
  const dtStart = formatDateToICS(dateStr, times.start);
  const dtEnd = formatDateToICS(dateStr, times.end);
  const title = encodeURIComponent(`FaRaFIN: ${item.title}`);
  const details = encodeURIComponent(
    `Treffzeit (-10 Min): ${item.meetingTime}\nOrt: ${item.location}\nZuständig: ${item.responsible.join(', ')}\n\n${item.description}`
  );
  const location = encodeURIComponent(item.location);

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dtStart}/${dtEnd}&details=${details}&location=${location}`;
};
