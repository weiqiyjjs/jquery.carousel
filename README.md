# 这是一个基于jquery的幻灯片插件
<br>
<p>您可以<a href = "https://weiqiyjjs.github.io/jquery.carousel/" target = "_blank">点击这里</a>查看示例</p>
<p>这是一张所有值都是默认值的截图</p>
![默认截图](img/demo.jpg)
<p>下面是一些基本参数</p>

|    属性列表 |    说明 |  默认值   |     
| --- | --- | --- | --- |
|  width   |  幻灯片宽度   |  900   |     
|  height  |  幻灯片高度   |  411   |     
|  postWidth   | 第一帧的宽度     |   658  |     
|  postHeight   | 第一帧的高度     |   411  |     
|  scale  |  每一帧的缩放比例   |  0.8   |     
|  speed  |  幻灯片跳转的速度   |  500   |     
|  verticalAlign  |  布局方式（top:上、middle:中、bottom:下）   |  middle   |     
|  autoPlay  |  是否自动播放   |  false   |     
|  delay  |  幻灯片自动播放的间隔时间   |  1000   |     


<p>使用方法</p>
<p>使用方法是很简单的，首先引入需要的文件</p>

``` 
<link rel="stylesheet" href="css/jquery.carousel.css"/>
<script src="js/jquery-2.2.3.min.js"></script>
<script src="js/jquery.carousel.js"></script>
```

<p>
然后编写HTML文件，创建一个div，类名为carousel content-main，在div里面创建一个列表ul，类名为list，ul标签里面放入li标签，li标签里面放入img，如下所示：
</p>

``` 
<div id="test1" class="carousel content-main">
    <ul class="list">
        <li><img src="img/photo_1.jpg"/></li>
        <li><img src="img/photo_2.jpg"/></li>
        <li><img src="img/photo_3.jpg"/></li>
        <li><img src="img/photo_4.jpg"/></li>
        <li><img src="img/photo_5.jpg"/></li>
    </ul>
</div>
```

<p>然后在js里面初始化幻灯片就可以了，方法如下：</p>

``` 
Carousel.init($(".carousel"));
```
<p>
这样一个幻灯片就完成了，因为demo中的图片大小和默认的参数是一样的，所以这里就没有设置。
</p>
<p>
为了安全起见这里的四个参数一定要设置一下，分别是幻灯片的高、宽，第一帧也就是第一张图片的高、宽。设置方法如下：
</p>

``` 
$(".carousel").attr("data-setting",'{ "width":900,"height":411,"postWidth":658,"postHeight":658}')
```
<p>这里是在js中设置的，当然你也可以在div标签中设置，方法如下：</p>

``` 
<div class="carousel content-main" data-setting = '{ "width":900,"height":411,"postWidth":658,"postHeight":658}'>
	...
</div>
```
<p>注意设置的属性方式一定要是JSON数据，即所有的属性(除数字外)都要加上双引号。</p>

<p>
如果一张页面中要设置多个幻灯片的话，只要分别设置每个div的参数就可以了，只用初始化一次。
</p>
