//console.log("un console log random");
//console.log(ro_phrases);
var changePage = function(page) {
    if(page.length > 1) {
        link_input = '?' + page[1];    
    } else {
        link_input = '';
    }
    page = page[0];
    $('.page').hide();
    if (page.length) {
        $('.' + page + 'Page').show();
    }
//    console.log(link_input);
//    console.log(page);
    console.log(translate_func('Home page'));
    if (page == 'index') {
        $('.indexPage .productsTable').html('Loading');
        $.ajax({
            url: '/home_products',
            dataType: 'JSON',
            success: function(products) {
//                console.log(products);
//                console.log(products.length);
                if(products.length) {
                    var html = '<table class="table product_table">' +
                            '<tr>' +
                                '<th>Image</th>' +
                                '<th>Product name</th>' +
                                '<th>Price</th>' + 
                                '<th>Description</th>' +
                                '<th></th>' +
                            '</tr>';

                    $.each(products, function(index, value) {
                        html += '<tr>';
                            html += '<td>';
                                html += '<img src="' + value.image + '"/>';
                            html += '</td>';
                            html += '<td>';
                                html += value.name;
                            html += '</td>';
                            html += '<td>';
                                html += value.price;
                            html += '</td>';
                            html += '<td>';
                                html += value.description;
                            html += '</td>';
                            html += '<td>';
                                html += '<a class="add_to_cart_btn" href="#cart/add=' + value.id + '">Add to cart</a>';
                            html += '</td>';
                        html += '</tr>';
                    });
                    html += '</table>';
//                    console.log(html);
                } else {
                    var html = '<h2>All the products are already in the cart or there are no products available.</h2>';
                }
                $('.indexPage .productsTable').html(html);
            }
        });
    }
    
    if (page == 'cart') {
        $('.cartPage .productsTable').html('Loading');
        $.ajax({
            url: '/cart' + link_input,
            dataType: 'JSON',
            success: function(products) {
//                console.log(products);
//                console.log(products.length);
                if(products.length) {
                    var html = '<table class="table product_table">' +
                            '<tr>' +
                                '<th>Image</th>' +
                                '<th>Product name</th>' +
                                '<th>Price</th>' + 
                                '<th>Description</th>' +
                                '<th></th>' +
                            '</tr>';

                    $.each(products, function(index, value) {
                        html += '<tr>';
                            html += '<td>';
                                html += '<img src="' + value.image + '"/>';
                            html += '</td>';
                            html += '<td>';
                                html += value.name;
                            html += '</td>';
                            html += '<td>';
                                html += value.price;
                            html += '</td>';
                            html += '<td>';
                                html += value.description;
                            html += '</td>';
                            html += '<td>';
                                html += '<a class="add_to_cart_btn" href="#cart/remove=' + value.id + '">Remove from cart</a>';
                            html += '</td>';
                        html += '</tr>';
                    });
                    html += '</table>';
//                    console.log(html);
                } else {
                    var html = '<h2>The cart is empty.</h2>';
                }
                $('.cartPage .productsTable').html(html);
            }
        });
    }
}

var getPage = function() {
    var hash = window.location.hash;
    if (hash.indexOf('#') == 0) {
        hash = hash.substr(1);
    }
    if (hash.indexOf('/') == 0) {
        hash = hash.substr(1);
    }
//    console.log(hash);
//    console.log(hash.split('/'));
//    console.log(hash.split('/').shift());
    return hash.split('/');
}

$(document).ready(function() {
//    console.log("in another file");
    var page = getPage();
    changePage(page ? page : 'index');
});

 $(window).bind('hashchange', function() {
     changePage(getPage());
 });