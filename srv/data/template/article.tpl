<!DOCTYPE html>
<html>

</html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>{{title}}</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="all,follow">
    <!-- Bootstrap CSS-->
    <link rel="stylesheet" href="/vendor/bootstrap/css/bootstrap.min.css">
    <!-- theme stylesheet-->
    <link rel="stylesheet" href="/css/style.default.css" id="theme-stylesheet">
    <!-- code stylesheet-->
    <link rel="stylesheet" href="/css/page.css">
    <!-- Custom stylesheet-->
    {{#each styles}}
    <link rel="stylesheet" href="/{{ this }}?v={{ ../version }}"> 
    {{/each}}
    <link rel="stylesheet" href="/css/custom.css">
    <!-- Favicon-->
    <link rel="shortcut icon" href="/img/favicon.png">
    <!-- Tweaks for older IEs-->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script><![endif]-->
</head>

<body>
    <div id="all">
        <div class="container-fluid">
            <div class="row row-offcanvas row-offcanvas-left">
                {{{ menu }}}
                <!--*** DETAIL ***-->
                <div class="col-md-8 col-lg-9 content-column white-background">
                    {{{ header }}}
                    <div class="row">
                        <div class="col-xl-10">
                            <div class="content-column-content">
                                {{{ content }}}
                            </div>
                             <div class="content-column-content">
                                <div>上一个：
                                 {{#with prev}}
                                    <a href="{{ href }}"> {{ title }}</a>
                                 {{/with}}
                                </div>
                                <div>
                                下一个：
                                {{#with next}}
                                    <a href="{{ href }}"> {{ title }}</a>
                                {{/with}}
                                </div>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- JavaScript files-->
    <script src="/vendor/jquery/jquery.min.js"></script>
    <script src="/vendor/popper.js/umd/popper.min.js"></script>
    <script src="/vendor/bootstrap/js/bootstrap.min.js"></script>
    {{#each scripts}}
    <script type="text/javascript" src="/{{ this }}?v={{ ../version }}"></script>
    {{/each}}
    <script src="/js/prism.js"></script>
    <script>
        window.onload = function() {
            window.Prism = window.Prism || {};
            window.Prism.manual = true;
        }
    </script>
    <script>
    // ------------------------------------------------------ //
    // Main slider
    // ------------------------------------------------------ //
    // $('#main-slider').owlCarousel({
    //     items: 1,
    //     nav: false,
    //     dots: true,
    //     autoplay: true,
    //     autoplayHoverPause: true
    // });
    </script>
    <script src="/js/front.js "></script>
</body>