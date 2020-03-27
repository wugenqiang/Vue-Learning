/*
  1:歌曲搜索接口
    请求地址:https://autumnfish.cn/search
    请求方法:get
    请求参数:keywords(查询关键字)
    响应内容:歌曲搜索结果
  2:歌曲url获取接口
    请求地址:https://autumnfish.cn/song/url
    请求方法:get
    请求参数:id(歌曲id)
    响应内容:歌曲url地址
  3.歌曲详情获取
    请求地址:https://autumnfish.cn/song/detail
    请求方法:get
    请求参数:ids(歌曲id)
    响应内容:歌曲详情(包括封面信息)
  4.热门评论获取
    请求地址:https://autumnfish.cn/comment/hot?type=0
    请求方法:get
    请求参数:id(歌曲id,地址中的type固定为0)
    响应内容:歌曲的热门评论
  5.mv地址获取
    请求地址:https://autumnfish.cn/mv/url
    请求方法:get
    请求参数:id(mvid,为0表示没有mv)
    响应内容:mv的地址
*/
//  3.创建Vue实例
var app = new Vue({
    el:"#player",//挂载点,使用id选择器
    data:{//数据
        //查询关键字
        query:"我的果汁分你一半",
        //歌曲数组
        musicList:[],
        //歌曲地址
        musicUrl:"",
        //歌曲封面
        musicCover:"",
        //歌曲评论
        hotComments:[],
        //动画播放状态
        isPlaying:false,
        //MV 地址
        mvUrl:"",
        //MV 播放状态
        isMv:false,
        //播放小件
        playerCoverImage:"",
    },
    methods:{
        //搜索歌曲
        searchMusic:function () {
            var that = this;
            axios
                .get("https://autumnfish.cn/search?keywords="+that.query)
                .then(res => {//res=> 等价于 function(response)
                    //console.log(res);
                    that.musicList = res.data.result.songs;
                    //console.log(res.data.result.songs);
                },err => {})

        },
        //播放歌曲
        playMusic:function (musicId) {
            //console.log(musicId);
            var that = this;
            this.playerCoverImage="images/player_bar.png";
            //获取歌曲地址
            axios
                .get("https://autumnfish.cn/song/url?id="+musicId)
                .then(res => {//res=> 等价于 function(response)
                    //console.log(res);
                    //console.log(res.data.data[0].url);
                    that.musicUrl = res.data.data[0].url;
                },err => {})
            //歌曲详情获取
            axios
                .get("https://autumnfish.cn/song/detail?ids="+musicId)
                .then(res => {//res=> 等价于 function(response)
                    //console.log(res);
                    //console.log(res.data.songs[0].al.picUrl);
                    that.musicCover = res.data.songs[0].al.picUrl;
                },err => {})
            //歌曲评论获取
            axios
                .get("https://autumnfish.cn/comment/hot?type=0&id="+musicId)
                .then(res => {//res=> 等价于 function(response) // 回调函数
                    //console.log(res);
                    //console.log(res.data.hotComments);
                    that.hotComments = res.data.hotComments;
                },err => {})

        },
        //动画播放
        play:function () {
            //console.log("play");
            this.isPlaying = true;
        },
        //播放暂停
        pause:function () {
            //console.log("pause");
            this.isPlaying = false;
        },
        //播放MV
        playMV:function (mvid) {
            var that = this;
            axios
                .get("https://autumnfish.cn/mv/url?id="+mvid)
                .then(res => {//res=> 等价于 function(response) // 回调函数
                    //console.log(res);
                    //console.log(res.data.data.url);
                    that.mvUrl = res.data.data.url;
                    that.musicUrl = "";
                    that.isPlaying = false;
                    that.isMv=true;
                },err => {})

        },
        //隐藏遮罩层,同时关闭MV
        closeMv:function () {
            this.isMv=false;
            this.mvUrl="";
        },
    }
})
