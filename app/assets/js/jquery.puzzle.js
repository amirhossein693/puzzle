;(function ($) {
  'use strict';
  $.fn.puzzle = function(options, image) {

    var self = this;
    var img = new Image();
    img.src = image;

    var boardSize = document.getElementById(self.attr('id')).width;


    // default settings
    var settings = $.extend({
      tileCount : 3
    }, options);

    var plugin = {
      solved: false,
      boardParts: '',
      tileSize: boardSize / settings.tileCount,
      emptyLoc: {
        x: 0,
        y: 0,
      },
      clickLoc: {
        x: 0,
        y: 0,
      },      
      context:  document.getElementById(self.attr('id')).getContext('2d'),

      imageLoader: function(src){

          if($.isArray(src)){
              return $.when.apply($,$.map(src,function(item){
                  return imageLoader(item);
              }));
          }

          var q = $.Deferred();
          var retryCounter = 0;
          var maxRetrys = 5;
          var img;
          var timeoutId = 0;

          function onError(){
              clearTimeout(timeoutId);
              if(retryCounter < maxRetrys){
                  img.off('error').off('load');
                  img = createImg().attr('src', src).hide();
                  retryCounter++;
              }else{
                  q.reject();
              }
          }

          function onLoad(){
              clearTimeout(timeoutId);
              $('body').append(img);
              q.resolve(img);
          }

          function createImg(){
              timeoutId = setTimeout(onError, 8000);
              img = $('<img/>').load(onLoad).error(onError);
              return img;
          }

          createImg().attr('src', src).hide();

          return q.promise();
      },

      setBoard :function() {
        plugin.boardParts = new Array(settings.tileCount);
        for (var i = 0; i < settings.tileCount; ++i) {
          plugin.boardParts[i] = new Array(settings.tileCount);
          for (var j = 0; j < settings.tileCount; ++j) {
            plugin.boardParts[i][j] = {};
            plugin.boardParts[i][j].x = (settings.tileCount - 1) - i;
            plugin.boardParts[i][j].y = (settings.tileCount - 1) - j;
          }
        }
        plugin.emptyLoc.x = plugin.boardParts[settings.tileCount - 1][settings.tileCount - 1].x;
        plugin.emptyLoc.y = plugin.boardParts[settings.tileCount - 1][settings.tileCount - 1].y;
        plugin.solved = false;
      },    

      drawTiles: function() {
        plugin.context.clearRect ( 0 , 0 , boardSize , boardSize );
        for (var i = 0; i < settings.tileCount; ++i) {
          for (var j = 0; j < settings.tileCount; ++j) {
            var x = plugin.boardParts[i][j].x;
            var y = plugin.boardParts[i][j].y;
            if(i != plugin.emptyLoc.x || j != plugin.emptyLoc.y || plugin.solved === true) {
              plugin.context.drawImage(img, x * plugin.tileSize, y * plugin.tileSize, plugin.tileSize, plugin.tileSize,
                  i * plugin.tileSize, j * plugin.tileSize, plugin.tileSize, plugin.tileSize);
            }
          }
        }
      },

      distance: function(x1, y1, x2, y2) {
        return Math.abs(x1 - x2) + Math.abs(y1 - y2);
      },

      slideTile: function(toLoc, fromLoc) {
        if (!plugin.solved) {
          plugin.boardParts[toLoc.x][toLoc.y].x = plugin.boardParts[fromLoc.x][fromLoc.y].x;
          plugin.boardParts[toLoc.x][toLoc.y].y = plugin.boardParts[fromLoc.x][fromLoc.y].y;
          plugin.boardParts[fromLoc.x][fromLoc.y].x = settings.tileCount - 1;
          plugin.boardParts[fromLoc.x][fromLoc.y].y = settings.tileCount - 1;
          toLoc.x = fromLoc.x;
          toLoc.y = fromLoc.y;
          plugin.checkSolved();
        }
      },

      checkSolved: function() {
        var flag = true;
        for (var i = 0; i < settings.tileCount; ++i) {
          for (var j = 0; j < settings.tileCount; ++j) {
            if (plugin.boardParts[i][j].x != i || plugin.boardParts[i][j].y != j) {
              flag = false;
            }
          }
        }
        plugin.solved = flag;
      },

      play: function(){
        $(self).delegate( self, "click", function(e) {
          plugin.clickLoc.x = Math.floor((e.pageX - this.offsetLeft) / plugin.tileSize);
          plugin.clickLoc.y = Math.floor((e.pageY - this.offsetTop) / plugin.tileSize);
          if (plugin.distance(plugin.clickLoc.x, plugin.clickLoc.y, plugin.emptyLoc.x, plugin.emptyLoc.y) == 1) {
            plugin.slideTile(plugin.emptyLoc, plugin.clickLoc);
            plugin.drawTiles();
          }
          if (plugin.solved) {
            setTimeout(function() {alert("You solved it!");}, 500);
          }
        });
      }

    };

    return plugin.imageLoader(img.src).then(function () {
      plugin.setBoard();
      plugin.drawTiles();
      plugin.play();
    });

  };
})(jQuery);