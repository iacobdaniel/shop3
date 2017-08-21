console.log("un console log random");
console.log(ro_phrases);
un_text = 'Home page';
console.log(un_text);
console.log(ro_phrases[un_text]);

console.log(window.language);

console.log(translate_func(un_text));

var changePage = function(page) {
//    console.log("page params1");
//    console.log(page);
    if(page.length > 1) {
        link_input = '?' + page[1];    
    } else {
        link_input = '';
    }
    mainPage = page[0];
    $('.page').hide();
    if(mainPage == "") {
        mainPage = "index";
    }
    if (mainPage.length) {
        $('.' + mainPage + 'Page').show();
    }
//    console.log("page params2");
//    console.log(page);
//    console.log(link_input);
//    console.log(page);
//    console.log(translate_func('Home page'));
    if (mainPage == 'index') {
        $('.indexPage .productsTable').html('Loading');
        $.ajax({
            url: '/home_products',
            dataType: 'JSON',
            success: function(products) {
//                console.log(products);
//                console.log(products.length);
                if(page[1]) {
                    parameter = page[1].split('=');
    //                console.log(mail);
                    if(parameter[0] == 'mail') {
                        console.log("parametrul este de mail");
                        if(parameter[1] == '1') {
                            console.log("a intrat pe mailul de succes");
                            $('<div class="mail_success"><p>Your order has been successfully sent!</p></div>').insertAfter('.language_container');
                            $(".mail_success").delay(5000).fadeOut(300);
                        } else {
                            console.log("NU a intrat pe mailul de succes");
                            $('<div class="mail_fail"><p>There was an error processing your request. Please try again later!</p></div>').insertAfter('.language_container');
                            $(".mail_fail").delay(5000).fadeOut(300);
                        }
                    } else if(parameter[0] == "lang") {
                        data = {};
                        data['lang'] = parameter[1];
                        $.ajax({
                          url: "set_lang",
                          dataType: 'json',
                          data: data,
                        }).done(function(data) {
                            console.log("am schimbat limba din sesiune");
                            console.log(data);
                        });
                        window.language = parameter[1];
                        console.log("language global parameter changed");
                        console.log(window.language);
                        console.log(translate_func(un_text));
                    }
                }
                
                if(products.length) {
                    var html = '<table class="table product_table">' +
                            '<tr>' +
                                '<th>' + translate_func("Image") + '</th>' +
                                '<th>' + translate_func("Product name") + '</th>' +
                                '<th>' + translate_func("Price") + '</th>' + 
                                '<th>' + translate_func("Description") + '</th>' +
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
                                html += '<a class="add_to_cart_btn" href="#cart/add=' + value.id + '">' + translate_func("Add to cart") + '</a>';
                            html += '</td>';
                        html += '</tr>';
                    });
                    html += '</table>';
//                    console.log(html);
                } else {
                    var html = '<h2>' + translate_func("All the products are already in the cart or there are no products available.") + '</h2>';
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
//                console.log(products);
//                console.log(products.length);
                if(products.length) {
                    var html = '<table class="table product_table">' +
                            '<tr>' +
                                '<th>' + translate_func("Image") + '</th>' +
                                '<th>' + translate_func("Product name") + '</th>' +
                                '<th>' + translate_func("Price") + '</th>' + 
                                '<th>' + translate_func("Description") + '</th>' +
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
                                html += '<a class="rmv_cart_btn add_to_cart_btn" href="#cart/remove=' + value.id + '">' + translate_func("Remove from cart") + '</a>';
                            html += '</td>';
                        html += '</tr>';
                    });
                    html += '</table>';
                    $(".order_form").show();
                } else {
                    $(".order_form").hide();
                    var html = '<h2>' + translate_func("The cart is empty.") + '</h2>';
                }
                $('.cartPage .productsTable').html(html);
            }
        });
    }
    
    if (mainPage == 'login') {
        $(".login_form_errors ul").html('');
        $.ajax({
            url: '/get_admin',
            dataType: 'JSON',
            success: function(admin) {
                if(admin) {
                    window.location.href = "/#admin";
                }
            }
        });
    }
    
    if (mainPage == 'logout') {
        console.log("main page: logout");
        $.ajax({
            url: '/logout',
            success: function() {
                window.location.href = "/#login";
            }
        });
    }
    
    if (mainPage == 'admin') {
        $.ajax({
            url: '/get_admin',
            dataType: 'JSON',
            success: function(admin) {
                if(!admin) {
                    window.location.href = "/#login";
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
                console.log("check admin in products page");
                console.log(admin);
                if(!admin) {
                    window.location.href = "/#login";
                } else {
                    console.log("number of parameters products page");
                    console.log(page);
                    console.log(page.length);
                    if(page.length == 1) {
                        $('.product_form_admin').hide();
                        $.ajax({
                            url: '/products',
                            dataType: 'JSON',
                            success: function(products) {
                //                console.log(products);
                //                console.log(products.length);
                                if(products.length) {
                                    var html = '<table class="table product_table">' +
                                            '<tr>' +
                                                '<th>' + translate_func("Image") + '</th>' +
                                                '<th>' + translate_func("Product name") + '</th>' +
                                                '<th>' + translate_func("Price") + '</th>' + 
                                                '<th>' + translate_func("Description") + '</th>' +
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
                                                html += '<a class="edit_product_btn add_to_cart_btn" onclick="changePage(PageParams(#products/edit/' + value.id + '))" href="#products/edit/' + value.id + '">' + translate_func("Edit product") + '</a>';
                                            html += '</td>';
                                            html += '<td>';
//                                                html += '<a class="delete_product_btn add_to_cart_btn" onclick="changePage(PageParams(#products/delete/' + value.id + '))" href="#products/delete/' + value.id + '">Delete product</a>';
                                                html += '<a class="delete_product_btn add_to_cart_btn" onclick="changePage(PageParams(#products/delete/' + value.id + '))" href="#products/delete/' + value.id + '">' + translate_func("Delete product") + '</a>';
                                            html += '</td>';
                                        html += '</tr>';
                                    });
                                    html += '</table>';
                //                    console.log(html);
                                } else {
                                    var html = '<h2>' + translate_func("There are no products currently in your database.") + '</h2>';
                                }
                                html += '<a class="big_button" href="/#products/create">' + translate_func("Add new product") + '</a>';
                                $('.productsPage .productsTable').html(html);
                            }
                        });
                    } else {
                        console.log("products page multiple parameters");
                        console.log(page[1]);
                        if(page[1] == "delete") {
                            $.ajax({
                                url: '/products/delete/' + page[2],
                                success: function() {
                                    window.location.href = "/#products";
                                }
                            });
                        } else if(page[1] == "edit") {
                            $(".edit_create_product_form_errors ul").html('');
                            $.ajax({
                                url: '/products/edit/' + page[2],
                                success: function(product) {
                                    console.log("products edit mode");
                                    console.log(product);
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
                        } else if(page[1] == "create") {
                            $(".edit_create_product_form_errors ul").html('');
                            $('.edit_create_product_form input[name="id"]').val('new');
                            $('.edit_create_product_form input[name="name"]').val('');
                            $('.edit_create_product_form input[name="price"]').val('');
                            $('.edit_create_product_form textarea[name="description"]').val('');
                            $('.edit_create_product_form .add_to_cart_btn').text('Create');
                            $(".edit_create_product_form").attr("action", "/create");
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
//    console.log(hash);
//    console.log(hash.split('/'));
//    console.log("get page");
//    console.log(hash.split('/').shift());
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

iframe_loaded = 0;

$(document).ready(function() {
//    console.log("in another file");
//    console.log("document ready");
    
    $(".order_form button").click(function(event) {
        event.preventDefault();
        client = $( "input[name=client]" ).val();
        email = $( "input[name=email]" ).val();
        details = $( "textarea[name=details]" ).val();
        token = $( "input[name=_token]" ).val();
        data = {};
        data['client'] = client;
        data['email'] = email;
        data['details'] = details;
        data['_token'] = token;
//        console.log(data);
        $.ajax({
          url: "email",
          type: "post",
          dataType: 'json',
          data: data,
          success: function(data){
            console.log(data);
            if(data['success'] == "true") {
                window.location.href = "/#index/mail=1";
            } else {
                window.location.href = "/#index/mail=0";
            }
            $(".order_form_errors ul").html('');
          },
          error: function(data) {
              var errors = data.responseJSON;
              console.log("there are errors in the processing of your order form, next console log should print out");
              console.log(errors);
              $(".order_form_errors ul").html('');
              $.each(errors, function(index, value) {
                  $(".order_form_errors ul").append('<li>' + value + '</li>');
              });
          }
        });
        
        
//         $.ajax({
//          type: 'post',
//          url: url,
//          data: data,
//          dataType: 'json',
//          success: function(data){
//            // success logic
//          }),
//          error: function(data){
//            var errors = data.responseJSON;
//            console.log(errors);
//            // Render the errors with js ...
//          }
//        });
        
        
//        console.log("am dat click pe button");
    });
    
    $(".login_form button").click(function(event) {
        event.preventDefault();
        user = $( ".login_form input[name=user]" ).val();
        password = $( ".login_form input[name=password]" ).val();
        token = $( ".login_form input[name=_token]" ).val();
        data = {};
        data['user'] = user;
        data['password'] = password;
        data['_token'] = token;
//        console.log(data);
        $.ajax({
          url: "login",
          type: "post",
          dataType: 'json',
          data: data,
            success: function(data) {
                console.log(data);
                if(data['success'] == "true") {
                    window.location.href = "/#admin";
                } else {
                    window.location.href = "/#login";
                }
            }, 
            error: function(data) {
              var errors = data.responseJSON;
              console.log("there are errors in the processing of your order form, next console log should print out");
              console.log(errors);
              $(".login_form_errors ul").html('');
              $.each(errors, function(index, value) {
                  $(".login_form_errors ul").append('<li>' + value + '</li>');
              });
          }
        });
//        console.log("am dat click pe button");
    });
    
   
    
    $(".edit_create_product_form button").click(function(event) {
        event.preventDefault();
        id = $( ".edit_create_product_form input[name=id]" ).val();
        name = $( ".edit_create_product_form input[name=name]" ).val();
        price = $( ".edit_create_product_form input[name=price]" ).val();
        description = $( ".edit_create_product_form textarea[name=description]" ).val();
        token = $( ".edit_create_product_form input[name=_token]" ).val();
        data = {};
        data['id'] = id;
        data['name'] = name;
        data['price'] = price;
        data['description'] = description;
        data['_token'] = token;
        if(data['id'] == "new") {
            $.ajax({
              url: "create",
              type: "post",
              dataType: 'json',
              data: data,
              success: function(data) {
                  console.log(data);
                if(data['success'] == "true") {
                    window.location.href = "/#products";
                }
              },
                error: function(data) {
                  var errors = data.responseJSON;
                  console.log("there are errors in the processing of your order form, next console log should print out");
                  console.log(errors);
                  $(".edit_create_product_form_errors ul").html('');
                  $.each(errors, function(index, value) {
                      $(".edit_create_product_form_errors ul").append('<li>' + value + '</li>');
                  });
                }
            });
        } else {
            $.ajax({
              url: "update",
              type: "post",
              dataType: 'json',
              data: data,
                success: function(data) {
                    console.log(data);
                    if(data['success'] == "true") {
                        window.location.href = "/#products";
                    }
                },
                error: function(data) {
                    var errors = data.responseJSON;
                  console.log("there are errors in the processing of your order form, next console log should print out");
                  console.log(errors);
                  $(".edit_create_product_form_errors ul").html('');
                  $.each(errors, function(index, value) {
                      $(".edit_create_product_form_errors ul").append('<li>' + value + '</li>');
                  });
                }
            });
        }
    });
    
//    $('.image_upload_form input[name="image"]').change(function(event) {
//        files = event.target.files;
//    });
//    
    
    
    $("iframe").load(function() {
        // ok , now you know that the file is uploaded , you can do what you want , for example tell the user that the file is uploaded 
        
        if(iframe_loaded == 1) {
            console.log("The file is uploaded");
            $('iframe #myForm').removeAttr('target');
            $('iframe #myForm button').click();
            
        }
        
        if(iframe_loaded == 0) {
            iframe_loaded = 1;
        }
        
//        name = $( "#myForm input[name=nume_imagine]" ).val();
//        token = $( "#myForm input[name=_token]" ).val();
//        data = {};
//        data['name'] = name;
//        data['_token'] = token;
        
//        $.ajax({
//          url: "image_upload",
//          type: "post",
//          dataType: 'json',
//          data: data,
//            success: function(data) {
//                console.log(data);
////                if(data['success'] == "true") {
////                    window.location.href = "/#admin";
////                } else {
////                    window.location.href = "/#login";
////                }
//            }, 
//            error: function(data) {
//              var errors = data.responseJSON;
//              console.log("there are errors in the processing of your order form, next console log should print out");
//              console.log(errors);
////              $(".login_form_errors ul").html('');
////              $.each(errors, function(index, value) {
////                  $(".login_form_errors ul").append('<li>' + value + '</li>');
////              });
//          }
//        });
        
//        $.post('image_upload', null, function(attachment) {
//            console.log(attachment.name);
//            console.log(attachment.id);
//            
//        }, 'json'); 
        // or you can has your own technique to display the uploaded file name + id ? 
//        $.post('http://example.com/file-upload-service?do=getLastFile',null,function(attachment){
//
//           // add the last uploaded file , so the user can see the uploaded files
//           $("#ajaxResultTest").append("<h4>" + attachment.name + ":" + attachment.id "</h4>");
//
//        },'json');
    });
    
    var page = getPage();
    changePage(page ? page : 'index');
});

$(document).on('click', 'a.delete_product_btn', function() { 
    return confirm(translate_func("Are you sure you want to delete this product?"));
});

$(document).on('click', 'a.rmv_cart_btn', function() { 
    return confirm(translate_func("Are you sure you want to remove item from cart?"));
});

$(window).bind('hashchange', function() {
    changePage(getPage());
});

//nu cred ca e calea buna, in primul rand mai bine o iei babeste si vezi daca s-a urcat ceva si eventual astepti o confirmare dupa. La ce foloseste iframe-ul? nu se zice nicaieri.

function startUpload(){
    document.getElementById('f1_upload_process').style.visibility = 'visible';
    return true;
}

function stopUpload(success){
      var result = '';
      if (success == 1) {
         $('#result').html('<span class="msg">The file was uploaded successfully!<\/span><br/><br/>');
      }
      else {
         $('#result').html('<span class="emsg">There was an error during file upload!<\/span><br/><br/>');
      }
      $('f1_upload_process').hide();
      return true;   
}