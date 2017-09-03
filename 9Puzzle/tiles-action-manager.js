/**
 * Created by Mohamed Eliyas on 19-08-2017.
 */

(function () {
    document.ActionManager = ActionManager;


    function ActionManager() {
        this.initAction = function (tile) {
            util.extend(BaseTile.prototype, obj);
            this.attachClickHandler(tile)
        }
    }

    var obj = {
        moveTile: function (direction, tile) {
            var top = 0;
            var left = 0;
            switch (direction) {


                case "Up":
                {
                    top = +tile.style.top.replace("px", "");
                    tile.style.top = Math.abs(top - 77) + "px";
                    break;
                }
                case "Down":
                {
                    top = +tile.style.top.replace("px", "");
                    tile.style.top = Math.abs(top + 77) + "px";
                    break;
                }
                case "Left":
                {
                    left = +tile.style.left.replace("px", "");
                    tile.style.left = Math.abs(left - 77) + "px";
                    break;
                }
                case "Right":
                {
                    left = +tile.style.left.replace("px", "");
                    tile.style.left = Math.abs(left + 77) + "px";
                    break;
                }
            }
            this.setCoordinates(tile);
            this.checkGameStatus();
        },

        attachClickHandler: function (tile) {
            tile.addEventListener("click", function () {
                var tile = this.Tile;
                var co_ordinates = tile.co_ordinates;

                if (!tile.isMoveCollied(co_ordinates.x, co_ordinates.y - 40, co_ordinates.width, co_ordinates.height)) {
                    tile.moveTile("Up", this);
                    return;
                }

                if (!tile.isMoveCollied(co_ordinates.x, co_ordinates.y + 40, co_ordinates.width, co_ordinates.height)) {
                    tile.moveTile("Down", this);
                    return;
                }

                if (!tile.isMoveCollied(co_ordinates.x - 40, co_ordinates.y, co_ordinates.width, co_ordinates.height)) {
                    tile.moveTile("Left", this);
                    return;
                }

                if (!tile.isMoveCollied(co_ordinates.x + 40, co_ordinates.y, co_ordinates.width, co_ordinates.height)) {
                    tile.moveTile("Right", this);
                }
            });
        },

        isMoveCollied: function (x, y, width, height) {
            var tile = this;
            var boardCo_ordinates = tile.boardCo_ordinates;
            // check tile out of board
            if (tile.isBoardIntersect(x, x + width, boardCo_ordinates.x, boardCo_ordinates.x + boardCo_ordinates.width) ||
                tile.isBoardIntersect(y, y + height, boardCo_ordinates.y, boardCo_ordinates.y + boardCo_ordinates.height)) {
                util.warning("Out of board !");
                return true;
            }

            var colloidTile = tile.getTiles().filter(function (siblingTileElement) {
                var sibBaseTile = siblingTileElement.Tile;
                var sibCo_ordinates = sibBaseTile.co_ordinates;
                if (tile == sibBaseTile) return false;
                var siblingTileXmin = sibCo_ordinates.x;
                var siblingTileXmax = sibCo_ordinates.x + sibCo_ordinates.width;
                var siblingTileYmin = sibCo_ordinates.y;
                var siblingTileYmax = sibCo_ordinates.y + sibCo_ordinates.height;

                return tile.isRangeIntersect(x, x + width, siblingTileXmin, siblingTileXmax) &&
                    tile.isRangeIntersect(y, y + height, siblingTileYmin, siblingTileYmax)
            });
            if (colloidTile.length) return true;
            return false;
        },

        isRangeIntersect: function (min0, max0, min1, max1) {
            var min0Value = Math.min(min0, max0);
            var max0Value = Math.max(min0, max0);
            var min1Value = Math.min(min1, max1);
            var max1Value = Math.max(min1, max1);

            if (min0Value <= max1Value && max0Value >= min1Value) {
                return true;
            }
            return false;
        },

        isBoardIntersect: function (min0, max0, min1, max1) {
            var min0Value = Math.min(min0, max0);
            var max0Value = Math.max(min0, max0);
            var min1Value = Math.min(min1, max1);
            var max1Value = Math.max(min1, max1);

            if (min0Value <= min1Value || max0Value >= max1Value) {
                return true;
            }
            return false;
        }

    };


})();