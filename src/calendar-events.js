import google from 'googleapis';
import RSVP from 'rsvp';

const calendarId = process.env.google_calendar_id;

export function getEvents(options) {
  let calendar = google.calendar('v3');
  return new RSVP.Promise(function(resolve, reject) {
    calendar.events.list(options, function(err, response) {
      if (err) {
        reject(err);
      }
      resolve(response.items);
    });
  });
}

export function get_wyl_events() {
  return getEvents({
    calendarId: calendarId,
    timeMin: (new Date()).toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
    q: 'wyl',
  });
}

export function get_group_events() {
  return getEvents({
    calendarId: calendarId,
    timeMin: (new Date()).toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
    q: 'group',
  });
}

export function get_other_events() {
  return getEvents({
    calendarId: calendarId,
    timeMin: (new Date()).toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
    q: 'activity',
  });
}
