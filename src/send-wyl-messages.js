import postToFacebook from './post-to-facebook';
import moment from 'moment';

const firstMondayOfMonth = moment().startOf('month').day("Monday");

const todayIsAfterFirstMondayOfMonth = moment().isAfter(firstMondayOfMonth);

const previousMonday = moment().startOf('week').day('Monday').subtract(1, 'week').hour(8).minute(0);

const changedLastWeek = event => {
  let updated = moment(event.updated);
  let created = moment(event.created);
  return updated.isAfter(previousMonday) && !created.isAfter(previousMonday);
};

const createdLastWeek = event => moment(event.created).isAfter(previousMonday) && moment(event.created).isBefore();

export default function(events) {
  if (!events || !events.length) {
    throw false;
  }

  let eventMessages = '"What You\'ve Learned" Assignments Coming Up:';
  let eventsUpdated = false;
  let eventsCreated = false;

  events.forEach(event => {
    let eventUpdated =  changedLastWeek(event);
    let eventCreated = createdLastWeek(event);

    eventsCreated |= eventCreated;
    eventsUpdated |= eventUpdated;

    let formattedDate = moment(event.start.date).format('LL');
    let message = `\n${formattedDate} - ${event.location}`;
    if (eventUpdated) {
      message += ' (Updated)';
    } else {
      message += ' (New)';
    }
    eventMessages += message;
  });

  if (!todayIsAfterFirstMondayOfMonth || eventsUpdated || eventsCreated) {
    postToFacebook(eventMessages);
  }
}
