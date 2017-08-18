<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Session;
use App\Product;

class HomeController extends Controller
{
    public function index_old() 
    {
        $lang = Input::get('lang');
        if(isset($lang)) {
            $languages = explode(',', LANGUAGES);
            if(in_array($lang, $languages)) {
                Session::put('lang', $lang);
            } else {
                Session::put('lang', 'en');
            }
        } else {
            Session::put('lang', 'en');
        }
        Session::save();
        
        $order_mail = Input::get('mail');
        if(isset($order_mail)) {
            if($order_mail == '1') {
                $order_mail = true;
            } else {
                $order_mail = true;
            }
        }
        $cart = Session::get('cart');
        if(!isset($cart)) {
            $products = Product::all();
        } else {
            $products = Product::whereNotIn('id', $cart)->get();
        }
        if(count($products)) {
            $prod_exist = true;
        } else {
            $prod_exist = false;
        }
        return view('products.index', [
            'products' => $products,
            'prod_exist' => $prod_exist,
            'lang' => Session::get('lang'),
            'order_mail' => $order_mail
        ]);
    }
    
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
