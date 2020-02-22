var config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    physics: {
        default: 'arcade',
        // debug: true,

        arcade: {
            // debug: true
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

// const myFunctions = require('./fb.js');
import { load } from './fb.js';
// let val = ;  // val is "Hello";

var game = new Phaser.Game(config);
var isPause = true;
var isNeedDarknes = false;
var cursors;
var global_scale;
var midle_window = window.innerWidth / 2;
var now;
var now1;
var conveer_anim;

var group;
var activeGroup;
var toxicGroup;
var destroyGroup = [];
var nonActiveGroup;

var blue = ['b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8', 'b9', 'b10', 'b11', 'b12', 'b13', 'b14', 'b15', 'b16',
    'b17', 'b18', 'b19', 'b20'];
var grey = ['g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'g7', 'g8', 'g9', 'g10', 'g11', 'g12', 'g13', 'g14', 'g15', 'g16',
    'g17', 'g18', 'g19', 'g20'];
var acc = ['a1', 'a2', 'a3'];

var blue_bak;
var grey_bak;
var rails;
var battary_case;
var clear_on;
function preload() {
    this.load.setBaseURL('img');

    this.load.image('intro', 'intro.png');
    this.load.image('bg', 'bg.png');
    this.load.image('bg_tile', 'bg_tile.jpg');
    this.load.image('darknes', 'darknes.png');
    this.load.image('blue', 'blue_min.png');
    this.load.image('grey', 'grey_min.png');
    this.load.image('blank', 'blank.png');

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

    this.load.image('menu_off', 'menu_off.png');
    this.load.image('menu_on', 'menu_on.png');


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
}

function create() {
    cursors = this.input.keyboard.createCursorKeys();
    this.physics.world.checkCollision.up = false;
    now = this.time.now;
    now1 = this.time.now;
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

    var bg = this.add.sprite(0, 0, 'bg').setOrigin(0.5, 0);
    global_scale = window.innerHeight / bg.height;
    bg.setScale(global_scale).setPosition(midle_window, 0);

    blue_bak = this.physics.add.sprite(0, 0, 'blue').setOrigin(-0.05, 0.5).setScale(global_scale)
        .setPosition(midle_window - bg.width * global_scale * 0.5, window.innerHeight / 1.65);
    grey_bak = this.physics.add.sprite(0, 0, 'grey').setOrigin(1.05, 0.5).setScale(global_scale)
        .setPosition(midle_window + bg.width * global_scale * 0.5, window.innerHeight / 1.65);

    conveer_anim = this.add.sprite(midle_window, 0, 'con1').setOrigin(0.5, 0);
    conveer_anim.setScale(window.innerHeight / conveer_anim.height, window.innerHeight / conveer_anim.height);

    rails = this.physics.add.sprite(0, 0, 'rails').setOrigin(0.5, 0.5).setScale(global_scale)
        .setPosition(midle_window, window.innerHeight * 0.05).setDepth(1);
    battary_case = this.physics.add.sprite(0, 0, 'battary_case').setOrigin(0.5, 0.5).setScale(global_scale)
        .setPosition(midle_window + rails.width * global_scale * 0.2, window.innerHeight * 0.05).setDepth(2);

    activeGroup = this.physics.add.group();
    nonActiveGroup = this.physics.add.group();
    toxicGroup = this.physics.add.group({
        collideWorldBounds: true
    });
    group = this.physics.add.group({
        collideWorldBounds: true
    });


    var side_middle = (conveer_anim.width + (bg.width - conveer_anim.width)) * global_scale * 0.25;
    var auto_off = this.add.sprite(midle_window - side_middle, window.innerHeight / 6, 'auto_on')
        .setOrigin(1, 0.5).setScale(global_scale);
    var clear_off = this.add.sprite(midle_window + side_middle, window.innerHeight / 6, 'clear_off')
        .setOrigin(0, 0.5).setScale(global_scale);
    clear_on = this.add.sprite(midle_window + side_middle, window.innerHeight / 6, 'clear_on').setOrigin(0, 0.5).setScale(global_scale);
    clear_on.visible = false;
    var one_off = this.add.sprite(midle_window - side_middle, window.innerHeight / 3, 'one_off')
        .setOrigin(1, 0.5).setScale(global_scale);
    var slow_off = this.add.sprite(midle_window + side_middle, window.innerHeight / 3, 'slow_on')
        .setOrigin(0, 0.5).setScale(global_scale);


    // clear_off.on('pointerdown', function (pointer) {
    //     debugger
    //     group.getChildren().forEach(function (trash) {
    //         trash.destroy();
    //     });
    //     group.clear(true);
    // });

    this.physics.add.overlap(battary_case, group, function (s1, s2) {
        if (s2.type === 'acc') {
            group.remove(s2);
            destroyGroup.push(s2);
            s2.destroy();
        }
    });

    this.physics.add.overlap(blue_bak, group, function (s1, s2) {
        if (s2.type === 'blue') {
            group.remove(s2);
            destroyGroup.push(s2);
            s2.setVelocity((s1.x - s2.x) / 2, s1.y - s2.y);
            s2.setAngularVelocity(-50);
        }
    });
    this.physics.add.overlap(grey_bak, group, function (s1, s2) {
        if (s2.type === 'grey') {
            group.remove(s2);
            destroyGroup.push(s2);
            s2.setVelocity((s1.x - s2.x) / 2, s1.y - s2.y);
            s2.setAngularVelocity(50);
        }
    });

    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
        //На пк попытка вынести мусор за пределы поля
        if (midle_window + (bg.width * (global_scale) / 2) < dragX || (midle_window - (bg.width * (global_scale) / 2)) > dragX) {
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
        // conveer_anim.visible=true;
        activeGroup.remove(gameObject);
        setInactive(gameObject);
        gameObject.body.moves = true;
        gameObject.body.enable = true;
        if (gameObject.x < (midle_window - conveer_anim.width * global_scale / 8)) {
            gameObject.setVelocity(200, -300);
            gameObject.setAngularVelocity(-40);
        } else if (gameObject.x > (midle_window + conveer_anim.width * global_scale / 8)) {
            gameObject.setVelocity(-200, -300);
            gameObject.setAngularVelocity(40);
        } else {
            gameObject.setVelocityY(200);
        }
        gameObject.setGravityY(300);
        gameObject.setBounce(0.4);
    });

    var intro = this.add.sprite(0, 0, 'intro').setOrigin(0.5, 0).setPosition(midle_window, 0).setDepth(10);
    intro.setScale(window.innerHeight / intro.height, window.innerHeight / intro.height);

    this.input.on('pointerup', function (pointer) {
        if (isPause) {
            isPause = false;
            conveer_anim.play('conveer');
            // intro.visible = false;
            intro.destroy();
            //todo: save data via it
            load("phaser01");

        }
    });
    this.input.on('pointerdown', function (pointer) {
        // var stop = conveer_anim.anims.stop('conveer');
    });

    var coliderGroupFunction = function (s1, s2) {
        if (!s1.body.moves) {
            s2.body.moves = false;
            if (s2.type === 'acc' && s2.active) {
                debugger
                toxicality(s2);
            }
        }
        s2.active = false;
    };
    this.physics.add.collider(toxicGroup, group, coliderGroupFunction);
    this.physics.add.collider(toxicGroup, toxicGroup, coliderGroupFunction);
    this.physics.add.collider(group, group, coliderGroupFunction);

    var zone_left = this.physics.add.sprite(0, 0, 'con9').setOrigin(1, 0).setAlpha(0).setImmovable(true);
    zone_left.setPosition(midle_window - conveer_anim.width * global_scale / 6, 0);
    this.physics.add.collider(zone_left, group);

    var zone_right = this.physics.add.sprite(0, 0, 'con9').setOrigin(0, 0).setAlpha(0).setImmovable(true);
    zone_right.setPosition(midle_window + conveer_anim.width * global_scale / 6, 0);
    this.physics.add.collider(zone_right, group);

    var zone_bottom = this.physics.add.sprite(midle_window, window.innerHeight, 'blank').setOrigin(0.5, 0.2).setAlpha(0);
    this.physics.add.overlap(zone_bottom, activeGroup, function (s1, s2) {
        activeGroup.remove(s2);
        setInactive(s2);
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
            setInactive(s1);
            s1.body.moves = false;
            if (s1.type === 'acc') {
                toxicality(s2);
            }
        }
    };
    this.physics.add.overlap(activeGroup, group, coliderActiveGroup);
    this.physics.add.overlap(activeGroup, toxicGroup, coliderActiveGroup);
}

function clearConveer() {
    group.clear(true);
    group.getChildren().forEach(function (trash) {
        if(trash.type !== 'acc'){
            group.remove(trash);
            trash.destroy();
        }
    });

    clear_on.visible = false;
}

function toxicality(accumulator) {
    accumulator.setTint(0x01DF01, 0x01DF01, 0x01DF01, 0x01DF01);
    group.getChildren().forEach(function (trash) {
        toxicGroup.add(trash);
        trash.isToxic = true;
        trash.setTint(0x01DF01, 0x01DF01, 0x01DF01, 0x01DF01);
    });
    toxicGroup.getChildren().forEach(function (trash) {
        group.remove(trash);
    });
    group.clear(true);
    isNeedDarknes = true;
}

function darkness() {
    isNeedDarknes = false;
    var darknes = this.add.sprite(0, 0, 'darknes').setOrigin(0.5, 0).setScale(global_scale).setPosition(midle_window, 0);
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
    object.setTint(0x6b6b6b, 0x6b6b6b, 0x6b6b6b, 0x6b6b6b);

    console.log(object.y);
    if (object.y < 0) {
        group.clear(true);
        group.getChildren().forEach(function (trash) {
            trash.destroy();
        }, this);
    }
}

function createAndDropObject() {
    // Phaser.Utils.Array.D
    var trash;
    var trashType;
    var number = Math.random();
    var toxic = false;
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
    var diff = getRandomInt(-conveer_anim.width * global_scale / 8, conveer_anim.width * global_scale / 8);
    var obj = activeGroup.create(midle_window + diff, -20, trash).setDepth(0);
    obj.setSize(obj.width / 2, obj.height / 2);
    obj.type = trashType;
    obj.isToxic = toxic;

    obj.setScale(global_scale / 1.5);
    obj.setInteractive();
    obj.setCollideWorldBounds(true);
    if (!isPause) {
        obj.body.moves = true;
        obj.setVelocityY(59);
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

function update() {
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


    var interval = 3000 + (300 + Math.floor((1500 - 300) * Math.random()));
    if (!isPause && this.time.now - now > interval) {
        now = this.time.now;
        createAndDropObject.call(this);
        var diff = getRandomInt(-rails.width * global_scale / 2, rails.width * global_scale / 2);
        battary_case.setPosition(midle_window + diff, window.innerHeight * 0.05);
    }
    if(!isPause && this.time.now - now1 > 10000){
        clearConveer();
        now1 = this.time.now;
    }else if (!isPause && this.time.now - now1 > 9000){
        clear_on.visible = true;
    }

}