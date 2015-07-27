{% extends 'base.tpl' %}

{% block tilesblock %}
        <div class="tile-group five">
            <span class="tile-group-title">Social</span>

            <div class="tile-container">

                <a href="http://spdf.me">
                    <div class="tile bg-violet fg-white" data-role="tile">
                        <div class="tile-content">
                            <div class="image-container">
                                <div class="frame scaled bg-violet">
                                    <img class="scaled-img" src="img/wordpress.png">
                                </div>
                            </div>
                        </div>
                        <span class="tile-label">Blog</span>
                    </div>
                </a>
                <a href="mailto:mio@spdf.me">
                    <div class="tile bg-lightRed fg-white" data-role="tile">
                        <div class="tile-content iconic">
                            <span class="icon mif-envelop"></span>
                        </div>
                        <span class="tile-label">Mail</span>
                    </div>
                </a>
                <a href="http://steamcommunity.com/id/spdf/">
                    <div class="tile bg-mauve fg-white" data-role="tile">
                        <div class="tile-content iconic">
                            <span class="icon mif-steam"></span>
                        </div>
                        <span class="tile-label">Steam</span>
                    </div>
                </a>
                <a href="http://hitokoto.us/view/{{ hitokoto.id }}">
                    <div class="tile-wide bg-amber fg-white" data-role="tile">
                        <div class="tile-content iconic">
                            <div class="margin20 text-shadow">
                                <p class="tile-text">{{ hitokoto.hitokoto }}</p>
                            </div>
                        </div>
                        <span class="tile-label">Hitokoto</span>
                    </div>
                </a>
                <a href="http://bangumi.tv/user/spdf">
                    <div class="tile-wide bg-green fg-white" data-effect="slideUpDown" data-role="tile">
                        <div class="tile-content iconic">
                            <div class="live-slide">
                                <div class="image-container">
                                    <div class="frame scaled bg-green">
                                        <img class="scaled-img" src="img/bgm.png">
                                        <!-- from here : http://bangumi.tv/group/topic/311281 -->
                                    </div>
                                </div>
                            </div>
                            <div class="live-slide"><img src="img/1.png" data-role="fitImage" data-format="fill"></div>
                        </div>
                        <span class="tile-label">Bangumi</span>
                    </div>
                </a>
                <a href="https://twitter.com/roblin_spdf">
                    <div class="tile-wide bg-darkCyan fg-white" data-role="tile">
                        <div class="tile-content iconic">
                            <span class="icon mif-twitter"></span>
                        </div>
                        <span class="tile-label">Twitter</span>
                    </div>
                </a>
                <a href="https://github.com/robling">
                    <div class="tile bg-olive fg-white" data-role="tile">
                        <div class="tile-content iconic">
                            <span class="icon mif-github"></span>
                        </div>
                        <span class="tile-label">Gtihub</span>
                    </div>
                </a>
                <a href="https://www.facebook.com/robin.liu.12914">
                    <div class="tile bg-blue fg-white" data-role="tile">
                        <div class="tile-content iconic">
                            <span class="icon mif-facebook"></span>
                        </div>
                        <span class="tile-label">Facebook</span>
                    </div>
                </a>
                <a href="https://weibo.com/spdfgh">
                    <div class="tile bg-crimson fg-white" data-role="tile">
                        <div class="tile-content">
                            <div class="image-container">
                                <div class="frame scaled bg-crimson">
                                    <img class="scaled-img" src="img/weibo.png">
                                </div>
                            </div>
                        </div>
                        <span class="tile-label">Weibo</span>
                    </div>
                </a>
                <a href="http://www.amazon.cn/registry/wishlist/3FAWWKP2I6RO1/ref=cm_wl_act_vv?_encoding=UTF8&reveal=&visitor-view=1">
                    <div class="tile bg-darkOrange fg-white" data-role="tile">
                        <div class="tile-content">
                            <div class="image-container">
                                <div class="frame scaled bg-darkOrange">
                                    <img class="scaled-img" src="img/amazon.png">
                                </div>
                            </div>
                        </div>
                        <span class="tile-label">Buy me a gift</span>
                    </div>
                </a>
            </div>
        </div>

        <div class="tile-group two">
            <span class="tile-group-title">Images</span>
            <div class="tile-container">
                <!-- Live Tile -->
                <div class="tile-wide" data-role="tile" data-effect="slideLeft">
                    <div class="tile-content">
                        <div class="live-slide"><img src="img/1.png" data-role="fitImage" data-format="fill"></div>
                        <div class="live-slide"><img src="img/2.png" data-role="fitImage" data-format="fill"></div>
                        <div class="live-slide"><img src="img/3.png" data-role="fitImage" data-format="fill"></div>
                    </div>
                </div>
            </div>
        </div>

{% endblock %}
