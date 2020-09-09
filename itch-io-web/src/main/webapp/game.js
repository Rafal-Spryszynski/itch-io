$(() => {
    console.log('start');

    const config = {
        type: Phaser.AUTO,
        width: '100%',
        height: '100%',
        parent: 'canvas-container',
        scale: {
            mode: Phaser.Scale.RESIZE
        },
        scene: [GameScene]
    };

    new Phaser.Game(config);
});

class GameScene extends Phaser.Scene {

    constructor() {
        super(GameScene.name);
    }

    preload() {
        this.load.atlasXML('image/chips');
        this.load.audio('cardPlace1', 'audio/cardPlace1.ogg');
        this.load.audio('cardPlace2', 'audio/cardPlace2.ogg');
    }

    create() {
        this.graphics = this.add.graphics();
        this.drawBoard();
        this.drawCross();

        $(window).resize(() => {
            this.graphics.clear();
            this.drawBoard();
            this.drawCross();
        });

        this.chip1 = this.add.sprite($(window).width() * .25, $(window).height() * .25, 'image/chips', 'chipBlue.png');
        this.chip2 = this.add.sprite($(window).width() * .50, $(window).height() * .25, 'image/chips', 'chipBlue.png');
        this.chip3 = this.add.sprite($(window).width() * .75, $(window).height() * .25, 'image/chips', 'chipBlue.png');
        this.chip4 = this.add.sprite($(window).width() * .25, $(window).height() * .50, 'image/chips', 'chipBlue.png');
        this.chip5 = this.add.sprite($(window).width() * .50, $(window).height() * .50, 'image/chips', 'chipBlue.png');
        this.chip6 = this.add.sprite($(window).width() * .75, $(window).height() * .50, 'image/chips', 'chipBlue.png');
        this.chip7 = this.add.sprite($(window).width() * .25, $(window).height() * .75, 'image/chips', 'chipBlue.png');
        this.chip8 = this.add.sprite($(window).width() * .50, $(window).height() * .75, 'image/chips', 'chipBlue.png');
        this.chip9 = this.add.sprite($(window).width() * .75, $(window).height() * .75, 'image/chips', 'chipBlue.png');
        
        $(window).resize(() => this.chip1.setPosition($(window).width() * .25, $(window).height() * .25));
        $(window).resize(() => this.chip2.setPosition($(window).width() * .50, $(window).height() * .25));
        $(window).resize(() => this.chip3.setPosition($(window).width() * .75, $(window).height() * .25));
        $(window).resize(() => this.chip4.setPosition($(window).width() * .25, $(window).height() * .50));
        $(window).resize(() => this.chip5.setPosition($(window).width() * .50, $(window).height() * .50));
        $(window).resize(() => this.chip6.setPosition($(window).width() * .75, $(window).height() * .50));
        $(window).resize(() => this.chip7.setPosition($(window).width() * .25, $(window).height() * .75));
        $(window).resize(() => this.chip8.setPosition($(window).width() * .50, $(window).height() * .75));
        $(window).resize(() => this.chip9.setPosition($(window).width() * .75, $(window).height() * .75));

        this.cardPlace1 = this.sound.add('cardPlace1');
        this.cardPlace2 = this.sound.add('cardPlace2');
        this.cardPlace1.play();
    }

    drawBoard() {
        const oneThird = .33;
        const twoThird = .66;

        this.graphics.lineStyle($(window).width() * .025, 0x20abc7);

        this.graphics.lineBetween($(window).width() * oneThird, 0, $(window).width() * oneThird, $(window).height());
        this.graphics.lineBetween($(window).width() * twoThird, 0, $(window).width() * twoThird, $(window).height());

        this.graphics.lineBetween(0, $(window).height() * oneThird, $(window).width(), $(window).height() * oneThird);
        this.graphics.lineBetween(0, $(window).height() * twoThird, $(window).width(), $(window).height() * twoThird);
    }

    drawCross() {
        const oneThird = .33;
        const crossSize = .2;
        const widthSide = $(window).width() * oneThird;
        const heightSide = $(window).height() * oneThird;

        this.graphics.lineBetween(widthSide * crossSize, heightSide * crossSize, widthSide - widthSide * crossSize, heightSide - heightSide * crossSize);
        this.graphics.lineBetween(widthSide * crossSize, heightSide - heightSide * crossSize, widthSide - widthSide * crossSize, heightSide * crossSize);
    }
}