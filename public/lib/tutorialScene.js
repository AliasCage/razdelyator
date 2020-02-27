var Tutorial = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function Tutorial() {
            Phaser.Scene.call(this, {key: 'tutorial'});
        },

    init: function (data) {
        debugger
        console.log(data.name);
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
        this.load.image('tut1', 'tutorial/tut1.png');
        this.load.image('tut2', 'tutorial/tut2.png');
        this.load.image('tut3', 'tutorial/tut3.png');
    },

    create: function () {
        debugger
        this.add.tileSprite(window.innerWidth / 2, window.innerHeight / 2, window.innerWidth, window.innerHeight, 'bg_tile');

        var tut3 = this.add.sprite(midle_window, 0, 'tut3')
            .setOrigin(0.5, 0).setScale(global_scale).setInteractive()
            .on("pointerup", function () {
                tut3.destroy();
                this.scene.start('mainSc', {name: 'Move from Tutorial to Main'});
            }, this);
        var tut2 = this.add.sprite(midle_window, 0, 'tut2')
            .setOrigin(0.5, 0).setScale(global_scale).setInteractive()
            .on("pointerup", function () {
                tut2.destroy();
            });
        var tut1 = this.add.sprite(midle_window, 0, 'tut1')
            .setOrigin(0.5, 0).setScale(global_scale).setInteractive()
            .on("pointerup", function () {
                tut1.destroy();
            });
    },

    update: function () {

    },
});

