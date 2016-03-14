import FB from 'fb';

const group_id = process.env.facebook_group_id;
const access_token = process.env.facebook_access_token;

FB.setAccessToken(access_token);

export default function(message) {
  FB.api(`/${group_id}/feed`, 'POST', {
    message: message
  }, function(res) {
    if (!res) {
      throw false;
    } else if (res.error) {
      throw res.error;
    }
    console.log('Post Id: ' + res.id);
  });
}
