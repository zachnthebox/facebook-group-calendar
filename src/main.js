import authorize_to_google from './authorize-to-google';
import { get_group_events, get_wyl_events } from './calendar-events';
import send_wyl_messages from './send-wyl-messages';
import send_group_messages from './send-group-messages';

authorize_to_google();

get_wyl_events().then(send_wyl_messages);
get_group_events().then(send_group_messages);
