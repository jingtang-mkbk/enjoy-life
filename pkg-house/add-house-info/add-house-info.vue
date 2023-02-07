<template>
	<view class="house-info">
		<!-- 房屋信息 -->
		<view class="title">房屋信息</view>
		<u-cell-group>
			<u-cell title="北京三旗花园1号楼101"></u-cell>
		</u-cell-group>
		<!-- 业主信息 -->
		<view class="title">业主信息</view>
		<!-- 表单 -->
		<view class="form">
			<u--form :rules="rules" :model="form" labelPosition="left" ref="uForm">
				<!-- 姓名 -->
			  <u-form-item label="姓名" labelWidth=60 prop="code" borderBottom ref="item1">
			    <u--input v-model="form.name" placeholder-style="color:#979797" placeholder="请填写您的真实姓名" border="none"></u--input>
			  </u-form-item>
				<!-- 性别 -->
				<u-form-item label="性别" labelWidth=60 prop="code" borderBottom ref="item1">
					<u-radio-group
						v-model="form.gender"
						placement="row"
					>
						<u-radio
							v-for="(item, index) in radiolist1"
							:key="index"
							:label="item.name"
							:name="item.name"
							activeColor="#5591af"
						/>
					</u-radio-group>
				</u-form-item>
				<!-- 手机号 -->
				<u-form-item label="手机号" labelWidth=60 prop="mobile" borderBottom ref="item1">
			    <u--input v-model="form.mobile" maxlength="11" placeholder-style="color:#979797" placeholder="请输入您的手机号" border="none"></u--input>
			    <block slot="right">
			      <u-count-down @finish="Onfinish" v-if="isShow" :time="60 * 1000" format="ss s"></u-count-down>
			      <view @click="getCode" v-else class="code-btn">获取验证码</view>
			    </block>
			  </u-form-item>
				<!-- 验证码 -->
			  <u-form-item label="验证码" labelWidth=60 prop="code" borderBottom ref="item1">
			    <u--input maxlength="6" v-model="form.code" placeholder-style="color:#979797" placeholder="请输入手机验证码" border="none"></u--input>
			  </u-form-item>
			</u--form>
		</view>
		<!-- 图片上传 -->
		<view class="upload">
			<u-cell-group>
				<u-cell label="请拍摄证件原件,并使照片中证件边缘完整,文字清晰,光线均匀." title="北京三旗花园1号楼101"></u-cell>
			</u-cell-group>
			<view class="uploadbox">
				<view class="uploadboxitem" v-for="it in [0, 1]" :key="it">
					<u-upload
							:fileList="fileList1"
							@afterRead="afterRead"
							@delete="deletePic"
							name="1"
							multiple
							:maxCount="10"
						></u-upload>
				</view>
			</view>
		</view>
		<!-- 提交审核 -->
		<life-button @click="onSubmit" bgColor="white" color="#000" icon="../../static/icon/check.png">提交审核</life-button>
		<!-- 模拟短信登录 -->
		<u-notify ref="uNotify" @click.native="copyCode"></u-notify>
	</view>
</template>

