<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Session;
use App\Product;

class HomeController extends Controller
{
    public function index() 
    {
        return view('products.index');
    }
    
    public function products() 
    {
        $cart = Session::get('cart');
        if(!isset($cart)) {
            $products = Product::all();
        } else {
            $products = Product::whereNotIn('id', $cart)->get();
        }
        if(count($products)) {
            $prod_exist = true;
            foreach($products as $product) {
                if(isset(glob('./images/' . $product->id . '.*')[0])) {
                    $product->image = glob('./images/' . $product->id . '.*')[0];
                } else {
                    $product->image = './images/0.png';
                }
            }
        } else {
            $prod_exist = false;
        }
        return json_encode($products);
    }
    
    public function language() {
        $language = Session::get('lang');
        $language = 'ro';
        if(isset($language)) {
            return json_encode($language);
        } else {
            return json_encode('en');
        }
    }
    
    public function setLanguage(Request $request) {
        Session::put('lang', $request['lang']);
        Session::save();
        $language = Session::get('lang');
        return json_encode($language);
    }
}
