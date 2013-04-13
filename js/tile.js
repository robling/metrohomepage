//dialog
(function($) {
    $.Dialog = function(params) {
        if(!$.DialogOpened) {
            $.DialogOpened = true;
        } else {
            return false;
        }

        params = $.extend({'position':{'zone':'center'},'overlay':true}, params);

        var buttonsHTML = '<div';

        // Buttons position
        if(params.buttonsAlign)
        {
            buttonsHTML += ' style=" float: ' + params.buttonsAlign + ';">';
        } else {
            buttonsHTML += '>';
        }

        $.each(params.buttons, function(name,obj) {
            // Generating the markup for the buttons

            buttonsHTML += '<button>' + name + '</button>';
            
            if(!obj.action) 
            {
                obj.action = function() {};
            }
        });

        buttonsHTML += '</div>';

        var markup = [
            // If overlay is true, set it

            '<div id="dialogOverlay">',
            '<div id="dialogBox" class="dialog">',
            '<div class="header">',
            params.title,
            (params.closeButton)?('<div><button class="tool-button"><i class="icon-cancel-2"></i></button></div>'):(''),
            '</div>',
            '<div class="content">', params.content, '</div>',
            '<div class="action" id="dialogButtons">',
            buttonsHTML,
            '</div></div></div>'
        ].join('');

        $(markup).hide().appendTo('body').fadeIn();

        if(!params.overlay) {
            $('#dialogOverlay').css('background-color', 'rgba(255, 255, 255, 0)');
        }
        
        // Setting initial position
        if(params.position.zone == "left")
        {
            $('#dialogBox').css("top", Math.max(0, (($(window).height() - $('#dialogBox').outerHeight()) / 3) + 
                                                $(window).scrollTop()) + "px");
            $('#dialogBox').css("left", 0);
        } 
        else if(params.position.zone == "right")
        {
            $('#dialogBox').css("top", Math.max(0, (($(window).height() - $('#dialogBox').outerHeight()) / 3) + 
                                                $(window).scrollTop()) + "px");
            $('#dialogBox').css("left", Math.max(0, (($(window).width() - $('#dialogBox').outerWidth())) + 
                                                            $(window).scrollLeft()) + "px");
        } 
        else
        {
            $('#dialogBox').css("top", (params.position.offsetY)?(params.position.offsetY):(Math.max(0, (($(window).height() - $('#dialogBox').outerHeight()) / 3) + 
                                                                                                $(window).scrollTop()) + "px"));
            $('#dialogBox').css("left", (params.position.offsetX)?(params.position.offsetX):(Math.max(0, (($(window).width() - $('#dialogBox').outerWidth()) / 2) + 
                                                                                                $(window).scrollLeft()) + "px"));
        }

        if(params.draggable) {
            // Make draggable the window

            $('#dialogBox div.header').css('cursor', 'move').on("mousedown", function(e) {
                var $drag = $(this).addClass('active-handle').parent().addClass('draggable');

                var z_idx = $drag.css('z-index'),
                    drg_h = $drag.outerHeight(),
                    drg_w = $drag.outerWidth(),
                    pos_y = $drag.offset().top + drg_h - e.pageY,
                    pos_x = $drag.offset().left + drg_w - e.pageX;
                $drag.css('z-index', 99999).parents().on("mousemove", function(e) {
                    $('.draggable').offset({
                        top:e.pageY + pos_y - drg_h,
                        left:e.pageX + pos_x - drg_w
                    }).on("mouseup", function() {
                        $(this).removeClass('draggable').css('z-index', z_idx);
                    });
                });
                e.preventDefault(); // disable selection
            }).on("mouseup", function() {
                $(this).removeClass('active-handle').parent().removeClass('draggable');
            });
        }

        $('#dialogBox .header button').click(function() { 
            // Bind close button to hide dialog

            $.Dialog.hide();
            return false;
        });

        var buttons = $('#dialogBox .action button'),
            i = 0;

        $.each(params.buttons,function(name,obj){
            buttons.eq(i++).click(function(){
                // Calling function and hide the dialog   

                obj.action();
                $.Dialog.hide();
                return false;
            });
        });
    }

    $.Dialog.hide = function(){
        $('#dialogOverlay').fadeOut(function(){
            $.DialogOpened = false;
            $(this).remove();
        });
    }
})(jQuery);

