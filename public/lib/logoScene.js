var Logo = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function Logo() {
            Phaser.Scene.call(this, {key: 'logo'});
        },

    init: function (data) {
        this.conveer_anim_width = data.conveer_anim_width;
        console.log(name)
    },


    preload: function () {
        var groundBar = this.add.graphics();
        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        groundBar.fillStyle(COLOR_PRIMARY, 0.6);
        groundBar.fillRect(0, 0, window.innerWidth, window.innerHeight);
        progressBox.fillStyle(COLOR_DARK, 0.7);
        progressBox.fillRect(midle_window - 160, 270, 320, 50);
        this.load.on('progress', function (value) {
            progressBar.clear();
            progressBar.fillStyle(COLOR_PRIMARY, 1);
            progressBar.fillRect(midle_window + 10 - 150, 280, 300 * value - 10, 30);
        });

        this.load.on('complete', function () {
            progressBar.destroy();
            progressBox.destroy();
            groundBar.destroy();
        });

        this.load.setBaseURL('img');
        this.load.image('intro', 'intro.png');
        this.load.image('bg_tile', 'bg_tile.jpg');
    },

    create: function () {
        debugger
        this.add.tileSprite(window.innerWidth / 2, window.innerHeight / 2, window.innerWidth, window.innerHeight, 'bg_tile');

        var intro = this.add.sprite(0, 0, 'intro').setOrigin(0.5, 0).setPosition(midle_window, 0).setDepth(10);
        intro.setScale(window.innerHeight / intro.height, window.innerHeight / intro.height);

        this.input.on('pointerup', function (pointer) {
            if (isPause) {
                isPause = false;
                intro.destroy();
                this.scene.switch('mainSc', {name: 'test', restart: true});
            }
        }, this);
    },

    update: function () {
    },

});