var downX, upX, downY, upY, threshold = 50;

var Tutorial = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function Tutorial() {
            Phaser.Scene.call(this, {key: 'tutorial'});
        },

    init: function (data) {
        console.log(data.name);
    },

    preload: function () {
        loader(this);
    },

    create: function () {

        this.add.tileSprite(midle_window, midle_window_h, GLOBAL_WIDTH, GLOBAL_HEIGHT, 'bg_tile');

        var tut5 = this.add.sprite(midle_window, 0, 'tut5')
            .setOrigin(0.5, 0).setScale(global_scale).setInteractive()
            .on('pointerdown', savePosition)
            .on("pointerup", function (pointer) {
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

                //todo:refactoring
                upX = pointer.x;
                upY = pointer.y;
                if (upX < downX - threshold) {
                    tut1.destroy();
                    tut2.destroy();
                    tut3.destroy();
                    tut4.destroy();
                    tut5.destroy();
                    this.scene.start('mainSc', {name: 'Move from Tutorial to Main'});
                    console.log("swipeleft");
                } else if (upX > downX + threshold) {
                    tut4.visible = true;
                    tut5.visible = false;
                    console.log("swiperight");
                } else if (upY < downY - threshold || upY > downY + threshold) {
                    console.log("swipedown|up");
                } else {
                    tut1.destroy();
                    tut2.destroy();
                    tut3.destroy();
                    tut4.destroy();
                    tut5.destroy();
                    isFirstStartGame = false;
                    this.scene.start('mainSc', {name: 'Move from Tutorial to Main'});
                }
            }, this);
        var tut4 = this.add.sprite(midle_window, 0, 'tut4')
            .setOrigin(0.5, 0).setScale(global_scale).setInteractive()
            .on('pointerdown', savePosition)
            .on("pointerup", function (pointer) {
                upX = pointer.x;
                upY = pointer.y;
                if (upX < downX - threshold) {
                    tut4.visible = false;
                    tut5.visible = true;
                    console.log("swipeleft");
                } else if (upX > downX + threshold) {
                    tut4.visible = false;
                    tut3.visible = true;
                    console.log("swiperight");
                } else if (upY < downY - threshold || upY > downY + threshold) {
                    console.log("swipedown|up");
                } else {
                    tut4.visible = false;
                    tut5.visible = true;
                }
            });
        var tut3 = this.add.sprite(midle_window, 0, 'tut3')
            .setOrigin(0.5, 0).setScale(global_scale).setInteractive()
            .on('pointerdown', savePosition)
            .on("pointerup", function (pointer) {
                upX = pointer.x;
                upY = pointer.y;
                if (upX < downX - threshold) {
                    tut3.visible = false;
                    tut4.visible = true;
                    console.log("swipeleft");
                } else if (upX > downX + threshold) {
                    tut3.visible = false;
                    tut2.visible = true;
                    console.log("swiperight");
                } else if (upY < downY - threshold || upY > downY + threshold) {
                    console.log("swipedown|up");
                } else {
                    tut3.visible = false;
                    tut4.visible = true;
                }
            });
        var tut2 = this.add.sprite(midle_window, 0, 'tut2')
            .setOrigin(0.5, 0).setScale(global_scale).setInteractive()
            .on('pointerdown', savePosition)
            .on("pointerup", function (pointer) {
                upX = pointer.x;
                upY = pointer.y;
                if (upX < downX - threshold) {
                    tut2.visible = false;
                    tut3.visible = true;
                    console.log("swipeleft");
                } else if (upX > downX + threshold) {
                    tut2.visible = false;
                    tut1.visible = true;
                    console.log("swiperight");
                } else if (upY < downY - threshold || upY > downY + threshold) {
                    console.log("swipedown|up");
                } else {
                    tut2.visible = false;
                    tut3.visible = true;
                }
            });
        var tut1 = this.add.sprite(midle_window, 0, 'tut1')
            .setOrigin(0.5, 0).setScale(global_scale).setInteractive()
            .on('pointerdown', savePosition)
            .on("pointerup", function (pointer) {
                upX = pointer.x;
                upY = pointer.y;
                if (upX < downX - threshold) {
                    tut1.visible = false;
                    tut2.visible = true;
                    console.log("swipeleft");
                } else if (upX > downX + threshold) {
                    tut1.destroy();
                    tut2.destroy();
                    tut3.destroy();
                    tut4.destroy();
                    tut5.destroy();
                    this.scene.start('logo', {name: 'Move from Tutorial to Logo'});
                    console.log("swiperight");
                } else if (upY < downY - threshold || upY > downY + threshold) {
                    console.log("swipedown|up");
                } else {
                    tut1.visible = false;
                    tut2.visible = true;
                }
            }, this);
    },

    update: function () {

    },
});

var savePosition = function (pointer) {
    downX = pointer.x;
    downY = pointer.y;
};

