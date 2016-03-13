import postToFacebook from './post-to-facebook';
import moment from 'moment';

export default function(events) {
  if (!events) {
    throw false;
  }
  let message = '"What You\'ve Learned" (WYL) Assignments:';
  events.forEach(event => {
    let date = moment(event.start.dateTime || event.start.date);
    let formattedDate = date.format('L');
    message += `\n${formattedDate} - ${event.location}`;
  });
  postToFacebook(message);
}
