;(function ($) {
  'use strict';
  $.fn.puzzle = function(globalOptions, options, image) {

    var self = this;
    var img = new Image();
    img.src = image;

    var boardSize = document.getElementById(self.attr('id')).width;

    // public
    var output = {
      getSolvedTime: function() {
        if (plugin.solved) {
          return plugin.solvedTime;
        } else {
          return 'Not Solved';
        }
      }
    };


    // default settings
    var settings = $.extend({
      tileCount       : 3,
      time            : 3, // minutes
      timeWrapper     : false,
      lostFlag        : false,
      timeLabel       : ["<label>Countdown Time</label>", "x", "seconds"],
      timeFormat      : 'minutes', // OR minutes
      solvedMsg       : "You solved it !",
      solvedMaskMsg   : ["Solved in", "x", "seconds"],
      solvedCallback  : false,
    }, globalOptions, options);

    var plugin = {
      solved: false,
      clockInterval: '',
      solvedTime: 'Not Solved',
      countdownFlag: false,
      boardParts: '',
      tileSize: boardSize / settings.tileCount,
      solvedMaskFlag: false,
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
        plugin.countdownFlag = flag;
      },

      setFormat: function(seconds) {
        var clock = {};
        if (settings.timeFormat === 'seconds') {
          return seconds;
        } else {
          clock.minutes = Math.floor(seconds / 60);
          clock.seconds = seconds - clock.minutes * 60;
          return clock.minutes + ' : ' + clock.seconds;
        }
      },

      countdown: function() {
        var countdown = {};
        var seconds = settings.time * 60;

        // set mainWrapper
        if (settings.timeWrapper !== false) {
          countdown.mainWrapper = $(settings.timeWrapper);
        } else {
          if ($('#puzzle-countdown-wrapper').length === 0) {
            self.parent()
              .prepend('<div id="puzzle-countdown-wrapper">'+ plugin.getClockMask('<time dir="ltr" id="puzzle-countdown">' + plugin.setFormat(seconds) + '</time> ') + '</div>');
          }
          countdown.mainWrapper = $('#puzzle-countdown');
        }

        function setNewSecounds(thisSeconds) {
          if (thisSeconds === 0 && !plugin.lostFlag) {
            plugin.lostFlag = true;
            plugin.lostMask();
          }
          if (thisSeconds > 0 && !plugin.countdownFlag){
            seconds = thisSeconds-1;
            plugin.solvedTime = (settings.time * 60) - seconds;
            return plugin.setFormat(seconds);
          }
        }

        plugin.clockInterval = setInterval(function(){
          countdown.mainWrapper.html(setNewSecounds(seconds));
        }, 1000);

      },

      getClockMask: function(time) {
        $.map(settings.timeLabel, function(item, key){
          if (item == 'x') {
            settings.timeLabel[key] = time;
          }
        });
        return settings.timeLabel.join(' ');        
      },

      getSolvedMsg: function() {
        $.map(settings.solvedMaskMsg, function(item, key){
          if (item == 'x') {
            settings.solvedMaskMsg[key] = plugin.solvedTime;
          }
        });
        return settings.solvedMaskMsg.join(' ');
      },

      solvedMask: function() {
        if (!plugin.solvedMaskFlag) {
          plugin.context.fillStyle = 'rgba(255,255,255, 0.5)';
          plugin.context.fillRect(0, 0,boardSize , boardSize);
          plugin.context.fillStyle = 'rgba(0,0,0, 1)';
          plugin.context.font = "30px Arial";
          plugin.context.fillText(plugin.getSolvedMsg() , boardSize/4, boardSize/2);
          plugin.solvedMaskFlag = true;
          $(self).off('click');
        }
      },

      lostMask: function() {
        if (plugin.lostFlag) {
          plugin.context.fillStyle = 'rgba(255,255,255, 0.5)';
          plugin.context.fillRect(0, 0,boardSize , boardSize);
          plugin.context.fillStyle = 'rgba(0,0,0, 1)';
          plugin.context.font = "30px Arial";
          plugin.context.fillText('Time is over' , boardSize/4, boardSize/2);
          plugin.solvedMaskFlag = true;
          $(self).off('click');
        }
      },      

      play: function() {
        if (!plugin.solvedMaskFlag) {
          $(self).on('click', function playClickhandler(e) {
            plugin.clickLoc.x = Math.floor((e.pageX - this.offsetLeft) / plugin.tileSize);
            plugin.clickLoc.y = Math.floor((e.pageY - this.offsetTop) / plugin.tileSize);
            if (plugin.distance(plugin.clickLoc.x, plugin.clickLoc.y, plugin.emptyLoc.x, plugin.emptyLoc.y) == 1) {
              plugin.slideTile(plugin.emptyLoc, plugin.clickLoc);
              plugin.drawTiles();
            }
            if (plugin.solved) {
              if (settings.solvedCallback !== false) {
                settings.solvedCallback();
              } else {
                setTimeout(function() {
                  alert(settings.solvedMsg);
                }, 500);
              }
              plugin.solvedMask();
            }
          });
        }
      },

      resetGame: function() {
        clearInterval(plugin.clockInterval);
        $(self).off('click');
      },

      thumbnails: function() {
        $('[data-puzzle="thumbnails"]').on('click', '.item', function itemClickHandler() {
          plugin.resetGame();
          var options = {};
          if(typeof($(this).data('puzzleOptions')) !== 'undefined') {
            options = $(this).data('puzzleOptions').replace(/\'/gi, "\"");
            options = jQuery.parseJSON(options);
          }
          var src = $(this).data('puzzleSrc');
          $('[data-puzzle="thumbnails"]').off('click', '.item', itemClickHandler);
          self.puzzle(globalOptions, options, src);
        });
      }

    };

    return plugin.imageLoader(img.src).then(function () {
      $(self).parents().map(function(){
        if (!$(this).is('body') && $(this).css('position') !== 'static') {
          $(this).css('position', 'static');
        }
      });
      plugin.countdown();
      plugin.setBoard();
      plugin.drawTiles();
      plugin.play();
      plugin.thumbnails();
    }), output;

  };
})(jQuery);
