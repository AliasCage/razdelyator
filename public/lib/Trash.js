class Trash extends Phaser.GameObjects.Sprite {
    constructor(scene) {
        super(scene);

        this.scene = scene;
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
                if (isFirstGameTraining) {
                    isFirstGameTraining = false;
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

        obj.setScale(global_scale / 1.25);

        obj.setInteractive();
        obj.setCollideWorldBounds(true);
        if (!isPause) {
            obj.body.moves = true;
            obj.setVelocityY(speedTrash * DEVICE_SIZE_SPEED);
        } else {
            obj.body.moves = false;
        }
        scene.input.setDraggable(obj);
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
    }

    setInactive() {
        this;
        debugger
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
}
