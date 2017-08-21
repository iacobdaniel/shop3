@extends ('layout')

@section ('page_title')
    <title>Shop3 - home page</title>
@endsection

@section ('content')

    <div class="language_container">
        <a class="lang_button" href="#index/lang=en">EN</a>
        <a class="lang_button" href="#index/lang=ro">RO</a>
        <a class="lang_button" href="#index/lang=de">DE</a>
    </div>

    <div class="page indexPage" style="display: none;">
        <h1>Shop3 - <?= translate('Home page') ?></h1>
        <div class="productsTable"></div>
        <a class="big_button" href="#cart" onclick="changePage('cart')"><?= translate('Cart') ?></a>
        <a class="big_button" href="#login" onclick="changePage('login')"><?= translate('Login as admin') ?></a>
    </div>

    <div class="page cartPage" style="display: none;">
        <h1>Shop3 - <?= translate('Cart') ?></h1>
        <div class="productsTable"></div>
        <form class="order_form" action="/email" method="post" style="display: none;">
            {{ csrf_field() }}
            <input required placeholder="<?= translate("Name"); ?>" type="text" name="client">
            <br>
            <br>
            <input required placeholder="<?= translate("email"); ?>" type="text" name="email">
            <br>
            <br>
            <textarea required placeholder="<?= translate("Other details... (address and/or any special request)"); ?>" name="details"></textarea>
            <br>
            <br>
            <button type="submit"><?= translate("Order now!"); ?></button>
        </form>
        <div class="alert alert-danger order_form_errors">
            <ul>
            </ul>
        </div>
        <a class="big_button" href="#index" onclick="changePage('index')"><?= translate("Index"); ?></a>
    </div>

    <div class="page loginPage" style="display: none;">
        <h1>Shop3 - <?= translate("Login"); ?></h1>
        <p>
            <a href="#index" onclick="changePage('index')"><?= translate("Go to frontend!"); ?></a>
        </p>
        <form class="login_form" action="/login" method="post">
            {{ csrf_field() }}
            <label for="user"><?= translate("Username"); ?>: </label>
            <input required type="text" name="user">
            <br>
            <br>
            <label for="password"><?= translate("Password"); ?>: </label>
            <input required type="password" name="password">
            <br>
            <br>
            <button type="submit"><?= translate("Login"); ?></button>
        </form>
        <div class="alert alert-danger login_form_errors">
            <ul>
            </ul>
        </div>
    </div>

    <div class="page adminPage" style="display: none;">
        <h1>Shop3 - <?= translate("Logged in as"); ?> ADMIN</h1>
        <h2><?= translate("What to do next"); ?></h2>
        <p>1. <a href="#products" onclick="changePage('products')"><?= translate("Manage your products"); ?></a></p>
        <p>2. <a href="#index" onclick="changePage('index')"><?= translate("Go to frontend page"); ?></a></p>
        <p>3. <a href="#logout" onclick="changePage('logout')"><?= translate("Logout"); ?></a></p>
    </div>

    <div class="page productsPage" style="display: none;">
        <h1>Shop2 - ADMIN - MANAGE PRODUCTS<?= translate("Order now!"); ?></h1>
        <div class="productsTable"></div>
        <div class="product_form_admin" style="display: none">
            
            <iframe id="edit_create_product_iframe" name="edit_create_product_iframe" height="0" width="0" frameborder="0" scrolling="yes"></iframe>
            
            <form class="edit_create_product_form" action="/create" method="post" enctype="multipart/form-data" target="edit_create_product_iframe">
                {{ csrf_field() }}
                <input type="hidden" name="id" value="">
                <label for="name"><?= translate("Name"); ?></label>
                <br>
                <input type="text" name="name" value="">
                <br>
                <br>
                <label for="price"><?= translate("Price"); ?></label>
                <br>
                <input type="number" name="price" value="">
                <br>
                <br>
                <label for="description"><?= translate("Description"); ?></label>
                <br>
                <textarea type="text" name="description"></textarea>
                <br>
                <br>
                <label for="image"><?= translate("Upload image (only PNG or JPEG/JPG file types with a maximum dimension of 200kB)"); ?></label>
                <br>
                <input type="file" name="image_upload" id="image_upload">
                <br>
                <br>
                <button class="add_to_cart_btn" type="submit"><?= translate("Save"); ?></button>
            </form>                
            
            <a class="big_button" href="#products" onclick="changePage('products')"><?= translate("All products"); ?></a>
        </div>
        
    </div>
@endsection