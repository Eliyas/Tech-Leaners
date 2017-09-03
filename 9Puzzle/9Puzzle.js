/**
 * Created by Mohamed Eliyas on 19-08-2017.
 */

var BaseTileInstance =  new BaseTile();
var tiles = document.querySelectorAll(".tile");
var resetBtn = document.querySelector(".reset-btn");
var setBtn = document.querySelector(".set-btn");

document.TileInstanceFactory(Array.from(tiles));

resetBtn.addEventListener('click', function () {
    BaseTileInstance.resetTile(BaseTileInstance.getTiles());
});

setBtn.addEventListener('click', function () {
    BaseTileInstance.setWon();
});