import postToFacebook from './post-to-facebook';
import moment from 'moment';

export default function(posts) {
  if (!posts) {
    throw false;
  }
  if (posts.length) {
    posts.forEach(post => {
      let message = 'Daily Devotional for the Aligment';
      postToFacebook(message, {
        url: 'https://www.biblegateway.com/passage/?version=NASB&search=' + encodeURIComponent(post.text),
        name: post.text + ' (NASB)',
      });
    });
  }
}
