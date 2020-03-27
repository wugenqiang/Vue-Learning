window.onload = function() {
	var app = new Vue({
		el: "#player",
		data: {
			query: "Oskar Schuster", //查询信息
			musicList: [],
			musicUrl:"",
			videoUrl:"",
			comment:[],
			isPlay:false,	//封面播放状态
			isMv:false	,//mv播放状态
			musicAlbum:"",
			player1:"",
		},
		methods: {
			searchMusic: function() {
				var that = this;
				axios.get("https://autumnfish.cn/search?keywords=" + this.query)
					.then(function(response) {
							that.musicList = response.data.result.songs;
						},
						function(err) {})
			},
			playMusic: function(id) {
				this.player1="images/player_bar.png";
				var that = this;
				//获取歌曲链接
				axios.get("https://autumnfish.cn/song/url?id=" + id)
				.then(function(response){
					that.musicUrl = response.data.data[0].url;
				},function(err){})
				//获取封面
				axios.get("https://autumnfish.cn/song/detail?ids="+id)
				.then(function(response){
					that.musicAlbum = response.data.songs[0].al.picUrl;
				},function(err){})
				//获取评论
				axios.get("https://autumnfish.cn/comment/hot?type=0&id="+id)
				.then(function(response){
					that.comment = response.data.hotComments;
				},function(err){})
			},
			playMV:function(mvid){
				var that = this;
				//获取mv
				axios.get("https://autumnfish.cn/mv/url?id=" + mvid)
				.then(function(response){
					that.videoUrl = response.data.data.url;
					that.musicUrl = "";
					that.musicAlbum = "";
					that.isPlay = false;
					that.isMv=true;
				},function(err){})
			},
			musicPlay:function(){
				this.isPlay = true;
			},
			musicPause:function(){
				this.isPlay = false;
			},
			closeMv:function(){
				this.isMv=false;
				this.videoUrl="";
			}
		},
			mounted(){
				this.searchMusic();
			}
	})
}
