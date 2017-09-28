var gameAc={};
gameAc.COMMON = {
    RIGHT: 'right',
    LEFT: 'left',
    UP: 'up',
    DOWN: 'down',
    ONE: 'oneSpace',
    TWO: 'twoSpace',
    THREE: 'threeSpace',
    FOUR: 'fourSpace'
};
/*
//startPoint:{x:x,y:y}
//endPoint:{x:x,y:y}
*/
gameAc.findInterval=function(startPoint, endPoint){
    var x1 = startPoint.x,
        y1 = startPoint.y,
        x2 = endPoint.x,
        y2 = endPoint.y;
    if (y1 === y2 && x1 === x2) {
        return;
    }
    if (y1 === y2) {
        if (x1 < x2) {
            return gameAc.COMMON.RIGHT;
        } else {
            return gameAc.COMMON.LEFT;
        }
    }
    if (x1 === x2) {
        if (y1 < y2) {
            return gameAc.COMMON.UP;
        } else {
            return gameAc.COMMON.DOWN;
        }
    }
    if (x1 < x2) {
        if (y1 < y2) {
            return gameAc.COMMON.ONE;
        } else {
            return gameAc.COMMON.FOUR;
        }
    }
    if (x1 > x2) {
        if (y1 < y2) {
            return gameAc.COMMON.TWO;
        } else {
            return gameAc.COMMON.THREE;
        }
    }
}
gameAc.Move = {
    onRight: function(P, V) {
        return {
            x: P.x + V,
            y: P.y
        };
    },
    onLeft: function(P, V) {
        return {
            x: P.X - V,
            y: P.y
        };
    },
    onUp: function(P, V) {
        return {
            x: P.x,
            y: P.y + V
        };
    },
    onDown: function(P, V) {
        return {
            x: P.x,
            y: P.y - V
        };
    },
    onOne: function(P, V, K) {
        return {
            x: P.x + V,
            y: (P.x + V) * K
        };
    },
    onTwo: function(P, V, K) {
        return {
            x: P.x - V,
            y: (P.x - V) * K
        };
    },
    onThree: function(P, V, K) {
        return {
            x: P.x - V,
            y: (P.x - V) * K
        };
    },
    onFour: function(P, V, K) {
        return {
            x: P.x + V,
            y: (P.x + V) * K
        };
    }
}
gameAc.forwardObject=function(mPoint,sePoint, speed) {
    var sePoint=this.sePoint;
    this.sePoint=sePoint;
    this.speed=speed;
    this.movefun = gameAc.findInterval(sePoint.startPoint, sePoint.endPoint);
    this.slope = (sePoint.endPoint.y - sePoint.startPoint.y) / (sePoint.endPoint.x - sePoint.startPoint.x);
    this.position = mPoint;
    this.moving = null;
    this.mRight = function() {
        var speed=this.speed;
        var temp = this.position;
        this.position = gameAc.Move.onRight(temp, speed);
    };
    this.mLeft = function() {
        var speed=this.speed;
        var temp = this.position;
        this.position = gameAc.Move.onLeft(temp, speed);
    };
    this.mUp = function() {
        var speed=this.speed;
        var temp = this.position;
        this.position = gameAc.Move.onUp(temp, speed);
    };
    this.mDown = function() {
        var speed=this.speed;
        var temp = this.position;
        this.position = gameAc.Move.onDown(temp, speed);
    };
    this.mOne = function() {
        var speed=this.speed;
        var temp = this.position;
        var slope = this.slope;
        this.position = gameAc.Move.onOne(temp, speed, slope);
    };
    this.mTwo = function() {
        var speed=this.speed;
        var temp = this.position;
        var slope = this.slope;
        this.position = gameAc.Move.onTwo(temp, speed, slope);
    };
    this.mThree = function() {
        var speed=this.speed;
        var temp = this.position;
        var slope = this.slope;
        this.position = gameAc.Move.onThree(temp, speed, slope);
    };
    this.mFour = function() {
        var speed=this.speed;
        var temp = this.position;
        var slope = this.slope;
        this.position = gameAc.Move.onFour(temp, speed, slope);
    };
    this.onMove = function() {
        switch (this.movefun) {
        case gameAc.COMMON.RIGHT:
            this.moving = this.mRight;
            break; 
        case gameAc.COMMON.LEFT:
            this.moving=this.mLeft;
            break; 
        case gameAc.COMMON.UP:
            this.moving=this.mUp;
            break; 
        case gameAc.COMMON.DOWN:
            this.moving=this.mDown;
            break; 
        case  gameAc.COMMON.ONE:
            this.moving=this.mOne;  
            break; 
        case gameAc.COMMON.TWO:
            this.moving=this.mTwo;
            break; 
        case gameAc.COMMON.THREE:
            this.moving=this.mThree;
            break; 
        case  gameAc.COMMON.FOUR:
            this.moving=this.mFour;          
            break;
        }
    };
    this.draw = function(sePoint) {
        if(!!sePoint){
            this.movefun = gameAc.findInterval(sePoint.p1, sePoint.p2);
            this.slope = (sePoint.p1.y - sePoint.p2.y) / (sePoint.p2.x - sePoint.p1.x);
            this.onMove();
        }
        this.moving();
        var x=this.position.x;
        var y=this.position.y;
        var obj={x:x,y:y};
        return obj;
    };
    this.onMove();

}