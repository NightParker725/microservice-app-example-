const opossum = require('opossum');
const request = require('request-promise-native');

const usersUrl = process.env.USERS_API_URL || 'http://users-api:8083';
async function getUser(id) {
  return request({ uri: `${usersUrl}/users/${id}`, json: true });
}

module.exports = new opossum(getUser, {
  timeout: 2000,
  errorThresholdPercentage: 50,
  resetTimeout: 5000
});