//startmenu
(function($) {

    $.StartMenu = function(element, options) {

        var $startMenu,
            plugin = this,
            maxGroupHeight;

        plugin.init = function() {
            var resizeTimer;

            $startMenu = $('.tiles');
            
            addMouseWheel();
            setPageWidth();
            tuneUpStartMenu(); // need twice

            $(window).on('resize', function(){
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(function(){
                    tuneUpStartMenu();
                }, 200);
            });
            $startMenu.on('changed', function(){
                tuneUpStartMenu();
            });
        };

        /**
         * called on init 
         * and on resize window
         * and any tiles moves
         */
        var tuneUpStartMenu = function () {
            var $groups = $startMenu.find('.tile-group');
            if ($groups.length === 0) {
                return;
            }
            
            maxGroupHeight = $(window).height() - $($groups.get(0)).offset().top;
            
            $groups.each(function(index, group){
                var $group = $(group);
                // finding min width for group
                var groupWidth = 0;
                var $tiles = $group.find('.tile');
                if ($tiles.length === 0) {
                    return;
                }
                // finding min width according to the widest tile
                $tiles.each(function(index, tile){
                    var $tile = $(tile);
                    var tileWidth = 161;
                    if ($tile.hasClass('double')) {
                        tileWidth = 322;
                    } else if ($tile.hasClass('triple')) {
                        tileWidth = 483;
                    } else if ($tile.hasClass('quadro')) {
                        tileWidth = 644;
                    }
                    
                    if (tileWidth > groupWidth) {
                        groupWidth = tileWidth;
                    }
                });
                
                $group.css({
                    width: 'auto',
                    maxWidth: groupWidth
                });
                
                var counter, groupHeight_,
                groupHeight = $group.height();
                while (groupHeight > maxGroupHeight) {
                    if (counter > $tiles.length) { // protection from endless loop
                        break;
                    } else if (groupHeight === groupHeight_) {
                        counter++;
                    } else {
                        counter = 1;
                    }
                    groupHeight_ = groupHeight;
                    groupWidth += 161;
                    $group.css({
                        'maxWidth': groupWidth
                    });
                    groupHeight = $group.height();
                }
            });
            
            setPageWidth();
        };
        
        var setPageWidth = function () {
            var tilesWidth = 0;
            
            $startMenu.find(".tile-group").each(function(){
                tilesWidth += $(this).outerWidth() + 80;
            });

            $startMenu.css("width", 120 + tilesWidth + 20);
            
            $(".page").css('width', '').css({
                width: $(document).width()
            });
        };
        
        var addMouseWheel = function (){
            $("body").mousewheel(function(event, delta){
                var scroll_value = delta * 50;
                $(document).scrollLeft($(document).scrollLeft() - scroll_value);
                return false;
            });
        };
        
        plugin.init();

    };

    $.fn.StartMenu = function(options) {

        return this.each(function() {
            if (undefined == $(this).data('StartMenu')) {
                var plugin = new $.StartMenu(this, options);
                $(this).data('StartMenu', plugin);
            }
        });
    };

})(jQuery);

$(function(){
    $.StartMenu();
});

//tile-slider
$.easing.doubleSqrt = function(t, millisecondsSince, startValue, endValue, totalDuration) {
    var res = Math.sqrt(Math.sqrt(t));
    return res;
};

