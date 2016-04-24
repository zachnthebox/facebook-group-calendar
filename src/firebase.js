import request from 'request';
import RSVP from 'rsvp';
import moment from 'moment';

const firebase_url = process.env.firebase_url;
const firebase_auth_token = process.env.firebase_auth_token;
const baseUrl = `${firebase_url}/posts.json?auth=${firebase_auth_token}`;

const makeRequest = url => {
  return new RSVP.Promise(function(resolve, reject) {
    request(url, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        resolve(body);
      }
      reject(error);
    });
  });
};

function shouldPostToday(post = {}) {
  let postDate = moment(post.date).startOf('day');
  let today = moment().startOf('day');
  return postDate.isSame(today);
}

export function getPendingPosts() {
  let url = `${baseUrl}&orderBy="pending"&equalTo=true`;
  return makeRequest(url).then(response => {
    let pendingPosts = [];
    response = JSON.parse(response);
    if (response && typeof response === 'object') {
      for (let property in response) {
        if (response.hasOwnProperty(property)) {
          let post = response[property];
          if (shouldPostToday(post)) {
            pendingPosts.push(post);
          }
        }
      }
    }
    return pendingPosts;
  });
};

getPendingPosts();
