const Random = Phaser.Math.Between;

const DARK = 0xeffffff;
const COLOR_PRIMARY = 0xe3f2fd;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0xb1bfca;

const midle_window = window.innerWidth / 2;

var bg_width;
var global_scale;

var Raiting = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function Raiting() {
            Phaser.Scene.call(this, {key: 'raiting'});
        },

    init: function (data) {
        this.conveer_anim_width = data.conveer_anim_width;
        console.log(name)
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
            console.log(value);
            console.log(midle_window);
            progressBar.clear();
            progressBar.fillStyle(COLOR_PRIMARY, 1);
            progressBar.fillRect(midle_window + 10 - 150, 280, 300 * value - 10, 30);
        });

        this.load.on('complete', function () {
            progressBar.destroy();
            progressBox.destroy();
            groundBar.destroy();
        });

        this.load.image('bg_tile', 'bg_tile.jpg');
        this.load.image('bg', 'bg.png');
        this.load.image('menu_on', 'img/btn/menu_on.png');

        this.scene.add('main', Ma);


        this.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
    },

    create: function () {
        this.add.tileSprite(window.innerWidth / 2, window.innerHeight / 2, window.innerWidth, window.innerHeight, 'bg_tile');
        var bg = this.add.sprite(midle_window, 0, 'bg').setOrigin(0.5, 0);
        global_scale = window.innerHeight / bg.height;
        bg_width = bg.width * global_scale;
        bg.setScale(global_scale);

        // createGridTable(this);


        var side_middle = (this.conveer_anim_width + (bg_width - this.conveer_anim_width)) * global_scale * 0.25;

        // var clear_on = this.add.sprite(midle_window + side_middle, window.innerHeight / 6, 'menu_on').setOrigin(0, 0.5).setScale(global_scale);
        var clear_on = this.physics.add.sprite(0, 0, 'menu_on').setOrigin(0, 0.5).setScale(global_scale);
        clear_on.on('pointerdown', function (pointer) {
            console.log(this.player_id + ' tic');

            // var stop = conveer_anim.anims.stop('conveer');
        });

        console.log(this.player_id + ' create');

        var buttons = this.rexUI.add.buttons({
            x: midle_window,
            y: window.innerHeight * 0.5,

            orientation: 'x',
            space: 20,
            buttons: [createButton(this)],
        }).setOrigin(0.5, 0.5).layout();
        // .drawBounds(this.add.graphics(), 0xff0000);

        buttons.on('button.click', function (button, index, pointer, event) {
            debugger
            console.log(`Click button-${button.text}` + index);
            this.scene.start('raiting');

        }, this)
    },

    update: function () {
        // console.log(this.player_id + ' update')

    },


});

function createButton(scene) {
    return scene.rexUI.add.label({
        action: scene.add.image(0, 0, 'menu_on').setOrigin(0, 0.5)
    });
}

function createGridTable(game) {

    var gridTable = game.rexUI.add.gridTable({
        x: midle_window,
        y: window.innerHeight * 0.5,
        width: bg_width * 0.9,
        height: window.innerHeight * 0.9,

        scrollMode: 0,

        background: game.rexUI.add.roundRectangle(0, 0, 20, 10, 10, COLOR_PRIMARY),

        table: {
            cellWidth: undefined,
            cellHeight: 30,
            columns: 1,
            mask: {
                padding: 2,
            },
            reuseCellContainer: true,
        },

        header: createRowItem(game,
            {
                background: game.rexUI.add.roundRectangle(0, 0, 20, 20, 0, COLOR_DARK),
                id: game.add.text(0, 0, 'Id'),
                score: game.add.text(0, 0, 'Score'),
                name: game.add.text(0, 0, 'Name'),
                height: 30
            }
        ),

        footer: game.rexUI.add.label({
            width: undefined,
            height: 30,

            background: game.rexUI.add.roundRectangle(0, 0, 20, 20, 0, COLOR_DARK),
            text: game.add.text(0, 0, 'Footer'),
        }),

        space: {
            left: 20,
            right: 20,
            top: 20,
            bottom: 20,

            table: 10,
            header: 10,
            footer: 10,
        },

        createCellContainerCallback: function (cell, cellContainer) {
            var scene = cell.scene,
                width = cell.width,
                height = cell.height,
                item = cell.item,
                index = cell.index;
            if (cellContainer === null) {
                cellContainer = createRowItem(scene);
                console.log(cell.index + ': create new cell-container');
            } else {
                console.log(cell.index + ': reuse cell-container');
            }

            // Set properties from item value
            cellContainer.setMinSize(width, height); // Size might changed in this demo
            cellContainer.getElement('id').setText(item.id);
            cellContainer.getElement('name').setText(item.name);
            cellContainer.getElement('score').setText(item.score);
            return cellContainer;
        },
        items: getItems(100)
    })
        .layout();
}

