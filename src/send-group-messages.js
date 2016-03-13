import postToFacebook from './post-to-facebook';
import moment from 'moment';

export default function(events) {
  if (!events) {
    throw false;
  }
  if (events.length) {
    let event = events[0];
    let date = moment(event.start.dateTime || event.start.date);
    let formattedDate = date.format('LL');
    let message = 'Where Is Group This Week?';
    message += `\n${event.summary} - ${formattedDate}\n${event.location}`;
    postToFacebook(message);
  }
}
