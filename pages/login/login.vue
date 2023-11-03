<template>
	<!-- 未登录界面 -->
	<view v-if="!isLogined">
		<image src="../../static/login/xmu.jpg" class="xmu"></image>
		<input type="text" placeholder="用户名" v-model="username" class="auth_input" />
		<input type="password" placeholder="密码" v-model="password" class="auth_input" />
		<button @click="login" class="auth_sumbit">登录</button>
	</view>
	<!-- 登录后 用户界面 -->
	<view v-else>
		<view v-if="isClicked1 && isClicked2">
			<view class="header"
				style="background-image:linear-gradient(to top,#ffffff,transparent),url('../../static/login/welcome.png');background-position:center;background-size: 100%;">
				<image src="../../static/login/user.jpg" class="avatar" />
				<text class="welcome-text">{{username}},欢迎你！</text>
			</view>
			<view>
				<button @click="logout" class="functionbutton">
					退出登录
				</button>
				<button @click="toMine" class="functionbutton">
					我的发布
				</button>
				<button @click="toAbout" class="functionbutton">
					关于我们
				</button>
			</view>
		</view>
		<!-- 我发布的 -->
		<view v-if="isClicked1 && !isClicked2">
			<button @click="back" class="back">
				<image src="../../static/icon/left.png" class="arrow"></image>
			</button>
			<view v-for="(content,index) in list" :key="index">
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
						<button class="delete" @click="deletepost(item._id)">删除</button>
					</view>
				</view>
			</view>
		</view>
		<!-- 关于我们 -->
		<view v-if="isClicked2 && !isClicked1">
			<button @click="back" class="back">
				<image src="../../static/icon/left.png" class="arrow"></image>
			</button>
			<view class="aboutus">版本号v1.1</view>
			<view class="aboutus">制作小组：江山代有才人秃<br />成员</view>
			<view class="aboutus">刘梦杰<br />李国楷<br />刘心雨<br />黄成选</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isLogined: false, //是否登录
				username: '',
				password: '',
				width: 0,
				list: [],
				isClicked1: true,
				isClicked2: true,
				space: ' '
			}
		},
		onPullDownRefresh() {
			this.list = [];
			uniCloud.callFunction({
				name: 'GetMine',
				data: {
					username: this.username
				}
			}).then(res => {
				this.list.push(res.result.data);
			})
			uni.stopPullDownRefresh();
		},
		onLoad() {
			this.width = uni.getSystemInfoSync().windowWidth;
			uni.setStorage({
				key: 'loginStatus',
				data: '',
				success: function() {
					console.log('success');
				}
			})
		},
		methods: {
			login() {
				uniCloud.callFunction({
					name: 'login',
					data: {
						username: this.username,
						password: this.password
					}
				}).then(res => {
					// 登录成功处理
					if (res.result.status === 'success') {
						uni.setStorage({
								key: 'loginStatus',
								data: res.result.username,
								success: function() {
									console.log('success', res.result.username);
								}
							}),
							uni.showToast({
								title: '登录成功！',
								icon: 'none'
							})
						this.isLogined = true; //跳转至用户界面
						//调用云函数，从云端读出我发布的失物招领，存入list数组
						uniCloud.callFunction({
							name: 'GetMine',
							data: {
								username: this.username
							}
						}).then(res => {
							this.list.push(res.result.data);
						})
					} else {
						// 登录失败处理
						uni.showToast({
							title: '用户名或密码错误',
							icon: 'none'
						})
					}
				})
			},
			logout() {
				this.isLogined = false;
				uni.setStorage({
						key: 'loginStatus',
						data: '',
						success: function() {
							console.log('success', '');
						}
					}),
					uni.showToast({
						title: '退出成功！',
						icon: 'none'
					})
				this.username = '';
				this.password = '';
			},
			deletepost(e) {
				uni.showModal({
					title: '提示',
					content: '确定要删除吗？',
					success: function(res) {
						if (res.confirm) {
							//用户点击了确定按钮，执行删除操作
							uniCloud.callFunction({
								name: 'Delete',
								data: {
									_id: e
								}
							}).then(res => {
								console.log(res.result.status);
							})
						} else if (res.cancel) {
							// 用户点击了取消按钮，不进行任何操作
						}
					}
				});
			},
			toMine() {
				this.isClicked1 = true;
				this.isClicked2 = false;
			},
			toAbout() {
				this.isClicked1 = false;
				this.isClicked2 = true;
			},
			back() {
				this.isClicked1 = true;
				this.isClicked2 = true;
			}
		}
	}
</script>

<style>
	.xmu {
		display: block;
		margin-top: 5%;
		margin-bottom: 5%;
		margin-left: auto;
		margin-right: auto;
		height: 280rpx;
		width: 280rpx;
	}

	.auth_input {
		display: block;
		border: 1px solid #ccc;
		padding: 8px 12px;
		font-size: 14px;
		width: 430rpx;
		margin: 0 auto;
		color: #676a6c;
	}

	.auth_sumbit {
		background-color: #87ceeb;
		color: white;
		text-align: center;
		margin-top: 5%;
		width: 40%;
	}

	.user_welcome {
		height: 100rpx;
		font-size: larger;
		font-style: italic;
	}

	.delete {
		background-color: red;
		color: white;
		width: 150rpx;
		text-align: center;
		margin-top: 10rpx;
		margin-right: 30rpx;
	}

	.header {
		display: flex;
		flex-direction: row;
		align-items: flex-end;
		justify-content: center;
		height: 350rpx;
		margin-bottom: 20rpx;
	}

	.avatar {
		width: 50px;
		height: 50px;
		border-radius: 40px;
	}

	.welcome-text {
		margin-top: 10px;
		font-size: 14px;
		color: #000000;
		text-align: center;
	}

	.functionbutton {
		margin: 20rpx;
		width: 400rpx;
		position: relative;
		top: 70rpx;
		left: 50%;
		transform: translate(-50%, -50%);
		color: #ffffff;
		background-color: #87ceeb;
	}

	.back {
		width: 120rpx;
		height: 80rpx;
		margin-left: 0px;
		border: none;
	}

	.arrow {
		width: 70rpx;
		height: 70rpx;
		margin: 0 auto;
	}

	.aboutus {
		text-align: center;
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
</style>
