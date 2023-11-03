<template>
	<view>
		<view class="title">
			信息发布
		</view>
		<view class="main">
			<view class="object">
				<view>
					<text>物品类别：</text>
					<picker @change="bindPickerChange" :value="index" :range="array" range-key="category">
						<view class="selected">{{ array[index].category }}</view>
					</picker>
				</view>
				<view>
					<text>物品名称：</text>
					<input v-model="name" placeholder="请输入物品名称" />
				</view>
			</view>
			<view class="object">
				<view>
					<text>详细描述：</text>
					<text class="explanation">(何时何地捡到，放在何处)</text>
					<textarea v-model="details" class="details_input" placeholder="请输入物品详细描述"></textarea>
				</view>
			</view>
			<hr>
			<view class="object">
				<view>
					<text>联系方式(选填)：</text>
					<text class="explanation">贵重物品建议留下联系方式</text>
					<input v-model="contact" placeholder="请输入联系方式" />
				</view>
			</view>
			<view class="object">
				<view>图片上传：</view>
				<view class="container">
					<view class="image-list">
						<view v-for="(item, index) in imageList" :key="index" class="image-item">
							<image :src="item" class="thumbnail" />
							<view class="close" @click="deleteImage(index)">X</view>
						</view>
						<button class="submit" @click="chooseImage">+</button>
					</view>
				</view>
			</view>
			<button class="publish" @click="publish">发布</button>
		</view>
	</view>
</template>


<script>
	export default {
		data() {
			return {
				array: [{
					category: '请选择'
				}, {
					category: '证件'
				}, {
					category: '电子产品'
				}, {
					category: '学习物品'
				}, {
					category: '生活物品'
				}, {
					category: '其他'
				}],
				category: '',
				index: 0,
				name: '',
				details: '',
				contact: '',
				username: '',
				time: '',
				imageList: []
			}
		},
		onLoad() {

		},
		methods: {
			bindPickerChange: function(e) {
				this.index = e.detail.value;
				this.category = this.array[this.index].category;
			},
			getusername() {
				var self = this;
				uni.getStorage({
					key: 'loginStatus',
					success: function(res) {
						self.username = res.data;
					}
				})
			},
			publish() {
				this.getusername();
				if (this.username == '') {
					uni.showToast({
						title: '请先登录！',
						icon: 'none'
					})
				} else if (this.category == '') {
					uni.showToast({
						title: '请选择物品类型！',
						icon: 'none'
					})
				} else if (this.name == '') {
					uni.showToast({
						title: '名称不可为空！',
						icon: 'none'
					})
				} else if (this.details == '') {
					uni.showToast({
						title: '详细描述不可为空！',
						icon: 'none'
					})
				} else {
					this.time = this.getTime();
					if (this.contact == ''){
						this.contact = "无"
					}
					uniCloud.callFunction({
						name: 'Publish',
						data: {
							username: this.username,
							category: this.category,
							name: this.name,
							details: this.details,
							contact: this.contact,
							time: this.time,
							imgList: this.imageList
						}
					}).then(res => {
						if (res.result.status == 'success') {
							uni.showToast({
								title: '发布成功！',
								icon: 'none'
							})
						}
					});
					this.category = ''
					this.index = 0
					this.name = ''
					this.details = ''
					this.contact = ''
					this.imageList = []
				}
			},
			getTime: function() {
				var date = new Date(),
					year = date.getFullYear(),
					month = date.getMonth() + 1,
					day = date.getDate(),
					hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
					minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(),
					second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
				month >= 1 && month <= 9 ? (month = "0" + month) : "";
				day >= 0 && day <= 9 ? (day = "0" + day) : "";
				var timer = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
				return timer;
			},
			chooseImage() {
				// 使用 uni.chooseImage API 选择图片
				uni.chooseImage({
					count: 9, // 最多可以选择的图片张数
					sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
					success: (res) => {
						// 返回选定照片的本地文件路径列表，tempFilePaths可以作为img标签的src属性显示图片
						const tempFilePaths = res.tempFilePaths
						for (let i = 0; i < tempFilePaths.length; i++) {
							this.imageList.push(tempFilePaths[i])
						}
						console.log(tempFilePaths);
					}
				})
			},
			deleteImage(index) {
				this.imageList.splice(index, 1)
			},
			uploadImage() {
				for (let i = 0; i < this.imageList.length; i++) {
					uniCloud.callFunction({
						name: 'uploadImage',
						data: {
							imageUrl: this.imageList[i]
						}
					}).then(res => {
						console.log(res)
					}).catch(err => {
						console.error(err)
					})
				}
			}
		}
	}
</script>

<style>
	.title {
		font-size: 60rpx;
		color: white;
		text-align: center;
		height: 200rpx;
		line-height: 160rpx;
		background: linear-gradient(#46cdcf, white);
		/* border-bottom: 1px solid black; */
	}

	.main {
		width: 720rpx;
		margin-top: 60rpx;
		margin-left: 2%;
		position: absolute;
		top: 30px;
	}

	.object {
		border: 2px solid #C0C0C0;
		border-radius: 20rpx;
		margin-top: 20rpx;
		background-color: white;
		padding: 10rpx 0 10rpx 20rpx;
	}

	.selected {
		color: #ff2e63;
		font-size: 35rpx;
		padding: 15rpx;
		background-color: white;
	}

	.details_input {
		height: 150rpx;
		border-radius: 5px;
		width: 670rpx;
		margin-bottom: 15rpx;
	}

	.explanation {
		font-size: small;
		color: #D3D3D3;
	}

	.publish {
		color: white;
		border-radius: 5px;
		background-color: #87CEEB;
		width: 23%;
		margin-top: 20rpx;
		height: 80rpx;
	}

	.container {
		width: 100%;
		/* display: flex;
		flex-wrap: wrap;
		justify-content: flex-start; */
	}

	.image-list {
		display: flex;
		flex-wrap: wrap;
		align-items: flex-start;
		justify-content: flex-start;
	}

	.image-item {
		position: relative;
		width: 305rpx;
		height: 350rpx;
		margin: 15rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.upload_border {
		width: 750rpx;
		height: auto;
	}

	.upload {
		color: white;
		border-radius: 5px;
		background-color: #87CEEB;
		width: 23%;
		font-size: 10pt;
		margin-top: 20rpx;
		height: 100rpx;
	}

	.thumbnail {
		width: 100%;
		height: 100%;
	}

	.close {
		position: absolute;
		top: 0;
		right: 0;
		width: 20px;
		height: 20px;
		font-size: 16px;
		color: #fff;
		background-color: #999;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.submit {
		width: 305rpx;
		height: 350rpx;
		margin: 15rpx;
		line-height: 350rpx;
		font-size: 40px;
	}
</style>