(function($) {

    $.tileBlockSlider = function(element, options) {

        // �ߧѧ����ۧܧ� ��� ��ާ�ݧ�ѧߧڧ�
        var defaults = {
            // ��֧�ڧ�� ��ާ֧ߧ� �ܧѧ��ڧߧ��
            period: 2000,
            // ����է�ݧاڧ�֧ݧ�ߧ���� �ѧߧڧާѧ�ڧ�
            duration: 1000,
            // �ߧѧ��ѧӧݧ֧ߧڧ� �ѧߧڧާѧ�ڧ� (up, down, left, right)
            direction: 'up'
        };
        // ��ҧ�֧ܧ� ��ݧѧԧڧߧ�
        var plugin = this;
        // �ߧѧ����ۧܧ� �ܧ�ߧܧ�֧�ߧ�ԧ� ��ҧ�֧ܧ��
        plugin.settings = {};

        var $element = $(element), // reference to the jQuery version of DOM element
            element = element;    // reference to the actual DOM element

        var blocks, // �ӧ�� �ܧѧ��ڧߧܧ�
            currentBlockIndex, // �ڧߧէ֧ܧ� ��֧ܧ��֧ԧ� �ҧݧ�ܧ�
            slideInPosition, // ���ѧ���ӧ�� ���ݧ�ا֧ߧڧ� �ҧݧ�ܧ� ��֧�֧� �ߧѧ�ѧݧ�� ����ӧݧ֧ߧڧ�
            slideOutPosition, // ��ڧߧѧݧ�ߧ�� ���ݧ�ا֧ߧڧ� �ҧݧ�ܧ� ���� ��ܧ���ڧ�
            tileWidth, // ��ѧ٧ާ֧�� ��ݧڧ�ܧ�
            tileHeight;

        // �ڧߧڧ�ڧѧݧڧ٧ڧ��֧�
        plugin.init = function () {

            plugin.settings = $.extend({}, defaults, options);

            // �ӧ�� �ҧݧ�ܧ�
            blocks = $element.children(".tile-content");

            // �֧�ݧ� �ҧݧ�� �ӧ�֧ԧ� 1, ��� ��ݧѧۧէڧߧ� �ߧ� �ߧ�ا֧�
            if (blocks.length <= 1) {
                return;
            }

            // �ڧߧէ֧ܧ� �ѧܧ�ڧӧߧ�ԧ� �� �էѧߧߧ�� �ާ�ާ֧ߧ� �ҧݧ�ܧ�
            currentBlockIndex = 0;

            // ��ѧ٧ާ֧�� ��֧ܧ��֧� ��ݧڧ�ܧ�
            tileWidth = $element.innerWidth();
            tileHeight = $element.innerHeight();
            // ���ݧ�ا֧ߧڧ� �ҧݧ�ܧ��
            slideInPosition = getSlideInPosition();
            slideOutPosition = getSlideOutPosition();

            // ���էԧ��ѧӧݧڧӧѧ֧� �ҧݧ�ܧ� �� �ѧߧڧާѧ�ڧ�
            blocks.each(function (index, block) {
                block = $(block);
                // �ҧݧ�ܧ� �է�ݧاߧ� �ҧ��� position:absolute
                // �ӧ�٧ާ�اߧ� ����� ��ѧ�ѧާ֧�� �٧ѧէѧ� ��֧�֧� �ܧݧѧ�� ���ڧݧ֧�
                // ����ӧ֧��֧�, �� �է�ҧѧӧݧ�֧� �֧�ݧ� ���� �ߧ� ��ѧ�
                if (block.css('position') !== 'absolute') {
                    block.css('position', 'absolute');
                }
                // ��ܧ��ӧѧ֧� �ӧ�� �ҧݧ�ܧ� �ܧ��ާ� ��֧�ӧ�ԧ�
                if (index !== 0) {
                    block.css('left', tileWidth);
                }
            });

            // �٧ѧ���ܧѧ֧� �ڧߧ�֧�ӧѧ� �էݧ� ��ާ֧ߧ� �ҧݧ�ܧ��
            setInterval(function () {
                slideBlock();
            }, plugin.settings.period);
        };

        // ��ާ֧ߧ� �ҧݧ�ܧ��
        var slideBlock = function() {

            var slideOutBlock, // �ҧݧ�� �ܧ������ �ߧѧէ� ��ܧ����
                slideInBlock, // �ҧݧ�� �ܧ������ �ߧѧէ� ���ܧѧ٧ѧ��
                mainPosition = {'left': 0, 'top': 0},
                options;

            slideOutBlock = $(blocks[currentBlockIndex]);

            currentBlockIndex++;
            if (currentBlockIndex >= blocks.length) {
                currentBlockIndex = 0;
            }
            slideInBlock = $(blocks[currentBlockIndex]);

            slideInBlock.css(slideInPosition);

            options = {
                duration: plugin.settings.duration,
                easing: 'doubleSqrt'
            };

            slideOutBlock.animate(slideOutPosition, options);
            slideInBlock.animate(mainPosition, options);
        };

        /**
         * �ӧ�٧ӧ�ѧ�ѧ֧� ���ѧ���ӧ�� ���٧ڧ�ڧ� �էݧ� �ҧݧ�ܧ� �ܧ������ �է�ݧا֧� ����ӧڧ���� {left: xxx, top: yyy}
         */
        var getSlideInPosition = function () {
            var pos;
            if (plugin.settings.direction === 'left') {
                pos = {
                    'left': tileWidth,
                    'top': 0
                }
            } else if (plugin.settings.direction === 'right') {
                pos = {
                    'left': -tileWidth,
                    'top': 0
                }
            } else if (plugin.settings.direction === 'up') {
                pos = {
                    'left': 0,
                    'top': tileHeight
                }
            } else if (plugin.settings.direction === 'down') {
                pos = {
                    'left': 0,
                    'top': -tileHeight
                }
            }
            return pos;
        };

        /**
         * �ӧ�٧ӧ�ѧ�ѧ֧� ��ڧߧѧݧ�ߧ�� ���٧ڧ�ڧ� �էݧ� �ҧݧ�ܧ� �ܧ������ �է�ݧا֧� ��ܧ������ {left: xxx, top: yyy}
         */
        var getSlideOutPosition = function () {
            var pos;
            if (plugin.settings.direction === 'left') {
                pos = {
                    'left': -tileWidth,
                    'top': 0
                }
            } else if (plugin.settings.direction === 'right') {
                pos = {
                    'left': tileWidth,
                    'top': 0
                }
            } else if (plugin.settings.direction === 'up') {
                pos = {
                    'left': 0,
                    'top': -tileHeight
                }
            } else if (plugin.settings.direction === 'down') {
                pos = {
                    'left': 0,
                    'top': tileHeight
                }
            }
            return pos;
        };

        plugin.getParams = function() {

            // code goes here

        }

        plugin.init();

    }

    $.fn.tileBlockSlider = function(options) {
        return this.each(function() {
            if (undefined == $(this).data('tileBlockSlider')) {
                var plugin = new $.tileBlockSlider(this, options);
                $(this).data('tileBlockSlider', plugin);
            }
        });
    }

})(jQuery);


