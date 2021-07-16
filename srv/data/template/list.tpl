<!DOCTYPE html>
<html>

</html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>{{ title }}</title>
    </title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="all,follow">
    <!-- Bootstrap CSS-->
    <link rel="stylesheet" href="vendor/bootstrap/css/bootstrap.min.css">
    <!-- Font Awesome CSS-->
    <link rel="stylesheet" href="vendor/font-awesome/css/font-awesome.min.css">
    <!-- Google fonts - Roboto-->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:400,300,700,400italic">
    <!-- owl carousel-->
    <link rel="stylesheet" href="vendor/owl.carousel/assets/owl.carousel.css">
    <link rel="stylesheet" href="vendor/owl.carousel/assets/owl.theme.default.css">
    <!-- theme stylesheet-->
    <link rel="stylesheet" href="css/style.default.css" id="theme-stylesheet">
    <!-- Custom stylesheet - for your changes-->
    <link rel="stylesheet" href="css/custom.css">
    <!-- Favicon-->
    <link rel="shortcut icon" href="img/favicon.png">
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
                <!--   *** DETAIL ***-->
                <div class="col-md-8 col-lg-9 content-column white-background">
                    {{{ header }}}
                    <div class="row">
                        <div class="col-xl-10">
                            <div class="content-column-content ui-newslist">
                                <ul>
                                {{#each list}}
                                    <li>
                                        <img src="/img/portfolio/business-card-26.jpg" alt="{{ title }}">
                                        <div class="ct">
                                            <h3>
                                                <div class="pull-right">
                                                    <small>{{ create_time }}</small>
                                                </div>
                                                  <a href="{{ href }}" target="_blank">  {{ title }} </a>
                                            </h3>
                                            <p>{{ desc }}...</p>
                                        </div>
                                        <div class="clearfix"></div>
                                    </li>
                                {{/each}}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- JavaScript files-->
    <script src="vendor/jquery/jquery.min.js"></script>
    <script src="vendor/popper.js/umd/popper.min.js"></script>
    <script src="vendor/bootstrap/js/bootstrap.min.js"></script>
    <!-- <script src="vendor/jquery.cookie/jquery.cookie.js"></script> -->
    <script src="vendor/owl.carousel/owl.carousel.min.js"></script>
    <script src="vendor/masonry-layout/masonry.pkgd.min.js"></script>
    <script src="js/front.js"></script>
</body>