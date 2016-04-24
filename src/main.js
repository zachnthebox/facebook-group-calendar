import authorize_to_google from './authorize-to-google';
import { get_group_events, get_wyl_events, get_other_events } from './calendar-events';
import send_wyl_messages from './send-wyl-messages';
import send_group_messages from './send-group-messages';
import send_other_event_messages from './send-other-event-messages';
import send_pending_posts from './send_pending_posts';
import moment from 'moment-timezone';
import { getPendingPosts } from './firebase';

moment.tz.setDefault('America/New_York');

const MONDAY = 1;

authorize_to_google();

let today = moment();

if (today.weekday() === MONDAY) {
  get_wyl_events().then(send_wyl_messages);
  get_group_events().then(send_group_messages);
  get_other_events().then(send_other_event_messages);
}

getPendingPosts().then(send_pending_posts);
