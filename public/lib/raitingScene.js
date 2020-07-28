var rating = [];
var rating_loaded = false;
var table;

var isBadWordInUsername = false;
var loginButton;
var isBadWordInput;
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

        rating = getRating();
        this.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
    },

    create: function () {
        this.add.tileSprite(midle_window, midle_window_h, GLOBAL_WIDTH, GLOBAL_HEIGHT, 'bg_tile');
        this.add.sprite(midle_window, 0, 'bg').setOrigin(0.5, 0).setScale(global_scale);
        var loginDialog;
        var side_middle = (conveer_width + (bg_width - conveer_width)) * 0.25;
        this.add.sprite(midle_window + side_middle, GLOBAL_HEIGHT * 0.875, 'menu_on')
            .setOrigin(0, 0).setScale(global_scale).setInteractive()
            .on("pointerup", function () {
                if (loginDialog)
                    loginDialog.destroy();
                this.scene.start('logo', {name: 'Move from Raiting to Logo'});
            }, this);

         if (player_score && player_score > 0) {
            loginDialog = CreateLoginDialog(this, {
                x: midle_window,
                y: GLOBAL_HEIGHT * 0.4,
                title: 'Ваши очки: ' + player_score,
                username: isInputUserMail ? userName : 'username',
                email: isInputUserMail ? userMail : 'user@email.ru',
            })
                .on('login', function (username, email) {
                    print.text += `${username}:${email}\n`;
                    saveResult(username, email, player_score);
                    player_score = 0;
                    loginDialog.destroy();
                })
                .popUp(500).setDepth(10);
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

    var background = scene.rexUI.add.roundRectangle(0, 0, 10, 10, 10, PROGRESS_COLOR_2);
    var titleField = scene.add.text(0, 0, title, {font: DEVICE_SIZE * 22 + 'pt Electronica-Normal', fill: "#FFF"});
    var userNameField = scene.rexUI.add.label({
        orientation: 'x',
        background: scene.rexUI.add.roundRectangle(0, 0, 10, 10, 10, PROGRESS_COLOR_1),
        text: scene.rexUI.add.BBCodeText(0, 0, username, {
            fixedWidth: DEVICE_SIZE * 200,
            fixedHeight: DEVICE_SIZE * 36,
            valign: 'center',
            fill: "#FFF"
        }).setFont(DEVICE_SIZE * 22 + 'pt Electronica-Normal'),
        space: {
            top: DEVICE_SIZE * 5,
            bottom: DEVICE_SIZE * 5,
            left: DEVICE_SIZE * 5,
            right: DEVICE_SIZE * 5,
            icon: DEVICE_SIZE * 10,
        }
    })
        .setInteractive()
        .on('pointerdown', function () {
            if (username === 'username') {
                username = '';
            }
            var config = {
                text: username,
                fontSize: 'xxx-large',
                onTextChanged: function (textObject, text) {
                    username = text;
                    textObject.text = text;
                    isBadWordInput.visible = false;
                    loginButton.visible = true;
                    isBadWordInUsername = false;
                    listBad.forEach(function (badWord) {
                        if (!isBadWordInUsername) {
                            if (username.toLowerCase().indexOf(badWord) !== -1) {
                                isBadWordInUsername = true;
                                loginButton.visible = false;
                                isBadWordInput.visible = true;
                            } else {
                                isBadWordInUsername = false;
                            }
                        }
                    });
                }
            };
            scene.rexUI.edit(userNameField.getElement('text'), config);
        });

    var emailField = scene.rexUI.add.label({
        orientation: 'x',
        background: scene.rexUI.add.roundRectangle(0, 0, 10, 10, 10, PROGRESS_COLOR_1),
        text: scene.rexUI.add.BBCodeText(0, 0, email, {
            fixedWidth: DEVICE_SIZE * 200,
            fixedHeight: DEVICE_SIZE * 36,
            valign: 'center',
            fill: "#FFF"
        }).setFont(DEVICE_SIZE * 22 + 'pt Electronica-Normal'),

        space: {
            top: DEVICE_SIZE * 5,
            bottom: DEVICE_SIZE * 5,
            left: DEVICE_SIZE * 5,
            right: DEVICE_SIZE * 5,
            icon: DEVICE_SIZE * 10,
        }
    })
        .setInteractive()
        .on('pointerdown', function () {
            if (email === 'user@email.ru') {
                email = '';
            }
            var config = {
                type: 'email',
                text: email,
                fontSize: 'xxx-large',
                onTextChanged: function (textObject, text) {
                    debugger
                    email = text;
                    textObject.text = email;
                }
            };
            debugger
            scene.rexUI.edit(emailField.getElement('text'), config);
        });

    loginButton = scene.rexUI.add.label({
        orientation: 'x',
        background: scene.rexUI.add.roundRectangle(0, 0, 10, 10, 10, "0xF4A261"),
        text: scene.add.text(0, 0, 'Cохранить результат?', {font: DEVICE_SIZE * 22 + 'pt Electronica-Normal', fill: "#FFF"}),
        space: {top: DEVICE_SIZE * 8, bottom: DEVICE_SIZE * 8, left: DEVICE_SIZE * 8, right: DEVICE_SIZE * 8}
    })
        .setInteractive()
        .on('pointerdown', function () {
            if (isBadWordInUsername) {
                return;
            }
            loginDialog.emit('login', username, email);
        });
    isBadWordInput = scene.add.text(0, 0, 'Недопустимое значение!', {font: DEVICE_SIZE * 22 + 'pt Electronica-Normal', fill: '#ff0000'}).setStroke('#c90000', 1);
    isBadWordInput.visible = false;

    var loginDialog = scene.rexUI.add.sizer({
        orientation: 'y',
        x: x,
        y: y,
        width: width,
        height: height,
    })
        .addBackground(background)
        .add(titleField, 0, 'center', {
            top: DEVICE_SIZE * 10,
            bottom: DEVICE_SIZE * 10,
            left: DEVICE_SIZE * 10,
            right: DEVICE_SIZE * 10
        }, false)
        .add(userNameField, 0, 'left', {
            bottom: DEVICE_SIZE * 10,
            left: DEVICE_SIZE * 10,
            right: DEVICE_SIZE * 10
        }, true)
        .add(emailField, 0, 'left', {bottom: DEVICE_SIZE * 10, left: DEVICE_SIZE * 10, right: DEVICE_SIZE * 10}, true)
        .add(isBadWordInput, 0, 'center', {
            bottom: DEVICE_SIZE * 10,
            left: DEVICE_SIZE * 10,
            right: DEVICE_SIZE * 10
        }, false)
        .add(loginButton, 0, 'center', {
            bottom: DEVICE_SIZE * 10,
            left: DEVICE_SIZE * 10,
            right: DEVICE_SIZE * 10
        }, false)

        .layout();
    return loginDialog;
};

function createGridTable(game) {
    return game.rexUI.add.gridTable({
        x: midle_window,
        y: GLOBAL_HEIGHT * 0.05,
        width: bg_width * 0.9,
        height: GLOBAL_HEIGHT * 0.8,

        scrollMode: 0,

        background: game.rexUI.add.roundRectangle(0, 0, 20, 10, 10, BG_COLOR),

        table: {
            cellWidth: undefined,
            cellHeight: DEVICE_SIZE * 50,
            columns: 1,
            mask: {
                padding: 2,
            },
            reuseCellContainer: true,
        },

        header: createRowItem(game,
            {
                background: game.rexUI.add.roundRectangle(0, 0, 20, 20, 0, BG_COLOR),
                id: game.add.text(0, 0, 'Место', {font: DEVICE_SIZE * 15 + 'pt Electronica-Normal', fill: "#fff"}),
                score: game.add.text(0, 0, 'Очки', {font: DEVICE_SIZE * 15 + 'pt Electronica-Normal', fill: "#fff"}),
                name: game.add.text(0, 0, 'Никнейм', {font: DEVICE_SIZE * 15 + 'pt Electronica-Normal', fill: "#fff"}),
                height: DEVICE_SIZE * 30,
            }
        ),

        footer: game.rexUI.add.label({
            width: undefined,
            height: DEVICE_SIZE * 10,

            background: game.rexUI.add.roundRectangle(0, 0, 10, 10, 0, BG_COLOR),
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
                cellContainer = createRowItem(scene);
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

    var background = GetValue(config, 'background', undefined);
    if (background === undefined) {
        background = scene.add.sprite(0, 0, 'cell');
    }
    if (background === undefined) {
        background = scene.rexUI.add.roundRectangle(0, 0, 20, 20, 0).setStrokeStyle(3, COLOR_DARK)
    }
    var id = GetValue(config, 'id', undefined);
    if (id === undefined) {
        id = scene.add.text(0, 0, id, {font: DEVICE_SIZE * 15 + 'pt Electronica-Normal'}).setColor(DARK);
    }
    var score = GetValue(config, 'score', undefined);
    if (score === undefined) {
        score = scene.add.text(0, 0, score, {font: DEVICE_SIZE * 15 + 'pt Electronica-Normal'}).setColor(DARK);
    }
    var name = GetValue(config, 'name', undefined);
    if (name === undefined) {
        name = scene.add.text(0, 0, name, {font: DEVICE_SIZE * 15 + 'pt Electronica-Normal'}).setColor(DARK);
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
            {left: DEVICE_SIZE * 10},                // padding
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
            {right: DEVICE_SIZE * 10},               // padding
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
    if (name === 'username' || email === 'user@mail.ru')
        isInputUserMail = false;
    else {
        isInputUserMail = true;
        userMail = email;
        userName = name;
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