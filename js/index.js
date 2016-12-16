;(function($){
    //创建类
    var Carousel = function(con){
        var self = this;
        this.con = con;
        this.setDirect();
        this.conItem = con.find("ul.list");
        this.prev = con.find(".prev-btn");
        this.next = con.find(".next-btn");
        this.conItems = con.find("li");
        this.conItemFirst = this.conItems.first();
        this.conItemLast = this.conItems.last();
        this.flag = true;
        //默认配置参数
        this.settings = {
            width:900,             //幻灯片的宽度
            height:4110,             //幻灯片的高度
            postWidth:658,          //第一帧的宽度
            postHeight:411,         //第一帧的高度
            scale:0.8,
            speed:500,
            verticalAlign:'center',
            autoPlay:false,
            delay:1000
        }
        $.extend(this.settings,this.getSetting());
        this.setSettingValue();
        this.setPostOther();
        this.next.on("click",function(){
            if(self.flag){
                self.flag = false;
                self.rotate("left");
            }

        });
        this.prev.on("click",function(){
            if(self.flag){
                self.flag = false;
                self.rotate("right");
            }
        });
        if(this.settings.autoPlay){
            this.autoPlay();
            this.con.hover(function(){
                window.clearInterval(self.timer);
            },function(){
                self.autoPlay();
            });
        }

    }

    //原型方法
    Carousel.prototype = {
        //设置上一张和下一张大小
        setDirect:function(){
            var prev = $("<div></div>").addClass("content-btn prev-btn").append($("<img/>").attr("src","img/left.png").addClass("btn-img"));
            this.con.prepend(prev);
            var next = $("<div></div>").addClass("content-btn next-btn").append($("<img/>").attr("src","img/right.png").addClass("btn-img"));
            this.con.append(next);
        },
        //自动播放函数
        autoPlay:function(){
            var self = this;
            this.timer = window.setInterval(function(){
                self.next.click();
            },this.settings.delay);
        },

        //旋转函数
        rotate:function(dir){
            var _this = this;
            var zIndex = []
            if(dir === "left"){
                this.conItems.each(function(){
                    var prev = $(this).prev().get(0)?$(this).prev():_this.conItemLast;
                    zIndex.push(prev.css("zIndex"));
                    $(this).animate({
                        width:prev.width(),
                        height:prev.height(),
                        top:prev.css("top"),
                        left:prev.css("left"),
                        opacity:prev.css("opacity")
                    },_this.settings.speed,function(){
                        _this.flag = true;
                    });
                });
                this.conItems.each(function(i){
                    $(this).css({zIndex:zIndex[i]})
                });
            }else  if(dir === "right"){
                this.conItems.each(function(){
                    var next = $(this).next().get(0)?$(this).next():_this.conItemFirst;
                    zIndex.push(next.css("zIndex"));
                    $(this).animate({
                        width:next.width(),
                        height:next.height(),
                        top:next.css("top"),
                        left:next.css("left"),
                        opacity:next.css("opacity")
                    },_this.settings.speed,function(){
                        _this.flag = true;
                    });
                });
                this.conItems.each(function(i){
                    $(this).css({zIndex:zIndex[i]})
                });
            }
        },

        //设置剩余帧位置关系
        setPostOther:function(){
            var self =this,
                sliceItem = this.conItems.slice(1),
                sliceLength = sliceItem.length,
                rightItem = sliceItem.slice(0,sliceLength/2),
                leftItem = sliceItem.slice(sliceLength/2),
                level = Math.floor(sliceLength/2),
                llevel = level,
                rw = this.settings.postWidth,
                rh = this.settings.postHeight,
                gap = (this.settings.width - this.settings.postWidth)/2/level;
            rightItem.each(function(i){
                rw = rw*self.settings.scale;
                rh = rh*self.settings.scale;
                var j = i;
                $(this).css({
                    zIndex:--level,
                    width:rw,
                    height:rh,
                    left:(self.settings.width + self.settings.postWidth)/2 + gap*(++i) - rw,
                    top:self.setVerticalAlign(rh),
                    opacity:1/(++j)
                });
            });
            var lw = rightItem.last().width(),
                lh = rightItem.last().height();
            leftItem.each(function(i){
                $(this).css({
                    zIndex:level++,
                    width:lw,
                    height:lh,
                    left:gap*i,
                    top:self.setVerticalAlign(lh),
                    opacity:1/llevel--
                });
                lw = lw/self.settings.scale;
                lh = lh/self.settings.scale;
            });
        },
        //设置对齐方式
        setVerticalAlign:function(h){
            if(this.settings.verticalAlign === "middle"){
                return (this.settings.height - h)/2;
            }else if(this.settings.verticalAlign === "top"){
                return 0;
            }else if(this.settings.verticalAlign === "bottom"){
                return this.settings.height - h;
            }else {
                return (this.settings.height - h)/2;
            }
        },
        //设置配置参数控制幻灯片显示
        setSettingValue:function(){
            this.con.css({
                width:this.settings.width,
                height:this.settings.height
            });
            this.conItem.css({
                width:this.settings.width,
                height:this.settings.height
            });
            var w = (this.settings.width - this.settings.postWidth)/2;
            this.prev.css({
                width:w,
                height:this.settings.height,
                zIndex:Math.ceil((this.conItems.length)/2)
            });
            this.prev.find("img").css({
                width:w,
                height:w,
            });
            this.next.css({
                width:w,
                height:this.settings.height,
                zIndex:Math.ceil((this.conItems.length)/2)
            });
            this.next.find("img").css({
                width:w,
                height:w
            });
            this.conItemFirst.css({
                top:0,
                left:w,
                width:this.settings.postWidth,
                height:this.settings.postHeight,
                zIndex:this.conItems.length
            });
        },
        //接收配置参数
        getSetting:function(){
            var con = this.con.attr("data-setting");
            if(con && con!==""){
                return $.parseJSON(con);
            }else {
                return "";
            }
        }
    }

    //初始化
    Carousel.init = function(carousel){
        var _this = this;
        carousel.each(function(){
            new _this($(this));
        });
    }
    window.Carousel = Carousel;
})(jQuery)
