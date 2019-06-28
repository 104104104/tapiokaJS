/*
 * runstant
 */

phina.globalize();

var CIRCLE_RADIUS = 32;

phina.define("Circle", {
  superClass: 'CircleShape',

  init: function(options) {
    options = (options || {}).$safe({
      fill: "red",
      stroke: null,
      radius: CIRCLE_RADIUS,
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
  superClass: 'CanvasScene',

  init: function() {
    this.superInit();

    this.backgroundColor = '#222';

    // 円を表示
    var circle = CircleShape().addChildTo(this);
    circle.x = 100; // x 座標を指定
    circle.y = 480; // y 座標を指定
    circle.update = function() {
      this.x+=1;
    }
    var mouse = Circle().addChildTo(this);
     mouse.x=0;
     mouse.y=0;

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
  });

  app.run();
});
