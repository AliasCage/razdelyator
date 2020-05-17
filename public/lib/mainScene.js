var isPause = true;
var isNeedDarknes = false;
var switchToRaiting = false;
var cursors;

var scoreMultiplier = 0;
var scoreMultiplierDis = 1;
var player_score = 0;
var text_score;
var group;
var activeGroup;
var toxicGroup;
var destroyGroup = [];

var bonusSkill = null;
var folowObject = null;
var skillShadow;

var blue = ['b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8', 'b9', 'b10', 'b11', 'b12', 'b13', 'b14', 'b15', 'b16',
    'b17', 'b18', 'b19', 'b20'];
var grey = ['g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'g7', 'g8', 'g9', 'g10', 'g11', 'g12', 'g13', 'g14', 'g15', 'g16',
    'g17', 'g18', 'g19', 'g20'];
var acc = ['a1', 'a2', 'a3'];

var blue_bak;
var grey_bak;

//кнопки скилов
var clear_on;
var auto_on;
var one_on;
var slow_on;

var light_auto_on;
var light_one_on;
var light_slow_on;

var slow_trash;
var one_trash;
var auto_trash;

var one_type;
var auto_type;

var speedTrash;
var intervalCreateTrash;

var scoreDifficulty;

var nowCreateTrash;
var nowScoreDifficulty;

const intervalScoreDiff = 2200;
const timerClear = 90000;
const timerAuto = 45000;
const timerOne = 45000;
const timerSlow = 45000;

const batary_case_speed = 4500;
var batary_counter = -1;

