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


        this.load.setBaseURL('img');

        this.load.video('tut_video_2', 'tutorial/tut_2.mp4', 'loadeddata', false, true);
        this.load.video('tut_video_3', 'tutorial/tut_3.mp4', 'loadeddata', false, true);
        this.load.video('tut_video_4', 'tutorial/tut_4.mp4', 'loadeddata', false, true);
        this.load.video('tut_video_5', 'tutorial/tut_5.mp4', 'loadeddata', false, true);
        this.load.video('tut_video_6', 'tutorial/tut_6.mp4', 'loadeddata', false, true);
        this.load.video('tut_video_7', 'tutorial/tut_7.mp4', 'loadeddata', false, true);
    },

    create: function () {

        this.add.tileSprite(midle_window, midle_window_h, GLOBAL_WIDTH, GLOBAL_HEIGHT, 'bg_tile');

        var tut7 = this.add.video(midle_window, midle_window_h, 'tut_video_7');
        var VIDEO_SCALE = conveer_width / tut7.width;
        tut7.setLoop(true)
            .setPlaybackRate(0.75)
            .setInteractive()
            .setScale(VIDEO_SCALE)
            .on('pointerdown', savePosition)
            .on("pointerup", function (pointer) {
                //todo:refactoring
                saveActivePosition(pointer);
                if (upX < downX - threshold) {
                    debugger
                    destroyAll();
                    this.scene.start('mainSc', {name: 'Move from Tutorial to Main'});
                    console.log("swipeleft");
                } else if (upX > downX + threshold) {
                    tut6.play(true);
                    switchVisible(tut7, tut6);
                    console.log("swiperight");
                } else if (upY < downY - threshold || upY > downY + threshold) {
                    console.log("swipedown|up");
                } else {
                    debugger
                    destroyAll();
                    isFirstStartGame = false;
                    this.scene.start('mainSc', {name: 'Move from Tutorial to Main'});
                }
            }, this);
        var tut6 = this.add.video(midle_window, midle_window_h, 'tut_video_6');
        VIDEO_SCALE = conveer_width / tut6.width;
        tut6.setLoop(true)
            .setPlaybackRate(0.75)
            .setInteractive()
            .setScale(VIDEO_SCALE)
            .on('pointerdown', savePosition)
            .on("pointerup", function (pointer) {
                saveActivePosition(pointer);
                if (upX < downX - threshold) {
                    tut6.stop();
                    tut7.play(true);
                    switchVisible(tut6, tut7);
                    console.log("swipeleft");
                } else if (upX > downX + threshold) {
                    tut5.play(true);
                    switchVisible(tut6, tut5);
                    console.log("swiperight");
                } else if (upY < downY - threshold || upY > downY + threshold) {
                    console.log("swipedown|up");
                } else {
                    tut6.stop();
                    tut7.play(true);
                    switchVisible(tut6, tut7);
                }
            });
        var tut5 = this.add.video(midle_window, midle_window_h, 'tut_video_5');
        VIDEO_SCALE = conveer_width / tut5.width;
        tut5.setLoop(true)
            .setPlaybackRate(0.75)
            .setInteractive()
            .setScale(VIDEO_SCALE)
            .on('pointerdown', savePosition)
            .on("pointerup", function (pointer) {
                saveActivePosition(pointer);
                if (upX < downX - threshold) {
                    tut5.stop();
                    tut6.play(true);
                    switchVisible(tut5, tut6);
                    console.log("swipeleft");
                } else if (upX > downX + threshold) {
                    tut4.play(true);
                    switchVisible(tut5, tut4);
                    console.log("swiperight");
                } else if (upY < downY - threshold || upY > downY + threshold) {
                    console.log("swipedown|up");
                } else {
                    tut5.stop();
                    tut6.play(true);
                    switchVisible(tut5, tut6);
                }
            });
        var tut4 = this.add.video(midle_window, midle_window_h, 'tut_video_4');
        VIDEO_SCALE = conveer_width / tut4.width;
        tut4.setLoop(true)
            .setPlaybackRate(0.75)
            .setInteractive()
            .setScale(VIDEO_SCALE)
            .on('pointerdown', savePosition)
            .on("pointerup", function (pointer) {
                saveActivePosition(pointer);
                if (upX < downX - threshold) {
                    tut4.stop();
                    tut5.play(true);
                    switchVisible(tut4, tut5);
                    console.log("swipeleft");
                } else if (upX > downX + threshold) {
                    tut3.play(true);
                    switchVisible(tut4, tut3);
                    console.log("swiperight");
                } else if (upY < downY - threshold || upY > downY + threshold) {
                    console.log("swipedown|up");
                } else {
                    tut4.stop();
                    tut5.play(true);
                    switchVisible(tut4, tut5);
                }
            });
        var tut3 = this.add.video(midle_window, midle_window_h, 'tut_video_3');
        VIDEO_SCALE = conveer_width / tut3.width;
        tut3.setLoop(true)
            .setPlaybackRate(0.75)
            .setInteractive()
            .setScale(VIDEO_SCALE)
            .on('pointerdown', savePosition)
            .on("pointerup", function (pointer) {
                saveActivePosition(pointer);
                if (upX < downX - threshold) {
                    tut3.stop();
                    tut4.play(true);
                    switchVisible(tut3, tut4);
                    console.log("swipeleft");
                } else if (upX > downX + threshold) {
                    tut2.play(true);
                    switchVisible(tut3, tut2);
                    console.log("swiperight");
                } else if (upY < downY - threshold || upY > downY + threshold) {
                    console.log("swipedown|up");
                } else {
                    tut3.stop();
                    tut4.play(true);
                    switchVisible(tut3, tut4);
                }
            });
        var tut2 = this.add.video(midle_window, midle_window_h, 'tut_video_2');
        VIDEO_SCALE = conveer_width / tut2.width;
        tut2.setLoop(true)
            .setPlaybackRate(0.75)
            .setInteractive()
            .setScale(VIDEO_SCALE)
            .on('pointerdown', savePosition)
            .on("pointerup", function (pointer) {
                saveActivePosition(pointer);
                if (upX < downX - threshold) {
                    tut2.stop();
                    tut3.play(true);
                    switchVisible(tut2, tut3);
                    console.log("swipeleft");
                } else if (upX > downX + threshold) {
                    tut1.play(true, 1);
                    switchVisible(tut2, tut1);
                    console.log("swiperight");
                } else if (upY < downY - threshold || upY > downY + threshold) {
                    console.log("swipedown|up");
                } else {
                    tut2.stop();
                    tut3.play(true);
                    switchVisible(tut2, tut3);
                }
            });

        //todo: Заменить всё на видео как тут
        var tut1 = this.add.video(midle_window, midle_window_h, 'tut_video_1');
        VIDEO_SCALE = conveer_width / tut1.width;
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
                    tut2.play(true);
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
                    tut2.play(true);
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

// var updateTime = function () {
//     if (isInputUserMail) {
//         now1 = this.time.now - timerClear;
//         now2 = this.time.now - timerAuto;
//         now3 = this.time.now - timerAuto;
//         now4 = this.time.now - timerAuto;
//     } else {
//         now1 = this.time.now;
//         now2 = this.time.now;
//         now3 = this.time.now;
//         now4 = this.time.now;
//     }
// };

