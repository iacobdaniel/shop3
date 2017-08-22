var changePage = function(page) {
    if(page.length > 1) {
        link_input = '?' + page[1];
    } else {
        link_input = '';
    }
    mainPage = page[0];
    $('.page').hide();
    if(mainPage == '') {
        mainPage = 'index';
    }
    if (mainPage.length) {
        $('.' + mainPage + 'Page').show();
    }
    if (mainPage == 'index') {
        $('.indexPage .productsTable').html('Loading');
        $.ajax({
            url: '/home_products',
            dataType: 'JSON',
            success: function(products) {
                if(page[1]) {
                    parameter = page[1].split('=');
                    if(parameter[0] == 'mail') {
                        if(parameter[1] == '1') {
                            $('<div class="mail_success"><p>Your order has been successfully sent!</p></div>').insertAfter('.language_container');
                            $('.mail_success').delay(5000).fadeOut(300);
                        } else {
                            $('<div class="mail_fail"><p>There was an error processing your request. Please try again later!</p></div>').insertAfter('.language_container');
                            $('.mail_fail').delay(5000).fadeOut(300);
                        }
                    } else if(parameter[0] == 'lang') {
                        data = {};
                        data['lang'] = parameter[1];
                        $.ajax({
                          url: 'set_lang',
                          dataType: 'json',
                          data: data,
                        })
                        window.language = parameter[1];
                    }
                }
                
                if(products.length) {
                    var html = '<table class="table product_table">' +
                            '<tr>' +
                                '<th>' + translate_func('Image') + '</th>' +
                                '<th>' + translate_func('Product name') + '</th>' +
                                '<th>' + translate_func('Price') + '</th>' + 
                                '<th>' + translate_func('Description') + '</th>' +
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
                                html += '<a class="add_to_cart_btn" href="#cart/add=' + value.id + '">' + translate_func('Add to cart') + '</a>';
                            html += '</td>';
                        html += '</tr>';
                    });
                    html += '</table>';
                } else {
                    var html = '<h2>' + translate_func('All the products are already in the cart or there are no products available.') + '</h2>';
                }
                $('.indexPage .productsTable').html(html);
            }
        });
    }
    
    if (mainPage == 'cart') {
        $('.cartPage .productsTable').html('Loading');
        $.ajax({
            url: '/cart' + link_input,
            dataType: 'JSON',
            success: function(products) {
                if(products.length) {
                    var html = '<table class="table product_table">' +
                            '<tr>' +
                                '<th>' + translate_func('Image') + '</th>' +
                                '<th>' + translate_func('Product name') + '</th>' +
                                '<th>' + translate_func('Price') + '</th>' + 
                                '<th>' + translate_func('Description') + '</th>' +
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
                                html += '<a class="rmv_cart_btn add_to_cart_btn" href="#cart/remove=' + value.id + '">' + translate_func('Remove from cart') + '</a>';
                            html += '</td>';
                        html += '</tr>';
                    });
                    html += '</table>';
                    $('.order_form').show();
                } else {
                    $('.order_form').hide();
                    var html = '<h2>' + translate_func('The cart is empty.') + '</h2>';
                }
                $('.cartPage .productsTable').html(html);
            }
        });
    }
    
    if (mainPage == 'login') {
        $('.login_form_errors ul').html('');
        $.ajax({
            url: '/get_admin',
            dataType: 'JSON',
            success: function(admin) {
                if(admin) {
                    window.location.href = '/#admin';
                }
            }
        });
    }
    
    if (mainPage == 'logout') {
        $.ajax({
            url: '/logout',
            success: function() {
                window.location.href = '/#login';
            }
        });
    }
    
    if (mainPage == 'admin') {
        $.ajax({
            url: '/get_admin',
            dataType: 'JSON',
            success: function(admin) {
                if(!admin) {
                    window.location.href = '/#login';
                }
            }
        });
    }
    
    if (mainPage == 'products') {
        $('.productsPage .productsTable').html('');
        $.ajax({
            url: '/get_admin',
            dataType: 'JSON',
            success: function(admin) {
                if(!admin) {
                    window.location.href = '/#login';
                } else {
                    if(page.length == 1) {
                        $('.product_form_admin').hide();
                        $.ajax({
                            url: '/products',
                            dataType: 'JSON',
                            success: function(products) {
                                if(products.length) {
                                    var html = '<table class="table product_table">' +
                                            '<tr>' +
                                                '<th>' + translate_func('Image') + '</th>' +
                                                '<th>' + translate_func('Product name') + '</th>' +
                                                '<th>' + translate_func('Price') + '</th>' + 
                                                '<th>' + translate_func('Description') + '</th>' +
                                                '<th></th>' +
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
                                                html += '<a class="edit_product_btn add_to_cart_btn" onclick="changePage(PageParams(#products/edit/' + value.id + '))" href="#products/edit/' + value.id + '">' + translate_func('Edit product') + '</a>';
                                            html += '</td>';
                                            html += '<td>';
                                                html += '<a class="delete_product_btn add_to_cart_btn" onclick="changePage(PageParams(#products/delete/' + value.id + '))" href="#products/delete/' + value.id + '">' + translate_func('Delete product') + '</a>';
                                            html += '</td>';
                                        html += '</tr>';
                                    });
                                    html += '</table>';
                                } else {
                                    var html = '<h2>' + translate_func('There are no products currently in your database.') + '</h2>';
                                }
                                html += '<a class="big_button" href="/#products/create">' + translate_func('Add new product') + '</a>';
                                $('.productsPage .productsTable').html(html);
                            }
                        });
                    } else {
                        if(page[1] == 'delete') {
                            $.ajax({
                                url: '/products/delete/' + page[2],
                                success: function() {
                                    window.location.href = '/#products';
                                }
                            });
                        } else if(page[1] == 'edit') {
                            $('.edit_create_product_form_errors ul').html('');
                            $.ajax({
                                url: '/products/edit/' + page[2],
                                success: function(product) {
                                    product = $.parseJSON(product);
                                    console.log(product.price);
                                    $('.edit_create_product_form input[name="id"]').val(product.id);
                                    $('.edit_create_product_form input[name="name"]').val(product.name);
                                    $('.edit_create_product_form input[name="price"]').val(product.price);
                                    $('.edit_create_product_form textarea[name="description"]').val(product.description);
                                    $('.edit_create_product_form .add_to_cart_btn').text('Save');
                                    $(".edit_create_product_form").attr("action", "/update");
                                }
                            });
                            $('.product_form_admin').show();
                        } else if(page[1] == 'create') {
                            $('.edit_create_product_form_errors ul').html('');
                            $('.edit_create_product_form input[name="id"]').val('new');
                            $('.edit_create_product_form input[name="name"]').val('');
                            $('.edit_create_product_form input[name="price"]').val('');
                            $('.edit_create_product_form textarea[name="description"]').val('');
                            $('.edit_create_product_form .add_to_cart_btn').text('Create');
                            $('.edit_create_product_form').attr('action', '/create');
                            $('.product_form_admin').show();
                        }
                    }
                }
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
    return hash.split('/');
}

var PageParams = function(hash) {
    if (hash.indexOf('#') == 0) {
        hash = hash.substr(1);
    }
    if (hash.indexOf('/') == 0) {
        hash = hash.substr(1);
    }
    
    return hash.split('/');
}

$(document).ready(function() {
    $('.order_form button').click(function(event) {
        event.preventDefault();
        data = {};
        data['client'] = $( 'input[name=client]' ).val();
        data['email'] = $( 'input[name=email]' ).val();
        data['details'] = $( 'textarea[name=details]' ).val();
        data['_token'] = $( 'input[name=_token]' ).val();
        $.ajax({
            url: 'email',
            type: 'post',
            dataType: 'json',
            data: data,
            success: function(data) {
                if(data['success'] == 'true') {
                    window.location.href = '/#index/mail=1';
                } else {
                    window.location.href = '/#index/mail=0';
                }
                $('.order_form_errors ul').html('');
            },
            error: function(data) {
                var errors = data.responseJSON;
                $('.order_form_errors ul').html('');
                $.each(errors, function(index, value) {
                    $('.order_form_errors ul').append('<li>' + value + '</li>');
                });
            }
        });
    });
    
    $('.login_form button').click(function(event) {
        event.preventDefault();
        data = {};
        data['user'] = $( '.login_form input[name=user]' ).val();
        data['password'] = $( '.login_form input[name=password]' ).val();
        data['_token'] = $( '.login_form input[name=_token]' ).val();
        $.ajax({
            url: 'login',
            type: 'post',
            dataType: 'json',
            data: data,
            success: function(data) {
                if(data['success'] == 'true') {
                    window.location.href = '/#admin';
                } else {
                    window.location.href = '/#login';
                    $('.login_form').after('<div class="login_fail"><p>Username or password incorrect.</p></div>');
                    console.log('mail login fail');
                    $('.login_fail').delay(5000).fadeOut(300);
                }
            }, 
            error: function(data) {
                var errors = data.responseJSON;
                $('.login_form_errors ul').html('');
                $.each(errors, function(index, value) {
                    $('.login_form_errors ul').append('<li>' + value + '</li>');
                });
            }
        });
    });
    
    $('iframe#edit_create_product_iframe').load(function() {
        $('iframe#edit_create_product_iframe .edit_create_product_form').removeAttr('target');
        $('iframe#edit_create_product_iframe .edit_create_product_form button').click();
        $('.edit_create_product_form_errors').remove();
        $('.alert-success').remove();
        $('.edit_create_product_form').after($('iframe#edit_create_product_iframe').contents().find('#content').html());
        if($('iframe#edit_create_product_iframe').contents().find('#content > p').html() == 'success') {
            setTimeout(function() {
                $('.edit_create_product_form_errors').remove();
                $('.alert-success').remove();
                $('.edit_create_product_form')[0].reset();
                window.location.href = '/#products';
            }, 5000);
        }
    });
    var page = getPage();
    changePage(page ? page : 'index');
});

$(document).on('click', 'a.delete_product_btn', function() { 
    return confirm(translate_func('Are you sure you want to delete this product?'));
});

$(document).on('click', 'a.rmv_cart_btn', function() { 
    return confirm(translate_func('Are you sure you want to remove item from cart?'));
});

$(window).bind('hashchange', function() {
    changePage(getPage());
});