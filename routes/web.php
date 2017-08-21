<?php

Route::get('/', 'HomeController@index');
Route::get('/language', 'HomeController@language');
Route::get('/home_products', 'HomeController@products');
Route::get('/set_lang', 'HomeController@setLanguage');
//Route::post('/set_lang', 'HomeController@setLanguage');
Route::get('/cart', 'CartController@index');
Route::post('/email', 'CartController@email');
Route::get('/login', 'LoginController@index');
Route::post('/login', 'LoginController@login');
Route::get('/logout', 'LoginController@logout');
Route::get('/get_admin', 'LoginController@getAdmin');
Route::get('/admin', 'AdminController@index')->middleware('admin');
Route::get('/products', 'AdminController@products')->middleware('admin');
Route::get('/products/create', 'AdminController@create')->middleware('admin');
Route::get('/products/edit/{id}', 'AdminController@edit')->middleware('admin');
Route::post('/create', 'ProductController@create')->middleware('admin');
Route::post('/update', 'ProductController@update')->middleware('admin');
Route::post('/image_upload', 'ProductController@image_upload')->middleware('admin');
Route::get('/products/delete/{id}', 'ProductController@delete')->middleware('admin');