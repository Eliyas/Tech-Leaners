/**
 * Created by Mohamed Eliyas on 19-08-2017.
 */

(function(){
    document.TileInstanceFactory = constructor
})();

var BaseTile = document.BaseTile;
var Tile = document.Tile;
var BaseTileInstance =  new BaseTile();

function constructor(tiles) {

    tiles.forEach(function (tileElement) {
        tileElement["Tile"] = new Tile();
        BaseTileInstance.init(tileElement);
        BaseTileInstance.initAction(tileElement)
    });

    BaseTileInstance.resetTile(BaseTileInstance.getTiles());
    
}
