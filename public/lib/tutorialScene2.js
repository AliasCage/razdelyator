var downX, upX, downY, upY, threshold = 50;
var numTut = 1;

var tutNow;
var bg;
var textTop;
var textMiddle;
var textBottom;
var trash1;
var trash2;
var trash3;

var Tutorial2 = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function Tutorial2() {
            Phaser.Scene.call(this, {key: 'tutorial2'});
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

        this.load.image('bg_tut', 'tutorial/bg_tut.png');
        //1
        this.load.image('bottom1', 'tutorial/tut1/bottom.png');
        this.load.image('middle1', 'tutorial/tut1/middle.png');
        this.load.image('top1', 'tutorial/tut1/top.png');
        //2
        this.load.image('middle2', 'tutorial/tut2/middle.png');
        this.load.image('top2', 'tutorial/tut2/top.png');

    },

    create: function () {

        if (DEVICE_SIZE === 1) {
            this.add.tileSprite(midle_window, midle_window_h, GLOBAL_WIDTH, GLOBAL_HEIGHT, 'bg_tile');
        } else {
            this.add.graphics().fillStyle(PROGRESS_COLOR_1, 1).fillRect(0, 0, GLOBAL_WIDTH, GLOBAL_HEIGHT);
        }

        bg = this.add.sprite(midle_window, 0, 'bg_tut').setOrigin(0.5, 0).setScale(global_scale/2);

        createNewTut(this);

        this.add.text(midle_window + conveer_width * 0.45, midle_window_h / 22,
            'Пропустить обучение', {font: DEVICE_SIZE * 16 + 'pt Ubuntu'})
            .setOrigin(1, 0.5)
            .setColor('#ffa500')
            .setDepth(11)
            .setInteractive()
            .on("pointerdown", function () {
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
                    if(numTut===7){
                        numTut = 1;
                        isFirstStartGame = false;
                        this.scene.start('mainSc', {name: 'Move from Tutorial to Main'});
                    }
                    numTut++;
                    textTop.destroy();
                    textMiddle.destroy();
                    textBottom.destroy();
                    trash1.destroy();
                    trash2.destroy();
                    trash3.destroy();
                    createNewTut(this);
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
                    if(numTut===1){
                        this.scene.start('logo', {name: 'Move from Tutorial to Logo'});
                    }
                    numTut--;
                    textTop.destroy();
                    textMiddle.destroy();
                    textBottom.destroy();
                    trash1.destroy();
                    trash2.destroy();
                    trash3.destroy();
                    createNewTut(this);
                }
            }, this);

        function createNewTut(tutScene) {
            if(numTut === 1){
                textTop = tutScene.add.sprite(midle_window,  bg.height * 0.2, 'top' + numTut).setOrigin(0.5, 0.5)
                    .setScale(global_scale * 0.45).setAlpha(0);
                tutScene.tweens.add({
                    targets: textTop,
                    alpha: 1,
                    ease: 'Linear',
                    duration: 2500,
                });
                textMiddle = tutScene.add.sprite(midle_window,  bg.height * 0.38, 'middle' + numTut).setOrigin(0.5, 0.5)
                    .setScale(global_scale * 0.45).setAlpha(0);
                tutScene.tweens.add({
                   targets: textMiddle,
                   alpha: 1,
                   ease: 'Linear',
                   duration: 2500,
                   delay: 2500
               });
                trash1 = tutScene.add.sprite(midle_window - bg.width/4,  bg.height * 0.60, 'b1').setOrigin(0.5, 0.5)
                    .setScale(global_scale * 0.45).setAlpha(0);
                tutScene.tweens.add({
                    targets: trash1,
                    alpha: 1,
                    ease: 'Linear',
                    duration: 2500,
                    delay: 2500
                });
                trash2 = tutScene.add.sprite(midle_window,  bg.height * 0.60, 'b9').setOrigin(0.5, 0.5)
                    .setScale(global_scale * 0.45).setAlpha(0);
                tutScene.tweens.add({
                    targets: trash2,
                    alpha: 1,
                    ease: 'Linear',
                    duration: 2500,
                    delay: 2500
                });
                trash3 = tutScene.add.sprite(midle_window + bg.width/4,  bg.height * 0.60, 'g4').setOrigin(0.5, 0.5)
                    .setScale(global_scale * 0.45).setAlpha(0);
                tutScene.tweens.add({
                    targets: trash3,
                    alpha: 1,
                    ease: 'Linear',
                    duration: 2500,
                    delay: 2500
                });
                textBottom = tutScene.add.sprite(midle_window,  bg.height * 0.75, 'bottom' + numTut).setOrigin(0.5, 0.5)
                    .setScale(global_scale * 0.45).setAlpha(0);
                tutScene.tweens.add({
                    targets: textBottom,
                    alpha: 1,
                    ease: 'Linear',
                    duration: 2500,
                    delay: 6000,
                });
            }
            if(numTut === 2){
                textTop = tutScene.add.sprite(midle_window,  bg.height * 0.15, 'top' + numTut).setOrigin(0.5, 0.5)
                    .setScale(global_scale * 0.45).setAlpha(0.1);
                tutScene.tweens.add({
                    targets: textTop,
                    alpha: 1,
                    ease: 'Linear',
                    duration: 2500,
                });
                textMiddle = tutScene.add.sprite(midle_window,  bg.height * 0.25, 'middle' + numTut).setOrigin(0.5, 0.5)
                    .setScale(global_scale * 0.45).setAlpha(0);
                tutScene.tweens.add({
                    targets: textMiddle,
                    alpha: 1,
                    ease: 'Linear',
                    duration: 2500,
                    delay: 2500
                });
                createTrash(tutScene, 1);
            }
            if(numTut === 3){

            }
            if(numTut === 4){

            }
            if(numTut === 5){

            }
            if(numTut === 6){

            }
            if(numTut === 7){

            }
        }
        function createTrash(scene, trashNum){
            var trashKey = getRandomInt(1,20);
            var trashType = getRandomInt(1,2)===1?'g':'b';
            if(trashNum === 1){
                trash3 = scene.add.sprite(midle_window,  bg.height * 0.25, trashType + trashKey).setOrigin(0.5, 0.5)
                    .setScale(global_scale * 0.45).setAlpha(1);
            }else{
                trash3 = scene.add.sprite(midle_window,  bg.height * 0.38, trashType + trashKey).setOrigin(0.5, 0.5)
                    .setScale(global_scale * 0.45).setAlpha(1);
            }
            scene.tweens.add({
                targets: trash3,
                x: midle_window,
                y: GLOBAL_HEIGHT * 0.9,
                alpha: 0.3,
                ease: 'Linear',
                duration: 3500,
                onComplete: function () {
                    trash3.destroy();
                    createTrash(scene, 2);
                },
            });
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


