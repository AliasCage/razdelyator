var rating = [];
var rating_loaded = false;
var table;

const GetValue = Phaser.Utils.Objects.GetValue;

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


        debugger
        if (player_score && player_score > 0) {
            var loginDialog = CreateLoginDialog(this, {
                x: midle_window,
                y: window.innerHeight * 0.8,
                title: 'Вы набрали ' + player_score + ' очков!',
                username: 'username',
                email: 'user@email.ru',
            })
                .on('login', function (username, email) {
                    print.text += `${username}:${email}\n`;
                    saveResult(username, email, player_score);
                    player_score = 0;
                    loginDialog.destroy();
                })
                .popUp(500).setDepth(10);
        }
    },

    update: function () {
        if (rating && rating.length > 0 && !rating_loaded) {
            console.log("loaded");
            rating_loaded = true;
            table = createGridTable(this);
        }
    },
});

var CreateLoginDialog = function (scene, config, onSubmit) {
    var username = GetValue(config, 'username', '');
    var email = GetValue(config, 'email', '');
    var title = GetValue(config, 'title', 'Welcome');
    var x = GetValue(config, 'x', 0);
    var y = GetValue(config, 'y', 0);
    var width = GetValue(config, 'width', undefined);
    var height = GetValue(config, 'height', undefined);

    var background = scene.rexUI.add.roundRectangle(0, 0, 10, 10, 10, COLOR_PRIMARY);
    var titleField = scene.add.text(0, 0, title).setColor(DARK);
    var userNameField = scene.rexUI.add.label({
        orientation: 'x',
        background: scene.rexUI.add.roundRectangle(0, 0, 10, 10, 10).setStrokeStyle(2, DARK),
        text: scene.rexUI.add.BBCodeText(0, 0, username, {
            fixedWidth: 150,
            fixedHeight: 36,
            valign: 'center'
        }).setColor(DARK),
        space: {top: 5, bottom: 5, left: 5, right: 5, icon: 10,}
    })
        .setInteractive()
        .on('pointerdown', function () {
            var config = {
                onTextChanged: function (textObject, text) {
                    username = text;
                    textObject.text = text;
                }
            };
            scene.rexUI.edit(userNameField.getElement('text'), config);
        });

    var emailField = scene.rexUI.add.label({
        orientation: 'x',
        background: scene.rexUI.add.roundRectangle(0, 0, 10, 10, 10).setStrokeStyle(2, DARK),
        text: scene.rexUI.add.BBCodeText(0, 0, email, {
            fixedWidth: 150,
            fixedHeight: 36,
            valign: 'center'
        }).setColor(DARK),
        space: {top: 5, bottom: 5, left: 5, right: 5, icon: 10,}
    })
        .setInteractive()
        .on('pointerdown', function () {
            var config = {
                type: 'email',
                text: email,
                onTextChanged: function (textObject, text) {
                    email = text;
                    textObject.text = email;
                }
            };
            scene.rexUI.edit(emailField.getElement('text'), config);
        });

    var loginButton = scene.rexUI.add.label({
        orientation: 'x',
        background: scene.rexUI.add.roundRectangle(0, 0, 10, 10, 10, DARK),
        text: scene.add.text(0, 0, 'Cохранить результат?').setColor(DARK),
        space: {top: 8, bottom: 8, left: 8, right: 8}
    })
        .setInteractive()
        .on('pointerdown', function () {
            loginDialog.emit('login', username, email);
        });

    var loginDialog = scene.rexUI.add.sizer({
        orientation: 'y',
        x: x,
        y: y,
        width: width,
        height: height,
    })
        .addBackground(background)
        .add(titleField, 0, 'center', {top: 10, bottom: 10, left: 10, right: 10}, false)
        .add(userNameField, 0, 'left', {bottom: 10, left: 10, right: 10}, true)
        .add(emailField, 0, 'left', {bottom: 10, left: 10, right: 10}, true)
        .add(loginButton, 0, 'center', {bottom: 10, left: 10, right: 10}, false)
        .layout();
    return loginDialog;
};

function createGridTable(game) {
    return game.rexUI.add.gridTable({
        x: midle_window,
        y: window.innerHeight * 0.05,
        width: bg_width * 0.9,
        height: window.innerHeight * 0.8,

        scrollMode: 0,

        background: game.rexUI.add.roundRectangle(0, 0, 20, 10, 10, COLOR_DARK),

        table: {
            cellWidth: undefined,
            cellHeight: 50,
            columns: 1,
            mask: {
                padding: 2,
            },
            reuseCellContainer: true,
        },

        header: createRowItem(game,
            {
                background: game.rexUI.add.roundRectangle(0, 0, 20, 20, 0, COLOR_DARK),
                id: game.add.text(0, 0, 'Место').setColor(DARK),
                score: game.add.text(0, 0, 'Очки').setColor(DARK),
                name: game.add.text(0, 0, 'Никнейм').setColor(DARK),
                height: 30
            }
        ),

        footer: game.rexUI.add.label({
            width: undefined,
            height: 30,

            background: game.rexUI.add.roundRectangle(0, 0, 10, 10, 0, COLOR_DARK),
            // text: game.add.text(0, 0, user_top_place ? 'Ваше место: ' + user_top_place + ' счёт: ' + player_score : '').setColor(DARK),
        }),

        space: {
            left: 2,
            right: 2,
            top: 2,
            bottom: 2,

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
                debugger
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

var createRowItem = function (scene, config) {
    debugger
    var background = GetValue(config, 'background', undefined);
    if (background === undefined) {
        background = scene.add.sprite(0, 0, 'cell');
    }
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

var getItems = function () {
    var data = [];
    for (var i = 0; i < rating.length; i++) {
        var line = rating[i];
        data.push({
            score: line.score,
            name: line.name
        });
    }
    data.sort(function (a, b) {
        if (a.score < b.score) {
            return 1;
        }
        if (a.score > b.score) {
            return -1;
        }
        return 0;
    });

    for (i = 0; i < data.length; i++) {
        data[i].id = i + 1;
    }
    return data.slice(0, 100);
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
        score: score,
        name: name,
        email: email
    });

    table.destroy();
    rating.push({
        score: score,
        name: name
    });
    rating_loaded = false;
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

    } catch (e) {
        console.error(e);
        document.getElementById('load').innerHTML = 'Error loading the Firebase SDK, check the console.';
    }
});