var tutFirstGameTraining;
var isPausePast = false;
var pauseMenu = false;
var pauseCon;
var tweensBattaryCase;
var MainSc = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:
        function MainSc() {
            Phaser.Scene.call(this, {key: 'mainSc'});
        },

    init: function (data) {

        console.log(data.name);
        player_score = 0;

        scoreMultiplier = null;
        now = this.time.now;
        slow_trash = false;
        one_trash = false;
        auto_trash = false;
        scoreDifficulty = this.time.now;
        intervalCreateTrash = 3000;
        speedTrash = 59;

        one_type = 0;
        auto_type = 0;
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

        this.load.scenePlugin('rexuiplugin', 'lib/rexuiplugin.min.js', 'rexUI', 'rexUI');
    },

    create: function () {

        cursors = this.input.keyboard.createCursorKeys();
        this.physics.world.checkCollision.up = false;
        this.anims.create({
            key: 'conveer',
            frames: [
                {key: 'con1'},
                {key: 'con2'},
                {key: 'con3'},
                {key: 'con4'},
                {key: 'con5'},
                {key: 'con6'},
                {key: 'con7'},
                {key: 'con8'},
                {key: 'con9'},
                {key: 'con10'}
            ],
            frameRate: 12,
            repeat: -1
        });

        this.add.tileSprite(midle_window, midle_window_h, GLOBAL_WIDTH, GLOBAL_HEIGHT, 'bg_tile');
        this.add.sprite(midle_window, 0, 'bg').setOrigin(0.5, 0).setScale(global_scale);

        blue_bak = this.physics.add.sprite(midle_window - bg_width * 0.5, GLOBAL_HEIGHT / 1.65, 'blue1')
            .setOrigin(-0.05, 1).setScale(global_scale);
        this.physics.add.sprite(midle_window - bg_width * 0.5, GLOBAL_HEIGHT / 1.65, 'blue2')
            .setOrigin(-0.05, 0).setScale(global_scale).setDepth(9);
        grey_bak = this.physics.add.sprite(midle_window + bg_width * 0.5, GLOBAL_HEIGHT / 1.65, 'grey1')
            .setOrigin(1.05, 1).setScale(global_scale);
        this.physics.add.sprite(midle_window + bg_width * 0.5, GLOBAL_HEIGHT / 1.65, 'grey2')
            .setOrigin(1.05, 0).setScale(global_scale).setDepth(9);

        this.add.sprite(midle_window, 0, 'con1').setOrigin(0.5, 0).setScale(global_scale).play('conveer');

        pauseCon = this.add.sprite(midle_window, 0, 'con1').setOrigin(0.5, 0).setScale(global_scale).setVisible(false);

        this.physics.add.sprite(0, 0, 'rails').setOrigin(0.5, 0.5).setScale(global_scale)
            .setPosition(midle_window, GLOBAL_HEIGHT * 0.05).setDepth(1);
        var battary_case = this.physics.add.sprite(midle_window + bg_width * 0.4, GLOBAL_HEIGHT * 0.05, 'battary_case')
            .setOrigin(0.5, 0.5).setScale(global_scale).setDepth(2);
        tweensBattaryCase =  this.tweens.add({
            targets: battary_case,
            x: midle_window - bg_width * 0.4,
            ease: 'Linear',
            duration: batary_case_speed,
            repeat: -1,
            yoyo: true
        });

        activeGroup = this.physics.add.group();
        toxicGroup = this.physics.add.group({
            collideWorldBounds: true
        });
        group = this.physics.add.group({
            collideWorldBounds: true
        });

        var side_middle = (conveer_width + (bg_width - conveer_width)) * 0.25;
        var gsSubstrat = 1.35 * global_scale;
        light_auto_on = this.add.sprite(midle_window + (bg_width / 3), GLOBAL_HEIGHT / 3.14, 'substrat')
            .setOrigin(0.5, 0.5).setScale(global_scale).setInteractive().setTint(0xffffff, 0xffffff, 0xffffff, 0xffffff).setAlpha(0.5);
        light_auto_on.visible = false;
        this.tweens.add({
            targets: light_auto_on,
            scaleX: gsSubstrat,
            scaleY: gsSubstrat,
            ease: 'Linear',
            duration: 900,
            repeat: -1,
            yoyo: true
        });
        this.add.sprite(midle_window + (bg_width / 3), GLOBAL_HEIGHT / 3, 'auto_off')
             .setOrigin(0.5, 0.5).setScale(global_scale);
        auto_on = this.add.sprite(midle_window + (bg_width / 3), GLOBAL_HEIGHT / 3, 'auto_on')
            .setOrigin(0.5, 0.5).setScale(global_scale).setInteractive().on("pointerdown", autoTrash, this);
        auto_on.visible = isInputUserMail;

        this.add.sprite(midle_window + (bg_width / 3), GLOBAL_HEIGHT / 6, 'clear_off')
            .setOrigin(0.5, 0.5).setScale(global_scale);
        clear_on = this.add.sprite(midle_window + (bg_width / 3), GLOBAL_HEIGHT / 6, 'clear_on')
            .setOrigin(0.5, 0.5).setScale(global_scale).setInteractive().on("pointerdown", clearConveer, this);
        clear_on.visible = isInputUserMail;

        light_one_on = this.add.sprite(midle_window - (bg_width / 3), GLOBAL_HEIGHT / 6.5, 'substrat')
            .setOrigin(0.5, 0.5).setScale(global_scale).setInteractive().setTint(0xffffff, 0xffffff, 0xffffff, 0xffffff).setAlpha(0.5);
        light_one_on.visible = false;
        this.tweens.add({
            targets: light_one_on,
            scaleX: gsSubstrat,
            scaleY: gsSubstrat,
            ease: 'Linear',
            duration: 900,
            repeat: -1,
            yoyo: true
        });
        this.add.sprite(midle_window - (bg_width / 3), GLOBAL_HEIGHT / 6, 'one_off')
            .setOrigin(0.5, 0.5).setScale(global_scale);
        one_on = this.add.sprite(midle_window - (bg_width / 3), GLOBAL_HEIGHT / 6, 'one_on')
            .setOrigin(0.5, 0.5).setScale(global_scale).setInteractive().on("pointerdown", oneTrash, this);
        one_on.visible = isInputUserMail;


        light_slow_on = this.add.sprite(midle_window - (bg_width / 3), GLOBAL_HEIGHT / 3.14, 'substrat')
            .setOrigin(0.5, 0.5).setScale(global_scale).setInteractive().setTint(0xffffff, 0xffffff, 0xffffff, 0xffffff).setAlpha(0.5);
        light_slow_on.visible = false;
        this.tweens.add({
            targets: light_slow_on,
            scaleX: gsSubstrat,
            scaleY: gsSubstrat,
            ease: 'Linear',
            duration: 900,
            repeat: -1,
            yoyo: true
        });
        var slow_off = this.add.sprite(midle_window - (bg_width / 3), GLOBAL_HEIGHT / 3, 'slow_off')
            .setOrigin(0.5, 0.5).setScale(global_scale);
        slow_on = this.add.sprite(midle_window - (bg_width / 3), GLOBAL_HEIGHT / 3, 'slow_on')
            .setOrigin(0.5, 0.5).setScale(global_scale).setInteractive().on("pointerdown", slowTrash, this);
        slow_on.visible = isInputUserMail;

        this.add.sprite(midle_window + side_middle, GLOBAL_HEIGHT * 0.875, 'menu_on')
            .setOrigin(0, 0).setScale(global_scale).setInteractive()
            .on("pointerup", function () {
                tweensBattaryCase.pause();
                pauseCon.visible = true;
                nowCreateTrash  = now;
                nowScoreDifficulty = scoreDifficulty;
                pauseMenu = true;
                createDialog.call(this);
            }, this);

        text_score = this.add.text(midle_window - side_middle * 1.6, GLOBAL_HEIGHT * 0.9, player_score, {
            font: DEVICE_SIZE * 6 + 'vh Ubuntu',
            fill: "#fff",
        }).setStroke('#ffa500', 5).setShadow(2, 2, "#333333", 2, true, true);


        this.physics.add.overlap(battary_case, group, function (s1, s2) {
            if (s2.type === 'acc') {
                scoreMultiplier++;
                group.remove(s2);
                destroyGroup.push(s2);
                if(bonusSkill !== null){
                    bonusSkill.destroy();
                    folowObject = null;
                }
                s2.destroy();
                createCoin(s2.x - 50, s2.y + 50, 3, this, s2.hasSkillType);
            }else{
                scoreMultiplier = 0;
                scoreMultiplierDis = 1;
            }
        }, null, this);

        this.physics.add.overlap(blue_bak, group, function (s1, s2) {
            if (s2.type === 'blue') {
                scoreMultiplier++;
                group.remove(s2);
                destroyGroup.push(s2);
                s2.setVelocity((s1.x - s2.x) * DEVICE_SIZE_SPEED / 2, (s1.y - s2.y) * DEVICE_SIZE_SPEED);
                s2.setAngularVelocity(-50 * DEVICE_SIZE_SPEED);
                if(bonusSkill !== null){
                    bonusSkill.destroy();
                    folowObject = null;
                }
                createCoin(s2.x + 50, s2.y - 50, 2, this, s2.hasSkillType);
            }else{
                scoreMultiplier = 0;
                scoreMultiplierDis = 1;
            }
        }, null, this);
        this.physics.add.overlap(blue_bak, activeGroup, function (s1, s2) {
            if (s2.type === 'blue' && auto_trash) {
                scoreMultiplier++;
                activeGroup.remove(s2);
                destroyGroup.push(s2);
                s2.setVelocity((s1.x - s2.x) * DEVICE_SIZE_SPEED / 2, (s1.y - s2.y) * DEVICE_SIZE_SPEED);
                s2.setAngularVelocity(-50 * DEVICE_SIZE_SPEED);
                if(bonusSkill !== null){
                    bonusSkill.destroy();
                    folowObject = null;
                }
                createCoin(s2.x + 50, s2.y - 50, 2, this, s2.hasSkillType);
            }else{
                scoreMultiplier = 0;
                scoreMultiplierDis = 1;
            }
        }, null, this);
        this.physics.add.overlap(grey_bak, activeGroup, function (s1, s2) {
            if (s2.type === 'grey' && auto_trash) {
                scoreMultiplier++;
                activeGroup.remove(s2);
                destroyGroup.push(s2);
                s2.setVelocity((s1.x - s2.x) * DEVICE_SIZE_SPEED / 2, (s1.y - s2.y) * DEVICE_SIZE_SPEED);
                s2.setAngularVelocity(-50 * DEVICE_SIZE_SPEED);
                if(bonusSkill !== null){
                    bonusSkill.destroy();
                    folowObject = null;
                }
                createCoin(s2.x - 50, s2.y - 50, 2, this, s2.hasSkillType);
            }else{
                scoreMultiplier = 0;
            }
        }, null, this);
        this.physics.add.overlap(grey_bak, group, function (s1, s2) {
            if (s2.type === 'grey') {
                scoreMultiplier++;
                group.remove(s2);
                destroyGroup.push(s2);
                s2.setVelocity((s1.x - s2.x) * DEVICE_SIZE_SPEED / 2, (s1.y - s2.y) * DEVICE_SIZE_SPEED);
                s2.setAngularVelocity(50 * DEVICE_SIZE_SPEED);
                if(bonusSkill !== null){
                    bonusSkill.destroy();
                    folowObject = null;
                }
                createCoin(s2.x - 50, s2.y - 50, 1, this, s2.hasSkillType);
            }else{
                scoreMultiplier = 0;
            }
        }, null, this);

        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            //На пк попытка вынести мусор за пределы поля
            if ((midle_window + bg_width * 0.5) < dragX || (midle_window - bg_width * 0.5) > dragX) {
                gameObject.body.moves = true;
            } else {
                gameObject.body.moves = false;
                gameObject.x = dragX;
                gameObject.y = dragY;
            }
            gameObject.body.enable = false;
            gameObject.setDepth(9);
        });

        this.input.on('dragend', function (pointer, gameObject, dragX, dragY) {
            activeGroup.remove(gameObject);
            if (gameObject.y < 2) {
                gameObject.setPosition(gameObject.x, 2);
            }
            setInactive(gameObject, this);
            gameObject.body.moves = true;
            gameObject.body.enable = true;
            if (gameObject.x < (midle_window - conveer_width / 8)) {
                if (gameObject.y < 305) {
                    gameObject.setVelocity(200 * DEVICE_SIZE_SPEED, 50 * DEVICE_SIZE_SPEED);
                } else {
                    gameObject.setVelocity(200 * DEVICE_SIZE_SPEED, -300 * DEVICE_SIZE_SPEED);
                }
                gameObject.setAngularVelocity(-40 * DEVICE_SIZE_SPEED);
            } else if (gameObject.x > (midle_window + conveer_width / 8)) {
                if (gameObject.y < 305) {
                    gameObject.setVelocity(-200 * DEVICE_SIZE_SPEED, 50 * DEVICE_SIZE_SPEED);
                } else {
                    gameObject.setVelocity(-200 * DEVICE_SIZE_SPEED, -300 * DEVICE_SIZE_SPEED);
                }
                gameObject.setAngularVelocity(40 * DEVICE_SIZE_SPEED);
            } else {
                gameObject.setVelocityY((speedTrash + 150) * DEVICE_SIZE_SPEED);
            }
            gameObject.setGravityY(300 * DEVICE_SIZE_SPEED);
            gameObject.setBounce(0.4);
        });

        var coliderGroupFunction = function (s1, s2) {
            if (!s1.body.moves) {
                s2.body.moves = false;
                if (s2.type === 'acc' && s2.active) {
                    toxicality(s2);
                }
            }
            s2.active = false;
        };
        this.physics.add.collider(toxicGroup, group, coliderGroupFunction);
        this.physics.add.collider(toxicGroup, toxicGroup, coliderGroupFunction);
        this.physics.add.collider(group, group, coliderGroupFunction);

        var zone_left = this.physics.add.sprite(0, 0, 'con9').setOrigin(1, 0).setAlpha(0).setImmovable(true);
        zone_left.setPosition(midle_window - conveer_width / 6, 0);
        this.physics.add.collider(zone_left, group);

        var zone_right = this.physics.add.sprite(0, 0, 'con9').setOrigin(0, 0).setAlpha(0).setImmovable(true);
        zone_right.setPosition(midle_window + conveer_width / 6, 0);
        this.physics.add.collider(zone_right, group);

        var zone_bottom = this.physics.add.sprite(midle_window, GLOBAL_HEIGHT, 'blank').setOrigin(0.5, 0.2).setAlpha(0);
        this.physics.add.overlap(zone_bottom, activeGroup, function (s1, s2) {

            activeGroup.remove(s2);
            setInactive(s2, this);
            s2.body.moves = false;
            s2.body.enable = true;
        });

        this.physics.add.overlap(zone_bottom, group, function (s1, s2) {
            s2.body.moves = false;
            s2.body.enable = true;
            s2.active = false;

            if (s2.type === 'acc') {
                toxicality(s2);
            }
        });

        var coliderActiveGroup = function (s1, s2) {
            if (!auto_trash || auto_type === 1 && s1.type === 'grey' || auto_type === 2 && s1.type === 'blue') {
                if (!s2.body.allowdraggable && !s2.active) {
                    activeGroup.remove(s1);
                    setInactive(s1, this);
                    s1.body.moves = false;
                    if (s1.type === 'acc') {
                        toxicality(s2);
                    }
                }
            }
        };
        this.physics.add.overlap(activeGroup, group, coliderActiveGroup);
        this.physics.add.overlap(activeGroup, toxicGroup, coliderActiveGroup);

        // this.physics.add.overlap(activeGroup, grey_bak, destoyGreyTrash, null, this);

        isPause = false;

        tutFirstGameTraining = this.add.sprite(midle_window, 0, 'tut4').setDepth(10)
            .setOrigin(0.5, 0).setScale(global_scale).setInteractive().setVisible(false)
            .on("pointerdown", function (pointer) {
                isFirstGameTrainingDisplay = true;
                activeGroup.getChildren().forEach(function (trash) {
                    trash.setVelocityY(speedTrash * DEVICE_SIZE_SPEED);
                });
                group.getChildren().forEach(function (trash) {
                    trash.setVelocityY((speedTrash + 350) * DEVICE_SIZE_SPEED);
                });
                tutFirstGameTraining.setVisible(false);
            });

    },

    update: function () {

        //GameOver
        if (switchToRaiting) {
            switchToRaiting = false;
            if (activeGroup) {
                clearGroup(activeGroup);
            }
            if (toxicGroup) {
                clearGroup(toxicGroup);
            }
            if (group) {
                clearGroup(group);
            }

            isPause = true;
            this.scene.start('raiting', {name: 'Move from Main to Raiting'});
        }


        if (isPause || pauseMenu || tutFirstGameTraining.visible) {
            isPausePast = true;
            activeGroup.getChildren().forEach(function (trash) {
            trash.setVelocityY(0);
        });
            group.getChildren().forEach(function (trash) {
                trash.setVelocityY(0);
            });
            return
        }
        if(isPausePast){
            now2 = this.time.now - now2;
            now3 = this.time.now - now3;
            now4 = this.time.now - now4;
            now = this.time.now - nowCreateTrash;
            scoreDifficulty = this.time.now - nowScoreDifficulty;
            isPausePast = false;
        }

        // Увеличение скорости падения мусора, уменьшение интервала создания мусора
        if (player_score > 5) {
            if (this.time.now - scoreDifficulty > intervalScoreDiff) {
                speedTrash = speedTrash + 2;
                if (intervalCreateTrash > 1000) {
                    intervalCreateTrash = intervalCreateTrash - 100;
                } else if (intervalCreateTrash > 200) {
                    intervalCreateTrash = intervalCreateTrash - 20;
                }
                scoreDifficulty = this.time.now;
            }
        }

        //На экране очень много мусора, но экран не засорён
        if ((toxicGroup.getChildren().length + group.getChildren().length) > 150) {
            clearGroup(group);
            switchToRaiting = true;
            isPause = true;
        }
        // Изменения очков
        text_score.text = player_score;

        if(scoreMultiplier>4){
            var t = scoreMultiplier>14 ? 'x5':scoreMultiplier>9 ? 'x3' : 'x2';
            text_score.text = text_score.text + t;
            scoreMultiplierDis = Math.floor(scoreMultiplier/5)>14 ? 5: Math.floor(scoreMultiplier/5)>9 ? 3 : 2;
        }

        if (Array.isArray(destroyGroup) && destroyGroup.length) {
            var shift = destroyGroup.shift();
            this.tweens.add({
                targets: shift,
                scaleX: 0.10,
                scaleY: 0.10,
                ease: 'Linear',
                duration: 500,
                onComplete: function () {
                    shift.destroy();
                },
            });
        }
        if (isNeedDarknes) {
            darkness.call(this);
        }

        var interval = intervalCreateTrash + (300 + Math.floor((1500 - 300) * Math.random()));
        // Изменение интервала создания мусора в два раза реже
        if (slow_trash) {
            interval = interval * 2;
        }

        // Создание мусора
        if (this.time.now - now > interval) {
            now = this.time.now;
            var obj = createAndDropObject.call(this);
            if(obj.hasSkillType !== null){
                console.log (obj.hasSkillType);
                folowObject = obj;
                bonusSkill = this.add.sprite(obj.x, obj.y, obj.hasSkillType+'_on').setOrigin(0.5, 0.5).setScale(global_scale * 0.5).setDepth(20).setTint(COLOR_PRIMARY).setAlpha(0.5);
            }
        }

        if(bonusSkill !== null) {
            if(folowObject!==null){
                this.tweens.add({
                    targets: bonusSkill,
                    x: folowObject.x + DEVICE_SIZE * 17,
                    y: folowObject.y - DEVICE_SIZE * 17,
                    ease: 'Linear',
                    duration: 0.1,
                    delay: 0.1,
                });
            }else{
                bonusSkill.destroy();
            }
        }
        //Автосортровка
        if (auto_trash) {
            autoSort();
        }
        //Уменьшение скорости падения мусора
        if (slow_trash) {
            activeGroup.getChildren().forEach(function (trash) {
                trash.setVelocityY(speedTrash * DEVICE_SIZE_SPEED / 2);
            });
        }
        //таймеры для работы скилов
        if (this.time.now - now2 > timerAuto / 2 && auto_trash) {
            auto_trash = false;
            now2 = this.time.now;
            light_auto_on.visible = false;
            auto_type = 0;
        }

        if ((this.time.now - now3 > timerOne / 2) && one_trash) {
            if (one_type === 1) {
                grey_bak.setTint();
            }
            if (one_type === 2) {
                blue_bak.setTint();
            }
            light_one_on.visible = false;
            one_trash = false;
            now3 = this.time.now;
            one_type = 0;
        }

        if ((this.time.now - now4 > timerSlow / 2) && slow_trash ) {
            slow_trash = false;
            light_slow_on.visible = false;
            now4 = this.time.now;
        }
    },
});

