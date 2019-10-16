$(function() {

    function City() {
        this.slides = null;
        this.datakeys = [];
        this.s_right = document.getElementsByClassName('s-right')[0];
        this.l_cont = document.getElementsByClassName('l-cont')[0];
        this.s_left = document.getElementsByClassName('s-left')[0];
        // console.log(this.s_left)
        this.init();
    }

    City.prototype = {

        constructor: City,

        init: function() {
            var _this = this;
            this.ajax({
                url: 'city_list_data.json',
                success(data) {
                    var datas = data;
                    _this.render(datas);
                    _this.BScroll();
                    _this.jump_turn();
                }
            });

        },

        ajax(opt) {

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
            this.datakeys = Object.keys(data);

            this.s_right.innerHTML = this.datakeys.map(function(el) {
                return `<li>${el}</li>`;
            }).join('');

            var html = '';

            for (var i in data) {
                html += ` <li>
                        <span id="${i}">${i}</span>
                        <ol class="city_list">`;
                data[i].map(function(el) {
                    html += `<li>${el.name}</li>`
                })
                html += `</ol></li>`
            }
            this.l_cont.innerHTML = html;

        },

        BScroll() {

            var BS = new BScroll('.s-left', {
                probetype: 2,
                click: true
            });

            var lis = [...this.s_right.children];

            lis.map(function(el) {
                el.onclick = function() {
                    BS.scrollToElement('#' + el.innerHTML, 500);
                }
            })
        },

        jump_turn() {

            var ls = window.localStorage;

            this.s_left.onclick = function(e) {


                if (e.target.tagName === 'LI') {
                    var t = e.target.innerHTML;
                    ls.setItem('cityList', t);
                    window.location.href = 'Home_page.html';
                }

            }
        }

    }

    new City();

})