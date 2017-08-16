@extends ('layout')

@section ('page_title')
    <title>Shop3 - home page</title>
@endsection

@section ('content')
    <div class="page indexPage" style="display: none;">
        <div class="productsTable"></div>
        <a href="#cart" onclick="changePage('cart')">Cart</a>
    </div>
    <div class="page cartPage" style="display: none;">
        <div class="productsTable"></div>
        <a href="#index" onclick="changePage('index')">Index</a>
    </div>
@endsection