function toxicality(accumulator) {
    accumulator.setTint(TOXIC_COLOR, TOXIC_COLOR, TOXIC_COLOR, TOXIC_COLOR);
    group.getChildren().forEach(function (trash) {
        toxicGroup.add(trash);
        trash.isToxic = true;
        trash.setTint(TOXIC_COLOR, TOXIC_COLOR, TOXIC_COLOR, TOXIC_COLOR);
    });
    toxicGroup.getChildren().forEach(function (trash) {
        group.remove(trash);
    });
    group.clear(true);
    isNeedDarknes = true;
}

function darkness() {
    isNeedDarknes = false;
    var scale = DEVICE_SIZE === 1 ? 1 / (global_scale) : 4 * global_scale;
    var darknes = this.add.sprite(midle_window, 0, 'darknes').setOrigin(0.5, 0).setScale(scale).setDepth(11);
    this.tweens.add({
        targets: darknes,
        alpha: 0,
        ease: 'Linear',
        duration: 2000,
        onComplete: function () {
            darknes.destroy();
        },
    });
}

function setInactive(object) {
    if(bonusSkill !== null)
        bonusSkill.destroy();
    folowObject = null;
    group.add(object);
    object.removeInteractive();
    object.body.allowdraggable = false;
    object.setVelocityY((speedTrash + 350) * DEVICE_SIZE_SPEED);
    object.setTint(INACTIVE_COLOR, INACTIVE_COLOR, INACTIVE_COLOR, INACTIVE_COLOR);

    console.log(object.y);
    //Level go to game over
    if (object.y < 0) {
        clearGroup(group);
        switchToRaiting = true;
        isPause = true;
    }
}

