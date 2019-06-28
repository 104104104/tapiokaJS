/*
 * runstant
 */

phina.globalize();

var MOUSE_CIRCLE_RADIUS = 16;

var ASSETS = {
  image: {
    'tapioka': './tapioka.png',
  },
};

phina.define("Mouse", {
  superClass: 'CircleShape',

  init: function(options) {
    options = (options || {}).$safe({
      fill: "red",
      stroke: null,
      radius: MOUSE_CIRCLE_RADIUS,
    });
    this.superInit(options);

    this.blendMode = 'lighter';
  },

  update: function(app) {
    var p = app.pointer;
    this.x = p.x;
    this.y = p.y;
  },
});



phina.define('MainScene', {
  superClass: 'DisplayScene',

  init: function() {
    this.superInit();

    this.backgroundColor = '#222';

    // 円を表示
    var circle = CircleShape().addChildTo(this);
    circle.x = 100; // x 座標を指定
    circle.y = 480; // y 座標を指定
    circle.update = function() {
      this.x += 1;
    }
    var mouse = Mouse().addChildTo(this);
    mouse.x = 0;
    mouse.y = 0;

    var tapioka = Sprite('tapioka').addChildTo(this);
    tapioka.x = this.gridX.center();
    tapioka.y = this.gridY.center();
    tapioka.width = 128;
    tapioka.height = 128;
    tapioka.update = function(app){
      var p = app.pointer;
      if(this.x>=p.x){this.x-=1;}else{this.x+=1;}
      if(this.y>=p.y){this.y-=1;}else{this.y+=1;}
    }

    // 四角形を表示
    var rect = RectangleShape().addChildTo(this);
    rect.x = 320;
    rect.y = 480;
    rect.fill = 'cyan'; // 塗りつぶし色を変更
    rect.strokeWidth = 8; // ストローク幅を変更

    // スターを表示
    var star = StarShape().addChildTo(this);
    star.x = 440;
    star.y = 480;
    star.radius = 64; // 半径を変更
  },
});

phina.main(function() {
  var app = GameApp({
    startLabel: 'main',
    assets: ASSETS,
  });

  app.run();
});
