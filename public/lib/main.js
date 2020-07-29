const GLOBAL_WIDTH = window.innerWidth * window.devicePixelRatio;
const GLOBAL_HEIGHT = window.innerHeight * window.devicePixelRatio;

var config = {
    type: Phaser.WEBGL,
    parent: "div_form",
    width: GLOBAL_WIDTH - 2.3,
    height: GLOBAL_HEIGHT - 2.3,
    scale: {
        mode: Phaser.Scale.WIDTH_CONTROLS_HEIGHT,
        width: GLOBAL_WIDTH,
        height: GLOBAL_HEIGHT,
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
    },
    dom: {
        createContainer: true
    },
    physics: {
        default: 'arcade',
        arcade: {}
    },
    render: {
        antialias: true
    },
    scene: [Logo, MainSc, Raiting, Tutorial2]
};

var game = new Phaser.Game(config);