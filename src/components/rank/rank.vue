<template>
	<div class="rank" ref="rank">
		<scroll :data="topList" class="toplist" ref="toplist">
			<ul>
				<li class="item" v-for="item in topList" @click="selectItem(item)">
					<div class="icon">
						<img src="" alt="" width="100" height="100" v-lazy="item.picUrl">
					</div>
					<ul class="songlist">
						<li class="song" v-for="(song, index) in item.songList">
							<span>{{index+1}}</span>
							<span>{{song.songname}}-{{song.singername}}</span>
						</li>
					</ul>
				</li>
			</ul>
			<div class="loading-container" v-show="!topList.length">
				<loading></loading>
			</div>
		</scroll>
		<router-view></router-view>
	</div>
</template>

<script type="text/ecmascript-6">
import {getTopList} from 'api/rank.js'
import {ERR_OK} from 'api/config.js'
import axios from 'axios'
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import {playlistMinxin} from 'common/js/mixin'
import {mapMutations} from 'vuex'
export default{
	mixins:[playlistMinxin],
	created() {
			this._getTopList()
	},
	data() {
		return {
			topList: []
		}
	},
	methods: {
		handlePlaylist(playlist) {
			const bottom = playlist.length? '60px' : ''
			this.$refs.rank.style.bottom = bottom
			this.$refs.toplist.refresh()
		},
		selectItem(item) {
			console.log(item)
			this.$router.push({
				path:`/rank/${item.id}`
			})
			this.setTopList(item)
		},
		_getTopList() {
			axios.get("/qqMusic", {
				params:{
					g_tk:5381,
					uin:0,
					format:"json",
					inCharset:"utf-8",
					outCharset:"utf-8",
					notice:0,
					platform:"h5",
					needNewCode:1,
					_:1512108118296
				}
			}).then(res=>{
				this.topList = res.data.data.topList
			})
		},
		...mapMutations({
			setTopList:'SET_TOP_LIST'
		})
	},
	components:{
		Scroll,
		Loading
	}
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import "~common/stylus/variable"
    @import "~common/stylus/mixin"
	.rank
		position:fixed
		width:100%
		top:88px
		bottom:0
		.toplist
			height:100%
			overflow:hidden
			.item
				display:flex
				margin:0 20px
				padding-top:20px
				height:100px
				&:list-child
					padding-bottom:20px
				.icon
					flex:0 0 100px
					width:100px
					height:100px
				.songlist
					flex:1
					display:flex
					flex-direction:column
					justify-content:center
					padding:0 20px
					height:100px
					overflow:hidden
					background: $color-highlight-background
					color: $color-text-d
					font-size: $font-size-small
					.song
						no-wrap()
						line-height: 26px
			.loading-container
				position: absolute
				width: 100%
				top: 50%
				transform: translateY(-50%)

</style>