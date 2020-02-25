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
        this.load.image('intro', 'logo.png');
        this.load.image('bg_tile', 'bg_tile.jpg');
        this.load.image('raiting', 'raiting.png');
        this.load.image('start', 'start.png');
        this.load.image('tutorial', 'tutorial.png');
    },

    create: function () {
        debugger
        this.add.tileSprite(window.innerWidth / 2, window.innerHeight / 2, window.innerWidth, window.innerHeight, 'bg_tile');

        var intro = this.add.sprite(midle_window, 0, 'intro').setOrigin(0.5, 0).setDepth(10);
        var scale = window.innerHeight / intro.height;
        intro.setScale(scale);

        var start_btn = this.add.sprite(midle_window, window.innerHeight * 0.53, 'start').setOrigin(0.5, 0.5).setDepth(11)
            .setScale(scale)
            .setInteractive()
            .on("pointerup", function () {
                console.log("start");
                start_btn.setScale(scale);
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
                start_btn.setScale(scale * 1.3);
            }, this)
            .on("pointerout", function () {
                start_btn.setScale(scale);
            }, this);
        var tutorial_btn = this.add.sprite(midle_window, window.innerHeight * 0.605, 'tutorial').setOrigin(0.5, 0.5).setDepth(11)
            .setScale(scale)
            .setInteractive()
            .on("pointerup", function () {
                tutorial_btn.setScale(scale);
                console.log("tutr");
            }, this)
            .on("pointerdown", function () {
                tutorial_btn.setScale(scale * 1.3);
            }, this)
            .on("pointerout", function () {
                tutorial_btn.setScale(scale);
            }, this);
        var raiting_btn = this.add.sprite(midle_window, window.innerHeight * 0.68, 'raiting').setOrigin(0.5, 0.5).setDepth(11).setScale(scale)
            .setInteractive()
            .on("pointerup", function () {
                raiting_btn.setScale(scale);
                console.log("raiting");1
            }, this)
            .on("pointerdown", function () {
                raiting_btn.setScale(scale * 1.3);
            }, this)
            .on("pointerout", function () {
                raiting_btn.setScale(scale);
            }, this);
    },

    update: function () {
    },

});