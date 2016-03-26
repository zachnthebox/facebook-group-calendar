import FB from 'fb';

const group_id = process.env.facebook_group_id;
const access_token = process.env.facebook_access_token;

FB.setAccessToken(access_token);

export default function(message, link = {}) {
  FB.api(`/${group_id}/feed`, 'POST', {
    message,
    link: link.url,
    caption: link.caption,
    description: link.description,
    name: link.name,
  }, function(res) {
    if (!res) {
      throw false;
    } else if (res.error) {
      throw res.error;
    }
    console.log('Post Id: ' + res.id);
  });
}
