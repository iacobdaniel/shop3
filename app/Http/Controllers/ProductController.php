<?php

namespace App\Http\Controllers;

use Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\File;
use App\Http\Controllers\Controller;
use App\Product;
use Intervention\Image\ImageManagerStatic as Image;

class ProductController extends Controller
{
    public function create(Request $request) 
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'description' => 'required',
            'price' => 'required'
        ]);
        $errors = $validator->errors();
        $return_msg = '<div id="content"><div class="alert alert-danger edit_create_product_form_errors"><ul>';       
        foreach ($errors->all() as $message) {
            $return_msg .= '<li>' . $message . '</li>';
        }
        $image = Input::file('image_upload');
        if(!isset($image)) {
            $return_msg .= '<li>An image must be uploaded.</li>';
            $return_msg .= '</ul></div></div>';
            return $return_msg;
        }
        $upload_ok = true;
        $extension = $image->getClientOriginalExtension();
        if(!($extension == 'png' || $extension == 'jpg' || $extension == 'jpeg')) {
            $upload_ok = false;
        }
        $resize = false;
        if($image->getClientSize() > 200000) {
            $resize = true;
        }
        if(!$upload_ok) {
            $return_msg .= '<li>There was an error while uploading the image. Please try again later.</li>';
            $return_msg .= '</ul></div></div>';
            return $return_msg;
        }
        if($validator->fails()) {
            $return_msg .= '</ul></div></div>';
            return $return_msg;
        }
        $product = new Product;
        $product->name = strip_tags(request('name'));
        $product->description = strip_tags(request('description'));
        $product->price = (int)request('price');
        $product->save();
        $img_insert = Image::make($image->getRealPath());
        if($resize) {
            $img_insert->resize(1024, 768)->save(public_path() . '/images/' . (string)$product->id . '.' . $image->getClientOriginalExtension());
        } else {
            $img_insert->save(public_path() . '/images/' . (string)$product->id . '.' . $image->getClientOriginalExtension());
        }
        $return_msg = '<div id="content"><p class="alert-success">success</p></div>';
        return $return_msg;
    }
    
    public function update(Request $request) 
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'description' => 'required',
            'price' => 'required'
        ]);
        $errors = $validator->errors();
        $return_msg = '<div id="content"><div class="alert alert-danger edit_create_product_form_errors"><ul>';
        if($validator->fails()) {
            foreach ($errors->all() as $message) {
                $return_msg .= '<li>' . $message . '</li>';
            }
            $return_msg .= '</ul></div></div>';
            return $return_msg;
        }
        $image = Input::file('image_upload');
        $name = strip_tags(request('name'));
        $price = (int)request('price');
        $description = strip_tags(request('description'));
        $id = (int)request('id');
        $upload_ok = true;
        if(isset($image)) {
            $extension = $image->getClientOriginalExtension();
            if(!($extension == 'png' || $extension == 'jpg' || $extension == 'jpeg')) {
                $upload_ok = false;
            }
            $resize = false;
            if($image->getClientSize() > 200000) {
                $resize = true;
            }
        } else {
            $upload_ok = false;
        }
        Product::where('id', $id)->update([
            'name' => $name,
            'description' => $description,
            'price' => $price
        ]);
        if($upload_ok) {
            $img_insert = Image::make($image->getRealPath());
            $old_images = glob('images/' . (string)$id . '.*');
            File::delete($old_images);
            if($resize) {
                $img_insert->resize(1024, 768)->save(public_path() . '/images/' . (string)$id . '.' . $image->getClientOriginalExtension());
            } else {
                $img_insert->save(public_path() . '/images/' . (string)$id . '.' . $image->getClientOriginalExtension());
            }
        }
        $return_msg = '<div id="content"><p class="alert-success">success</p></div>';
        return $return_msg;
    }
    
    public function delete($id) 
    {
        Product::where('id', $id)->delete();
        $old_images = glob('images/' . (string)$id . '.*');
        File::delete($old_images);
        return redirect('/products');
    }
}
