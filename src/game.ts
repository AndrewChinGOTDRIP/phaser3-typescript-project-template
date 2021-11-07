
import 'phaser';
import { Physics } from 'phaser';

//https://photonstorm.github.io/phaser3-docs/
export default class BasketballGame extends Phaser.Scene
{
    keys: Phaser.Types.Input.Keyboard.CursorKeys;
    Hampter: Phaser.GameObjects.Sprite;
    net: Phaser.GameObjects.Sprite;
    scoreBoard: Phaser.GameObjects.Text;
    score: number = 0;

    constructor ()
    {
        super('basketballGame');
    }

    preload ()
    {
        this.load.image(
            'Hampter',
            'ImagineDragons.png'
        );
        this.load.image(
            'net',
            'BlueApple.png'
        );
        //Entering 'online sound effect generator' into a search engine lists sites like these
        //  - https://sfxr.me/
        //  - https://www.leshylabs.com/apps/sfMaker/
        //
        //Note - Uncomment the line below to load a sound, uncomment line in 'create' function to play it
        //  Copy the sound file into the 'dist' directory of this project
        //  Use the correct name for that sound file immediately below instead of using "sound.wav"
        //this.load.audio("sound1", "sound.wav");
    }

    create ()
    {
        this.scoreBoard = this.add.text(
            scoreBoardOffset, scoreBoardOffset, this.score.toString());

        this.Hampter = this.add.sprite(
            basketballOffset, basketballOffset, "Hampter");
        this.Hampter.displayWidth = spriteSide;
        this.Hampter.displayHeight = spriteSide;

        this.net = this.add.sprite(netOffset, netOffset, "net");
        this.net.flipX = true;
        this.net.displayWidth = spriteSide;
        this.net.displayHeight = spriteSide;

        this.keys = this.input.keyboard.createCursorKeys();

        this.physics.add.existing(this.Hampter);
        this.physics.add.existing(this.net);
        this.physics.add.collider(this.Hampter, this.net,
            (a, b) => {
                //Note - Uncomment the line below to play a sound (must be loaded above)
                //this.sound.play("sound1");
                this.score = this.score + 3;
                this.scoreBoard.text = this.score.toString();
                this.Hampter.setY(basketballOffset);
                this.Hampter.setX(basketballOffset);
            });
    }
    update ()
    {
        if (this.keys.down.isDown) {
            this.Hampter.setY(this.Hampter.y + movementOffset);
            if (this.Hampter.y > canvasHeight) {
                this.Hampter.setY(0);
            }
        }
        if (this.keys.up.isDown) {
            this.Hampter.setY(this.Hampter.y - movementOffset);
            if (this.Hampter.y < 0) {
                this.Hampter.setY(canvasHeight);
            }
        }
        if (this.keys.right.isDown) {
            this.Hampter.setX(this.Hampter.x + movementOffset);
            if (this.Hampter.x > canvasWidth) {
                this.Hampter.setX(0);
            }
        }
        if (this.keys.left.isDown) {
            this.Hampter.setX(this.Hampter.x - movementOffset);
            if (this.Hampter.x < 0) {
                this.Hampter.setX(canvasWidth);
            }
        }
    }
}

const canvasWidth = 800;
const canvasHeight = 800;

const scoreBoardOffset = 0;
const basketballOffset = 100;
const netOffset = 250;

const movementOffset = 4;

const spriteSide = 75;

const config = {
    type: Phaser.CANVAS,
    backgroundColor: '#EA35FF',
    width: canvasWidth,
    height: canvasHeight,
    scene: BasketballGame,
    //Note - the following setting is required to use 'this.physics'
    physics: {
        default: "arcade"
    }
};

const game = new Phaser.Game(config);




