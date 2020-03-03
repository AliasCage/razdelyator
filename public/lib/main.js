var config = {
    type: Phaser.AUTO,
    parent: "div_form",
    width: window.innerWidth - 2.3,
    height: window.innerHeight - 2.3,
    dom: {
        createContainer: true
    },
    physics: {
        default: 'arcade',
        arcade: {
        }
    },
    audio: {
        disableWebAudio: true
    },
    scene: [Logo, MainSc, Raiting, Tutorial]
};

var game = new Phaser.Game(config);