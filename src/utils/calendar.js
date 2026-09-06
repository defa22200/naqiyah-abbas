// Calendar utilities for Apple Calendar, Google Calendar, and Android

export const EVENTS_DATA = [
  {
    id: 'nikah',
    title: 'Nikah — Naqiyah & Abbas',
    description: 'Wedding of Naqiyah & Abbas. Auspicious Nikah ceremony after Maghrib, followed by dinner.',
    location: 'Hakimi Masjid, Shanti Nagar, Nagpur, Maharashtra, India',
    startDate: '2026-12-18T18:00:00',
    endDate: '2026-12-18T22:30:00',
    startUTC: '20261218T123000Z', // 18:00 IST is 12:30 UTC
    endUTC: '20261218T170000Z',   // 22:30 IST is 17:00 UTC
    hijri: '10 Shehre Rajabul Asab 1448',
    gregorian: 'Friday, 18 December 2026',
    timeLabel: 'After Maghrib',
    program: 'Followed by Dinner',
    venueName: 'Hakimi Masjid',
    venueAddress: 'Shanti Nagar, Nagpur',
    mapsUrl: 'https://maps.google.com/?q=Hakimi+Masjid,+Shanti+Nagar,+Nagpur',
    appleMapsUrl: 'https://maps.apple.com/?q=Hakimi+Masjid,+Shanti+Nagar,+Nagpur'
  },
  {
    id: 'celebration-of-love',
    title: 'Celebration of Love — Naqiyah & Abbas',
    description: 'Celebration of Love for Naqiyah & Abbas. 12:00 PM onwards, followed by lunch at Poolside Area.',
    location: 'Dhawan Celebrations, Poolside Area, Gorewada Ring Road, Nagpur, Maharashtra, India',
    startDate: '2026-12-19T12:00:00',
    endDate: '2026-12-19T16:00:00',
    startUTC: '20261219T063000Z', // 12:00 IST is 06:30 UTC
    endUTC: '20261219T103000Z',   // 16:00 IST is 10:30 UTC
    hijri: '11 Shehre Rajabul Asab 1448',
    gregorian: 'Saturday, 19 December 2026',
    timeLabel: '12:00 PM onwards',
    program: 'Followed by Lunch',
    venueName: 'Dhawan Celebrations',
    venueSub: '(Poolside Area)',
    venueAddress: 'Gorewada Ring Road, Nagpur',
    mapsUrl: 'https://maps.google.com/?q=Dhawan+Celebrations,+Gorewada+Ring+Road,+Nagpur',
    appleMapsUrl: 'https://maps.apple.com/?q=Dhawan+Celebrations,+Gorewada+Ring+Road,+Nagpur'
  },
  {
    id: 'reception',
    title: 'Wedding Reception — Naqiyah & Abbas',
    description: 'Grand Wedding Reception celebrating Naqiyah & Abbas. 8:00 PM onwards.',
    location: 'Dhawan Celebrations, Gorewada Ring Road, Nagpur, Maharashtra, India',
    startDate: '2026-12-19T20:00:00',
    endDate: '2026-12-19T23:59:00',
    startUTC: '20261219T143000Z', // 20:00 IST is 14:30 UTC
    endUTC: '20261219T183000Z',   // 23:59 IST is 18:30 UTC
    hijri: '11 Shehre Rajabul Asab 1448 (Eve)',
    gregorian: 'Saturday, 19 December 2026',
    timeLabel: '8:00 PM onwards',
    program: 'Followed by Dinner',
    venueName: 'Dhawan Celebrations',
    venueAddress: 'Gorewada Ring Road, Nagpur',
    mapsUrl: 'https://maps.google.com/?q=Dhawan+Celebrations,+Gorewada+Ring+Road,+Nagpur',
    appleMapsUrl: 'https://maps.apple.com/?q=Dhawan+Celebrations,+Gorewada+Ring+Road,+Nagpur'
  }
];

export function getGoogleCalendarUrl(event) {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    dates: `${event.startUTC}/${event.endUTC}`,
    details: `${event.description}\n\nVenue: ${event.location}`,
    location: event.location,
    sf: 'true',
    output: 'xml'
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function downloadCalendarEvent(eventOrAll) {
  const events = Array.isArray(eventOrAll) ? eventOrAll : [eventOrAll];
  
  let icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Naqiyah & Abbas Wedding Celebrations//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:Naqiyah & Abbas Wedding'
  ];

  events.forEach(ev => {
    icsContent.push(
      'BEGIN:VEVENT',
      `UID:${ev.id}-20261218@naqiyah-abbas.wedding`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
      `DTSTART:${ev.startUTC}`,
      `DTEND:${ev.endUTC}`,
      `SUMMARY:${ev.title}`,
      `DESCRIPTION:${ev.description.replace(/\n/g, '\\n')}`,
      `LOCATION:${ev.location}`,
      'STATUS:CONFIRMED',
      // Default Reminder Notification for iPhone and Android: 1 Day Before
      'BEGIN:VALARM',
      'TRIGGER:-P1D',
      'ACTION:DISPLAY',
      `DESCRIPTION:Reminder: Tomorrow is ${ev.title}`,
      'END:VALARM',
      // Default Reminder Notification for iPhone and Android: 2 Hours Before
      'BEGIN:VALARM',
      'TRIGGER:-PT2H',
      'ACTION:DISPLAY',
      `DESCRIPTION:Reminder: ${ev.title} begins soon`,
      'END:VALARM',
      'END:VEVENT'
    );
  });

  icsContent.push('END:VCALENDAR');

  const blob = new Blob([icsContent.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', Array.isArray(eventOrAll) ? 'naqiyah-abbas-wedding.ics' : `${eventOrAll.id}-naqiyah-abbas.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}
