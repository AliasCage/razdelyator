const DARK = 0xeffffff;
const COLOR_PRIMARY = 0xe3f2fd;
const COLOR_DARK = 0xb1bfca;
const TOXIC_COLOR = 0x01DF01;
const INACTIVE_COLOR = 0x6b6b6b;

const midle_window = window.innerWidth / 2;
var global_scale;
var bg_width;
var conveer_width;

var Logo = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function Logo() {
            Phaser.Scene.call(this, {key: 'logo'});
        },

    init: function (data) {
        console.log(data.name)
    },


    preload: function () {
        var groundBar = this.add.graphics().fillStyle(COLOR_PRIMARY, 0.6).fillRect(0, 0, window.innerWidth, window.innerHeight);
        var progressBox = this.add.graphics().fillStyle(COLOR_DARK, 0.7).fillRect(midle_window - 160, 270, 320, 50);
        var progressBar = this.add.graphics();
        this.load.on('progress', function (value) {
            progressBar.clear().fillStyle(COLOR_PRIMARY, 1).fillRect(midle_window + 10 - 150, 280, 300 * value - 10, 30);
        });

        this.load.on('complete', function () {
            progressBar.destroy();
            progressBox.destroy();
            groundBar.destroy();
        });

        this.load.setBaseURL('img');
        this.load.image('intro', 'logo.png');
        this.load.image('raiting', 'raiting.png');
        this.load.image('start', 'start.png');
        this.load.image('tutorial', 'tutorial.png');
        //common img
        this.load.image('menu_on', 'btn/menu_on.png');
        this.load.image('bg', 'bg.png');
        this.load.image('bg_tile', 'bg_tile.jpg');
        this.load.image('con1', '/conveer/1.png');
    },

    create: function () {
        this.add.tileSprite(window.innerWidth / 2, window.innerHeight / 2, window.innerWidth, window.innerHeight, 'bg_tile');

        var intro = this.add.sprite(midle_window, 0, 'intro').setOrigin(0.5, 0).setDepth(10);
        global_scale = window.innerHeight / intro.height;
        bg_width = intro.width * global_scale;
        intro.setScale(global_scale);

        var conveer_anim = this.add.sprite(midle_window, 0, 'con1');
        conveer_width = conveer_anim.width * global_scale;
        conveer_anim.destroy();

        var start_btn = this.add.sprite(midle_window, window.innerHeight * 0.53, 'start').setOrigin(0.5, 0.5)
            .setDepth(11).setScale(global_scale).setInteractive()
            .on("pointerup", function () {
                start_btn.setScale(global_scale);
                if (isPause) {
                    isPause = false;
                    intro.destroy();
                    start_btn.destroy();
                    tutorial_btn.destroy();
                    raiting_btn.destroy();
                    this.scene.switch('mainSc', {name: 'Move from Logo to Main'});
                }
            }, this)
            .on("pointerdown", function () {
                start_btn.setScale(global_scale * 1.3);
            }, this)
            .on("pointerover", function () {
                start_btn.setScale(global_scale * 1.3);
            }, this)
            .on("pointerout", function () {
                start_btn.setScale(global_scale);
            }, this);
        var tutorial_btn = this.add.sprite(midle_window, window.innerHeight * 0.605, 'tutorial').setOrigin(0.5, 0.5)
            .setDepth(11).setScale(global_scale).setInteractive()
            .on("pointerup", function () {
                tutorial_btn.setScale(global_scale);
                console.log("tutr");
                debugger
                this.scene.start('tutorial', {name: 'Move from Logo to Raiting'});
            }, this)
            .on("pointerdown", function () {
                tutorial_btn.setScale(global_scale * 1.3);
            }, this)
            .on("pointerover", function () {
                tutorial_btn.setScale(global_scale * 1.3);
            }, this)
            .on("pointerout", function () {
                tutorial_btn.setScale(global_scale);
            }, this);
        var raiting_btn = this.add.sprite(midle_window, window.innerHeight * 0.68, 'raiting').setOrigin(0.5, 0.5)
            .setDepth(11).setScale(global_scale).setInteractive()
            .on("pointerup", function () {
                raiting_btn.setScale(global_scale);
                console.log("raiting");
                debugger
                this.scene.start('raiting', {name: 'Move from Logo to Raiting'});
            }, this)
            .on("pointerdown", function () {
                raiting_btn.setScale(global_scale * 1.3);
            }, this)
            .on("pointerover", function () {
                raiting_btn.setScale(global_scale * 1.3);
            }, this)
            .on("pointerout", function () {
                raiting_btn.setScale(global_scale);
            }, this);
    },

    update: function () {
    },

});