$(window).ready(function(){
    var slidedTiles = $('[data-role=tile-slider], .block-slider, .tile-slider');
    slidedTiles.each(function (index, tile) {
        var params = {};
        tile = $(tile);
        params.direction = tile.data('paramDirection');
        params.duration = tile.data('paramDuration');
        params.period = tile.data('paramPeriod');
        tile.tileBlockSlider(params);
    })

});


//tile-drag
(function($) {

    $.TileDrag = function(element, options) {

        var defaults = {};

        var plugin = this;

        plugin.settings = {};

        var $element = $(element),
            $startMenu,
            $groups,
            settings,
            tiles,
            $draggingTile,
            $parentGroup, // parent group for dragging tile
            draggingTileWidth,
            draggingTileHeight,
            $phantomTile,
            tileDeltaX,
            tileDeltaY,
            tilesCoordinates,
            tileSearchCount = 0, // uses for findTileUnderCursor function
            tileUnderCursorIndex,
            tileUnderCursorSide,
            newGroupsCoordinates,
            newGroupSearchCount = 0,
            newGroupPhantom,
            targetType, // 'new' or 'existing' group
            groupsMaxHeight,
            mouseMoved,
            tileDragTimer;

        plugin.init = function() {
            settings = plugin.settings = $.extend({}, defaults, options);

            $startMenu = $('.tiles');

            // search other 'tile-group' elements
            $groups = $('[data-role=tile-group], .tile-group');

            // select all tiles within group
            tiles = $groups.children('.tile');

            tiles.on('mousedown', startDrag);

        };

        var startDrag = function(event) {
            var $tile,
                tilePosition,
                tilePositionX,
                tilePositionY;

            event.preventDefault();

            // currently dragging tile
            $tile = $draggingTile = $(this);

            // dragging tile dimentions
            draggingTileWidth = $tile.outerWidth();
            draggingTileHeight = $tile.outerHeight();

            // hidden tile to place it where dragging tile will dropped
            $phantomTile = $('<div></div>');
            $phantomTile.css({
                'background': 'none'
            });
            $phantomTile.addClass('tile');
            if ($tile.hasClass('double')) {
                $phantomTile.addClass('double');
            } else if ($tile.hasClass('triple')) {
                $phantomTile.addClass('triple');
            } else if ($tile.hasClass('quadro')) {
                $phantomTile.addClass('quadro');
            }
            if ($tile.hasClass('double-vertical')) {
                $phantomTile.addClass('double-vertical');
            } else if ($tile.hasClass('triple-vertical')) {
                $phantomTile.addClass('triple-vertical');
            } else if ($tile.hasClass('quadro-vertical')) {
                $phantomTile.addClass('quadro-vertical');
            }
            
            // place phantom tile instead dragging one
            $phantomTile.insertAfter($tile);
            targetType = 'existing';
            
            // search parent group
            $parentGroup = $tile.parents('.tile-group');

            // dragging tile position within group
            tilePosition = $tile.offset();
            tilePositionX = tilePosition.left - (event.pageX - event.clientX);
            tilePositionY = tilePosition.top - (event.pageY - event.clientY);

            // pixels count between cursor and dragging tile border
            tileDeltaX = event.clientX - tilePositionX;
            tileDeltaY = event.clientY - tilePositionY;

            // move tile element to $draggingTileContainer
            $tile.detach();
            $tile.insertAfter($($groups.get(-1))); // it need for invalid IE z-index

            // from now it fixed positioned
            $tile.css({
                'position':     'fixed',
                'left':         tilePositionX,
                'top':          tilePositionY,
                'z-index':      100000
            });

            // store it for future
            $tile.data('dragging', true);
            storeTilesCoordinates();
            storeNewGroupsCoordinates();

            // some necessary event handlers
            $(document).on('mousemove.tiledrag', dragTile);
            $(document).one('mouseup.tiledrag', dragStop);

            mouseMoved = false;

            // triggering event
            $groups.trigger('drag', [$draggingTile, $parentGroup]);
        };

        /**
         * it function called on every mousemove event
         */
        var dragTile = function (event) {
            mouseMoved = true;

            event.preventDefault();

            // move dragging tile
            $draggingTile.css({
                'left': event.clientX - tileDeltaX,
                'top':  event.clientY - tileDeltaY
            });

            clearTimeout(tileDragTimer);
            tileDragTimer = setTimeout(function(){
                findPlace(event);
            }, 50);
        };

        // finding place where put dragging tile
        var findPlace = function (event) {
            // all we need is index of tile under cursor (and under dragging tile) if it exists
            var findTileIndex,
                findNewGroup;

            findTileIndex = findTileUnderCursor(event);
            if (findTileIndex) {
                clearPlaceForTile($(tiles[findTileIndex]));
            } else {
                findNewGroup = findNewGroupUnderCursor(event);
                if (findNewGroup) {
                    showNewGroupPhantom(findNewGroup.group, findNewGroup.side);
                }
            }
        };

        /**
         * when this function called dragging tile dropping to clear place (instead phantom tile)
         * removing events
         * and some other necessary changes
         */
        var dragStop = function (event) {
            var targetGroup;
            
            if (!mouseMoved) {
                // emulate default click behavior
                if ($draggingTile.is('a')) {
                    if ($draggingTile.prop('target') === '_blank') {
                        window.open($draggingTile.attr('href'));
                    } else {
                        window.location.href = $draggingTile.attr('href');
                    }
                }
            } else {
                event.preventDefault();
            }

            clearTimeout(tileDragTimer);
            findPlace(event);

            $draggingTile.detach();
            // it is two way now: drop to existing group or drop to new group
            // first drop to existing group
            if (targetType === 'existing') {
                $draggingTile.insertAfter($phantomTile);
                targetGroup = $phantomTile.parents('.tile-group');
                $phantomTile.remove();
            } else {
                newGroupPhantom.css({
                    'backgroundColor': '',
                    'width': 'auto',
                    'max-width': '322px',
                    'height': ''
                });
                $draggingTile.appendTo(newGroupPhantom);
                targetGroup = newGroupPhantom;
                newGroupPhantom = undefined;
            }

            // remove parent group if it was a last tile there
            if ($parentGroup.find('.tile').length === 0) {
                $parentGroup.remove();
            }

            $draggingTile.css({
                'position': '',
                'left':     '',
                'top':      '',
                'z-index':  ''
            });

            $draggingTile.data('dragging', false);
            $(document).off('mousemove.tiledrag');

            $groups = $('[data-role=tile-group], .tile-group');
            $groups.trigger('drop', [$draggingTile, targetGroup]);
            
            $startMenu.trigger('changed');
        };

        /*
         * stores tiles coordinates for future finding one tile under cursor
         * excluding current dragging tile
         */
        var storeTilesCoordinates = function () {
            tilesCoordinates = {};
            tiles.each(function (index, tile) {
                var $tile, offset;

                $tile = $(tile);

                // we dont need dragging tile coordinates
                if ($tile.data('dragging')) return;

                offset = $tile.offset();
                // it is not real coordinates related to document border
                // but corrected for less computing during dragging (tile moving)
                tilesCoordinates[index] = {
                    x1: offset.left + tileDeltaX - draggingTileWidth / 2,
                    y1: offset.top + tileDeltaY - draggingTileHeight / 2,
                    x2: offset.left + $tile.outerWidth() + tileDeltaX - draggingTileWidth / 2,
                    y2: offset.top + $tile.outerHeight() + tileDeltaY - draggingTileHeight / 2
                }
            });
        };

        /**
         * if tile dragging under this place it will creating new group there
         */
        var storeNewGroupsCoordinates = function () {
            groupsMaxHeight = 0;
            newGroupsCoordinates = [];
            $groups.each(function(index){
                var offset,
                    width,
                    height,
                    $group;

                $group = $(this);

                offset = $group.offset();

                width = $group.width();
                height = $group.height();

                // make it possible to insert new group before first one
                if (index === 0) {
                    newGroupsCoordinates.push({
                        x1: offset.left - 70 + tileDeltaX - draggingTileWidth / 2,
                        x2: offset.left + tileDeltaX - draggingTileWidth / 2,
                        y1: offset.top + tileDeltaY - draggingTileHeight / 2,
                        y2: offset.top + height + tileDeltaY - draggingTileHeight / 2,
                        side: 'before',
                        group: $group
                    });
                }

                newGroupsCoordinates.push({
                    x1: offset.left + width + tileDeltaX - draggingTileWidth / 2,
                    x2: offset.left + width + 70 + tileDeltaX - draggingTileWidth / 2,
                    y1: offset.top + tileDeltaY - draggingTileHeight / 2,
                    y2: offset.top + height + tileDeltaY - draggingTileHeight / 2,
                    side: 'after',
                    group: $group
                });

                if (groupsMaxHeight < height) {
                    groupsMaxHeight = height;
                }

            });
        };

        /**
         * search tile under cursor using tileCoordinates from storeTilesCoordinates function
         * search occurred only one time per ten times for less load and more smooth
         */
        var findTileUnderCursor = function (event) {
            var i, coord,
                tileIndex = false,
                tileSide;

            for (i in tilesCoordinates) {
                if (!tilesCoordinates.hasOwnProperty(i)) return;
                coord = tilesCoordinates[i];
                if (coord.x1 < event.pageX && event.pageX < coord.x2 && coord.y1 < event.pageY && event.pageY < coord.y2) {
                    tileIndex = i;
                    break;
                }
            }

            // detect side of tile (left or right) to clear place before or after tile
            if (tileIndex) {
                if (event.pageX < coord.x1 + $(tiles[tileIndex]).outerWidth() / 2) {
                    tileSide = 'before';
                } else {
                    tileSide = 'after';
                }
            }
            if (tileSide === tileUnderCursorSide && tileIndex === tileUnderCursorIndex) {
                return false;
            }
            tileUnderCursorSide = tileSide;
            tileUnderCursorIndex = tileIndex;

            return tileIndex;
        };

        var findNewGroupUnderCursor = function (event) {
            var i, coord, newGroup = false;

            for (i in newGroupsCoordinates) {
                if (!newGroupsCoordinates.hasOwnProperty(i)) return;
                coord = newGroupsCoordinates[i];
                if (coord.x1 < event.pageX && event.pageX < coord.x2 && coord.y1 < event.pageY && event.pageY < coord.y2) {
                    newGroup = coord;
                    break;
                }
            }

            if (!newGroup) {
                return false;
            } else {
                return newGroup;
            }
        };

        /**
         * just put phantom tile near tile under cursor (before or after)
         * and remove previous phantom tile
         */
        var clearPlaceForTile = function ($tileUnderCursor) {
            var $oldPhantomTile,
                $newParentGroup;

            $oldPhantomTile = $phantomTile;
            $phantomTile = $oldPhantomTile.clone();
            targetType = 'existing';

            // before or after, this is question ...
            if (tileUnderCursorSide === 'before') {
                $phantomTile.insertBefore($tileUnderCursor);
            } else {
                $phantomTile.insertAfter($tileUnderCursor);
            }

            if (newGroupPhantom) {
                newGroupPhantom.remove();
            }
            $oldPhantomTile.remove();

            // check if it was last tile in group and it drag out
            if ($parentGroup.find('.tile').length === 0) {
                $newParentGroup = $tileUnderCursor.parent('.tile-group');
                if ($parentGroup[0] !== $newParentGroup[0]) {
                    // and if it true, make parent group invisible
                    $parentGroup.css({
                        'width': 0,
                        'margin': 0
                    });
                }
            }
            
            $startMenu.trigger('changed');
            storeAllNecessaryCoordinates();
        };

        /**
         * makes visible new group place
         * @param relGroup relative group
         * @param side 'after' or 'before'
         */
        var showNewGroupPhantom = function (relGroup, side) {
            if ($phantomTile) {
                $phantomTile.remove()
            }
            if (newGroupPhantom) {
                newGroupPhantom.remove();
            }

            newGroupPhantom = $('<div class="tile-group"></div>');
            newGroupPhantom.css({
                'height': groupsMaxHeight,
                'width': '70px',
                'backgroundColor': '#333333',
                'position': 'relative'
            });
            relGroup[side](newGroupPhantom);
            targetType = 'new';

            // check if it was last tile in group and it drag out
            if ($parentGroup.find('.tile').length === 0) {
                $parentGroup.css({
                    'width': 0,
                    'margin': 0
                });
            }

            $startMenu.trigger('changed');
            storeAllNecessaryCoordinates();
        };

        var storeAllNecessaryCoordinates = function () {
            storeTilesCoordinates();
            storeNewGroupsCoordinates();
        };

        // return all groups involved to this plugin
        plugin.getGroups = function () {
            return $groups;
        };

        plugin.init();

    };

    $.fn.TileDrag = function(options) {

        //this.each(function() {
        var group = $(this[0]);
        if (undefined == group.data('TileDrag')) {
            var plugin = new $.TileDrag(group, options);
            var $groups = plugin.getGroups();
            $groups.data('TileDrag', plugin);
        }
        //});

    };

})(jQuery);

$(function(){
    var allTileGroups = $('[data-role=tile-group], .tile-group');
    if (allTileGroups.length > 0) {
        $(allTileGroups).TileDrag({});
    }
});
