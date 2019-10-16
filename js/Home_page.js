window.onload = function() {

    function Loading() {
        this.scrollbar = [...document.getElementsByClassName('scrollbar')[0].children];
        this.section = document.getElementById('section');
        this.hotel_list = document.getElementById('hotel_list');
        this.s_refresh = document.getElementById('s_refresh');
        this.height = this.s_refresh.offsetHeight;
        this.s_load = document.getElementsByClassName('s-load')[0];
        this.s_refresh = document.getElementsByClassName('s-refresh')[0];
        this.hotel_list = document.getElementById('hotel_list');
        this.init();
    }

    Loading.prototype = {

        constructor: Loading,

        init() {
            this.swipe();
            this.ajaxInit();
            this.Scroll();
            this.jump_turn();
        },

        ajaxInit() {
            var _this = this;
            this.ajax({
                url: 'Home_page_data.json',
                success(data) {
                    _this.render(data)
                }
            });
        },

        ajax: function(opt) {

            var xhr = new XMLHttpRequest();
            xhr.open('get', opt.url, true);
            xhr.send(null);
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    opt.success(eval('(' + xhr.responseText + ')'));
                }
            };

        },

        render(data) {
            var _this = this;
            this.hotel_list.innerHTML += data.map(function(el) {
                return `<dl>
                        <dd><img src="${el.img}" alt=""></dd>
                        <dt><div class="d-left">
                                <div class="d-tit">${el.tit}</div>
                                <div class="d-rush"><span class="${el.rush ? "" : "none"}">限时抢购</span>
                                    <span>${el.pirce}<b>起</b></span>
                                </div>
                                <div class="d-star-level ">
                                    <span>${el.grade}</span>
                                    <span>${el.rank}</span>
                                    <span class="${el.rush ? "" : "none"}"><i class="icon iconfont icon-WIFI"></i></span>
                                    <span>P</span>
                                </div>
                                <div class="d-distance">
                                    <span><i class="icon iconfont icon-dingwei1"></i>
                                    <b>${el.site}</b></span>
                                    <span>${el.distance}</span>
                                </div>
                            </div>
                            <div class="d-right">
                                    <i class="icon iconfont icon-chevron-thin-right"></i>
                            </div>
                        </dt>
                    </dl>`
            }).join('')
        },

        swipe() {
            var _this = this;
            var mySwiper = new Swiper('.banner', {
                autoplay: true,
                on: {
                    slideChange() {
                        var ind = this.activeIndex;
                        for (var i = 0; i < _this.scrollbar.length; i++) {
                            _this.scrollbar[i].classList.remove('active');
                        }
                        _this.scrollbar[ind].classList.add('active');
                    }
                }
            })
        },

        Scroll() {
            var _this = this;
            var BS = new BScroll('section', {
                probeType: 2,
                clicl: true,
            })

            BS.on('scroll', function() {
                if (this.y < this.maxScrollY - _this.height) {
                    _this.s_load.innerHTML = '释放加载更多...';
                    _this.s_load.classList.add('flip');

                } else {
                    _this.s_load.innerHTML = '上拉加载';
                    _this.s_load.classList.remove('flip');
                }

                if (this.y > _this.height) {
                    _this.s_refresh.innerHTML = '释放刷新...';
                    _this.s_refresh.classList.add('flip');
                } else {
                    _this.s_refresh.innerHTML = '下拉刷新';
                    _this.s_refresh.classList.remove('flip');
                }
            });

            BS.on('scrollEnd', function() {
                if (_this.s_load.classList.contains('flip')) {
                    _this.s_load.innerHTML = '上拉加载';
                    _this.s_load.classList.remove('flip');
                    this.refresh();
                    _this.fullUp();

                } else if (_this.s_refresh.classList.contains('flip')) {
                    _this.s_refresh.innerHTML = '下拉刷新';
                    _this.s_refresh.classList.remove('flip');
                    _this.fullDown();
                }

            })

        },

        fullDown() {
            this.hotel_list.innerHTML = '';
            this.ajaxInit();
        },

        fullUp() {
            this.ajaxInit();
        },

        jump_turn(){
            var h_city = document.getElementById('h_city');
            h_city.onclick = function(){
                window.location.href = 'city_list.html';
            }

            var ls = window.localStorage;
            var t = ls.getItem('cityList') ? ls.getItem('cityList') : '北京';
            h_city.innerHTML = t;
        }
    }

    new Loading();
}