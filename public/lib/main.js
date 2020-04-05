const GLOBAL_WIDTH = window.innerWidth * window.devicePixelRatio;
const GLOBAL_HEIGHT = window.innerHeight * window.devicePixelRatio;

var config = {
    type: Phaser.AUTO,
    parent: "div_form",
    width: GLOBAL_WIDTH - 2.3,
    height: GLOBAL_HEIGHT - 2.3,
    scale: {
        mode: Phaser.Scale.FIT,
        width: GLOBAL_WIDTH,
        height: GLOBAL_HEIGHT,
    },
    dom: {
        createContainer: true
    },
    physics: {
        default: 'arcade',
        arcade: {}
    },
    scene: [Logo, MainSc, Raiting, Tutorial]
};

var game = new Phaser.Game(config);