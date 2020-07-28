var downX, upX, downY, upY, threshold = 50;
var numTut = 1;

var tutNow;
var Tutorial = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function Tutorial() {
            Phaser.Scene.call(this, {key: 'tutorial'});
        },

    init: function (data) {
        console.log(data.name);
        numTut = 1;
    },

    preload: function () {
        var groundBar = this.add.graphics().fillStyle(PROGRESS_COLOR_2, 0.6).fillRect(0, 0, GLOBAL_WIDTH, GLOBAL_HEIGHT);
        var progressBox = this.add.graphics().fillStyle(PROGRESS_COLOR_1, 0.7)
            .fillRect(midle_window - GLOBAL_WIDTH * 0.475, GLOBAL_HEIGHT * 0.9, GLOBAL_WIDTH * 0.95, 50);
        var progressBar = this.add.graphics();
        this.load.on('progress', function (value) {
            progressBar.clear().fillStyle(PROGRESS_COLOR_2, 1)
                .fillRect(midle_window - GLOBAL_WIDTH * 0.45, GLOBAL_HEIGHT * 0.9 + 10, GLOBAL_WIDTH * 0.9 * value, 30);
        });
        this.load.on('complete', function () {
            progressBar.destroy();
            progressBox.destroy();
            groundBar.destroy();
        });

        this.load.setBaseURL('img');
        this.load.video('tut_video_3', 'tutorial/tut_3.mp4', 'canplay', false, true);
        this.load.video('tut_video_4', 'tutorial/tut_4.mp4', 'canplay', false, true);
        this.load.video('tut_video_5', 'tutorial/tut_5.mp4', 'canplay', false, true);
        this.load.video('tut_video_6', 'tutorial/tut_6.mp4', 'canplay', false, true);
        this.load.video('tut_video_7', 'tutorial/tut_7.mp4', 'canplay', false, true);
    },

    create: function () {

        this.add.tileSprite(midle_window, midle_window_h, GLOBAL_WIDTH, GLOBAL_HEIGHT, 'bg_tile');
        createNewTut(this);
        this.add.text(midle_window + conveer_width * 0.45, midle_window_h / 22,
            'Пропустить обучение', {font: DEVICE_SIZE * 16 + 'pt Ubuntu'})
            .setOrigin(1, 0.5)
            .setColor('#ffa500')
            .setDepth(11)
            .setInteractive()
            .setScale(global_scale/2)
            .on("pointerdown", function () {
                this.scene.start('mainSc', {name: 'Move from Tutorial to MainScene'});
            }, this);

        this.add.text(midle_window + conveer_width * 0.45, midle_window_h *1.9,
            '<- Свайп\n' +
            '    Далее', {font: DEVICE_SIZE * 16 + 'pt Ubuntu'})
            .setOrigin(1, 0.5)
            .setColor('#ffa500')
            .setDepth(11)
            .setScale(global_scale/2)
            .setInteractive()
            .on("pointerdown", function () {
                if(!rotate.visible) {
                    if(numTut===7){
                        numTut = 1;
                        isFirstStartGame = false;
                        this.scene.start('mainSc', {name: 'Move from Tutorial to Main'});
                    }
                    numTut++;
                    createNewTut(this);
                }
            }, this);

        this.add.text(midle_window - conveer_width * 0.45, midle_window_h *1.9,
            'Свайп ->\n' +
            'Назад', {font: DEVICE_SIZE * 16 + 'pt Ubuntu'})
            .setOrigin(0, 0.5)
            .setColor('#ffa500')
            .setDepth(11)
            .setScale(global_scale/2)
            .setInteractive()
            .on("pointerdown", function () {
                if(!rotate.visible) {
                    if(numTut===1){
                        this.scene.start('logo', {name: 'Move from Tutorial to Logo'});
                    }
                    numTut--;
                    createNewTut(this);
                }
            }, this);
        function createNewTut(tutScene) {
            if(tutNow){
                debugger
                tutNow.seekTo(0);
                tutNow.destroy();
            }
            tutNow = tutScene.add.video(midle_window, midle_window_h, 'tut_video_'+numTut).setCurrentTime(0);
            var VIDEO_SCALE = conveer_width / tutNow.width;
            tutNow.setLoop()
                .play()
                .setInteractive()
                .setScale(VIDEO_SCALE)
                .on('pointerdown', savePosition)
                .on("pointerup", function (pointer) {
                    if(!rotate.visible) {
                        saveActivePosition(pointer);
                        tutNow.setCurrentTime(0);
                        if (upX < downX - threshold) {
                            if(numTut===7){
                                numTut = 1;
                                isFirstStartGame = false;
                                tutScene.scene.start('mainSc', {name: 'Move from Tutorial to Main'});
                            }
                            numTut++;
                            createNewTut(tutScene);
                        } else if (upX > downX + threshold) {
                            console.log("swiperight");
                            if(numTut===1){
                                tutScene.scene.start('logo', {name: 'Move from Tutorial to Logo'});
                            }
                            numTut--;
                            createNewTut(tutScene);
                        } else if (upY < downY - threshold || upY > downY + threshold) {
                            console.log("swipedown|up");
                        } else {
                            if(numTut===7){
                                numTut = 1;
                                isFirstStartGame = false;
                                tutScene.scene.start('mainSc', {name: 'Move from Tutorial to Main'});
                            }
                            numTut++;
                            createNewTut(tutScene);
                        }
                    }
                }, this);
        }
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

var savePosition = function (pointer) {
    downX = pointer.x;
    downY = pointer.y;
};

var saveActivePosition = function (pointer) {
    upX = pointer.x;
    upY = pointer.y;
};


