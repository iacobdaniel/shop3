<!DOCTYPE html>
<html>
<head>
    @yield('page_title')
    <link rel="stylesheet" type="text/css" href="/css/custom.css" media="all" />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<!--
    <script type="text/javascript" src="/js/languages/ro_phrases.js" ></script>
    <script type="text/javascript" src="/js/languages/de_phrases.js" ></script>
-->
    
    <script type="text/javascript"> window.ro_phrases = <?= json_encode(File::getRequire(resource_path() . '/lang/ro/phrases.php')); ?> </script>
    <script type="text/javascript"> window.de_phrases = <?= json_encode(File::getRequire(resource_path() . '/lang/de/phrases.php')); ?> </script>
    
    <script type="text/javascript" src="/js/helpers.js" ></script>
    <script type="text/javascript" src="/js/sp_app.js" ></script>
</head>
<body>
    @yield('content')
</body>
</html>