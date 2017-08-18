<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Product;

class AdminController extends Controller
{
    public function index() 
    {
        return view('admin.index');
    }
    
    public function products() 
    {
        $products = Product::all();
//        if(count($products)) {
//            $prod_exist = true;
//        } else {
//            $prod_exist = false;
//        }
//        return view('admin.products', [
//            'products' => $products,
//            'prod_exist' => $prod_exist
//        ]);
        
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
    
    public function create() 
    {
        return view('admin.create');
    }
    
    public function edit_old($id) 
    {
        $product = new Product;
        $product = Product::where('id', $id)->get();
        if($product->count() != 0) {
            $prod_exist = true;
        } else {
            $prod_exist = false;
        }
        return view('admin.edit', [
            'product' => $product->first(),
            'id' => $id,
            'prod_exist' => $prod_exist
        ]);
    }
    
    public function edit($id) 
    {
        $product = new Product;
        $product = Product::where('id', $id)->get();
        return json_encode($product->first());
    }
}