const GetValue = Phaser.Utils.Objects.GetValue;
var createRowItem = function (scene, config) {
    var background = GetValue(config, 'background', undefined);
    if (background === undefined) {
        background = scene.rexUI.add.roundRectangle(0, 0, 20, 20, 0).setStrokeStyle(3, COLOR_DARK)
    }
    var id = GetValue(config, 'id', undefined);
    if (id === undefined) {
        id = scene.add.text(0, 0, id).setColor(DARK);
    }
    var score = GetValue(config, 'score', undefined);
    if (score === undefined) {
        score = scene.add.text(0, 0, score).setColor(DARK);
    }
    var name = GetValue(config, 'name', undefined);
    if (name === undefined) {
        name = scene.add.text(0, 0, name).setColor(DARK);
    }
    return scene.rexUI.add.sizer({
        width: GetValue(config, 'width', undefined),
        height: GetValue(config, 'height', undefined),
        orientation: 'x',
    })
        .addBackground(
            background
        )
        .add(
            id,    // child
            0,                           // proportion, fixed width
            'center',                    // align vertically
            {left: 10},                // padding
            false,                       // expand vertically
            'id'                         // map-key
        )
        .addSpace()
        .add(
            name, // child
            0,                           // proportion, fixed width
            'center',                    // align vertically
            {},               // padding
            false,                       // expand vertically
            'name'                      // map-key
        )
        .addSpace()
        .add(
            score, // child
            0,                           // proportion, fixed width
            'center',                    // align vertically
            {right: 10},               // padding
            false,                       // expand vertically
            'score'                      // map-key
        )
};

var getItems = function (count) {


    var rating = getRating();
    var data = [];
    for (var i = 0; i < count; i++) {
        data.push({
            id: i,
            score: i,
            name: 'mock' + (100 - i * 2)
        });
    }
    return data;
};


const firebaseConfig = {
    apiKey: "AIzaSyDwyP6pcgmdXmChCCVRHS-BoLoKePcsPdo",
    authDomain: "razdelyator-2df4b.firebaseapp.com",
    databaseURL: "https://razdelyator-2df4b.firebaseio.com",
    projectId: "razdelyator-2df4b",
    storageBucket: "razdelyator-2df4b.appspot.com",
    messagingSenderId: "354974286422",
    appId: "1:354974286422:web:37e805dcf1296a9a74f1f7",
    measurementId: "G-E5MVVLT4BP"
};
var database;

function load(name) {
    if (!database) {
        return;
    }
    var ref = database.ref("base");
    var postsRef = ref.child("raiting");
    var newPostRef = postsRef.push();
    newPostRef.set({
        score: 23,
        name: name,
        email: "cool_gamer@gmail.com"
    });
}

function getRating() {
    if (!database) {
        return;
    }
    var list = [];
    var rootRef = database.ref("base");
    var urlRef = rootRef.child("raiting");
    urlRef.once("value", function (snapshot) {
        snapshot.forEach(function (child) {
            var childKey = child.key;
            var childData = child.val();
            console.log(childKey + ": " + childData);
            list.push(childData);
        });
    });
    return list;
}

function saveResult(name, email, score) {
    if (!database) {
        return;
    }
    var ref = database.ref("base");
    var postsRef = ref.child("raiting");
    var newPostRef = postsRef.push();
    newPostRef.set({
        count: score,
        name: name,
        email: email
    });
}

document.addEventListener('DOMContentLoaded', function () {
    // // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
    // // The Firebase SDK is initialized and available here!
    //

    // firebase.initializeApp(firebaseConfig);
    // firebase.auth().onAuthStateChanged(user => { });
    // firebase.database().ref('/base').on('child_added', snapshot => {
    //     console.log("Added successfully written!")
    // });
    // firebase.messaging().requestPermission().then(() => { });
    // firebase.storage().ref('/path/to/ref').getDownloadURL().then(() => { });
    //
    // // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥

    try {
        let app = firebase.app();
        let features = ['database'].filter(feature => typeof app[feature] === 'function');
        // document.getElementById('load').innerHTML = `Firebase SDK loaded with ${features.join(', ')}`;


        database = firebase.database();
        load("def");


    } catch (e) {
        console.error(e);
        document.getElementById('load').innerHTML = 'Error loading the Firebase SDK, check the console.';
    }
});