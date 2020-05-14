class Coin extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, points) {
        super(scene, x, y);

        this.scene = scene;

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
                player_score += points;
                coin.destroy();
            },
        });

    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
    }
}