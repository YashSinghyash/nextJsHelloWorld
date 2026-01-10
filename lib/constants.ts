export type EventItem = {
  image: string;
  title: string;
  slug: string;
  location: string;
  date: string; // human-friendly date
  time: string; // human-friendly time or time range (required)
};

export const events: EventItem[] = [
  {
    image: '/images/event1.png',
    title: 'React Summit 2026',
    slug: 'react-summit-2026',
    location: 'Amsterdam, Netherlands',
    date: 'March 12, 2026',
    time: '09:00 - 18:00 CEST'
  },
  {
    image: '/images/event2.png',
    title: 'JSConf EU 2026',
    slug: 'jsconf-eu-2026',
    location: 'Berlin, Germany',
    date: 'May 20, 2026',
    time: '10:00 - 17:30 CEST'
  },
  {
    image: '/images/event3.png',
    title: 'DevOpsDays New York 2026',
    slug: 'devopsdays-nyc-2026',
    location: 'New York, NY, USA',
    date: 'April 8, 2026',
    time: '08:30 - 16:30 EDT'
  },
  {
    image: '/images/event4.png',
    title: 'Open Source Summit 2026',
    slug: 'open-source-summit-2026',
    location: 'Seattle, WA, USA',
    date: 'June 15, 2026',
    time: '09:00 - 17:00 PDT'
  },
  {
    image: '/images/event5.png',
    title: 'Global Hack Week 2026',
    slug: 'global-hack-week-2026',
    location: 'Virtual / Hybrid',
    date: 'February 21-23, 2026',
    time: '24-hour hack sessions (regional schedules)'
  },
  {
    image: '/images/event6.png',
    title: 'Flutter Forward 2026',
    slug: 'flutter-forward-2026',
    location: 'Virtual',
    date: 'July 10, 2026',
    time: '11:00 - 16:00 UTC'
  }
];
