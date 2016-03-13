import google from 'googleapis';
import RSVP from 'rsvp';

const calendarId = '0kursvumsm92prumlvevig14k4@group.calendar.google.com';

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
