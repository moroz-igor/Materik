$(document).ready(function() {
        function browserSearch(){
            var browser = navigator.userAgent;
            (browser.search(/Chrome/i) !== -1
                ||browser.search(/OPR/i) !== -1
                    || browser.search(/Firefox/i) !== -1
                        || browser.search(/Safari/i) !== -1)
                                        ? browser = true:
                                          browser = false;
                if(!browser){
                    console.log('I am run!');
                    $('._header-cub').css('display', 'none');
                        $('._isotop-overall').css('display', 'none');
                }
        var cubMozHidden = navigator.userAgent;
                if(cubMozHidden.search(/Firefox/i) !== -1){
                    $('._header-cub').css('display', 'none');
                }
        }
        browserSearch();
/** -------------- Closing and showing discount and popular product of isotope gallery ------------ **/
    $('#close-actions').click(function(evenObject) {
        $('._actions').hide(2000);
        $('#_discount').show(500);
    });
    $('#close-isotop').click(function(evenObject) {
        $('._isotop-overall').hide(2000);
        $('#close-isotop').hide(2000);
        $('#_popular').show(500);
    });
    $('#_discount').click(function(evenObject) {
        $('._actions').show(1000);
        $('#_discount').hide(500);
    });
    $('#_popular').click(function(evenObject) {
        $('._isotop-overall').fadeIn(1000);
        $('#close-isotop').fadeIn(1000);
        $('#_popular').hide(500);
    });
/**--------------- Button of isotope status ---------------------------**/

    $('._is-filters li').click(function(evenObject) {
        $('._is-filters .active').removeAttr('class');
        $(this).attr('class', 'active');
    });
    $('.sort-by li').click(function(evenObject) {
        $('.sort-by .active').removeAttr('class');
        $(this).attr('class', 'active');
    });
});
/** ----------- filters checkboxes style animation ---------**/
// stop erase animations from firing on load
document.addEventListener("DOMContentLoaded",function() {
	var q = document.querySelectorAll(".cb");
	for (var i in q) {
		if (+i < q.length) {
			q[i].addEventListener("click",function(){
				let c = this.classList,
					p = "pristine";
				if (c.contains(p)) {
					c.remove(p);
				}
			});
		}
	}
});
/*anchor up page*/
anchor('._anchor');
function anchor(icon){
    $(icon).hide();
    $(function () {
        $(window).scroll(function () {
            ($(this).scrollTop() > 100) ? $(icon).fadeIn() : $(icon).fadeOut();
        });
        $(icon).click(function () {
            $('body,html').animate({ scrollTop: 0}, 1000);
            return false;
        });
    });
}
