<template>
	<view>
		<view v-if="!isSearchPage">
			<!-- 搜索栏 -->
			<view>
				<input class="search-box-fake" type="text" placeholder="搜索" v-model="searchKey" @click="toSearchPage" />
			</view>
			<!-- 顶部导航栏 -->
			<view class="horizonal-tab">
				<scroll-view scroll-x="true" scroll-with-animation class="scroll-tab">
					<block v-for="(item,index) in tabBars" :key="index">
						<view class="scroll-tab-item" :class="{'active': tabIndex==index}" @tap="toggleTab(index)">
							{{item.category}}
							<view class="scroll-tab-line"></view>
						</view>
					</block>
				</scroll-view>
			</view>

			<!-- 内容区 -->
			<view>
				<!-- 滑块视图 -->
				<swiper :current="tabIndex" @change="tabChange" :style="{height: heightS + 'px'}">
					<swiper-item v-for="(content,index) in certificate" :key="index">
						<scroll-view :style="{height: heightS + 'px'}" scroll-y="true">
							<view v-for="item in content" :key="item._id">
								<view class="goods">
									<text class="person">{{item.person}}{{space}}</text><text>捡到了:</text>
									<view class="name">{{item.name}}</view>
									<view>Details:</view>
									<view class="details">{{item.details}}</view>
									<view>联系方式：</view>
									<view>{{item.contact}}</view>
									<view v-for="(img,x) in item.imgurl" :key="x">
										<image class="img" :src="img" />
									</view>
									<view class="timer">{{item.time}}</view>
								</view>
							</view>
						</scroll-view>
					</swiper-item>
					<swiper-item v-for="(content,index) in electronic_product" :key="index">
						<scroll-view :style="{height: heightS + 'px'}" scroll-y="true">
							<view v-for="item in content" :key="item._id">
								<view class="goods">
									<text class="person">{{item.person}}{{space}}</text><text>捡到了:</text>
									<view class="name">{{item.name}}</view>
									<view>Details:</view>
									<view class="details">{{item.details}}</view>
									<view>联系方式：</view>
									<view>{{item.contact}}</view>
									<view v-for="(img,x) in item.imgurl" :key="x">
										<image class="img" :src="img" />
									</view>
									<view class="timer">{{item.time}}</view>
								</view>
							</view>
						</scroll-view>
					</swiper-item>
					<swiper-item v-for="(content,index) in books" :key="index">
						<scroll-view :style="{height: heightS + 'px'}" scroll-y="true">
							<view v-for="item in content" :key="item._id">
								<view class="goods">
									<text class="person">{{item.person}}{{space}}</text><text>捡到了:</text>
									<view class="name">{{item.name}}</view>
									<view>Details:</view>
									<view class="details">{{item.details}}</view>
									<view>联系方式：</view>
									<view>{{item.contact}}</view>
									<view v-for="(img,x) in item.imgurl" :key="x">
										<image class="img" :src="img" />
									</view>
									<view class="timer">{{item.time}}</view>
								</view>
							</view>
						</scroll-view>
					</swiper-item>
					<swiper-item v-for="(content,index) in living_goods" :key="index">
						<scroll-view :style="{height: heightS + 'px'}" scroll-y="true">
							<view v-for="item in content" :key="item._id">
								<view class="goods">
									<text class="person">{{item.person}}{{space}}</text><text>捡到了:</text>
									<view class="name">{{item.name}}</view>
									<view>Details:</view>
									<view class="details">{{item.details}}</view>
									<view>联系方式：</view>
									<view>{{item.contact}}</view>
									<view v-for="(img,x) in item.imgurl" :key="x">
										<image class="img" :src="img" />
									</view>
									<view class="timer">{{item.time}}</view>
								</view>
							</view>
						</scroll-view>
					</swiper-item>
					<swiper-item v-for="(content,index) in others" :key="index">
						<scroll-view :style="{height: heightS + 'px'}" scroll-y="true">
							<view v-for="item in content" :key="item._id">
								<view class="goods">
									<text class="person">{{item.person}}{{space}}</text><text>捡到了:</text>
									<view class="name">{{item.name}}</view>
									<view>Details:</view>
									<view class="details">{{item.details}}</view>
									<view>联系方式：</view>
									<view>{{item.contact}}</view>
									<view v-for="(img,x) in item.imgurl" :key="x">
										<image class="img" :src="img" />
									</view>
									<view class="timer">{{item.time}}</view>
								</view>
							</view>
						</scroll-view>
					</swiper-item>
				</swiper>
			</view>
		</view>

		<view v-if="isSearchPage">
			<view class="ssss">
				<button class="back" @click="back">
					<image src="../../static/icon/left.png" class="arrow"></image>
				</button>
				<input class="search-box" type="text" :focus="isInputFocus" placeholder="请输入搜索内容" v-model="searchKey"
					@blur="onblur" />
				<button class="search-button" @click="search">搜索</button>
			</view>
		</view>
		<view v-if="searchList.length && isSearchPage">
			<text class="search-text">搜索结果：</text>
			<view v-for="item in Array.prototype.reverse.call(searchList)" :key="item._id">
				<view class="goods">
					<text class="person">{{item.person}}{{space}}</text><text>捡到了:</text>
					<view class="name">{{item.name}}</view>
					<view>Details:</view>
					<view class="details">{{item.details}}</view>
					<view>联系方式：</view>
					<view>{{item.contact}}</view>
					<view v-for="(img,x) in item.imgurl" :key="x">
						<image class="img" :src="img" />
					</view>
					<view class="timer">{{item.time}}</view>
				</view>
			</view>
		</view>
		<!-- 如果没有搜索到结果显示无数据 -->
		<view v-if="searchList.length===0 && isSearchPage" class="none">
			暂无数据
		</view>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				heightS: 0,
				tabIndex: 0,
				/* 选中标签栏的序列,默认显示第一个 */
				contentList: [],
				certificate: [],
				electronic_product: [],
				books: [],
				living_goods: [],
				others: [],
				tabBars: [{
						category: "证件",
						id: '1'
					},
					{
						category: "电子产品",
						id: '2'
					},
					{
						category: "学习物品",
						id: '3'
					},
					{
						category: "生活物品",
						id: '4'
					},
					{
						category: "其他",
						id: '5'
					},
				],
				isSearchPage: false,
				searchKey: '',
				searchList: [],
				isInputFocus: false,
				space: '  '
			}
		},
		onPullDownRefresh() {
			this.tabIndex = 0;
			this.certificate = [];
			this.electronic_product = [];
			this.books = [];
			this.living_goods = [];
			this.others = [];
			for (let i = 0; i < this.tabBars.length; ++i) {
				uniCloud.callFunction({
					name: 'GetGoods',
					data: {
						category: this.tabBars[i].category
					}
				}).then(res => {
					if (res.result.data.length != 0) {
						if (res.result.data[0].contact == "")
							res.result.data[0].contact = "无";
						if (res.result.data[0].category == "证件")
							this.certificate.push(res.result.data);
						else if (res.result.data[0].category == "电子产品")
							this.electronic_product.push(res.result.data);
						else if (res.result.data[0].category == "学习物品")
							this.books.push(res.result.data);
						else if (res.result.data[0].category == "生活物品")
							this.living_goods.push(res.result.data);
						else if (res.result.data[0].category == "其他")
							this.others.push(res.result.data);
					}
				})
			}
			uni.stopPullDownRefresh();
		},
		onLoad() {
			this.heightS = uni.getSystemInfoSync().windowHeight - 85;
			for (let i = 0; i < this.tabBars.length; ++i) {
				uniCloud.callFunction({
					name: 'GetGoods',
					data: {
						category: this.tabBars[i].category
					}
				}).then(res => {
					if (res.result.data.length != 0) {
						if (res.result.data[0].category == "证件")
							this.certificate.push(res.result.data);
						else if (res.result.data[0].category == "电子产品")
							this.electronic_product.push(res.result.data);
						else if (res.result.data[0].category == "学习物品")
							this.books.push(res.result.data);
						else if (res.result.data[0].category == "生活物品")
							this.living_goods.push(res.result.data);
						else if (res.result.data[0].category == "其他")
							this.others.push(res.result.data);
					}
				})
			}
		},
		methods: {
			//切换选项卡
			toggleTab(index) {
				this.tabIndex = index;
			},
			//滑动切换swiper
			tabChange(e) {
				this.tabIndex = e.detail.current;
			},
			toSearchPage() {
				this.isSearchPage = true
				this.isInputFocus = true
			},
			search() {
				// 请求数据库
				if (this.searchKey != '') {
					uniCloud.callFunction({
						name: 'search',
						data: {
							keyword: this.searchKey
						}
					}).then(res => {
						// 对搜索结果赋值
						this.searchList = res.result
						console.log(this.searchList)
					})
				}
			},
			back() {
				this.isSearchPage = false
				uni.hideKeyboard()
				this.searchKey = ''
			},
			onblur() {
				this.isInputFocus = false
			}
		}
	}