function clearGroup(g) {
    g.clear(true);
    g.getChildren().forEach(function (trash) {
        trash.destroy();
    });
}

var createCoin = function (x, y, points, scene, skill) {
    folowObject = null;
    if(scoreMultiplier !== 0){
        player_score  += points * scoreMultiplierDis;
    }
    else{
        player_score += points;
    }
    var coin = scene.add.sprite(x, y, '+' + points).setOrigin(0.5, 0.5).setScale(global_scale * 0.5).setDepth(20);
    scene.tweens.add({
        targets: coin,
        x: text_score.x,
        y: text_score.y,
        scaleX: 0.10,
        scaleY: 0.10,
        ease: 'Linear',
        duration: 500,
        delay: 300,
        onComplete: function () {
            coin.destroy();
        },
    });
    if(skill !== null){
        skillShadow = scene.add.sprite(x, y, skill+'_on').setOrigin(0.5, 0.5).setScale(global_scale * 0.5).setDepth(20).setTint(COLOR_PRIMARY).setAlpha(0.5);
        scene.tweens.add({
            targets: skillShadow,
            x: eval(skill+'_on').x,
            y: eval(skill+'_on').y,
            scaleX: 0.10,
            scaleY: 0.10,
            ease: 'Linear',
            duration: 500,
            onComplete: function () {
                skillShadow.destroy();
                eval(skill+'_on').visible = true;
            },
        });
    }
};

