var axios = require('axios');

var id = 'fcb81a5b6106a1c09d52';
var sec = '0da8e8608a884bffbfc7aacfc5d860e448e0ad3b';
var param = '?client_id=' + id + '&client_secret=' + sec;

function getUserInfo(username) {
  return axios.get('https://api.github.com/users/' + username + param);
}

function getRepos (username) {
 return axios.get('https://api.github.com/users/' + username + '/repos' + param + '&per_page=100');
}

function getTotalStars(repos) {
  return repos.data.reduce(function(prev, current) {
    return prev + current.stargazers_count
  }, 0)
}

function getPlayerData(player) {
  return getRepos(player.login)
    .then(getTotalStars)
    .then(function(totalStars){
      return {
        follwers: player.followers,
        totalStars: totalStars
      }
    })
}

function calculteScores(players) {
  return [
    players[0].followers * 3 + players[0].totalStars,
    players[1].followers * 3 + players[1].totalStars,
  ]
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
  },

  battle: function(players) {
    var playerOneData = getPlayerData(players[0]);
    var playerTwoData = getPlayerData(players[1]);

    return axios.all([playerOneData, playerTwoData])
      .then(calculteScores)
      .catch(function(err) {
        console.warn('Error in getPlayersInfo', err);
      })
  }
};

module.exports = helpers;