</script>

<style>
	.horizonal-tab .active {
		color: red;
	}

	.scroll-tab {
		white-space: nowrap;
		border-bottom: 1rpx solid #eee;
		text-align: center; 
	}

	.scroll-tab-item {
		display: inline-block;
		margin: 20rpx 30rpx 0 30rpx;
	}

	.active .scroll-tab-line {
		border-bottom: 4rpx solid red;
		border-top: 5rpx solid red;
		border-radius: 20rpx;
		width: 105rpx;
	}

	.goods {
		border: 1px solid #8e8e8e;
		border-radius: 10px;
		margin: 20rpx;
		padding: 10px;
		box-shadow: 5px 5px 2px rgba(165, 165, 165, 0.9);
	}

	.person {
		font-style: italic;
		font-size: 90%;
		color: #fc5185;
	}

	.name {
		color: #3fc1c9;
		font-size: large;
		margin-left: 10rpx;
	}

	.details {
		margin: 5rpx;
	}

	.img {
		width: 500rpx;
		height: 350rpx;
	}

	.timer {
		color: #808080;
		text-align: right;
	}

	.search-box-fake {
		margin: 10rpx;
		padding: 8px;
		background-color: #f8f8f8;
		border-radius: 8px;
		height: 38rpx;
		text-align: center;
	}

	.search-box {
		margin: 10rpx;
		padding: 8px;
		background-color: #f8f8f8;
		border-radius: 8px;
		height: 38rpx;
		width: 500rpx;
	}

	.search-button {
		border: 1px solid #f8f8f8;
		background-color: #f8f8f8;
		color: #767676;
		font-size: 25rpx;
		height: 70rpx;
		line-height: 70rpx;
		text-align: center;
		margin: auto;
	}

	.search-text {
		font-size: large;
		font-style: italic;
	}

	.none {
		text-align: center;
		margin-top: 50rpx;
	}

	.back {
		width: 60rpx;
		height: 60rpx;
		margin: 13rpx;
		border: none;
	}

	.arrow {
		width: 80rpx;
		height: 80rpx;
		position: relative;
		left: -20px;
		top: -6px;
	}

	.search-all {
		width: 100%;
		height: 150rpx;
	}

	.ssss {
		display: flex;
	}
</style>
