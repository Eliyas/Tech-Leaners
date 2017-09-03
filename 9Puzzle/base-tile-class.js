/**
 * Created by Mohamed Eliyas on 19-08-2017.
 */

(function () {
    document.BaseTile = BaseTile;

    var Game_Board = ".game-board";
    var ActionManager = document.ActionManager;

    // common object of tiles
    BaseTile.prototype = {
        tiles: [],
        boardCo_ordinates: [],
        positionMap: {
            1: {top: 0, left: 0},
            2: {top: 0, left: '77px'},
            3: {top: 0, left: '154px'},
            4: {top: '77px', left: 0},
            5: {top: '77px', left: '77px'},
            6: {top: '77px', left: '154px'},
            7: {top: '154px', left: 0},
            8: {top: '154px', left: '77px'}
        },

        setBoardCoordinates: function () {
            var board = document.querySelector(Game_Board);
            this.boardCo_ordinates["y"] = board.offsetTop;
            this.boardCo_ordinates["width"] = board.offsetWidth;
            this.boardCo_ordinates["x"] = board.offsetLeft;
            this.boardCo_ordinates["height"] = board.offsetHeight;
        }

    };

    function BaseTile() {
        this.setBoardCoordinates();
        this.getTiles = function () {
            return this.tiles;
        };

        this.setTiles = function (baseTile) {
            this.tiles.push(baseTile);
        };

        this.init = function (tileElement) {
            this.setTiles(tileElement);
            util.extend(BaseTile.prototype, obj);
            Tile.prototype = new BaseTile();
            Tile.prototype.constructor = BaseTile;
            this.attachActions(tileElement);
        };

    }

    var obj = {

        initPosition: function () {
            var that = this;
            that.tiles.forEach(function (tile, index) {
                that.setPosition(tile, index);
                that.setCoordinates(tile);
            });
        },

        isWon: function () {
            var that = this;
            var isWon = true;
            that.tiles.forEach(function (tile, index) {
                var tileIndex = +tile.dataset.tile;
                var position = that.positionMap["" + (index + 1)];
                var positionLeft = typeof position.left == "string" ? +position.left.split("px")[0] : position.left;
                var positionTop = typeof position.top == "string" ? +position.top.split("px")[0] : position.top;
                if ((tile.offsetLeft - 4) != positionLeft || (tile.offsetTop - 4) != positionTop) {
                    isWon = false;
                }
            });
            return isWon;

        },

        setWon: function () {
            var that = this;
            that.tiles.sort(function (tileA, tileB) {
                var tileAIndex = +tileA.dataset.tile;
                var tileBIndex = +tileB.dataset.tile;
                return tileAIndex - tileBIndex
            });
            this.initPosition();
            this.checkGameStatus();
        },

        showVictoryMessage: function () {
            var victoryMessage = document.querySelector(".victory-message");
            victoryMessage.style.visibility = "visible";
        },

        hideVictoryMessage: function () {
            var victoryMessage = document.querySelector(".victory-message");
            victoryMessage.style.visibility = "hidden";
        },

        checkGameStatus: function () {
            var that = this;
            setTimeout(function () {
                if (that.isWon()) {
                    that.showVictoryMessage();
                    return;
                }
                that.hideVictoryMessage();
            }, 500);
        },

        attachActions: function () {
            util.extend(BaseTile.prototype, new ActionManager());
        },

        setPosition: function (tile, index) {
            var position = this.positionMap[index + 1];
            tile.style.top = position.top;
            tile.style.left = position.left;
        },

        resetTile: function (tiles) {
            var j, x, i;
            for (i = tiles.length; i; i--) {
                j = Math.floor(Math.random() * i);
                x = tiles[i - 1];
                tiles[i - 1] = tiles[j];
                tiles[j] = x;
            }
            this.initPosition();
        },

        setCoordinates: function (tileElement) {
            var that = this;
            var Tile = tileElement.Tile;
            setTimeout(function () {
                Tile.co_ordinates["y"] = tileElement.offsetTop + that.boardCo_ordinates["y"];
                Tile.co_ordinates["width"] = tileElement.offsetWidth;
                Tile.co_ordinates["x"] = tileElement.offsetLeft + that.boardCo_ordinates["x"];
                Tile.co_ordinates["height"] = tileElement.offsetHeight;
            }, 500);
        }

    };


})();