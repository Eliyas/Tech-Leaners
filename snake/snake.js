/**
 * Created by Mohamed Eliyas on 22-05-2017.
 */


$(document).ready(function () {
    var keyCode = 38;
    var canvas = $('#canvas');
    var context = canvas[0].getContext("2d");
    var canvasWidth = canvas.width();
    var canvasHeight = canvas.height();
    var canvasOffset = canvas.offset();
    var canvasXStart = canvasOffset.left;
    var canvasXEnd = canvasOffset.left + canvasWidth;
    var canvasYStart = canvasOffset.top;
    var canvasYEnd = canvasOffset.top + canvasHeight;
    var x = 100;
    var y = 100;
    var speed = 1;

    $(document).on("keydown", function (event) {
        keyCode = event.keyCode;
    });

    function animate() {

        reqAnimFrame = window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            window.oRequestAnimationFrame;

        switch (keyCode) {
            case 40: // up key down canvas
            {
                y = Math.abs(y + speed);
                if (y >= (canvasHeight - 25)) {
                    y = canvasHeight - 25;
                }
                break;
            }
            case 38: // down key up canvas
            {
                y = Math.abs(y - speed);
                if (y <= 0) {
                    y = 0;
                }
                break;
            }
            case 39: // right key left canvas
            {
                x = Math.abs(x + speed);
                if (x >= (canvasWidth - 25)) {
                    x = canvasWidth - 25;
                }
                break;
            }
            case 37: // left key right canvas
            {
                x = Math.abs(x - speed);
                if (x <= 0) {
                    x = 0;
                }
                break;
            }
        }

        draw();


        reqAnimFrame(animate);
    }


    function draw() {
        context.clearRect(10, 10, canvasWidth, canvasHeight);
        context.fillStyle = "#ff00ff";
        context.fillRect(x , y, 25, 25);
    }

    animate();

});