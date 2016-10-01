const {sendInProgressGameUpdate} = require('../util.js'),
	_ = require('lodash');

module.exports = game => {
	let roles = _.range(0, 3).map(el => {
		return {
			roleName: 'liberal',
			icon: el,
			team: 'liberal'
		};
	}).concat([{
		roleName: 'fascist',
		icon: 0,
		team: 'fascist'
	},
		{
			roleName: 'hitler',
			icon: 0,
			team: 'fascist'
		}]
	);

	game.general.type = 0; // different fascist tracks

	if (game.seatedPlayers.length > 5) {
		roles = roles.concat([{
			roleName: 'liberal',
			icon: 4,
			team: 'liberal'
		}]);
	}

	if (game.seatedPlayers.length > 6) {
		roles = roles.concat([{
			roleName: 'fascist',
			icon: 1,
			team: 'fascist'
		}]);
		game.general.type = 1;
	}

	if (game.seatedPlayers.length > 7) {
		roles = roles.concat([{
			roleName: 'liberal',
			icon: 5,
			team: 'liberal'
		}]);
	}

	if (game.seatedPlayers.length > 8) {
		roles = roles.concat([{
			roleName: 'fascist',
			icon: 2,
			team: 'fascist'
		}]);
		game.general.type = 2;
	}

	if (game.seatedPlayers.length > 9) {
		roles = roles.concat([{
			roleName: 'liberal',
			icon: 4,
			team: 'liberal'
		}]);
	}

	game.gameState.isStarted = true;
	game.seatedPlayers = _.shuffle(game.seatedPlayers);
	game.private.seatedPlayers = _.cloneDeep(game.seatedPlayers);
	game.general.status = 'Dealing roles..';
	game.private.seatedPlayers.forEach((player, i) => {
		const index = Math.floor(Math.random() * roles.length);

		player.gameChats = [];
		player.role = roles[index];
		roles.splice(index, 1);

		player.playersState = _.range(0, game.seatedPlayers.length).map(play => {
			return {};
		});

		player.playersState.forEach((play, index) => {
			play.cardStatus = {
				cardDisplayed: true,
				isFlipped: false,
				cardFront: 'secretrole'
			};

			if (index === game.seatedPlayers.findIndex(pla => pla.userName === player.userName)) {
				play.cardStatus.cardBack = player.role;
			} else {
				play.cardStatus.cardBack = '';
			}
		});
	});
	console.log(game.seatedPlayers);
	console.log(game.private.seatedPlayers[0].playersState[0].cardStatus);
	console.log(game.private.seatedPlayers[0].playersState[1].cardStatus);
	sendInProgressGameUpdate(game);
};