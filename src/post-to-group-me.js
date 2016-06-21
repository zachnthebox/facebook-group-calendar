import request from 'request';

const botID = process.env.group_me_bot_id;

export default function(message) {
  request({
    baseUrl: 'https://api.groupme.com',
    uri: '/v3/bots/post',
    method: 'POST',
    json: true,
    body: {
      'bot_id': botID,
      'text': message
    },
  });
}
