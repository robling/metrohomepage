<?php
	require("timeline.php");
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
    <meta name="viewport" content="target-densitydpi=device-dpi, width=device-width, initial-scale=1.0, maximum-scale=1">
    <meta name="description" content="The homepage of Robin.L; All about me">
    <meta name="author" content="Sergey Pimenov">
    <meta name="keywords" content="homepage links">

	<link href="css/modern.css" rel="stylesheet">
    <link href="css/modern-responsive.css" rel="stylesheet">
    <link href="css/theme-dark.css" rel="stylesheet" type="text/css">
	<link href="css/site-home.css" rel="stylesheet">
	
	<title>My Start Page</title>

</head>
<body class="metrouicss" data-stellar-background-ratio="0.5">
<div class="page secondary fixed-header bg-color-">
    <div class="page-header ">
        <div class="page-header-content">
            <div class="user-login">
                <a href="#">
                    <div class="name">
                        <span class="first-name">Robin</span>
                        <span class="last-name">Liu</span>
                    </div>
                    <div class="avatar">
                        <img src="img/default.png"/>
                    </div>
                </a>
            </div>

            <h1 class="fg-color-white">Home</h1>
        </div>
    </div>

    <div class="page-region">
        <div class="page-region-content tiles">
			
			<!-- Group 1 -->
            <div class="tile-group">
				
				<!-- My Blog -->
                <div out="http://spdf.me/" class="tile icon bg-color-green link_out">
                    <div class="tile-content">
                        <img src="img/wordpress.png" alt="">
                    </div>
					<div class="brand">
						<span class="name">Blog</span>
					</div>
                </div>
				
				<!-- Email -->
				<div id="email" class="tile icon bg-color-pink">
                    <div class="tile-content">
                        <img src="img/email.png"></i>
                    </div>
                    <div class="brand">
                        <span class="name">Mail me</span>
                    </div>
                </div>
				
				<!-- Delicioue -->
                <div class="tile bg-color-blueDark icon link_out" out="http://delicious.com/robling">
                    <div class="tile-content">
                        <img src="img/delicious.png" alt="" />
                    </div>
                    <div class="brand">
                        <span class="name">Delicious</span>
                    </div>
                </div>
				
				<!-- Hitokoto -->
				<div class="tile bg-color-orange double">
                    <div class="tile-content">
                        <h2 style="margin-top:10px;"><?php  echo $hitokoto ?></h2>
                    </div>
                    <div class="brand">
                        <div class="name">ヒトコト - Hitokoto</div>
                    </div>
                </div>
				
				<!-- My twitter -->
                <div id="twitter" class="tile double bg-color-blue link_out" data-role="tile-slider" data-param-period="4000" out="http://twitter.com/roblin_spdf">
                    <div class="tile-content">
                        <img src="img/twitter.png" alt="" class="icon"/>
                    </div>
                    <div class="tile-content">
						<img src="img/default.png" class="place-left"/>
                        <h3 style="margin-bottom: 5px;">一树小草</h3>
                        <p>
                            抱歉，超出了Twitter api的小时配额，无法获取最新的条目。
                        </p>
                    </div>
                    <div class="brand">
                        <div class="name">Twitter</div>
                    </div>
                </div>
				
				<!-- My Bangummi -->
				<div class="tile bg-color-greenLight double link_out" data-role="tile-slider" data-param-period="7000" out="http://bangumi.tv/user/spdf" >
                    <div class="tile-content">
                        <img src="img/bangumi.png" alt=""/ class="icon">
                    </div>
					<div class="tile-content place-left">
                        <?php echo $pic ?>
						<h3 style="margin-top: 5px;"><a href="<?php echo $link ?>"><?php echo $title ?></a></h3>
                    </div>
                    <div class="brand">
                        <span class="name">Bangumi</span>
                    </div>
                </div>
				
				<!-- Github -->
				<div class="tile bg-color-purple icon link_out" out="http://github.com/spdf">
                    <div class="tile-content">
                        <img src="img/github.png" alt=""/>
                    </div>
                    <div class="brand">
                        <span class="name">Github</span>
                    </div>
                </div>
				
				<!-- Sina Weibo -->
				<div class="tile bg-color-yellow link_out" out="http://weibo.com/spdfgh">
                    <div class="tile-content">
                        <img src="img/sina.png" alt="" class="logo-small" />
                    </div>
                    <div class="brand">
                        <span class="name">Weibo</span>
                    </div>
                </div>
				
				<!-- Facebook -->
				<div class="tile bg-color-blueDark icon link_out" out="http://www.facebook.com/robin.liu.12914">
                    <div class="tile-content">
                        <img src="img/facebook.png" alt=""/>
                    </div>
                    <div class="brand">
                        <span class="name">Facebook</span>
                    </div>
                </div>

				<!-- Amazon Wishlist -->
                <div class="tile icon bg-color-orangeDark link_out" out="http://www.amazon.cn/registry/wishlist/3FAWWKP2I6RO1/ref=cm_wl_act_vv?_encoding=UTF8&reveal=&visitor-view=1">
                    <div class="tile-content">
                        <img src="img/amazonwishlist.png"/>
                    </div>
                    <div class="brand">
                        <div class="name">Buy me a gift</div>
                    </div>
                </div>

            </div>
			
			<!-- Group 2 -->
            <div class="tile-group tile-drag">
			
				<!-- Image Slider -->
				<div class="tile double image-slider" data-role="tile-slider" data-param-period="5000" data-param-direction="left">
                    <div class="tile-content">
                        <img src="img/1.png" alt="">
                    </div>
                    <div class="tile-content">
                        <img src="img/2.png" alt="">
                    </div>
                    <div class="tile-content">
                        <img src="img/3.png" alt="">
                    </div>
					<div class="brand">
                        <span class="name">Picture</span>
                    </div>
                </div>
				
				<!-- OSU! -->
				<div id="about" class="tile icon bg-color-orangeDark link_out" out="http://osu.ppy.sh/u/1445690">
                    <div class="tile-content">
                        <img src="img/osu.png" alt="">
                    </div>
                    <div class="brand">
                        <div class="name">About</div>
                    </div>
                </div>
				
				<!-- About This Page -->
				<div id="about" class="tile icon bg-color-blue">
                    <div class="tile-content">
                        <h1 style="margin-top:10px;margin-left:10px;" > About</h1>
                    </div>
                    <div class="brand">
                        <div class="name">About</div>
                    </div>
                </div>
            </div>
		</div>
    </div>
</div>

	<script type="text/javascript" src="js/jquery-1.9.0.min.js"></script>
    <script type="text/javascript" src="js/jquery.mousewheel.min.js"></script>
	<script type="text/javascript" src="js/jquery.stellar.min.js"></script>
	<script type="text/javascript" src="js/tile.js"></script>

    <script type="text/javascript">
		$(function(){
			$.stellar();
		});
	     $(document).ready(function(){
                $('#email').dblclick(function(e) {
                    $.Dialog({
                        'title'      : 'My email adress',
                        'content'    : '<br/><h2 style="margin-left:20%;">spdf@live.com</h2><br/><p style="margin-left:20%;">常联系啊！</p>',
                        'buttons'    : {
                            'Send Me An Email'    : {
                                'action': function(){window.open("mailto:spdf@live.com");}
                            },
                            'Cancel'     : {
                                'action': function(){}
                            }
                        }
                    });
                });
				//for test,use dblclick,else mouseup
				$('.link_out').dblclick(function(e) {
					//alert($(this).attr("out"));
                    window.open($(this).attr("out"));
                });
			});
	</script>
</body>
</html>