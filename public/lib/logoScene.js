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
        this.load.image('bg_tile', 'bg_tile.png');
        this.load.image('con1', '/conveer/1.png');

        this.load.image('darknes', 'darknes.png');
        this.load.image('blue1', 'blue_up.png');
        this.load.image('blue2', 'blue_down.png');
        this.load.image('grey1', 'grey_up.png');
        this.load.image('grey2', 'grey_down.png');
        this.load.image('blank', 'blank.png');
        this.load.image('+1', '+1.png');
        this.load.image('+2', '+2.png');
        this.load.image('+3', '+3.png');

        this.load.image('battary_case', 'battary/battary_case.png');
        this.load.image('rails', 'battary/rails.png');
        this.load.image('a1', 'battary/a1.png');
        this.load.image('a2', 'battary/a2.png');
        this.load.image('a3', 'battary/a3.png');

        this.load.image('auto_off', 'btn/auto_off.png');
        this.load.image('auto_on', 'btn/auto_on.png');
        this.load.image('clear_off', 'btn/clear_off.png');
        this.load.image('clear_on', 'btn/clear_on.png');
        this.load.image('one_off', 'btn/one_off.png');
        this.load.image('one_on', 'btn/one_on.png');
        this.load.image('slow_off', 'btn/slow_off.png');
        this.load.image('slow_on', 'btn/slow_on.png');

        this.load.image('con2', '/conveer/2.png');
        this.load.image('con3', '/conveer/3.png');
        this.load.image('con4', '/conveer/4.png');
        this.load.image('con5', '/conveer/5.png');
        this.load.image('con6', '/conveer/6.png');
        this.load.image('con7', '/conveer/7.png');
        this.load.image('con8', '/conveer/8.png');
        this.load.image('con9', '/conveer/9.png');
        this.load.image('con10', '/conveer/10.png');

        this.load.image('b1', 'trash/blue/1.png');
        this.load.image('b2', 'trash/blue/2.png');
        this.load.image('b3', 'trash/blue/3.png');
        this.load.image('b4', 'trash/blue/4.png');
        this.load.image('b5', 'trash/blue/5.png');
        this.load.image('b6', 'trash/blue/6.png');
        this.load.image('b7', 'trash/blue/7.png');
        this.load.image('b8', 'trash/blue/8.png');
        this.load.image('b9', 'trash/blue/9.png');
        this.load.image('b10', 'trash/blue/10.png');
        this.load.image('b11', 'trash/blue/11.png');
        this.load.image('b12', 'trash/blue/12.png');
        this.load.image('b13', 'trash/blue/13.png');
        this.load.image('b14', 'trash/blue/14.png');
        this.load.image('b15', 'trash/blue/15.png');
        this.load.image('b16', 'trash/blue/16.png');
        this.load.image('b17', 'trash/blue/17.png');
        this.load.image('b18', 'trash/blue/18.png');
        this.load.image('b19', 'trash/blue/19.png');
        this.load.image('b20', 'trash/blue/20.png');

        this.load.image('g1', 'trash/grey/1.png');
        this.load.image('g2', 'trash/grey/2.png');
        this.load.image('g3', 'trash/grey/3.png');
        this.load.image('g4', 'trash/grey/4.png');
        this.load.image('g5', 'trash/grey/5.png');
        this.load.image('g6', 'trash/grey/6.png');
        this.load.image('g7', 'trash/grey/7.png');
        this.load.image('g8', 'trash/grey/8.png');
        this.load.image('g9', 'trash/grey/9.png');
        this.load.image('g10', 'trash/grey/10.png');
        this.load.image('g11', 'trash/grey/11.png');
        this.load.image('g12', 'trash/grey/12.png');
        this.load.image('g13', 'trash/grey/13.png');
        this.load.image('g14', 'trash/grey/14.png');
        this.load.image('g15', 'trash/grey/15.png');
        this.load.image('g16', 'trash/grey/16.png');
        this.load.image('g17', 'trash/grey/17.png');
        this.load.image('g18', 'trash/grey/18.png');
        this.load.image('g19', 'trash/grey/19.png');
        this.load.image('g20', 'trash/grey/20.png');

        this.load.image('tut1', 'tutorial/tut1.png');
        this.load.image('tut2', 'tutorial/tut2.png');
        this.load.image('tut3', 'tutorial/tut3.png');

        this.load.image('cell', 'cell.jpg');
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
                    this.scene.start('mainSc', {name: 'Move from Logo to Main'});
                }
            }, this)
            .on("pointerdown", function () {
                start_btn.setScale(global_scale * 1.3);
            })
            .on("pointerover", function () {
                start_btn.setScale(global_scale * 1.3);
            })
            .on("pointerout", function () {
                start_btn.setScale(global_scale);
            });
        var tutorial_btn = this.add.sprite(midle_window, window.innerHeight * 0.605, 'tutorial').setOrigin(0.5, 0.5)
            .setDepth(11).setScale(global_scale).setInteractive()
            .on("pointerup", function () {
                tutorial_btn.setScale(global_scale);
                console.log("tutr");
                this.scene.start('tutorial', {name: 'Move from Logo to Tutorial'});
            }, this)
            .on("pointerdown", function () {
                tutorial_btn.setScale(global_scale * 1.3);
            })
            .on("pointerover", function () {
                tutorial_btn.setScale(global_scale * 1.3);
            })
            .on("pointerout", function () {
                tutorial_btn.setScale(global_scale);
            });
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
            })
            .on("pointerover", function () {
                raiting_btn.setScale(global_scale * 1.3);
            })
            .on("pointerout", function () {
                raiting_btn.setScale(global_scale);
            });
    },

    update: function () {
    },

});