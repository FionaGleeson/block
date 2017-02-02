/*global Phaser*/
var game = new Phaser.Game(800, 600, Phaser.AUTO, '');
var game_state = {};

game_state.main = function() {};
game_state.main.prototype = {

    preload: function() {
        game.load.image('set', 'assets/background.png');
        game.load.spritesheet('block', 'assets/block.png', 480, 480);
        game.load.image('goal', 'assets/goal.png');
    },

    create: function() {
        // background
        game.add.sprite(0, 0, 'set');
        var myset = game.add.sprite(0, 0, 'set');
        myset.scale.setTo(1.3, 1.3);

        // physics
        game.physics.startSystem(Phaser.Physics.ARCADE);



        //goals
        this.goal1 = game.add.sprite(230, 520, 'goal');
        game.physics.arcade.enable(this.goal1);
        this.goal1.enableBody = true;
        this.goal1.body.immovable = true;
        this.goal2 = game.add.sprite(335, 520, 'goal');
        game.physics.arcade.enable(this.goal2);
        this.goal2.enableBody = true;
        this.goal2.body.immovable = true;
        this.goal3 = game.add.sprite(440, 520, 'goal');
        game.physics.arcade.enable(this.goal3);
        this.goal3.enableBody = true;
        this.goal3.body.immovable = true;
        this.goal4 = game.add.sprite(544, 520, 'goal');
        game.physics.arcade.enable(this.goal4);
        this.goal4.enableBody = true;
        this.goal4.body.immovable = true;
        this.goal1.scale.setTo(0.17, 0.17);
        this.goal2.scale.setTo(0.17, 0.17);
        this.goal3.scale.setTo(0.17, 0.17);
        this.goal4.scale.setTo(0.17, 0.17);



        //blocks
        this.blocks = game.add.group();
        this.blocks.enableBody = true;


        //all the block stuff
        var _this = this;
        setInterval(function() {
            var lanes = [244, 349, 453, 557];
            var whichLane = Math.floor(Math.random() * 4);
            //var block = _this.block.create( lanes[whichLane], 0, 'block');
            var block = _this.blocks.create(lanes[whichLane], 0, 'block');
            block.scale.setTo(0.115, 0.115);
            game.physics.arcade.enable(block);
            // block.enableBody = true;
            block.body.gravity.y = 40;
            var frames = [0, 3, 6, 9];
            var whichFrame = Math.floor(Math.random() * 4);
            block.frame = frames[whichFrame];
            //block.add.animation('')

            //animations
            // this.block.animations.add('implode', [7, 6, 5], true);

            block.body.gravity.y = 230;
            block.body.bounce.y = 0.9 + Math.random() * 0.2;
        }, 1000);





        //text
        var storyText = game.add.text(0, 0, 'When the blocks fall into \nthe square, press the \ncorresponding number: \n1, 2, 3, and 4.');
        storyText.addColor("#ffffff", 0);
        storyText.scale.setTo(0.45, 0.45);

        var explainText = game.add.text(633, 110, 'Furry pink ball has always \ndreamed of reaching the \nstars. He collects blocks \nto help him build a tower. \nThe more blocks you \ncollect, the closer furry \npink ball is to reaching \nthe stars.');
        explainText.addColor("#ffffff", 0);
        explainText.scale.setTo(0.48, 0.48);

        this.cursors = game.input.keyboard.createCursorKeys();

        this.oneKey = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
        this.twoKey = game.input.keyboard.addKey(Phaser.Keyboard.TWO);
        this.threeKey = game.input.keyboard.addKey(Phaser.Keyboard.THREE);
        this.fourKey = game.input.keyboard.addKey(Phaser.Keyboard.FOUR);
        this.score = 0;
        var scoreText = game.add.text(633, 70, 'score: ' + this.score);
        scoreText.addColor("#ffffff", 0);
        scoreText.scale.setTo(0.48, 0.48);


        // game.add.text = scoreText.text;
        // var scoreText;
        scoreText.text = 'Score:' + this.score;
    },

    update: function() {

        var _this = this;
        this.blocks.forEach(function(item) {
            if (item.body.y > 600) {
                item.kill();
            }
            // game.debug.body(item);
        });
        // game.debug.body(this.goal1);

        // this.blocks.forEach(function(item) {
        //     if (game.physics.arcade.overlap(_this.blocks, _this.goal1) && this.oneKey.isDown) {
        //         item.kill();
        //     }
        // });

        game.physics.arcade.overlap(this.blocks, this.goal1, this.endBlock1, null, this);
        game.physics.arcade.overlap(this.blocks, this.goal2, this.endBlock2, null, this);
        game.physics.arcade.overlap(this.blocks, this.goal3, this.endBlock3, null, this);
        game.physics.arcade.overlap(this.blocks, this.goal4, this.endBlock4, null, this);


    },
    endBlock1: function(goal1, block) {
        if (this.oneKey.isDown) {
            this.score++;
            block.kill();
        }
    },

    endBlock2: function(goal2, block) {
        if (this.twoKey.isDown) {
            this.score++;
            block.kill();
            // alert("test12345");
        }
    },
    endBlock3: function(goal1, block) {
        if (this.threeKey.isDown) {
            this.score++;
            block.kill();
        }
    },
    endBlock4: function(goal1, block) {
        if (this.fourKey.isDown) {
            this.score++;
            block.kill();
        }
    },







};
game.state.add('main', game_state.main);
game.state.start('main');
