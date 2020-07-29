const DUR = 1500;


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
var trash4;

var textTypeTrash1;
var textTypeTrash2;
var textTypeTrash3;
var textTypeTrash4;

var bak_top;
var bak_bottom;

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
        //3
        this.load.image('bottom3', 'tutorial/tut3/bottom.png');
        this.load.image('top3', 'tutorial/tut3/top.png');
        this.load.image('glass', 'tutorial/tut3/glass.png');
        this.load.image('metal', 'tutorial/tut3/metal.png');
        this.load.image('plastic', 'tutorial/tut3/plastic.png');
        this.load.image('paper', 'tutorial/tut3/paper.png');
        //4
        this.load.image('top4', 'tutorial/tut4/top.png');
        this.load.image('food', 'tutorial/tut4/food.png');
        this.load.image('clothing2', 'tutorial/tut4/clothing2.png');
        this.load.image('recyclables4', 'tutorial/tut4/recyclables4.png');
        this.load.image('waste', 'tutorial/tut4/waste3.png');
        //5
        this.load.image('bottom5', 'tutorial/tut5/bottom.png');
        this.load.image('top5', 'tutorial/tut5/top.png');
        //6
        this.load.image('bottom6', 'tutorial/tut6/bottom.png');
        this.load.image('top6', 'tutorial/tut6/top.png');
        this.load.image('text_slow', 'tutorial/tut6/slow.png');
        this.load.image('text_clear', 'tutorial/tut6/clear.png');
        this.load.image('text_one', 'tutorial/tut6/one.png');
        this.load.image('text_auto', 'tutorial/tut6/auto.png');
    },

    create: function () {

        if (DEVICE_SIZE === 1) {
            this.add.tileSprite(midle_window, midle_window_h, GLOBAL_WIDTH, GLOBAL_HEIGHT, 'bg_tile');
        } else {
            this.add.graphics().fillStyle(PROGRESS_COLOR_1, 1).fillRect(0, 0, GLOBAL_WIDTH, GLOBAL_HEIGHT);
        }

        bg = this.add.sprite(midle_window, 0, 'bg_tut').setOrigin(0.5, 0).setScale(global_scale/2).setInteractive()
            .on('pointerdown', savePosition)
            .on("pointerup", function (pointer) {
                if(!rotate.visible) {
                    saveActivePosition(pointer);
                    if (upX < downX - threshold) {
                        if(numTut===7){
                            numTut = 1;
                            isFirstStartGame = false;
                            this.scene.start('mainSc', {name: 'Move from Tutorial to Main'});
                        }
                        numTut++;
                        clearTutScene();
                        createNewTut(this);
                    } else if (upX > downX + threshold) {
                        console.log("swiperight");
                        if(numTut===1){
                            this.scene.start('logo', {name: 'Move from Tutorial to Logo'});
                        }
                        numTut--;
                        clearTutScene();
                        createNewTut(this);
                    } else if (upY < downY - threshold || upY > downY + threshold) {
                        console.log("swipedown|up");
                    } else {
                        if(numTut===7){
                            numTut = 1;
                            isFirstStartGame = false;
                            this.scene.start('mainSc', {name: 'Move from Tutorial to Main'});
                        }
                        numTut++;
                        clearTutScene();
                        createNewTut(this);
                    }
                }
            }, this);

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
                    clearTutScene();
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
                    clearTutScene();
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
                    duration: DUR * 0.4,
                });
                textMiddle = tutScene.add.sprite(midle_window,  bg.height * 0.38, 'middle' + numTut).setOrigin(0.5, 0.5)
                    .setScale(global_scale * 0.45).setAlpha(0);
                tutScene.tweens.add({
                   targets: textMiddle,
                   alpha: 1,
                   ease: 'Linear',
                   duration: DUR,
                   delay: DUR
               });
                trash4 = tutScene.add.sprite(midle_window - bg.width/4,  bg.height * 0.60, 'b19').setOrigin(0.5, 0.5)
                    .setScale(global_scale * 0.45).setAlpha(0);
                tutScene.tweens.add({
                    targets: trash4,
                    alpha: 1,
                    ease: 'Linear',
                    duration: DUR,
                    delay: DUR
                });
                trash2 = tutScene.add.sprite(midle_window,  bg.height * 0.60, 'b9').setOrigin(0.5, 0.5)
                    .setScale(global_scale * 0.45).setAlpha(0);
                tutScene.tweens.add({
                    targets: trash2,
                    alpha: 1,
                    ease: 'Linear',
                    duration: DUR,
                    delay: DUR
                });
                trash3 = tutScene.add.sprite(midle_window + bg.width/4,  bg.height * 0.60, 'g4').setOrigin(0.5, 0.5)
                    .setScale(global_scale * 0.45).setAlpha(0);
                tutScene.tweens.add({
                    targets: trash3,
                    alpha: 1,
                    ease: 'Linear',
                    duration: DUR,
                    delay: DUR
                });
                textBottom = tutScene.add.sprite(midle_window,  bg.height * 0.75, 'bottom' + numTut).setOrigin(0.5, 0.5)
                    .setScale(global_scale * 0.45).setAlpha(0);
                tutScene.tweens.add({
                    targets: textBottom,
                    alpha: 1,
                    ease: 'Linear',
                    duration: DUR,
                    delay: DUR * 2.5,
                });
            }
            if(numTut === 2){
                textTop = tutScene.add.sprite(midle_window,  bg.height * 0.15, 'top' + numTut).setOrigin(0.5, 0.5)
                    .setScale(global_scale * 0.45).setAlpha(0.1);
                tutScene.tweens.add({
                    targets: textTop,
                    alpha: 1,
                    ease: 'Linear',
                    duration: DUR,

                });
                textMiddle = tutScene.add.sprite(midle_window,  bg.height * 0.25, 'middle' + numTut).setOrigin(0.5, 0.5)
                    .setScale(global_scale * 0.45).setAlpha(0);
                tutScene.tweens.add({
                    targets: textMiddle,
                    alpha: 1,
                    ease: 'Linear',
                    duration: DUR,
                    delay: DUR
                });
                createTrashForTut2(tutScene, 1);
            }
            if(numTut === 3){
                textTop = tutScene.add.sprite(midle_window,  bg.height * 0.4, 'top' + numTut).setOrigin(0.5, 0.5)
                    .setScale(global_scale * 0.45).setAlpha(0.1).setDepth(10);
                tutScene.tweens.add({
                    targets: textTop,
                    alpha: 1,
                    ease: 'Linear',
                    duration: DUR * 0.5,
                    onComplete: function () {
                        debugger
                        createTrashForTut3(tutScene, 1);
                    },
                });
                textBottom = tutScene.add.sprite(midle_window,  bg.height * 0.8, 'bottom' + numTut).setOrigin(0.5, 0.5)
                    .setScale(global_scale * 0.45).setAlpha(0);
                tutScene.tweens.add({
                    targets: textBottom,
                    alpha: 1,
                    ease: 'Linear',
                    duration: DUR * 0.5,
                    delay: 6.5 * DUR
                });
                textTypeTrash1 = tutScene.add.sprite(midle_window,  bg.height * 0.57, 'glass')
                    .setScale(global_scale * 0.45).setAlpha(0);
                tutScene.tweens.add({
                    targets: textTypeTrash1,
                    alpha: 1,
                    ease: 'Linear',
                    duration: DUR,
                    delay: DUR * 0.5
                });
                textTypeTrash2 = tutScene.add.sprite(midle_window,  bg.height * 0.6, 'paper')
                    .setScale(global_scale * 0.45).setAlpha(0);
                tutScene.tweens.add({
                    targets: textTypeTrash2,
                    alpha: 1,
                    ease: 'Linear',
                    duration: DUR * 0.5,
                    delay: 2 * DUR
                });
                textTypeTrash3 = tutScene.add.sprite(midle_window,  bg.height * 0.65, 'plastic')
                    .setScale(global_scale * 0.45).setAlpha(0);
                tutScene.tweens.add({
                    targets: textTypeTrash3,
                    alpha: 1,
                    ease: 'Linear',
                    duration: DUR * 0.5,
                    delay: 3.5 * DUR
                });
                textTypeTrash4 = tutScene.add.sprite(midle_window,  bg.height * 0.7, 'metal')
                    .setScale(global_scale * 0.45).setAlpha(0);
                tutScene.tweens.add({
                    targets: textTypeTrash4,
                    alpha: 1,
                    ease: 'Linear',
                    duration: DUR * 0.5,
                    delay: 5 * DUR
                });
                bak_top = tutScene.add.sprite(midle_window - bg_width * 0.5, GLOBAL_HEIGHT / 1.65, 'blue1')
                    .setOrigin(-0.05, 1).setScale(global_scale);
                bak_bottom = tutScene.add.sprite(midle_window - bg_width * 0.5, GLOBAL_HEIGHT / 1.65, 'blue2') // trash2 = низ бака, чтобы не заводить новую переменную
                    .setOrigin(-0.05, 0).setScale(global_scale).setDepth(9);

            }
            if(numTut === 4){
                textTop = tutScene.add.sprite(midle_window,  bg.height * 0.4, 'top' + numTut).setOrigin(0.5, 0.5)
                    .setScale(global_scale * 0.45).setAlpha(0.1).setDepth(10);
                tutScene.tweens.add({
                    targets: textTop,
                    alpha: 1,
                    ease: 'Linear',
                    duration: DUR * 0.5,
                    onComplete: function () {
                        createTrashForTut4(tutScene, 1);
                    },
                });
                textTypeTrash1 = tutScene.add.sprite(midle_window - bg.width/8,  bg.height * 0.56, 'food')
                    .setScale(global_scale * 0.45).setAlpha(0).setOrigin(0, 1);
                tutScene.tweens.add({
                    targets: textTypeTrash1,
                    alpha: 1,
                    ease: 'Linear',
                    duration: DUR,
                    delay: DUR * 0.5
                });
                textTypeTrash2 = tutScene.add.sprite(midle_window - bg.width/8,  bg.height * 0.58, 'clothing2')
                    .setScale(global_scale * 0.45).setAlpha(0).setOrigin(0, 1);
                tutScene.tweens.add({
                    targets: textTypeTrash2,
                    alpha: 1,
                    ease: 'Linear',
                    duration: DUR * 0.5,
                    delay: 2 * DUR
                });
                textTypeTrash3 = tutScene.add.sprite(midle_window - bg.width/8,  bg.height * 0.65, 'waste')
                    .setScale(global_scale * 0.45).setAlpha(0).setOrigin(0, 1);
                tutScene.tweens.add({
                    targets: textTypeTrash3,
                    alpha: 1,
                    ease: 'Linear',
                    duration: DUR * 0.5,
                    delay: 3.2 * DUR
                });
                textTypeTrash4 = tutScene.add.sprite(midle_window - bg.width/8,  bg.height * 0.72, 'recyclables4')
                    .setScale(global_scale * 0.45).setAlpha(0).setOrigin(0, 1);
                tutScene.tweens.add({
                    targets: textTypeTrash4,
                    alpha: 1,
                    ease: 'Linear',
                    duration: DUR * 0.5,
                    delay: 5 * DUR
                });
                bak_top = tutScene.add.sprite(midle_window + bg_width * 0.5, GLOBAL_HEIGHT / 1.65, 'grey1')
                    .setOrigin(1.05, 1).setScale(global_scale);
                bak_bottom = tutScene.add.sprite(midle_window + bg_width * 0.5, GLOBAL_HEIGHT / 1.65, 'grey2') // trash2 = низ бака, чтобы не заводить новую переменную
                    .setOrigin(1.05, 0).setScale(global_scale).setDepth(9);

            }
            if(numTut === 5){
                bak_bottom =  tutScene.add.sprite(0, 0, 'rails').setOrigin(0.5, 0.5).setScale(global_scale)
                    .setPosition(midle_window, GLOBAL_HEIGHT * 0.05).setDepth(1);
                bak_top = tutScene.add.sprite(midle_window + bg_width * 0.2, GLOBAL_HEIGHT * 0.05, 'battary_case')
                    .setOrigin(0.5, 0.5).setScale(global_scale).setDepth(2);
                textTop = tutScene.add.sprite(midle_window,  bg.height * 0.25, 'top' + numTut).setOrigin(0.5, 0.5)
                    .setScale(global_scale * 0.45).setAlpha(0).setDepth(5);
                tutScene.tweens.add({
                    targets: textTop,
                    alpha: 1,
                    ease: 'Linear',
                    duration: DUR,
                    onComplete: function () {
                        createTrashForTut5(tutScene);
                    },
                });
                textBottom = tutScene.add.sprite(midle_window,  bg.height * 0.6, 'bottom' + numTut).setOrigin(0.5, 0.5)
                    .setScale(global_scale * 0.45).setAlpha(0);
                tutScene.tweens.add({
                    targets: textBottom,
                    alpha: 1,
                    ease: 'Linear',
                    duration: DUR,
                    delay: DUR
                });

            }
            if(numTut === 6){
                textTop = tutScene.add.sprite(midle_window,  bg.height * 0.07, 'top' + numTut).setOrigin(0.5, 0.5)
                    .setScale(global_scale * 0.45).setAlpha(0).setDepth(5);
                tutScene.tweens.add({
                    targets: textTop,
                    alpha: 1,
                    ease: 'Linear',
                    duration: DUR
                });


                one_on = tutScene.add.sprite(midle_window - (bg_width / 3), GLOBAL_HEIGHT / 6, 'one_on')
                    .setOrigin(0.5, 0.5).setScale(global_scale).setAlpha(0);
                tutScene.tweens.add({
                    targets: one_on,
                    alpha: 1,
                    ease: 'Linear',
                    duration: DUR,
                    delay: 2.5 * DUR
                });
                tutScene.tweens.add({
                    targets: one_on,
                    alpha: 0,
                    ease: 'Linear',
                    duration: DUR,
                    delay: 5 * DUR
                });
                textTypeTrash2 = tutScene.add.sprite(midle_window, GLOBAL_HEIGHT / 6, 'text_one')
                    .setOrigin(0.5, 0.5).setScale(global_scale*0.45).setAlpha(0);
                tutScene.tweens.add({
                    targets: textTypeTrash2,
                    alpha: 1,
                    ease: 'Linear',
                    duration: DUR,
                    delay: 2.5 * DUR
                });
                tutScene.tweens.add({
                    targets: textTypeTrash2,
                    alpha: 0,
                    ease: 'Linear',
                    duration: DUR,
                    delay: 5 * DUR
                });
                slow_on = tutScene.add.sprite(midle_window - (bg_width / 3), GLOBAL_HEIGHT / 3, 'slow_on')
                    .setOrigin(0.5, 0.5).setScale(global_scale).setAlpha(0);
                tutScene.tweens.add({
                    targets: slow_on,
                    alpha: 1,
                    ease: 'Linear',
                    duration: DUR,
                    delay: 6 * DUR
                });
                tutScene.tweens.add({
                    targets: slow_on,
                    alpha: 0,
                    ease: 'Linear',
                    duration: DUR,
                    delay: 8.5 * DUR
                });
                textTypeTrash3 = tutScene.add.sprite(midle_window, GLOBAL_HEIGHT / 3, 'text_slow')
                    .setOrigin(0.5, 0.5).setScale(global_scale*0.45).setAlpha(0);
                tutScene.tweens.add({
                    targets: textTypeTrash3,
                    alpha: 1,
                    ease: 'Linear',
                    duration: DUR,
                    delay: 6 * DUR
                });
                tutScene.tweens.add({
                    targets: textTypeTrash3,
                    alpha: 0,
                    ease: 'Linear',
                    duration: DUR,
                    delay: 8.5 * DUR
                });
                clear_on = tutScene.add.sprite(midle_window + (bg_width / 3), GLOBAL_HEIGHT / 6, 'clear_on')
                    .setOrigin(0.5, 0.5).setScale(global_scale).setAlpha(0);
                tutScene.tweens.add({
                    targets: clear_on,
                    alpha: 1,
                    ease: 'Linear',
                    duration: DUR,
                    delay: 10 * DUR
                });
                tutScene.tweens.add({
                    targets: clear_on,
                    alpha: 0,
                    ease: 'Linear',
                    duration: DUR,
                    delay: 12.5 * DUR
                });
                textTypeTrash4 = tutScene.add.sprite(midle_window, GLOBAL_HEIGHT / 6, 'text_slow')
                    .setOrigin(0.5, 0.5).setScale(global_scale*0.45).setAlpha(0);
                tutScene.tweens.add({
                    targets: textTypeTrash4,
                    alpha: 1,
                    ease: 'Linear',
                    duration: DUR,
                    delay: 10 * DUR
                });
                tutScene.tweens.add({
                    targets: textTypeTrash4,
                    alpha: 0,
                    ease: 'Linear',
                    duration: DUR,
                    delay: 12.5 * DUR
                });
                auto_on = tutScene.add.sprite(midle_window + (bg_width / 3), GLOBAL_HEIGHT / 3, 'auto_on')
                    .setOrigin(0.5, 0.5).setScale(global_scale).setAlpha(0);
                tutScene.tweens.add({
                    targets: auto_on,
                    alpha: 1,
                    ease: 'Linear',
                    duration: DUR,
                    delay: 14 * DUR
                });
                tutScene.tweens.add({
                    targets: auto_on,
                    alpha: 0,
                    ease: 'Linear',
                    duration: DUR,
                    delay: 16.5 * DUR
                });
                textTypeTrash1 = tutScene.add.sprite(midle_window, GLOBAL_HEIGHT / 3, 'text_auto')
                    .setOrigin(0.5, 0.5).setScale(global_scale*0.45).setAlpha(0);
                tutScene.tweens.add({
                    targets: textTypeTrash1,
                    alpha: 1,
                    ease: 'Linear',
                    duration: DUR,
                    delay: 14 * DUR
                });
                tutScene.tweens.add({
                    targets: textTypeTrash1,
                    alpha: 0,
                    ease: 'Linear',
                    duration: DUR,
                    delay: 16.5 * DUR
                });
                textBottom = tutScene.add.sprite(midle_window,  bg.height * 0.6, 'bottom' + numTut).setOrigin(0.5, 0.5)
                    .setScale(global_scale * 0.45).setAlpha(0);
                tutScene.tweens.add({
                    targets: textBottom,
                    alpha: 1,
                    ease: 'Linear',
                    duration: DUR * 0.5,
                    delay: 18 * DUR
                });
                tutScene.tweens.add({
                    targets: clear_on,
                    alpha: 1,
                    ease: 'Linear',
                    duration: DUR * 0.5,
                    delay: 18 * DUR
                });
                tutScene.tweens.add({
                    targets: auto_on,
                    alpha: 1,
                    ease: 'Linear',
                    duration: DUR * 0.5,
                    delay: 18 * DUR
                });
                tutScene.tweens.add({
                    targets: slow_on,
                    alpha: 1,
                    ease: 'Linear',
                    duration: DUR * 0.5,
                    delay: 18 * DUR
                });
                tutScene.tweens.add({
                    targets: one_on,
                    alpha: 1,
                    ease: 'Linear',
                    duration: DUR * 0.5,
                    delay: 18 * DUR
                });
            }
            if(numTut === 7){

            }
        }
        function createTrashForTut2(scene, trashNum){
            if(numTut !== 2)
                return;
            var trashKey = getRandomInt(1,20);
            var trashType = getRandomInt(1,2)===1?'g':'b';
            if(trashNum === 1){
                trash1 = scene.add.sprite(midle_window,  bg.height * 0.25, trashType + trashKey).setOrigin(0.5, 0.5)
                    .setScale(global_scale * 0.45).setAlpha(1);
            }else{
                trash1 = scene.add.sprite(midle_window,  bg.height * 0.38, trashType + trashKey).setOrigin(0.5, 0.5)
                    .setScale(global_scale * 0.45).setAlpha(1);
            }
            scene.tweens.add({
                targets: trash1,
                x: midle_window,
                y: GLOBAL_HEIGHT * 0.9,
                alpha: 0.3,
                ease: 'Linear',
                duration: DUR * 1.5,
                onComplete: function () {
                    trash1.destroy();
                    createTrashForTut2(scene, 2);
                },
            });
        }
        function createTrashForTut3(scene, trashNum){
            if(numTut !== 3)
                return;
            var trashKey = trashNum === 1 ? 'b4' :  trashNum === 2 ? 'b9' :  trashNum === 3 ? 'b6' :  trashNum === 4 ? 'b8' : 'b' + getRandomInt(1, 20);

            trash3 = scene.add.sprite(midle_window,  bg.height * 0.3,  trashKey).setOrigin(0.5, 0.5)
                .setScale(global_scale * 0.45).setAlpha(1).setDepth(5);
            trashNum++;
            scene.tweens.add({
                targets: trash3,
                x: bak_bottom.x + bak_bottom.width,
                y: bak_bottom.y,
                scaleX: 0.5,
                scaleY: 0.5,
                ease: 'Linear',
                duration: DUR ,
                delay: DUR * 0.5,
                onComplete: function () {
                    trash3.destroy();
                    createTrashForTut3(scene, trashNum);
                },
            });
        }
        function createTrashForTut4(scene, trashNum){
            if(numTut !== 4)
                return;
            var trashKey = trashNum === 1 ? 'g11' :  trashNum === 2 ? 'g6' :  trashNum === 3 ? 'g9' :  trashNum === 4 ? 'g5' : 'g' + getRandomInt(1, 20);

            trash1 = scene.add.sprite(midle_window,  bg.height * 0.3,  trashKey).setOrigin(0.5, 0.5)
                .setScale(global_scale * 0.45).setAlpha(1).setDepth(5);
            trashNum++;
            scene.tweens.add({
                targets: trash1,
                x: bak_bottom.x - bak_bottom.width,
                y: bak_bottom.y,
                scaleX: 0.5,
                scaleY: 0.5,
                ease: 'Linear',
                duration: DUR,
                delay: DUR * 0.5,
                onComplete: function () {
                    trash1.destroy();
                    createTrashForTut4(scene, trashNum);
                },
            });
        }
        function createTrashForTut5(scene){
            if(numTut !== 5)
                return;
            var trashKey = 'a' + getRandomInt(1, 4);
            trash3 = scene.add.sprite(midle_window,  bg.height * 0.4,  trashKey).setOrigin(0.5, 0.5)
                .setScale(global_scale * 0.45).setAlpha(1).setDepth(4);
            scene.tweens.add({
                targets: trash3,
                x: bak_top.x - bak_top.width/2,
                y: bak_top.y,
                scaleX: 0.5,
                scaleY: 0.5,
                ease: 'Linear',
                duration: DUR,
                delay: DUR * 0.5,
                onComplete: function () {
                    trash3.destroy();
                    createTrashForTut5(scene);
                },
            });
        }

        function clearTutScene() {
            if(textTop)
                textTop.destroy();
            if(textMiddle)
                textMiddle.destroy();
            if(textBottom)
                textBottom.destroy();
            if(trash1)
                trash1.destroy();
            if(trash2)
                trash2.destroy();
            if(trash3)
                trash3.destroy();
            if(trash4)
                trash4.destroy();
            if(textTypeTrash1)
                textTypeTrash1.destroy();
            if(textTypeTrash2)
                textTypeTrash2.destroy();
            if(textTypeTrash3)
                textTypeTrash3.destroy();
            if(textTypeTrash4)
                textTypeTrash4.destroy();
            if(bak_bottom)
                bak_bottom.destroy();
            if(bak_top)
                bak_top.destroy();
            if(auto_on)
                auto_on.destroy();
            if(one_on)
                one_on.destroy();
            if(clear_on)
                clear_on.destroy();
            if(slow_on)
                slow_on.destroy();
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


