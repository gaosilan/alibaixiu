function formateDate(date) {
    // 将日期时间字符串转换成日期对象
    date = new Date(date);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}



//向服务器端发送请求 索要随机数据
$.ajax({
    type: 'get',
    url: '/posts/random',
    success: function(res) {
        var randomTpl = `
        {{each data}}
        <li>
        <a href="detail.html?id={{$value._id}}">
            <p class="title">{{$value.title}}</p>
            <p class="reading">阅读({{$value.meta.views}})</p>
            <div class="pic">
                <img src="{{$value.thumbnail}}" alt="">
            </div>
        </a>
        </li>
        {{/each}}
        `;
        var html = template.render(randomTpl, { data: res });
        $('#randomBox').html(html);
    }
});
// 向服务器端发送请求 索要最新评论数据
$.ajax({
    type: 'get',
    url: '/comments/lasted',
    success: function(res) {
        var commentTpl = `
        {{each data}}
        <li>
        <a href="javascript:;">
            <div class="avatar">
                <img src="{{$value.author.avatar}}" alt="">
            </div>
            <div class="txt">
                <p>
                    <span>{{$value.author && $value.author.nickName}}</span>{{$imports.formateDate($value.createAt)}}说:
                </p>
                <p>{{$value.content}}</p>
            </div>
        </a>
    </li>
    {{/each}}
        `;
        var html = template.render(commentTpl, { data: res });
        $('#commentBox').html(html);
    }
});
// 向服务器端发送请求 索要文章分类列表数据
$.ajax({
    type: 'get',
    url: '/categories',
    success: function(res) {
        var navTpl = `
        {{each data}}
			<li>
				<a href="list.html?categoryId={{$value._id}}">
					<i class="fa {{$value.className}}"></i>{{$value.title}}
				</a>
			</li>
			{{/each}}
        `;
        var html = template.render(navTpl, { data: res });
        $('#navBox').html(html);
        $('#topNavBox').html(html);
    }
});
//获取到搜索表单 并为其添加表单提交事件
$('.search form').on('submit', function() {
    var keys = $(this).find('.keys').val();
    location.href = "/search.html?key=" + keys;
    return false;
})