//构造函数
function jq(el) {
    this.el = this.init(el)
}
jq.prototype = {
    init(el) {
        if (typeof el == "string") {
            let arr = el.split(" ")
            return this.elEvery(arr)

        } else {
            return el
        }
    },

    elEvery(arr) {

        let domArr = []

        function every(dom, el, arrIndex) {
            dom.forEach((i) => {
                if (arrIndex < arr.length - 1) {
                    every(Array.from(i.querySelectorAll(el)), arr[arrIndex + 1], arrIndex + 1)
                } else {
                    // domArr=[...domArr,...Array.from(i.querySelectorAll(el))]
                    domArr.push(...Array.from(i.querySelectorAll(el)))
                }
            })
        }
        every([document], arr[0], 0)
        return domArr
    },
    attr(attr, val) {
        if (!val) {
            return this.el.getAttribute(attr)
        } else {
            this.el.setAttribute(attr, val)
            return this
        }
    },
    tap(cb) {
        let start, end, state = true
        if (this.el instanceof Array) {
            this.el.forEach((i) => {
                i.addEventListener("touchstart", handle)
                i.addEventListener("touchmove", handle)
                i.addEventListener("touchend", handle)
            });
        } else {
            this.el.addEventListener("touchstart", handle)
            this.el.addEventListener("touchmove", handle)
            this.el.addEventListener("touchend", handle)
        }
        return this


        function handle(e) {
            switch (e.type) {
                case "touchstart":
                    {
                        start = new Date().getTime()
                        state = true
                    }
                    break;
                case "touchmove":
                    {
                        state = false
                    }
                    break;
                case "touchend":
                    {
                        end = new Date().getTime()
                        if (end - start <= 300 && state) {
                            cb(e)
                        }
                    }
                    break;
            }
        }

    },
    longtap(cb) {
        let time
        if (this.el instanceof Array) {
            this.el.forEach((i) => {
                i.addEventListener("touchstart", handle)
                i.addEventListener("touchmove", handle)
                i.addEventListener("touchend", handle)
            });
        } else {
            this.el.addEventListener("touchstart", handle)
            this.el.addEventListener("touchmove", handle)
            this.el.addEventListener("touchend", handle)
        }
        return this

        function handle(e) {

            switch (e.type) {
                case "touchstart":
                    {
                        time = setTimeout(cb, 300)
                    }
                    break;
                case "touchmove":
                    {
                        clearTimeout(time)
                    }
                    break;
                case "touchend":
                    {
                        clearTimeout(time)
                    }
                    break;
            }
        }
    },
    move(type, cb) {
        let startX, endX, startY, endY
        if (this.el instanceof Array) {
            this.el.forEach((i) => {
                i.addEventListener("touchstart", handle)

                i.addEventListener("touchend", handle)
            });
        } else {
            this.el.addEventListener("touchstart", handle)

            this.el.addEventListener("touchend", handle)
        }


        function handle(e) {
            switch (e.type) {
                case "touchstart":
                    {
                        startX = e.changedTouches[0].pageX
                        startY = e.changedTouches[0].pageY
                    }
                    break;
                case "touchend":
                    {
                        endX = e.changedTouches[0].pageX
                        endY = e.changedTouches[0].pageY
                        switch (type) {
                            case "moveLeft":
                                {
                                    if (startX - endX > 25) {
                                        if (Math.abs(startY - endY) < Math.abs(startX - endX)) {

                                            cb(e)
                                        }
                                    }
                                }
                                break;
                            case "moveRight":
                                {
                                    if (endX - startY > 25) {
                                        if (Math.abs(startY - endY) < Math.abs(startX - endX)) {

                                            cb(e)
                                        }
                                    }
                                }
                                break;
                            case "moveTop":
                                {
                                    if (startY - endY > 25) {
                                        if (Math.abs(startY - endY) > Math.abs(startX - endX)) {
                                            cb(e)
                                        }
                                    }
                                }
                                break;
                            case "moveBottom":
                                {
                                    if (endY - startY > 25) {
                                        if (Math.abs(startY - endY) > Math.abs(startX - endX)) {
                                            cb(e)
                                        }
                                    }
                                }
                                break;
                        }

                    }
                    break;
            }
        }




    },
    moveLeft(cb) {

        this.move("moveLeft", cb)

        return this
    },
    moveRight(cb) {

        this.move("moveRight", cb)

        return this

    },
    moveTop(cb) {

        this.move("moveTop", cb)
        return this

    },
    moveBottom(cb) {

        this.move("moveBottom", cb)
        return this
    },
    click(cb) {

        if (this.el instanceof Array) {
            this.el.forEach((i) => {
                i.addEventListener("click", cb)
            });
        } else {
            this.el.addEventListener("click", cb)
        }
        return this
    },
    html(str) {
        if (str) {
            this.el.innerHTML = str
            return this
        } else {
            return this.el.innerHTML
        }
    },
    text(str) {
        if (str) {
            this.el.innerText = str
            return this
        } else {
            return this.el.innerText
        }
    },
    val(str) {
        if (this.el instanceof Array) {
            if (str) {
                this.el[0].value = str
                return this
            } else {
                return this.el[0].value
            }
        } else {
            if (str) {
                this.el.value = str
                return this
            } else {
                return this.el.value
            }
        }

    },
    show() {
        if (this.el instanceof Array) {
            this.el.forEach((i) => {
                i.style.display = "block"
            });
        } else {
            this.el.style.display = "block"
        }
        return this

    },
    hide() {
        if (this.el instanceof Array) {
            this.el.forEach((i) => {
                i.style.display = "none"
            });
        } else {
            this.el.style.display = "none"
        }
        return this

    },
    attr() {
        if (arguments.length > 1) {
            this.el.setAttribute(arguments[0], arguments[1])
            return this
        } else {
            return this.el.getAttribute(arguments[0])
        }
    },

}

//工厂函数
function $(el) {
    return new jq(el)
}



//工厂函数对象

let origin = {
    parse(str) {
        str = str.slice(1)
        let arr = str.split("&")
        let obj = {}
        arr.forEach((i) => {
            let everyarr = i.split("=")
            obj[everyarr[0]] = everyarr[1]
        })
        return obj
    },
    urlString(obj) {
        let str = str.slice(1)
        let arr = str.split("&")
        if (obj) {
            let str = ""
            Object.entries(obj).forEach((i, index) => {
                if (index == 0) {
                    str += "?" + i[0] + "=" + i[1]
                } else {
                    str += "&" + i[0] + "=" + i[1]
                }
            })
            return str
        }

        return ""
    },
    ajax(option) {
        let {
            type,
            url,
            data
        } = option
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest()
            if (type == "get") {
                if (data) {
                    let dataArr = Object.entries(data)
                    dataArr.forEach((i, index) => {
                        if (index == 0) {
                            url += "?" + i[0] + "=" + i[1]
                        } else {
                            url += "&" + i[0] + "=" + i[1]
                        }
                    })
                }

                xhr.open(type, url)
                xhr.send()
            } else {

                xhr.open(type, url)
                xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
                let str = ""
                if (data) {
                    let dataArr = Object.entries(data)

                    dataArr.forEach((i, index) => {
                        if (index == 0) {
                            str += i[0] + "=" + i[1]
                        } else {
                            str += "&" + i[0] + "=" + i[1]
                        }
                    })
                }

                xhr.send(str)
            }
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.responseText))
                    } else {
                        reject("err")
                    }
                }
            }

        })

    }
}

Object.assign($, origin)