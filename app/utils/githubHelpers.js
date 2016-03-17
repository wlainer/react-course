var axios = require('axios');

var id = 'fcb81a5b6106a1c09d52';
var sec = '0da8e8608a884bffbfc7aacfc5d860e448e0ad3b';
var param = '?client_id=' + id + '&client_secret=' + sec;

function getUserInfo(username) {
  return axios.get('https://api.github.com/users/' + username + param);
}

var helpers = {
  getPlayersInfo: function(players) {
    return axios.all(players.map(function(username) {
      return getUserInfo(username)
    })).then(function(info) {
      return info.map(function(user) {
        return user.data
      })
    }).catch(function(err) {
      console.warn('Error in getPlayersInfo', err);
    })
  }
};

module.exports = helpers;