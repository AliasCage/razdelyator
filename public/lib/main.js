var config = {
    type: Phaser.AUTO,
    width: window.innerWidth - 2.3,
    height: window.innerHeight - 2.3,
    physics: {
        default: 'arcade',
        // debug: true,

        arcade: {
            // debug: true
        }
    },
    scene: [Logo, MainSc, Raiting, Tutorial]
};

var game = new Phaser.Game(config);