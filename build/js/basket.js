'use strict';
$(document).ready(function() {
    var  changeAmountOfTheBasket = function(){
        $('._basket-amount').click(function(){
            var _id = $(this).attr('id');
            var _id_product = 	_id.substring(0,5)
            var _amount = $('._basket-amount-'+_id_product).val()
                if(_id.substring(8,13) === 'up')
                    $('._basket-amount-'+_id_product).val(++_amount);
                else if (+_amount > 1) {
                    $('._basket-amount-'+_id_product).val(--_amount);
                }
        });
    }();
});
