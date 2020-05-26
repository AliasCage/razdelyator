var downX, upX, downY, upY, threshold = 50;
var numTut = 1;
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
        this.load.video('tut_video_5', 'tutorial/tut_5.mp4', 'canplay', false, true);
        this.load.video('tut_video_6', 'tutorial/tut_6.mp4', 'canplay', false, true);
        this.load.video('tut_video_7', 'tutorial/tut_7.mp4', 'canplay', false, true);
    },

    create: function () {

        this.add.tileSprite(midle_window, midle_window_h, GLOBAL_WIDTH, GLOBAL_HEIGHT, 'bg_tile');

        var tut7 = this.add.video(midle_window, midle_window_h, 'tut_video_7');
        var VIDEO_SCALE = conveer_width / tut7.width;
        tut7
            .setPlaybackRate(0.75)
            .setInteractive()
            .setScale(VIDEO_SCALE)
            .on('pointerdown', savePosition)
            .on("pointerup", function (pointer) {
                //todo:refactoring
                if(!rotate.visible) {
                    saveActivePosition(pointer);
                    if (upX < downX - threshold) {
                        numTut = 1;
                        debugger
                        destroyAll();
                        isFirstStartGame = false;
                        this.scene.start('mainSc', {name: 'Move from Tutorial to Main'});
                        console.log("swipeleft");
                    } else if (upX > downX + threshold) {
                        numTut --;
                        tut7.stop();
                        tut6.play(false, 0);
                        switchVisible(tut7, tut6);
                        console.log("swiperight");
                    } else if (upY < downY - threshold || upY > downY + threshold) {
                        console.log("swipedown|up");
                    } else {
                        numTut = 1;
                        debugger
                        destroyAll();
                        isFirstStartGame = false;
                        this.scene.start('mainSc', {name: 'Move from Tutorial to Main'});
                    }
                }
            }, this);
        var tut6 = this.add.video(midle_window, midle_window_h, 'tut_video_6');
        VIDEO_SCALE = conveer_width / tut6.width;
        tut6
            .setPlaybackRate(0.75)
            .setInteractive()
            .setScale(VIDEO_SCALE)
            .on('pointerdown', savePosition)
            .on("pointerup", function (pointer) {
                if(!rotate.visible) {
                    saveActivePosition(pointer);
                    if (upX < downX - threshold) {
                        numTut++;
                        tut6.stop();
                        tut7.play();
                        switchVisible(tut6, tut7);
                        console.log("swipeleft");
                    } else if (upX > downX + threshold) {
                        numTut--;
                        tut6.stop();
                        tut5.play(false, 0);
                        switchVisible(tut6, tut5);
                        console.log("swiperight");
                    } else if (upY < downY - threshold || upY > downY + threshold) {
                        console.log("swipedown|up");
                    } else {
                        numTut++;
                        tut6.stop();
                        tut7.play();
                        switchVisible(tut6, tut7);
                    }
                }
            });
        var tut5 = this.add.video(midle_window, midle_window_h, 'tut_video_5');
        VIDEO_SCALE = conveer_width / tut5.width;
        tut5
            .setPlaybackRate(0.75)
            .setInteractive()
            .setScale(VIDEO_SCALE)
            .on('pointerdown', savePosition)
            .on("pointerup", function (pointer) {
                if(!rotate.visible) {
                    saveActivePosition(pointer);
                    if (upX < downX - threshold) {
                        numTut++;
                        tut5.stop();
                        tut6.play();
                        switchVisible(tut5, tut6);
                        console.log("swipeleft");
                    } else if (upX > downX + threshold) {
                        numTut--;
                        tut5.stop();
                        tut4.play(false, 0);
                        switchVisible(tut5, tut4);
                        console.log("swiperight");
                    } else if (upY < downY - threshold || upY > downY + threshold) {
                        console.log("swipedown|up");
                    } else {
                        numTut++;
                        tut5.stop();
                        tut6.play();
                        switchVisible(tut5, tut6);
                    }
                }
            });
        var tut4 = this.add.video(midle_window, midle_window_h, 'tut_video_4');
        VIDEO_SCALE = conveer_width / tut4.width;
        tut4
            .setPlaybackRate(0.75)
            .setInteractive()
            .setScale(VIDEO_SCALE)
            .on('pointerdown', savePosition)
            .on("pointerup", function (pointer) {
                if(!rotate.visible) {
                    saveActivePosition(pointer);
                    if (upX < downX - threshold) {
                        numTut++;
                        tut4.stop();
                        tut5.play();
                        switchVisible(tut4, tut5);
                        console.log("swipeleft");
                    } else if (upX > downX + threshold) {
                        numTut--;
                        tut4.stop();
                        tut3.play(false, 0);
                        switchVisible(tut4, tut3);
                        console.log("swiperight");
                    } else if (upY < downY - threshold || upY > downY + threshold) {
                        console.log("swipedown|up");
                    } else {
                        numTut++;
                        tut4.stop();
                        tut5.play();
                        switchVisible(tut4, tut5);
                    }
                }
            });
        var tut3 = this.add.video(midle_window, midle_window_h, 'tut_video_3');
        VIDEO_SCALE = conveer_width / tut3.width;
        tut3
            .setPlaybackRate(0.75)
            .setInteractive()
            .setScale(VIDEO_SCALE)
            .on('pointerdown', savePosition)
            .on("pointerup", function (pointer) {
                if(!rotate.visible) {
                    saveActivePosition(pointer);
                    if (upX < downX - threshold) {
                        numTut++;
                        tut3.stop();
                        tut4.play();
                        switchVisible(tut3, tut4);
                        console.log("swipeleft");
                    } else if (upX > downX + threshold) {
                        numTut--;
                        tut3.stop();
                        tut2.play(false, 0);
                        switchVisible(tut3, tut2);
                        console.log("swiperight");
                    } else if (upY < downY - threshold || upY > downY + threshold) {
                        console.log("swipedown|up");
                    } else {
                        numTut++;
                        tut3.stop();
                        tut4.play();
                        switchVisible(tut3, tut4);
                    }
                }
            });
        var tut2 = this.add.video(midle_window, midle_window_h, 'tut_video_2');
        VIDEO_SCALE = conveer_width / tut2.width;
        tut2
            .setPlaybackRate(0.75)
            .setInteractive()
            .setScale(VIDEO_SCALE)
            .on('pointerdown', savePosition)
            .on("pointerup", function (pointer) {
                if(!rotate.visible) {
                    saveActivePosition(pointer);
                    if (upX < downX - threshold) {
                        numTut++;
                        tut2.stop();
                        tut3.play();
                        switchVisible(tut2, tut3);
                        console.log("swipeleft");
                    } else if (upX > downX + threshold) {
                        numTut--;
                        tut2.stop();
                        tut1.play(false, 0);
                        switchVisible(tut2, tut1);
                        console.log("swiperight");
                    } else if (upY < downY - threshold || upY > downY + threshold) {
                        console.log("swipedown|up");
                    } else {
                        numTut++;
                        tut2.stop();
                        tut3.play();
                        switchVisible(tut2, tut3);
                    }
                }
            });

        //todo: Заменить всё на видео как тут
        var tut1 = this.add.video(midle_window, midle_window_h, 'tut_video_1');
        VIDEO_SCALE = conveer_width / tut1.width;
        tut1
            .setPlaybackRate(0.75)
            .play()
            .setInteractive()
            .setScale(VIDEO_SCALE)
            .on('pointerdown', savePosition)
            .on("pointerup", function (pointer) {
                if(!rotate.visible) {
                    saveActivePosition(pointer);
                    if (upX < downX - threshold) {
                        numTut++;
                        tut1.stop();
                        tut2.play();
                        switchVisible(tut1, tut2);
                        console.log("swipeleft");
                    } else if (upX > downX + threshold) {
                        destroyAll();
                        this.scene.start('logo', {name: 'Move from Tutorial to Logo'});
                        console.log("swiperight");
                    } else if (upY < downY - threshold || upY > downY + threshold) {
                        console.log("swipedown|up");
                    } else {
                        numTut++;
                        tut1.stop();
                        tut2.play();
                        switchVisible(tut1, tut2);
                    }
                }
            }, this);

        this.add.text(midle_window + conveer_width * 0.45, midle_window_h / 22,
            'Пропустить обучение', {font: DEVICE_SIZE * 16 + 'pt Ubuntu'})
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
            '    Далее', {font: DEVICE_SIZE * 16 + 'pt Ubuntu'})
            .setOrigin(1, 0.5)
            .setColor('#ffa500')
            .setDepth(11)
            .setInteractive()
            .on("pointerdown", function () {
                if(!rotate.visible) {
                    if (numTut === 7) {
                        destroyAll();
                        isFirstStartGame = false;
                        this.scene.start('mainSc', {name: 'Move from Tutorial to Main'});
                    }
                    eval('tut' + (numTut).toString()).stop();
                    eval('tut' + (numTut+1).toString()).play(false, 0);
                    switchVisible(eval('tut' + (numTut).toString()), eval('tut' + (numTut+1).toString()));
                    numTut++;
                }
            }, this);

        this.add.text(midle_window - conveer_width * 0.45, midle_window_h *1.9,
            'Свайп ->\n' +
            'Назад', {font: DEVICE_SIZE * 16 + 'pt Ubuntu'})
            .setOrigin(0, 0.5)
            .setColor('#ffa500')
            .setDepth(11)
            .setInteractive()
            .on("pointerdown", function () {
                if(!rotate.visible) {
                    if (numTut === 1) {
                        destroyAll();
                        this.scene.start('logo', {name: 'Move from Tutorial to Logo'});
                    }
                    eval('tut' + (numTut).toString()).stop();
                    eval('tut' + (numTut-1).toString()).play(false, 0);
                    switchVisible(eval('tut' + (numTut).toString()), eval('tut' + (numTut-1).toString()));
                    numTut--;
                }
            }, this);

        var destroyAll = function () {
            numTut = 1;
            tut1.destroy();
            tut2.destroy();
            tut3.destroy();
            tut4.destroy();
            tut5.destroy();
        };

        var bg_clone = this.add.sprite(midle_window, 0, 'bg_clone').setOrigin(0.5, 0).setDepth(20).setScale(global_scale);
        var rotate = this.add.sprite(midle_window, midle_window_h, 'rotate').setOrigin(0.5, 0.5).setDepth(21).setScale(3 * global_scale);
        bg_clone.visible = false;
        rotate.visible = false;
        this.scale.on('orientationchange', function (orientation) {
            if (orientation === 'portrait-primary') {
                bg_clone.visible = false;
                rotate.visible = false;
            } else if (orientation === 'landscape-primary' || orientation === 'landscape-secondary') {
                bg_clone.visible = true;
                rotate.visible = true;
            } else {
                alert(orientation)
            }
        });
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

