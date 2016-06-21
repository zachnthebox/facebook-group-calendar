import postToFacebook from './post-to-facebook';
import postToGroupMe from './post-to-group-me';
import moment from 'moment';

export default function(events) {
  if (!events) {
    throw false;
  }
  if (events.length) {
    let event = events[0];
    let date = moment(event.start.dateTime);
    let formattedDate = date.format('LLL');
    let message = 'Where Is Group This Week?';
    postToFacebook(message, {
      url: 'https://www.google.com/maps/place/' + encodeURIComponent(event.location),
      name: event.summary,
      caption: formattedDate,
    });
    postToGroupMe(`${event.summary}\n${formattedDate}\n${event.location}`);
  }
}
