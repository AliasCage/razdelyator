var rating = [];
var rating_loaded = false;

var Raiting = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function Raiting() {
            Phaser.Scene.call(this, {key: 'raiting'});
        },

    init: function (data) {
        console.log(data.name);
        rating = getRating();
        rating_loaded = false;
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

        this.load.on('complete', function () {
            progressBar.destroy();
            progressBox.destroy();
            groundBar.destroy();
        });
        rating = getRating();

        this.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
    },

    create: function () {
        this.add.tileSprite(window.innerWidth / 2, window.innerHeight / 2, window.innerWidth, window.innerHeight, 'bg_tile');
        this.add.sprite(midle_window, 0, 'bg').setOrigin(0.5, 0).setScale(global_scale);

        var side_middle = (conveer_width + (bg_width - conveer_width)) * 0.25;
        this.add.sprite(midle_window + side_middle, window.innerHeight * 0.875, 'menu_on')
            .setOrigin(0, 0).setScale(global_scale).setInteractive()
            .on("pointerup", function () {
                this.scene.start('logo', {name: 'Move from Raiting to Logo'});
            }, this);
    },

    update: function () {
        if (rating.length > 0 && !rating_loaded) {
            console.log("loaded");
            rating_loaded = true;
            createGridTable(this);
        }
    },
});

function createGridTable(game) {

    var gridTable = game.rexUI.add.gridTable({
        x: midle_window,
        y: window.innerHeight * 0.05,
        width: bg_width * 0.9,
        height: window.innerHeight * 0.8,

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

            background: game.rexUI.add.roundRectangle(0, 0, 10, 10, 0, COLOR_DARK),
            // text: game.add.text(0, 0, 'Footer'),
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
    }).setOrigin(0.5, 0).layout();
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
    var data = [];
    for (var i = 0; i < rating.length; i++) {
        var line = rating[i];
        data.push({
            id: i,
            score: line.score,
            name: line.name + (100 - i * 2)
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
            list.push(child.val());
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