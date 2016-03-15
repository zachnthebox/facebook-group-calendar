import postToFacebook from './post-to-facebook';
import moment from 'moment';

const firstMondayOfMonth = moment().startOf('month').day("Monday");
const todayIsAfterFirstMondayOfMonth = moment().isAfter(firstMondayOfMonth);
const lastMonday = moment().startOf('week').day('Monday').subtract(1, 'week').hour(8).minute(0);

const changedLastWeek = event => {
  let updated = moment(event.updated);
  let created = moment(event.created);

  return updated.isAfter(lastMonday) && !created.isAfter(lastMonday);
};
const createdLastWeek = event => moment(event.created).isAfter(lastMonday);

export default function(events) {
  if (!events || !events.length) {
    throw false;
  }

  let message = '"What You\'ve Learned" (WYL) Assignments:';
  let eventMessages = '';

  let eventsUpdated = false;
  let eventsCreated = false;

  events.forEach(event => {
    eventsUpdated |= changedLastWeek(event);
    eventsCreated |= createdLastWeek(event);

    let formattedDate = moment(event.start.date).format('LL');
    eventMessages += `\n${formattedDate} - ${event.location}`;
  });
  if (eventsUpdated && !todayIsAfterFirstMondayOfMonth && !eventsCreated) {
    message += ' (updated)';
  }
  if (!todayIsAfterFirstMondayOfMonth || eventsUpdated || eventsCreated) {
    message += eventMessages;
    postToFacebook(message);
  }
}
