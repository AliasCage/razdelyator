var isPause = true;
var isNeedDarknes = false;
var switchToRaiting = false;
var cursors;
var global_scale;
var bg_width;
var conveer_width;
var now;

var now1;
var now2;
var now3;
var now4;

var conveer_anim;

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

var slow_trash;
var one_trash;
var auto_trash;

var one_type;
var auto_type;


const  timerClear = 90000;
const  timerAuto = 45000;
const  timerOne = 45000;
const  timerSlow = 45000;

const midle_window = window.innerWidth / 2;

const DARK = 0xeffffff;
const COLOR_PRIMARY = 0xe3f2fd;
const COLOR_DARK = 0xb1bfca;
const TOXIC_COLOR = 0x01DF01;
const INACTIVE_COLOR = 0x6b6b6b;

const batary_case_speed = 4500;

var MainSc = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function MainSc() {
            Phaser.Scene.call(this, {key: 'mainSc'});
        },

    init: function (data) {
        console.log(data.name);
        player_score = 0;
    },


    preload: function () {

        var groundBar = this.add.graphics();
        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        groundBar.fillStyle(COLOR_PRIMARY, 0.6);
        groundBar.fillRect(0, 0, window.innerWidth, window.innerHeight);
        progressBox.fillStyle(COLOR_DARK, 0.7);
        progressBox.fillRect(midle_window - 160, 270, 320, 50);
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

        this.load.setBaseURL('img');

        this.load.image('bg', 'bg.png');
        this.load.image('bg_tile', 'bg_tile.jpg');
        this.load.image('darknes', 'darknes.png');
        this.load.image('blue', 'blue_min.png');
        this.load.image('grey', 'grey_min.png');
        this.load.image('blank', 'blank.png');
        this.load.image('+1', '+1.png');
        this.load.image('+2', '+2.png');
        this.load.image('+3', '+3.png');

        this.load.image('battary_case', 'battary/battary_case.png');
        this.load.image('rails', 'battary/rails.png');
        this.load.image('a1', 'battary/a1.png');
        this.load.image('a2', 'battary/a2.png');
        this.load.image('a3', 'battary/a3.png');

        this.load.image('auto_off', 'btn/auto_off.png');
        this.load.image('auto_on', 'btn/auto_on.png');
        this.load.image('clear_off', 'btn/clear_off.png');
        this.load.image('clear_on', 'btn/clear_on.png');
        this.load.image('one_off', 'btn/one_off.png');
        this.load.image('one_on', 'btn/one_on.png');
        this.load.image('slow_off', 'btn/slow_off.png');
        this.load.image('slow_on', 'btn/slow_on.png');

        this.load.image('menu_off', 'btn/menu_off.png');
        this.load.image('menu_on', 'btn/menu_on.png');


        this.load.image('con1', '/conveer/1.png');
        this.load.image('con2', '/conveer/2.png');
        this.load.image('con3', '/conveer/3.png');
        this.load.image('con4', '/conveer/4.png');
        this.load.image('con5', '/conveer/5.png');
        this.load.image('con6', '/conveer/6.png');
        this.load.image('con7', '/conveer/7.png');
        this.load.image('con8', '/conveer/8.png');
        this.load.image('con9', '/conveer/9.png');
        this.load.image('con10', '/conveer/10.png');

        this.load.image('b1', 'trash/blue/1.png');
        this.load.image('b2', 'trash/blue/2.png');
        this.load.image('b3', 'trash/blue/3.png');
        this.load.image('b4', 'trash/blue/4.png');
        this.load.image('b5', 'trash/blue/5.png');
        this.load.image('b6', 'trash/blue/6.png');
        this.load.image('b7', 'trash/blue/7.png');
        this.load.image('b8', 'trash/blue/8.png');
        this.load.image('b9', 'trash/blue/9.png');
        this.load.image('b10', 'trash/blue/10.png');
        this.load.image('b11', 'trash/blue/11.png');
        this.load.image('b12', 'trash/blue/12.png');
        this.load.image('b13', 'trash/blue/13.png');
        this.load.image('b14', 'trash/blue/14.png');
        this.load.image('b15', 'trash/blue/15.png');
        this.load.image('b16', 'trash/blue/16.png');
        this.load.image('b17', 'trash/blue/17.png');
        this.load.image('b18', 'trash/blue/18.png');
        this.load.image('b19', 'trash/blue/19.png');
        this.load.image('b20', 'trash/blue/20.png');

        this.load.image('g1', 'trash/grey/1.png');
        this.load.image('g2', 'trash/grey/2.png');
        this.load.image('g3', 'trash/grey/3.png');
        this.load.image('g4', 'trash/grey/4.png');
        this.load.image('g5', 'trash/grey/5.png');
        this.load.image('g6', 'trash/grey/6.png');
        this.load.image('g7', 'trash/grey/7.png');
        this.load.image('g8', 'trash/grey/8.png');
        this.load.image('g9', 'trash/grey/9.png');
        this.load.image('g10', 'trash/grey/10.png');
        this.load.image('g11', 'trash/grey/11.png');
        this.load.image('g12', 'trash/grey/12.png');
        this.load.image('g13', 'trash/grey/13.png');
        this.load.image('g14', 'trash/grey/14.png');
        this.load.image('g15', 'trash/grey/15.png');
        this.load.image('g16', 'trash/grey/16.png');
        this.load.image('g17', 'trash/grey/17.png');
        this.load.image('g18', 'trash/grey/18.png');
        this.load.image('g19', 'trash/grey/19.png');
        this.load.image('g20', 'trash/grey/20.png');
    },

    create: function () {
        cursors = this.input.keyboard.createCursorKeys();
        this.physics.world.checkCollision.up = false;
        now = this.time.now;
        one_type = 0;
        auto_type = 0;
        slow_trash = false;
        one_trash = false;
        auto_trash = false;
        now = this.time.now;
        now1 = this.time.now;
        now2 = this.time.now;
        now3 = this.time.now;
        now4 = this.time.now;

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

        var bg = this.add.sprite(midle_window, 0, 'bg').setOrigin(0.5, 0);
        global_scale = window.innerHeight / bg.height;
        bg_width = bg.width * global_scale;
        bg.setScale(global_scale);

        blue_bak = this.physics.add.sprite(0, 0, 'blue').setOrigin(-0.05, 0.5).setScale(global_scale)
            .setPosition(midle_window - bg_width * 0.5, window.innerHeight / 1.65);
        grey_bak = this.physics.add.sprite(0, 0, 'grey').setOrigin(1.05, 0.5).setScale(global_scale)
            .setPosition(midle_window + bg_width * 0.5, window.innerHeight / 1.65);

        conveer_anim = this.add.sprite(midle_window, 0, 'con1').setOrigin(0.5, 0);
        conveer_anim.setScale(window.innerHeight / conveer_anim.height);
        conveer_anim.play('conveer');
        conveer_width = conveer_anim.width * global_scale;

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

        var auto_off = this.add.sprite(midle_window - side_middle, window.innerHeight / 6, 'auto_off')
            .setOrigin(1, 0.5).setScale(global_scale);
        auto_on = this.add.sprite(midle_window - side_middle, window.innerHeight / 6, 'auto_on')
            .setOrigin(1, 0.5).setScale(global_scale).setInteractive().on("pointerdown", autoTrash, this);
        auto_on.visible = false;

        var clear_off = this.add.sprite(midle_window + side_middle, window.innerHeight / 6, 'clear_off')
            .setOrigin(0, 0.5).setScale(global_scale);
        clear_on = this.add.sprite(midle_window + side_middle, window.innerHeight / 6, 'clear_on')
            .setOrigin(0, 0.5).setScale(global_scale).setInteractive().on("pointerdown", clearConveer, this);
        clear_on.visible = false;

        var one_off = this.add.sprite(midle_window - side_middle, window.innerHeight / 3, 'one_off')
            .setOrigin(1, 0.5).setScale(global_scale);
        one_on = this.add.sprite(midle_window - side_middle, window.innerHeight / 3, 'one_on')
            .setOrigin(1, 0.5).setScale(global_scale).setInteractive().on("pointerdown", oneTrash, this);
        one_on.visible = false;

        var slow_off = this.add.sprite(midle_window + side_middle, window.innerHeight / 3, 'slow_off')
            .setOrigin(0, 0.5).setScale(global_scale);
        slow_on =  this.add.sprite(midle_window + side_middle, window.innerHeight / 3, 'slow_on')
            .setOrigin(0, 0.5).setScale(global_scale).setInteractive().on("pointerdown", slowTrash, this);
        slow_on.visible = false;

        this.add.sprite(midle_window + side_middle, window.innerHeight * 0.9, 'menu_on')
            .setOrigin(0, 0.5).setScale(global_scale).setInteractive()
            .on("pointerup", function () {
                isPause = true;
                this.scene.start('logo', {name: 'Move from Main to Logo'});
            }, this);

        text_score = this.add.text(midle_window - side_middle * 1.5, window.innerHeight * 0.9, player_score, {
            font: "32px Arial Black",
            fill: "#fff"
        }).setStroke('#00f', 3).setShadow(2, 2, "#333333", 2, true, true);

        this.physics.add.overlap(battary_case, group, function (s1, s2) {
            if (s2.type === 'acc') {
                group.remove(s2);
                destroyGroup.push(s2);
                s2.destroy();
                player_score += 3;

                var coin = this.add.sprite(s2.x - 50, s2.y + 150, '+3')
                    .setOrigin(0.5, 0.5).setScale(global_scale * 0.5);
                this.tweens.add({
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

            }
        }, null, this);

        this.physics.add.overlap(blue_bak, group, function (s1, s2) {
            if (s2.type === 'blue') {
                group.remove(s2);
                destroyGroup.push(s2);
                s2.setVelocity((s1.x - s2.x) / 2, s1.y - s2.y);
                s2.setAngularVelocity(-50);

                player_score += 2;
                debugger
                // this.callbackScope.physics.add.sprite(400, 150, "+1");

                var coin = this.add.sprite(s2.x + 100, s2.y - 150, '+2')
                    .setOrigin(0.5, 0.5).setScale(global_scale * 0.5);
                this.tweens.add({
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
            }
        }, null, this);
        this.physics.add.overlap(grey_bak, group, function (s1, s2) {
            if (s2.type === 'grey') {
                group.remove(s2);
                destroyGroup.push(s2);
                s2.setVelocity((s1.x - s2.x) / 2, s1.y - s2.y);
                s2.setAngularVelocity(50);

                player_score += 1;
                var coin = this.add.sprite(s2.x - 100, s2.y - 150, '+1')
                    .setOrigin(0.5, 0.5).setScale(global_scale * 0.5);
                this.tweens.add({
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
            setInactive(gameObject, this);
            gameObject.body.moves = true;
            gameObject.body.enable = true;
            if (gameObject.x < (midle_window - conveer_width / 8)) {
                gameObject.setVelocity(200, -300);
                gameObject.setAngularVelocity(-40);
            } else if (gameObject.x > (midle_window + conveer_width / 8)) {
                gameObject.setVelocity(-200, -300);
                gameObject.setAngularVelocity(40);
            } else {
                gameObject.setVelocityY(200);
            }
            gameObject.setGravityY(300);
            gameObject.setBounce(0.4);
        });

        this.input.on('pointerdown', function (pointer) {
            // var stop = conveer_anim.anims.stop('conveer');
        });

        var coliderGroupFunction = function (s1, s2) {
            debugger
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
            debugger

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
            if (!s2.body.allowdraggable && !s2.active) {
                activeGroup.remove(s1);
                setInactive(s1, this);
                s1.body.moves = false;
                if (s1.type === 'acc') {
                    toxicality(s2);
                }
            }
        };
        this.physics.add.overlap(activeGroup, group, coliderActiveGroup);
        this.physics.add.overlap(activeGroup, toxicGroup, coliderActiveGroup);
        this.physics.add.overlap(activeGroup, blue_bak, destoyBlueTrash, null, this);
        this.physics.add.overlap(activeGroup, grey_bak, destoyGreyTrash, null, this);
    },

    update: function () {
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
            this.scene.switch('raiting', {name: 'Move from Main to Raiting'});
        }

        var interval = 3000 + (300 + Math.floor((1500 - 300) * Math.random()));
        if (slow_trash){
            interval = interval * 2;
        }
        if (!isPause && this.time.now - now > interval) {
            now = this.time.now;
            createAndDropObject.call(this);
        }
        if(auto_trash){
            autoSort();
        }

        //таймеры для скилов
        if(!isPause && this.time.now - now1 > timerClear){
            clear_on.visible = true;
        }
        if(!isPause && this.time.now - now2 > timerAuto && !auto_trash){
            auto_on.visible = true;
            now2 = this.time.now;
        }else  if (!isPause && this.time.now - now2 > timerAuto / 2 && auto_trash){
            auto_trash = false;
            now2 = this.time.now;
            auto_type = 0;
        }
        if((this.time.now - now3 > timerOne) && !one_trash){
            one_on.visible = true;
            now3 = this.time.now;
        } else if ((this.time.now - now3 > timerOne/2) && one_trash) {
            if(one_type === 1) {
                grey_bak.setTint();
            }
            if(one_type === 2){
                blue_bak.setTint();
            }
            one_trash = false;
            now3 = this.time.now;
            one_type = 0;
        }
        if((this.time.now - now4 > timerSlow) && !slow_trash){
            slow_on.visible = true;
            now4 = this.time.now;
        } else  if ((this.time.now - now4 > timerSlow / 2) && slow_trash){
            slow_trash = false;
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
    var darknes = this.add.sprite(midle_window, 0, 'darknes').setOrigin(0.5, 0).setScale(global_scale).setDepth(11);
    this.tweens.add({
        targets: darknes,
        alpha: 0,
        ease: 'Linear',
        duration: 3000,
        onComplete: function () {
            darknes.destroy();
        },
    });
}

function setInactive(object) {
    group.add(object);
    object.removeInteractive();
    object.body.allowdraggable = false;
    object.setVelocityY(400);
    object.setTint(INACTIVE_COLOR, INACTIVE_COLOR, INACTIVE_COLOR, INACTIVE_COLOR);

    console.log(object.y);
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

function createAndDropObject() {
    var trash;
    var trashType;
    var number = Math.random();
    var toxic = false;
    if( one_trash) {
        if(one_type === 1) {
        grey_bak.setTint(0x6b6b6b, 0x6b6b6b, 0x6b6b6b, 0x6b6b6b);
        trash = blue[Math.floor(Math.random() * blue.length)];
        trashType = 'blue';
    }
        if(one_type === 2){
            blue_bak.setTint(0x6b6b6b, 0x6b6b6b, 0x6b6b6b, 0x6b6b6b);
            trash = grey[Math.floor(Math.random() * grey.length)];
            trashType = 'grey';
        }
    }else {
        if (number > 0.8) {
            trash = acc[Math.floor(Math.random() * acc.length)];
            trashType = 'acc';
            toxic = true;
        } else if (number > 0.4) {
            trash = blue[Math.floor(Math.random() * blue.length)];
            trashType = 'blue';
        } else {
            trash = grey[Math.floor(Math.random() * grey.length)];
            trashType = 'grey';
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
        if(slow_trash){
            obj.setVelocityY(31);
        }else {
            obj.setVelocityY(59);
        }
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
    if(one_type === 0){
        auto_type = getRandomInt(1,2);
    }else{
        auto_type = one_type;
    }
    auto_trash = true;
    auto_on.visible = false;
    now2 = this.time.now;
}

function  destoyBlueTrash(bak , trash) {
    group.remove(trash);
    destroyGroup.push(trash);
    trash.setVelocity((bak.x - trash.x) / 2, bak.y - trash.y);
    trash.setAngularVelocity(-50);
}

function  destoyGreyTrash(bak , trash) {
    group.remove(trash);
    destroyGroup.push(trash);
    trash.setVelocity((bak.x - trash.x) / 2, bak.y - trash.y);
    trash.setAngularVelocity(50);
}

function autoSort() {
    activeGroup.getChildren().forEach(function (trash) {
        if(auto_type === 1 && trash.type === 'blue'){
            trash.setVelocity((blue_bak.x - trash.x)/2, blue_bak.y - trash.y);
            trash.setAngularVelocity(-1);
        }
        else if(auto_type === 2 && trash.type === 'grey'){
            trash.setVelocity((grey_bak.x - trash.x)/2, grey_bak.y - trash.y);
            trash.setAngularVelocity(-1);
        }
    });
}

function clearConveer() {
    group.clear(true);
    group.getChildren().forEach(function (trash) {
        if(trash.type !== 'acc'){
            group.remove(trash);
            trash.destroy();
        }
    });
    now1 = this.time.now;
    clear_on.visible = false;
}

function slowTrash() {
    slow_trash = true;
    slow_on.visible = false;
    now4 = this.time.now;
}

function oneTrash() {
    if(auto_type === 0){
        one_type = getRandomInt(1,2);
    }else{
        one_type = auto_type;
    }
    one_type = getRandomInt(1,2);
    one_trash = true;
    one_on.visible = false;
    now3 = this.time.now;
}