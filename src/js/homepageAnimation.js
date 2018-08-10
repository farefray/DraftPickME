import {TweenLite} from "gsap/TweenLite";

HTMLCollection.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];

var width, height, largeHeaders, canvases, points, target;
var ctx = [];

function isAnimationActive() {
  let elem = document.getElementsByClassName('large-header');
  if(elem.length > 1) {
    elem = elem[0];
  }

  return !!(elem && !!( elem.offsetWidth || elem.offsetHeight ));
}

export function initHeader() {
  width = window.innerWidth;
  height = window.innerHeight;
  target = {
    x: width / 2,
    y: height / 2
  };

  largeHeaders = document.getElementsByClassName('large-header');
  Array.from(largeHeaders).forEach(elem => {
    elem.style.height = height + 'px';
  });

  canvases = document.getElementsByClassName('demo-canvas');
  Array.from(canvases).forEach((elem) => {
    elem.width = width;
    elem.height = height;
    ctx.push(elem.getContext('2d'));
  });
  

  // create points
  points = [];
  for (var x = 0; x < width; x = x + width / 20 + 50) {
    for (var y = 0; y < height; y = y + height / 20 + 50) {
      var px = x + Math.random() * width / 20;
      var py = y + Math.random() * height / 20;
      var p = {
        x: px,
        originX: px,
        y: py,
        originY: py
      };
      points.push(p);
    }
  }

  // for each point find the 5 closest points
  for (var i = 0; i < points.length; i++) {
    var closest = [];
    var p1 = points[i];
    for (var j = 0; j < points.length; j++) {
      var p2 = points[j]
      if (!(p1 == p2)) {
        var placed = false;
        for (let k = 0; k < 5; k++) {
          if (!placed) {
            if (closest[k] == undefined) {
              closest[k] = p2;
              placed = true;
            }
          }
        }

        for (let k = 0; k < 5; k++) {
          if (!placed) {
            if (getDistance(p1, p2) < getDistance(p1, closest[k])) {
              closest[k] = p2;
              placed = true;
            }
          }
        }
      }
    }
    p1.closest = closest;
  }

  // assign a circle to each point
  for (let i in points) {
    let c = new Circle(points[i], 2 + Math.random() * 2, 'rgba(255,255,255,0.3)');
    points[i].circle = c;
  }
}

var hasListener = false; // avoid double listeners
// Event handling
export function addListeners() {
  if (!hasListener && !('ontouchstart' in window)) {
    hasListener = true;
    window.addEventListener('mousemove', mouseMove, false);
  }
  
  window.addEventListener('resize', resize);
}

function mouseMove(e) {
  if(!animationActive) {
    window.removeEventListener('mousemove', mouseMove, false);
    return false;
  }

  let posy, posx;
  posx = posy = 0;
  if (e.pageX || e.pageY) {
    posx = e.pageX;
    posy = e.pageY;
  } else if (e.clientX || e.clientY) {
    posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
    posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
  }
  target.x = posx;
  target.y = posy;
}

function resize() {
  width = window.innerWidth;
  height = window.innerHeight;
  Array.from(largeHeaders).forEach(elem => {
    elem.style.height = height + 'px';
  });

  Array.from(canvases).forEach((elem) => {
    elem.width = width;
    elem.height = height;
  });
}

// animation
export function initAnimation() {
  animate();
  for (var i in points) {
    shiftPoint(points[i]);
  }
}

var myReq;
var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
var animationActive = true;

function animate() {
  animationActive = isAnimationActive();
  if(!animationActive) {
    cancelAnimationFrame(myReq)
    return;
  }
  
  Array.from(ctx).forEach((c) => {
    c.clearRect(0, 0, width, height);
  });
  
  for (var i in points) {
    // detect points in range
    if (Math.abs(getDistance(target, points[i])) < 6000) {
      points[i].active = 0.1;
      points[i].circle.active = 0.3;
    } else if (Math.abs(getDistance(target, points[i])) < 40000) {
      points[i].active = 0.05;
      points[i].circle.active = 0.2;
    } else if (Math.abs(getDistance(target, points[i])) < 80000) {
      points[i].active = 0.02;
      points[i].circle.active = 0.1;
    } else {
      points[i].active = 0;
      points[i].circle.active = 0;
    }

    drawLines(points[i]);
    points[i].circle.draw();
  }

  myReq = requestAnimationFrame(animate);
}

function shiftPoint(p) {
  if(!animationActive) {
    return false;
  }

  // eslint-disable-next-line no-undef
  TweenLite.to(p, 1 + 1 * Math.random(), {
    x: p.originX - 50 + Math.random() * 100,
    y: p.originY - 50 + Math.random() * 100,
    ease: 'Circ.easeInOut',
    onComplete: function () {
      shiftPoint(p);
    }
  });
}

// Canvases manipulation
function drawLines(p) {
  if (!p.active) return;
  for (var i in p.closest) {
    Array.from(ctx).forEach((c) => {
      c.beginPath();
      c.moveTo(p.x, p.y);
      c.lineTo(p.closest[i].x, p.closest[i].y);
      c.strokeStyle = 'rgba(156,217,249,' + p.active + ')';
      c.stroke();
    });
  }
}

function Circle(pos, rad, color) {
  var _this = this;

  // constructor
  (function () {
    _this.pos = pos || null;
    _this.radius = rad || null;
    _this.color = color || null;
  })();

  this.draw = function () {
    if (!_this.active) return;
    Array.from(ctx).forEach((c) => {
      c.beginPath();
      c.arc(_this.pos.x, _this.pos.y, _this.radius, 0, 2 * Math.PI, false);
      c.fillStyle = 'rgba(156,217,249,' + _this.active + ')';
      c.fill();
    });
  };
}

// Util
function getDistance(p1, p2) {
  return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
}
