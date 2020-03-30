// import Coin from "./coin";

var isPause = true;
var isNeedDarknes = false;
var switchToRaiting = false;
var cursors;

var nowDifficulty;

var player_score = 0;
var text_score;
var group;
var activeGroup;
var toxicGroup;
var destroyGroup = [];

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

var light_clear_on;
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

const intervalScoreDiff = 2200;


const timerClear = 90000;
const timerAuto = 45000;
const timerOne = 45000;
const timerSlow = 45000;


const batary_case_speed = 4500;
var batary_counter = -1;
var dialog;


var MainSc = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:
        function MainSc() {
            Phaser.Scene.call(this, {key: 'mainSc'});
        },

    init: function (data) {
        console.log(data.name);
        player_score = 0;

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

        var groundBar = this.add.graphics().fillStyle(COLOR_PRIMARY, 0.6).fillRect(0, 0, window.innerWidth, window.innerHeight);
        var progressBox = this.add.graphics().fillStyle(COLOR_DARK, 0.7).fillRect(midle_window - 160, 270, 320, 50);
        var progressBar = this.add.graphics();
        this.load.on('progress', function (value) {
            progressBar.clear().fillStyle(COLOR_PRIMARY, 1).fillRect(midle_window + 10 - 150, 280, 300 * value - 10, 30);
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

        this.add.tileSprite(midle_window, window.innerHeight / 2, window.innerWidth, window.innerHeight, 'bg_tile');
        this.add.sprite(midle_window, 0, 'bg').setOrigin(0.5, 0).setScale(global_scale);

        blue_bak = this.physics.add.sprite(midle_window - bg_width * 0.5, window.innerHeight / 1.65, 'blue1')
            .setOrigin(-0.05, 1).setScale(global_scale);
        this.physics.add.sprite(midle_window - bg_width * 0.5, window.innerHeight / 1.65, 'blue2')
            .setOrigin(-0.05, 0).setScale(global_scale).setDepth(9);
        grey_bak = this.physics.add.sprite(midle_window + bg_width * 0.5, window.innerHeight / 1.65, 'grey1')
            .setOrigin(1.05, 1).setScale(global_scale);
        this.physics.add.sprite(midle_window + bg_width * 0.5, window.innerHeight / 1.65, 'grey2')
            .setOrigin(1.05, 0).setScale(global_scale).setDepth(9);

        this.add.sprite(midle_window, 0, 'con1').setOrigin(0.5, 0).setScale(global_scale).play('conveer');

        this.physics.add.sprite(0, 0, 'rails').setOrigin(0.5, 0.5).setScale(global_scale)
            .setPosition(midle_window, window.innerHeight * 0.05).setDepth(1);
        var battary_case = this.physics.add.sprite(midle_window + bg_width * 0.4, window.innerHeight * 0.05, 'battary_case')
            .setOrigin(0.5, 0.5).setScale(global_scale).setDepth(2);
        this.tweens.add({
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
        light_auto_on = this.add.sprite(midle_window + (bg_width / 3), window.innerHeight / 3, 'substrat')
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
        this.add.sprite(midle_window + (bg_width / 3), window.innerHeight / 3, 'auto_off')
            .setOrigin(0.5, 0.5).setScale(global_scale);
        auto_on = this.add.sprite(midle_window + (bg_width / 3), window.innerHeight / 3, 'auto_on')
            .setOrigin(0.5, 0.5).setScale(global_scale).setInteractive().on("pointerdown", autoTrash, this);
        auto_on.visible = false;

        this.add.sprite(midle_window + (bg_width / 3), window.innerHeight / 6, 'clear_off')
            .setOrigin(0.5, 0.5).setScale(global_scale);
        clear_on = this.add.sprite(midle_window + (bg_width / 3), window.innerHeight / 6, 'clear_on')
            .setOrigin(0.5, 0.5).setScale(global_scale).setInteractive().on("pointerdown", clearConveer, this);
        clear_on.visible = false;

        light_one_on = this.add.sprite(midle_window - (bg_width / 3), window.innerHeight / 6, 'substrat')
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
        this.add.sprite(midle_window - (bg_width / 3), window.innerHeight / 6, 'one_off')
            .setOrigin(0.5, 0.5).setScale(global_scale);
        one_on = this.add.sprite(midle_window - (bg_width / 3), window.innerHeight / 6, 'one_on')
            .setOrigin(0.5, 0.5).setScale(global_scale).setInteractive().on("pointerdown", oneTrash, this);
        one_on.visible = false;


        light_slow_on = this.add.sprite(midle_window - (bg_width / 3), window.innerHeight / 3, 'substrat')
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
        var slow_off = this.add.sprite(midle_window - (bg_width / 3), window.innerHeight / 3, 'slow_off')
            .setOrigin(0.5, 0.5).setScale(global_scale);
        slow_on = this.add.sprite(midle_window - (bg_width / 3), window.innerHeight / 3, 'slow_on')
            .setOrigin(0.5, 0.5).setScale(global_scale).setInteractive().on("pointerdown", slowTrash, this);
        slow_on.visible = false;

        this.add.sprite(midle_window + side_middle, window.innerHeight * 0.875, 'menu_on')
            .setOrigin(0, 0).setScale(global_scale).setInteractive()
            .on("pointerup", function () {
                if (!dialog) {
                    createDialog.call(this);
                }
            }, this);

        text_score = this.add.text(midle_window - side_middle * 1.6, window.innerHeight * 0.9, player_score, {
            font: '6vh Ubuntu',
            fill: "#fff",

        }).setStroke('#ffa500', 5).setShadow(2, 2, "#333333", 2, true, true);

        this.physics.add.overlap(battary_case, group, function (s1, s2) {
            if (s2.type === 'acc') {
                group.remove(s2);
                destroyGroup.push(s2);
                s2.destroy();

                createCoin(s2.x - 50, s2.y + 50, 3, this);
            }
        }, null, this);

        this.physics.add.overlap(blue_bak, group, function (s1, s2) {
            if (s2.type === 'blue') {
                group.remove(s2);
                destroyGroup.push(s2);
                s2.setVelocity((s1.x - s2.x) / 2, s1.y - s2.y);
                s2.setAngularVelocity(-50);

                createCoin(s2.x + 50, s2.y - 50, 2, this);
            }
        }, null, this);
        this.physics.add.overlap(grey_bak, group, function (s1, s2) {
            if (s2.type === 'grey') {
                group.remove(s2);
                destroyGroup.push(s2);
                s2.setVelocity((s1.x - s2.x) / 2, s1.y - s2.y);
                s2.setAngularVelocity(50);

                createCoin(s2.x - 50, s2.y - 50, 1, this);
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
            if (gameObject.y < 0) {
                gameObject.setPosition(gameObject.x, 1);
            }
            setInactive(gameObject, this);
            gameObject.body.moves = true;
            gameObject.body.enable = true;
            if (gameObject.x < (midle_window - conveer_width / 8)) {
                if (gameObject.y < 100) {
                    gameObject.setVelocity(200, 50);
                } else {
                    gameObject.setVelocity(200, -300);
                }
                gameObject.setAngularVelocity(-40);
            } else if (gameObject.x > (midle_window + conveer_width / 8)) {
                if (gameObject.y < 100) {
                    gameObject.setVelocity(-200, 50);
                } else {
                    gameObject.setVelocity(-200, -300);
                }
                gameObject.setAngularVelocity(40);
            } else {
                gameObject.setVelocityY(speedTrash + 150);
            }
            gameObject.setGravityY(300);
            gameObject.setBounce(0.4);
        });

        this.input.on('pointerdown', function (pointer) {
            // var stop = conveer_anim.anims.stop('conveer');
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

        var zone_bottom = this.physics.add.sprite(midle_window, window.innerHeight, 'blank').setOrigin(0.5, 0.2).setAlpha(0);
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
        this.physics.add.overlap(activeGroup, blue_bak, destoyBlueTrash, null, this);
        this.physics.add.overlap(activeGroup, grey_bak, destoyGreyTrash, null, this);

        isPause = false;
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

        if (isPause) {
            return
        }
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
        text_score.text = player_score;
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
        if (slow_trash) {
            interval = interval * 2;
        }
        if (this.time.now - now > interval) {
            now = this.time.now;
            createAndDropObject.call(this);
        }
        if (auto_trash) {
            autoSort();
        }

        if (slow_trash) {
            activeGroup.getChildren().forEach(function (trash) {
                trash.setVelocityY(speedTrash / 2);
            });
        }
        //таймеры для скилов
        if (this.time.now - now1 > timerClear) {
            clear_on.visible = true;
        }
        if (this.time.now - now2 > timerAuto && !auto_trash) {
            auto_on.visible = true;
            now2 = this.time.now;
        } else if (this.time.now - now2 > timerAuto / 2 && auto_trash) {
            auto_trash = false;
            now2 = this.time.now;
            light_auto_on.visible = false;
            auto_type = 0;
        }
        if ((this.time.now - now3 > timerOne) && !one_trash) {
            one_on.visible = true;
            now3 = this.time.now;
        } else if ((this.time.now - now3 > timerOne / 2) && one_trash) {
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
        if ((this.time.now - now4 > timerSlow) && !slow_trash) {
            slow_on.visible = true;
            now4 = this.time.now;
        } else if ((this.time.now - now4 > timerSlow / 2) && slow_trash) {
            slow_trash = false;
            light_slow_on.visible = false;
            now4 = this.time.now;
        }

    },
});


function createDialog() {
    dialog = this.rexUI.add.dialog({
        x: midle_window,
        y: window.innerHeight * 0.5,

        background: this.rexUI.add.roundRectangle(0, 0, 100, 100, 20, COLOR_PRIMARY).setStrokeStyle(2, INACTIVE_COLOR),
        content: this.add.text(0, 0, 'Выйти в меню?', {
            font: '32pt Ubuntu'
        }).setColor(DARK),
        actions: [
            createLabel(this, 'Да'),
            createLabel(this, 'Нет')
        ],

        space: {
            title: 25,
            content: 25,
            action: 15,

            left: 20,
            right: 20,
            top: 20,
            bottom: 20,
        },

        align: {
            actions: 'center', // 'center'|'left'|'right'
        },

        expand: {
            content: false, // Content is a pure text object
        }
    })
        .on('button.click', function (button, groupName, index) {
            if (index === 0) {
                isPause = true;
                this.scene.start('logo', {name: 'Move from Main to Logo'});
            }
            dialog.destroy();
            dialog = undefined;
        }, this)
        .on('button.over', function (button, groupName, index) {
            button.getElement('background').setStrokeStyle(1, INACTIVE_COLOR);
        })
        .on('button.out', function (button, groupName, index) {
            button.getElement('background').setStrokeStyle();
        })
        .layout()
        .popUp(500)
        .setDepth(9);
}

var createLabel = function (scene, text) {
    return scene.rexUI.add.label({
        background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 20, COLOR_DARK),

        text: scene.add.text(0, 0, text, {
            font: '32pt Ubuntu'
        }).setColor(DARK),

        space: {
            left: 10,
            right: 10,
            top: 10,
            bottom: 10
        }
    });
};

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
    var darknes = this.add.sprite(midle_window, 0, 'darknes').setOrigin(0.5, 0).setScale(1 / global_scale).setDepth(11);
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
    group.add(object);
    object.removeInteractive();
    object.body.allowdraggable = false;
    object.setVelocityY(speedTrash + 350);
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

var createCoin = function (x, y, points, scene) {
    new Coin(scene, x, y, points, function () {
        player_score += points;
    });
};

function createAndDropObject() {
    var trash;
    var trashType;
    var number = Math.random();
    var toxic = false;
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

    obj.setScale(global_scale / 1.25);
    obj.setInteractive();
    obj.setCollideWorldBounds(true);
    if (!isPause) {
        obj.body.moves = true;
        obj.setVelocityY(speedTrash);
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

function destoyBlueTrash(bak, trash) {
    activeGroup.remove(trash);
    destroyGroup.push(trash);
    trash.setVelocity((bak.x - trash.x) / 2, bak.y - trash.y);
    trash.setAngularVelocity(-50);
    createCoin(trash.x + 50, trash.y - 50, 2, this);
}

function destoyGreyTrash(bak, trash) {
    activeGroup.remove(trash);
    destroyGroup.push(trash);
    trash.setVelocity((bak.x - trash.x) / 2, bak.y - trash.y);
    trash.setAngularVelocity(50);
    createCoin(trash.x - 50, trash.y - 50, 1, this);
}

function autoSort() {
    activeGroup.getChildren().forEach(function (trash) {
        if (auto_type === 1 && trash.type === 'blue') {
            trash.setVelocity((blue_bak.x - trash.x) / 2, blue_bak.y - trash.y);
            trash.setAngularVelocity(-1);
        } else if (auto_type === 2 && trash.type === 'grey') {
            trash.setVelocity((grey_bak.x - trash.x) / 2, grey_bak.y - trash.y);
            trash.setAngularVelocity(-1);
        }
    });
}

function clearConveer() {
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
    slow_trash = true;
    slow_on.visible = false;
    light_slow_on.visible = true;
    now4 = this.time.now;
}

function oneTrash() {
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