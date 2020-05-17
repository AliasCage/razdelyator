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
        var groundBar = this.add.graphics().fillStyle(COLOR_PRIMARY, 0.6).fillRect(0, 0, GLOBAL_WIDTH, GLOBAL_HEIGHT);
        var progressBox = this.add.graphics().fillStyle(COLOR_DARK, 0.7)
            .fillRect(midle_window - GLOBAL_WIDTH * 0.475, GLOBAL_HEIGHT * 0.9, GLOBAL_WIDTH * 0.95, 50);
        var progressBar = this.add.graphics();
        this.load.on('progress', function (value) {
            progressBar.clear().fillStyle(COLOR_PRIMARY, 1)
                .fillRect(midle_window - GLOBAL_WIDTH * 0.45, GLOBAL_HEIGHT * 0.9 + 10, GLOBAL_WIDTH * 0.9 * value, 30);
        });
        this.load.on('complete', function () {
            progressBar.destroy();
            progressBox.destroy();
            groundBar.destroy();
        });
    },

    create: function () {

        this.add.tileSprite(midle_window, midle_window_h, GLOBAL_WIDTH, GLOBAL_HEIGHT, 'bg_tile');

        var tut5 = this.add.sprite(midle_window, 0, 'tut5')
            .setOrigin(0.5, 0).setScale(global_scale).setInteractive()
            .on('pointerdown', savePosition)
            .on("pointerup", function (pointer) {
                updateTime();

                //todo:refactoring
                saveActivePosition(pointer);
                if (upX < downX - threshold) {
                    destroyAll();
                    this.scene.start('mainSc', {name: 'Move from Tutorial to Main'});
                    console.log("swipeleft");
                } else if (upX > downX + threshold) {
                    switchVisible(tut5, tut4);
                    console.log("swiperight");
                } else if (upY < downY - threshold || upY > downY + threshold) {
                    console.log("swipedown|up");
                } else {
                    destroyAll();
                    isFirstStartGame = false;
                    this.scene.start('mainSc', {name: 'Move from Tutorial to Main'});
                }
            }, this);
        var tut4 = this.add.sprite(midle_window, 0, 'tut4')
            .setOrigin(0.5, 0).setScale(global_scale).setInteractive()
            .on('pointerdown', savePosition)
            .on("pointerup", function (pointer) {
                saveActivePosition(pointer);
                if (upX < downX - threshold) {
                    switchVisible(tut4, tut5);
                    console.log("swipeleft");
                } else if (upX > downX + threshold) {
                    switchVisible(tut4, tut3);
                    console.log("swiperight");
                } else if (upY < downY - threshold || upY > downY + threshold) {
                    console.log("swipedown|up");
                } else {
                    switchVisible(tut4, tut5);
                }
            });
        var tut3 = this.add.sprite(midle_window, 0, 'tut3')
            .setOrigin(0.5, 0).setScale(global_scale).setInteractive()
            .on('pointerdown', savePosition)
            .on("pointerup", function (pointer) {
                saveActivePosition(pointer);
                if (upX < downX - threshold) {
                    switchVisible(tut3, tut4);
                    console.log("swipeleft");
                } else if (upX > downX + threshold) {
                    switchVisible(tut3, tut2);
                    console.log("swiperight");
                } else if (upY < downY - threshold || upY > downY + threshold) {
                    console.log("swipedown|up");
                } else {
                    switchVisible(tut3, tut4);
                }
            });
        var tut2 = this.add.sprite(midle_window, 0, 'tut2')
            .setOrigin(0.5, 0).setScale(global_scale).setInteractive()
            .on('pointerdown', savePosition)
            .on("pointerup", function (pointer) {
                saveActivePosition(pointer);
                if (upX < downX - threshold) {
                    switchVisible(tut2, tut3);
                    console.log("swipeleft");
                } else if (upX > downX + threshold) {
                    tut1.play(true, 1);
                    switchVisible(tut2, tut1);
                    console.log("swiperight");
                } else if (upY < downY - threshold || upY > downY + threshold) {
                    console.log("swipedown|up");
                } else {
                    switchVisible(tut2, tut3);
                }
            });

        //todo: Заменить всё на видео как тут
        var tut1 = this.add.video(midle_window, midle_window_h, 'tut_video_1');
        var VIDEO_SCALE = conveer_width / tut1.width;
        tut1.setLoop(true)
            .setPlaybackRate(0.75)
            .play(true)
            .setInteractive()
            .setScale(VIDEO_SCALE)
            .on('pointerdown', savePosition)
            .on("pointerup", function (pointer) {
                saveActivePosition(pointer);
                if (upX < downX - threshold) {
                    tut1.stop();
                    switchVisible(tut1, tut2);
                    console.log("swipeleft");
                } else if (upX > downX + threshold) {
                    destroyAll();
                    this.scene.start('logo', {name: 'Move from Tutorial to Logo'});
                    console.log("swiperight");
                } else if (upY < downY - threshold || upY > downY + threshold) {
                    console.log("swipedown|up");
                } else {
                    tut1.stop();
                    switchVisible(tut1, tut2);
                }
            }, this);
        this.add.text(midle_window + conveer_width * 0.45, midle_window_h / 10,
            'Пропустить обучение', {font: DEVICE_SIZE * 19 + 'pt Ubuntu'})
            .setOrigin(1, 0.5)
            .setColor('#ffa500')
            .setDepth(11)
            .setInteractive()
            .on("pointerdown", function () {
                destroyAll();
                this.scene.start('mainSc', {name: 'Move from Tutorial to MainScene'});
            }, this);

        this.add.text(midle_window + conveer_width * 0.45, midle_window_h *1.9,
            '<- Свайп\n' +
            '    Далее', {font: DEVICE_SIZE * 19 + 'pt Ubuntu'})
            .setOrigin(1, 0.5)
            .setColor('#ffa500')
            .setDepth(11);

        this.add.text(midle_window - conveer_width * 0.45, midle_window_h *1.9,
            'Свайп ->\n' +
            'Назад', {font: DEVICE_SIZE * 19 + 'pt Ubuntu'})
            .setOrigin(0, 0.5)
            .setColor('#ffa500')
            .setDepth(11);

        var destroyAll = function () {
            tut1.destroy();
            tut2.destroy();
            tut3.destroy();
            tut4.destroy();
            tut5.destroy();
        };
    },

    update: function () {

    },
});

var switchVisible = function (visible_OFF, visible_ON) {
    visible_OFF.visible = false;
    visible_ON.visible = true;
};

var savePosition = function (pointer) {
    downX = pointer.x;
    downY = pointer.y;
};

var saveActivePosition = function (pointer) {
    upX = pointer.x;
    upY = pointer.y;
};

var updateTime = function () {
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
};