function createAndDropObject() {
    var trash;
    var trashType;
    var trashSkillType = null;
    var number = Math.random();
    var toxic = false;
    if(Math.random() > 0.7){
        var skillType = Math.random();
        if(skillType > 0.7){
            trashSkillType = 'auto';
        }
        else if(skillType > 0.55){
            trashSkillType = 'slow';
        }
        else if(skillType > 0.35){
            trashSkillType = 'clear';
        }else{
            trashSkillType = 'one';
        }
    }
    if (one_trash) {
        if (one_type === 1) {
            grey_bak.setTint(INACTIVE_COLOR, INACTIVE_COLOR, INACTIVE_COLOR, INACTIVE_COLOR);
            trash = blue[Math.floor(Math.random() * blue.length)];
            trashType = 'blue';
        }
        if (one_type === 2) {
            blue_bak.setTint(INACTIVE_COLOR, INACTIVE_COLOR, INACTIVE_COLOR, INACTIVE_COLOR);
            trash = grey[Math.floor(Math.random() * grey.length)];
            trashType = 'grey';
        }
    } else {
        if (number > 0.8 && batary_counter < 0) {
            if (isFirstGameTraining) {
                isFirstGameTraining = false;
                nowCreateTrash  = now;
                nowScoreDifficulty = scoreDifficulty;
                tutFirstGameTraining.setVisible(true);
            }
            trash = acc[Math.floor(Math.random() * acc.length)];
            trashType = 'acc';
            toxic = true;
            batary_counter = 1;
        } else if (number > 0.4) {
            trash = blue[Math.floor(Math.random() * blue.length)];
            trashType = 'blue';
            batary_counter--;
        } else {
            trash = grey[Math.floor(Math.random() * grey.length)];
            trashType = 'grey';
            batary_counter--;
        }
    }

    var diff = getRandomInt(-conveer_width / 8, conveer_width / 8);
    var obj = activeGroup.create(midle_window + diff, -20, trash).setDepth(0);
    obj.setSize(obj.width / 2, obj.height / 2);
    obj.type = trashType;
    obj.isToxic = toxic;
    obj.hasSkillType = trashSkillType;
    obj.setScale(global_scale / 1.25);
    obj.setInteractive();
    obj.setCollideWorldBounds(true);
    if (!isPause) {
        obj.body.moves = true;
        obj.setVelocityY(speedTrash * DEVICE_SIZE_SPEED);
    } else {
        obj.body.moves = false;
    }
    this.input.setDraggable(obj);
    return obj;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function autoTrash() {
    createNotify('auto', this);
    if (one_type === 0) {
        auto_type = getRandomInt(1, 2);
    } else {
        auto_type = one_type;
    }
    auto_trash = true;
    auto_on.visible = false;
    light_auto_on.visible = true;
    now2 = this.time.now;
}

function autoSort() {
    activeGroup.getChildren().forEach(function (trash) {
        if (auto_type === 1 && trash.type === 'blue') {
            trash.setVelocity((blue_bak.x - trash.x) * DEVICE_SIZE_SPEED / 2, (blue_bak.y - trash.y) * DEVICE_SIZE_SPEED);
            trash.setAngularVelocity(-1 * DEVICE_SIZE_SPEED);
        } else if (auto_type === 2 && trash.type === 'grey') {
            trash.setVelocity((grey_bak.x - trash.x) * DEVICE_SIZE_SPEED / 2, (grey_bak.y - trash.y) * DEVICE_SIZE_SPEED);
            trash.setAngularVelocity(-1 * DEVICE_SIZE_SPEED);
        }
    });
}

function clearConveer() {
    createNotify('clear', this);
    group.clear(true);
    group.getChildren().forEach(function (trash) {
        if (trash.type !== 'acc') {
            this.tweens.add({
                targets: trash,
                x: text_score.x,
                y: text_score.y,
                scaleX: 0.10,
                scaleY: 0.10,
                ease: 'Linear',
                duration: 500,
                delay: 300,
                onComplete: function () {
                    trash.destroy();
                },
            });
            group.remove(trash);
        }
    });
    now1 = this.time.now;
    clear_on.visible = false;
}

function slowTrash() {
    createNotify('slow', this);
    slow_trash = true;
    slow_on.visible = false;
    light_slow_on.visible = true;
    now4 = this.time.now;
}

function oneTrash() {
    createNotify('one', this);
    if (auto_type === 0) {
        one_type = getRandomInt(1, 2);
    } else {
        one_type = auto_type;
    }
    one_trash = true;
    light_one_on.visible = true;
    one_on.visible = false;
    now3 = this.time.now;
}

function createNotify(typeSkill, scene) {
    var s = scene.add.sprite(midle_window, midle_window_h * 0.5, typeSkill+'_notify')
        .setOrigin(0.5, 0.5).setScale(global_scale).setDepth(2);
    scene.tweens.add({
        targets: s,
        x: midle_window,
        y: midle_window_h * 0.5,
        scaleX: 0.5,
        scaleY: 0.5,
        ease: 'Linear',
        duration: 500,
        delay: 300,
        onComplete: function () {
            s.destroy();
        },
    });

}