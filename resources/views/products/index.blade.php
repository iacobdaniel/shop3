@extends ('layout')

@section ('page_title')
    <title>Shop3 - home page</title>
@endsection

@section ('content')
    <div class="page indexPage" style="display: none;">
        <div class="productsTable"></div>
        <a class="go_to_cart" href="#cart" onclick="changePage('cart')">Cart</a>
    </div>
    <div class="page cartPage" style="display: none;">
        <div class="productsTable"></div>
        <form class="order_form" action="/email" method="post">
            {{ csrf_field() }}
            <input required placeholder="<?php echo translate("Name"); ?>" type="text" name="client">
            <br>
            <br>
            <input required placeholder="<?php echo translate("email"); ?>" type="text" name="email">
            <br>
            <br>
            <textarea required placeholder="<?php echo translate("Other details... (address and/or any special request)"); ?>" name="details"></textarea>
            <br>
            <br>
            <button type="submit"><?php echo translate("Order now!"); ?></button>
        </form>
        <a class="go_to_cart" href="#index" onclick="changePage('index')">Index</a>
    </div>
@endsection