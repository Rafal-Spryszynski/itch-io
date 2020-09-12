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

        this.oneThird = .33;
        this.twoThird = .66;
    }

    preload() {
        this.load.audio('cardPlace1', 'audio/cardPlace1.ogg');
        this.load.audio('cardPlace2', 'audio/cardPlace2.ogg');
    }

    create() {
        this.captureWindowSize();

        this.graphics = this.add.graphics();
        this.drawBoard();
        this.drawCross();

        $(window).resize(() => {
            this.captureWindowSize();

            this.graphics.clear();
            this.drawBoard();
            this.drawCross();
        });

        this.cardPlace1 = this.sound.add('cardPlace1');
        this.cardPlace2 = this.sound.add('cardPlace2');
        this.cardPlace1.play();
    }

    captureWindowSize() {
        this.windowWidth = $(window).width();
        this.windowHeight = $(window).height();
        this.fieldWidth = this.windowWidth * this.oneThird;
        this.fieldHeight = this.windowHeight * this.oneThird;
    }

    drawBoard() {
        this.graphics.lineStyle(this.windowWidth * .025, 0xffffff);

        this.graphics.save();
        this.drawVerticalLine();
        this.drawVerticalLine();
        this.graphics.restore();

        this.graphics.save();
        this.drawHorizontalLine();
        this.drawHorizontalLine();
        this.graphics.restore();
    }
    
    drawVerticalLine() {
        this.graphics.translateCanvas(this.fieldWidth, 0);
        this.graphics.lineBetween(0, 0, 0, this.windowHeight);
    }
    
    drawHorizontalLine() {
        this.graphics.translateCanvas(0, this.fieldHeight);
        this.graphics.lineBetween(0, 0, this.windowWidth, 0);
    }

    drawCross() {
        const crossSize = .2;

        this.graphics.lineBetween(this.fieldWidth * crossSize, this.fieldHeight * crossSize, this.fieldWidth - this.fieldWidth * crossSize, this.fieldHeight - this.fieldHeight * crossSize);
        this.graphics.lineBetween(this.fieldWidth * crossSize, this.fieldHeight - this.fieldHeight * crossSize, this.fieldWidth - this.fieldWidth * crossSize, this.fieldHeight * crossSize);

        this.graphics.translateCanvas(this.fieldWidth, 0);

        this.graphics.lineBetween(this.fieldWidth * crossSize, this.fieldHeight * crossSize, this.fieldWidth - this.fieldWidth * crossSize, this.fieldHeight - this.fieldHeight * crossSize);
        this.graphics.lineBetween(this.fieldWidth * crossSize, this.fieldHeight - this.fieldHeight * crossSize, this.fieldWidth - this.fieldWidth * crossSize, this.fieldHeight * crossSize);

        this.graphics.translateCanvas(this.fieldWidth, 0);

        this.graphics.lineBetween(this.fieldWidth * crossSize, this.fieldHeight * crossSize, this.fieldWidth - this.fieldWidth * crossSize, this.fieldHeight - this.fieldHeight * crossSize);
        this.graphics.lineBetween(this.fieldWidth * crossSize, this.fieldHeight - this.fieldHeight * crossSize, this.fieldWidth - this.fieldWidth * crossSize, this.fieldHeight * crossSize);
    }
}