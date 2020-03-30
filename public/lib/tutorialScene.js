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
        var progressBar = this.add.graphics();
        var groundBar = this.add.graphics().fillStyle(COLOR_PRIMARY, 0.6).fillRect(0, 0, window.innerWidth, window.innerHeight);
        var progressBox = this.add.graphics().fillStyle(COLOR_DARK, 0.7).fillRect(midle_window - 160, 270, 320, 50);
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
    },

    create: function () {
        debugger
        this.add.tileSprite(window.innerWidth / 2, window.innerHeight / 2, window.innerWidth, window.innerHeight, 'bg_tile');

        var tut5 = this.add.sprite(midle_window, 0, 'tut5')
            .setOrigin(0.5, 0).setScale(global_scale).setInteractive()
            .on("pointerup", function () {
                if (isInputUserMail) {
                    now1 = this.time.now - timerClear;
                    now2 = this.time.now - timerAuto;
                    now3 = this.time.now - timerAuto;
                    now4 = this.time.now - timerAuto;
                } else {
                    now1 = this.time.now;
                    now2 = this.time.now;
                    now3 = this.time.now;
                    now4 = this.time.now;
                }
                tut5.destroy();
                isPause = false;
                this.scene.start('mainSc', {name: 'Move from Tutorial to Main'});
            }, this);
        var tut4 = this.add.sprite(midle_window, 0, 'tut4')
            .setOrigin(0.5, 0).setScale(global_scale).setInteractive()
            .on("pointerup", function () {
                tut4.destroy();
            });
        var tut3 = this.add.sprite(midle_window, 0, 'tut3')
            .setOrigin(0.5, 0).setScale(global_scale).setInteractive()
            .on("pointerup", function () {
                tut3.destroy();
            });
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

