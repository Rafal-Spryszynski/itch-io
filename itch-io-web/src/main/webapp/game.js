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
        this.primaryColor = 0xffffff;
        this.alphaInvisible = 0;
    }

    preload() {
        this.load.audio('cardPlace1', 'audio/cardPlace1.ogg');
        this.load.audio('cardPlace2', 'audio/cardPlace2.ogg');
    }

    create() {
        this.placeCrossSound = this.sound.add('cardPlace1');
        this.placeCircleSound = this.sound.add('cardPlace2');

        this.graphics = this.add.graphics();

        this.drawGame();

        // this.placeCrossSound.play();
        // this.placeCircleSound.play();

        $(window).resize(() => {
            this.graphics.clear();

            this.drawGame();
        });
    }

    drawGame() {
        this.captureWindowSize();
        this.computeSizes();
        this.setLineStyle();
        
        this.drawBoard();
    }

    captureWindowSize() {
        this.windowWidth = $(window).width();
        this.windowHeight = $(window).height();
    }

    computeSizes() {
        this.boardLineWidth = this.windowWidth * .025;
        this.fieldWidth = this.windowWidth * this.oneThird;
        this.fieldHeight = this.windowHeight * this.oneThird;
    }

    setLineStyle() {
        this.graphics.lineStyle(this.boardLineWidth, this.primaryColor);
    }

    drawBoard() {
        this.graphics.save();
        this.drawVerticalLine();
        this.drawVerticalLine();
        this.graphics.restore();

        this.graphics.save();
        this.drawHorizontalLine();
        this.drawHorizontalLine();
        this.graphics.restore();

        this.add.rectangle(0, 0, this.fieldWidth, this.fieldHeight, this.primaryColor, this.alphaInvisible)
            .setOrigin(0, 0)
            .setInteractive()
            .on(Phaser.Input.Events.POINTER_UP, () => {
                this.drawCross();
            });
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
        const crossSize = .7;
        const crossLineLength = Math.min(this.fieldWidth, this.fieldHeight) / 2 * crossSize;

        this.graphics.save();
        this.graphics.translateCanvas(this.fieldWidth / 2, this.fieldHeight / 2);
        this.graphics.rotateCanvas(Phaser.Math.DegToRad(45));

        this.graphics.lineBetween(-crossLineLength, 0, crossLineLength, 0);
        this.graphics.lineBetween(0, -crossLineLength, 0, crossLineLength);
        
        this.graphics.restore();
    }

    drawCircle() {
        const circleSize = .3;

        this.graphics.save();
        this.graphics.translateCanvas(this.fieldWidth, this.fieldHeight);

        const fieldDimension = Math.min(this.fieldWidth, this.fieldHeight);

        this.graphics.beginPath();
        this.graphics.arc(
            this.fieldWidth / 2, 
            this.fieldHeight / 2, 
            fieldDimension * circleSize, 
            Phaser.Math.DegToRad(0), 
            Phaser.Math.DegToRad(360), 
            false, 
            .02
        );
        this.graphics.strokePath();
        this.graphics.closePath();

        this.graphics.restore();
    }
}