<script>
	import { sendCode, login } from '@/api/login.js';
	export default {
	  data() {
	    return {
	      form: {
					name: '',
					gender: '男',
	        mobile: '',
	        code: ''
	      },
				radiolist1: [
					{
						name: '男',
						disabled: false
					},
					{
						name: '女',
						disabled: false
					}
				],
				fileList1: [],
	      code: '',
	      isShow: false,
	      rules: {
	        // 字段名称
	        mobile: [
	          {
	            required: true,
	            message: '请输入手机号',
	            trigger: ['change', 'blur']
	          },
	          {
	            pattern: /^((\+|00)86)?1((3[\d])|(4[5,6,7,9])|(5[0-3,5-9])|(6[5-7])|(7[0-8])|(8[\d])|(9[1,8,9]))\d{8}$/,
	            message: '手机号格式不正确',
	            trigger: ['change', 'blur']
	          }
	        ],
	        code: [
	          {
	            required: true,
	            message: '请输入验证码',
	            trigger: ['change', 'blur']
	          },
	          {
	            pattern: /^\d{6}$/,
	            message: '验证码格式不正确',
	            trigger: ['change', 'blur']
	          }
	        ],
					gender: [
						{
							required: true,
							message: ""
						}
					],
					name: [
						{
							required: true,
							message: "请输入姓名",
							trigger: ['change', 'blur']
						}
					]
	      }
	    };
	  },
	  methods: {
	    getCode() {
	      // 校验手机号，手机号校验成功才发送验证码
	      this.$refs.uForm.validateField('mobile', async errorsRes => {
	        // console.log(errorsRes);
	        if (errorsRes.length) return;
	        const res = await sendCode(this.form.mobile);
	        console.log(res);
	        const message = `【享+生活】验证码：${res.data.code}.您正在使用短信验证码功能，验证码提供他人可能导致账号被盗，请勿转发或泄漏。`;
	        // data中定义code
	        this.code = res.data.code;
	        this.$refs.uNotify.show({
	          top: 10,
	          type: 'success',
	          message: message,
	          duration: 1000 * 6,
	          fontSize: 12
	        });
	        // 震动
	        uni.vibrateLong();
	        // 显示倒计时
	        this.isShow = true;
	      });
	    },
	    // 复制验证码
	    copyCode() {
	      uni.setClipboardData({
	        data: this.code
	      });
	    },
	    // 倒计时结束
	    Onfinish() {
	      this.isShow = false;
	    },
	    async onLogin() {
	      try {
	        await this.$refs.uForm.validate();
	        // const res = await login(this.form);
	        // console.log(res.data);
	        // 存储vuex
	        // this.$store.commit('user/setUserToken', res.data);
	        // 存储本地
	        // uni.setStorageSync('userToken', res.data);
	        // uni.switchTab({
	        //   url: '/pages/my/my'
	        // });
	      } catch (err) {
	        console.log(err);
	      }
	    },
			onSubmit() {
				console.log("submit")
			},
			// 删除图片
			deletePic(event) {
				this[`fileList${event.name}`].splice(event.index, 1)
			},
			// 新增图片
			async afterRead(event) {
				// 当设置 multiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file)
				let fileListLen = this[`fileList${event.name}`].length
				lists.map((item) => {
					this[`fileList${event.name}`].push({
						...item,
						status: 'uploading',
						message: '上传中'
					})
				})
				for (let i = 0; i < lists.length; i++) {
					const result = await this.uploadFilePromise(lists[i].url)
					let item = this[`fileList${event.name}`][fileListLen]
					this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
						status: 'success',
						message: '',
						url: result
					}))
					fileListLen++
				}
			},
			uploadFilePromise(url) {
				return new Promise((resolve, reject) => {
					let a = uni.uploadFile({
						url: 'http://192.168.2.21:7001/upload', // 仅为示例，非真实的接口地址
						filePath: url,
						name: 'file',
						formData: {
							user: 'test'
						},
						success: (res) => {
							setTimeout(() => {
								resolve(res.data.data)
							}, 1000)
						}
					});
				})
			},
	  },
	  onReady() {
	    this.$refs.uForm.setRules(this.rules);
	  }
	};
</script>

<style lang="scss" scoped>
	.house-info{
		height: 100%;
		background-color: #FAFAFA;
		
		.title{
			color: #ccc;
			font-size: 30rpx;
			padding: 20rpx 30rpx;
		}
		
		::v-deep .u-cell__body{
			background-color: #fff;
		}
		
		.form{
			padding: 0 30rpx;
			background-color: #fff;
			
			::v-deep .u-form {
			  color: #979797;
			  .code-btn {
			    color: #5591af;
			    font-size: 30rpx;
			  }
			  .u-form-item {
					
					.u-radio{
						margin-right: 30rpx;
					}
					
			    .u-form-item__body {
			      height: 103rpx;
			      padding: 0;
			    }
					
			    .u-form-item__body__right__message {
			      margin-left: 0 !important;
			    }
			  }
			}
			.tip {
			  color: #c3c3c5;
			  font-size: 26rpx;
			  line-height: 40rpx;
			  margin-top: 30rpx;
			}
		}
		
		.upload{
			margin-top: 30rpx;
			padding-bottom: 220rpx;
			width: 750rpx;
			background-color: white;
			
			::v-deep .u-cell{
				padding: 0 30rpx;
				
				.u-cell__body{
					padding: 20rpx 0;
				}
			}
			
			.uploadbox{
				margin: 0 30rpx;
				
				.uploadboxitem{
					width: 100%;
					height: 420rpx;
					background-color: #fafafa;
					margin-top: 20rpx;
					border-radius: 20rpx;
					
					::v-deep{
						.u-upload{
							height: 420rpx !important;
							width: 100%;
							
							.u-upload__button{
								margin: 0;
								width: 100% !important;
								height: 420rpx !important;
							}
						}
					}
				}
			}
		}
	}
</style>