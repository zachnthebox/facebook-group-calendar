import google from 'googleapis';

const JWT = google.auth.JWT;
const client_email = process.env.client_email;
const private_key = process.env.private_key;

const SCOPES = [
  'https://www.googleapis.com/auth/calendar.readonly'
];

export default function() {
  let authClient = new JWT(client_email, null, private_key, SCOPES, null);
  google.options({
    auth: authClient
  }); // set auth as a global default
}
