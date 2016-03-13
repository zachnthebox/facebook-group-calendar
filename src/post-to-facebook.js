import FB from 'fb';

const group_id = process.env.facebook_group_id;
const access_token = process.env.facebook_access_token;

FB.setAccessToken(access_token);

export default function(message) {
  FB.api(`/${group_id}/feed`, 'POST', {
    message: message
  }, function(res) {
    if (!res || res.error) {
      throw err;
    }
    console.log('Post Id: ' + res.id);
  });
}
