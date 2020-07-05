$(document).ready(function() {
    var _sliderMain = function () {
        var _img;
        var _src = $('img[alt=00001]').attr('src');
        _img = _src[_src.length - 5];

        function _height_fix() {
            var _height = $('._exemplar-img__main').height();
                            $('._exemplar-img__main').height(_height);
                            //$('._exemplar-img__main').height($('img[alt=00001]').height());
        }
        $('._ex_right').click(function(evenObject) {
            _height_fix();
            (_img >= 3) ? _img = 0 : _img;
            $('img[alt=00001]').hide()
                                .attr('src','img/products/doors/d-00001/00001_' + ++_img + '.jpg')
                                .fadeIn(500);
        });
        $('._ex_left').click(function(evenObject) {
            _height_fix();
            (_img <= 1) ? _img = 4 : _img;
            $('img[alt=00001]').hide()
            .attr('src','img/products/doors/d-00001/00001_' + --_img + '.jpg')
            .fadeIn(500);
        });
        /** --- resizing incorect behavior of some blocks during changing width of the browser window --- **/
        var _factor = function getParameters(){
            var _h, _w, _factor;
                    _h = $('._exemplar-img__main').height();
                    _w = $('._exemplar-img__main').width();
                    (_h >= _w) ? _factor = _h / _w : _factor = _w / _h;
            return _factor;
        }();
        $(window).resize(function(){
            $('._exemplar-img__main').height($('._exemplar-img__main').width() * _factor);
        });

    }();
    var _sliderDop = function () {

        var _src = $('img[alt=_slider-1]').attr('src');
        var _img = _src[_src.length - 5];
        var _height_img = $('img[alt=_slider-'+ _img + ']').height();
        var _width_img = $('img[alt=_slider-'+ _img + ']').width();
        var _height_container = $('._element_'+ _img).height();
            //var _width_container = $('._element_'+ _img).width();
        var _img_Height =_height_img;
        var _block_Height =_height_container;
        const _SPEED = 3;
        const _AMOUNT = 10;
        console.log(_height_container);
        console.log(_height_img);

        /** --- hidding incorect behavior of some blocks during changing width of the browser window --- **/
        var _factor = function getParameters(){
            var _h, _w, _factor;
                    _h = _height_img;
                    _w = _width_img;
                    (_h >= _w) ? _factor = _h / _w : _factor = _w / _h;
            return _factor;
        }();
        $(window).resize(function(){
            $('.view').height($('.view').width() * _factor);
            //flagReload = true;
            $('._ex_reloader').css('display', 'block');
            $('._ex_arrow').css('display', 'none');
        });
        $('._ex_reloader').click(function(evenObject) {
            location.reload();

        });
            function _hideUp(_img_number) {

                $('._ex_arrow').attr('disabled', 'disabled');            // deactivation of the buutons
                let timermHide = setInterval(function() {
                    $('img[alt=_slider-'+ _img_number + ']').height(_height_img).removeClass('view');
                    $('._element_'+ _img_number).height(_height_container).removeClass('view');
                    _height_img--;
                    _height_container--;
                    if (_height_img <= 0) {
                        _height_img = 0;
                        //_height_container = 0;
                        if(_height_container <= 0){
                            clearInterval(timermHide);
                            if(_img_number != (_AMOUNT-3))              // if this img isn't last in list
                                $('#_ex_up').attr('disabled', false);   // returning the activity of the button
                                $('#_ex_down').attr('disabled', false); // returning the activity of the button in all case
                            _height_img = _img_Height;                  // return the height of the img
                            _height_container = _block_Height;          // return the height of the img-block
                        }
                    }
                }, _SPEED);

            }
            function _showUp(_img_number) {

                var _container_show = 0;
                var _img_show = 0;
                var _it = +_img_number + 3;
                let termShow = setInterval(function() {
                    $('._element_' + _it).height(_container_show)
                                            .addClass('view');
                    $('img[alt=_slider-'+ _it + ']').height(_img_show)
                                                .addClass('view');
                    _container_show++;
                    _img_show++;
                    if (_container_show >= _block_Height) {
                        clearInterval(termShow);
                        _img++;
                    }
                }, _SPEED);
            }
            function _showDown(_img_number) {
                    var _container_show = 0;
                    var _img_show = 0;
                    var _it = _img_number-1;
                    $('._ex_arrow').attr('disabled', 'disabled'); // deactivation of the buuton
                    let termShow = setInterval(function() {
                        $('._element_' + _it).addClass('view').height(_container_show);
                        $('img[alt=_slider-'+ _it + ']').addClass('view').height(_img_show);
                        _container_show++;
                        _img_show++;
                        if (_container_show >= _block_Height) {
                            clearInterval(termShow);
                                _img--;
                                    $('._ex_arrow').attr('disabled', false);
                            }
                        }, _SPEED);
            }
            function _hideDown(_img_number) {
                    let timermHide = setInterval(function() {
                        var _it = _img_number + 2;
                        $('img[alt=_slider-'+ _it + ']').height(_height_img).removeClass('view');
                        $('._element_'+ _it).height(_height_container).removeClass('view');
                        _height_img--;
                        _height_container--;
                        if (_height_img <= 0) {
                            _height_img = 0;
                            if(_height_container <= 0){
                                clearInterval(timermHide);
                                _height_img = _img_Height;
                                _height_container = _block_Height;
                            }
                        }
                    }, _SPEED);
            }
            /** --- run the column of images up --- **/
                $('#_ex_up').click(function(evenObject) {
                        _hideUp(_img);
                            _showUp(_img);
                });
            /** --- run the column of images down --- **/
                $('#_ex_down').click(function(evenObject) {
                    $('#_ex_up').attr('disabled', false);
                    if(_img > 1){
                        _showDown(_img);
                            _hideDown(_img);
                    }
                });
    }();
});
