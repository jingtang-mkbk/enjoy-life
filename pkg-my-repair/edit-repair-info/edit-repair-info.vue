<template>
	<view class="edit-repair">
		<!-- 房屋信息 -->
		<view class="title">报修信息</view>
		<u-cell-group>
			<u-cell title="北京三旗花园1号楼101" isLink clickable="true"></u-cell>
		</u-cell-group>
		<!-- 业主信息 -->
		<view class="title">报修信息</view>
		<!-- 表单 -->
		<view class="form">
			<u--form :rules="rules" :model="form" labelPosition="left" ref="uForm">
				<!-- 维修项目 -->
			  <u-form-item label="维修项目" labelWidth=100 prop="item" borderBottom ref="item1" @click="showRepairItem=true">
			    <u--input v-model="form.item" disabled disabledColor="#fff" placeholder-style="color:#979797" placeholder="请选择" border="none"/>
					<u-icon slot="right" name="arrow-right" />
			  </u-form-item>
				<!-- 手机号码 -->
				<u-form-item label="手机号码" labelWidth=100 prop="mobile" borderBottom ref="item1">
			    <u--input v-model="form.mobile" maxlength="11" placeholder-style="color:#979797" placeholder="请输入上门手机号码" border="none"></u--input>
				</u-form-item>
				<!-- 预约日期 -->
				<u-form-item label="预约日期" labelWidth=100 prop="appointment" borderBottom ref="item1" @click="showAppointment=true">
					<u--input v-model="form.appointment" disabled disabledColor="#fff" placeholder-style="color:#979797" placeholder="请选择上门维修日期" border="none"/>
					<u-icon slot="right" name="arrow-right" />
			  </u-form-item>
				<!-- 问题描述 -->
			  <u-form-item label="问题描述" labelWidth=100 prop="description" borderBottom ref="item1">
					<u-textarea 
						v-model="form.description" 
						placeholder="请填写详细报修内容，有助于工作人员快速帮您解决问题。" 
						placeholder-style="color:#979797" 
						border="none"
						autoHeight
					/>
			  </u-form-item>
			</u--form>
		</view>
		<!-- 问题附件 -->
		<view class="annex">
			
			<view class="annex-txt">
				问题附件
			</view>
				<u-upload
					:fileList="fileList1"
					@afterRead="afterRead"
					@delete="deletePic"
					name="1"
					multiple
					:maxCount="10"
					uploadIcon="plus"
					:previewFullImage="true"
				></u-upload>
		</view>
		<!-- 提交审核 -->
		<life-button @click="onSubmit" bgColor="white" color="#000" icon="../../static/icon/check.png">提交审核</life-button>
		<!-- 维修项目弹窗 -->
		<u-popup :show="showRepairItem" @close="closeRepairItem" @open="openRepairItem">
			<view class="repair-item">
				<ul>
					<li v-for="it in repairItemTxt" :key="it.id" @click="repairItemClick(it.id, it.txt)">{{it.txt}}</li>
				</ul>
			</view>
		</u-popup>
		<!-- 预约日期弹窗 -->
		<u-datetime-picker
			:show="showAppointment"
			v-model="dateAppointment"
			mode="date"
			:formatter="formatter"
			ref="datetimePicker"
			@cancel="dateCancel"
			@confirm="dateConfirm"
			title="选择上门日期"
			closeOnClickOverlay
			@close="showAppointment=false"
		></u-datetime-picker>
	</view>
</template>

<script>
	import { sendCode, login } from '@/api/login.js';
	import { yyyymmdd } from '@/utils/timestamp.js'
	
	export default {
	  data() {
	    return {
				repairItemTxt: [
					{ txt: "选择维修项目", id: 1 },
					{ txt: "水路卫浴", id: 2 },
					{ txt: "电路灯具", id: 3 },
					{ txt: "管路疏通", id: 4 },
					{ txt: "开锁换锁", id: 5 },
					{ txt: "取消", id: 6 }
				],
	      form: {
					item: null,
	        mobile: '',
					appointment: '',
	        description: ''
	      },
				dateAppointment: Number(new Date()),
				showRepairItem: false,
				showAppointment: false,
				fileList1: [],
	      code: '',
	      rules: {
	        item: { required: true, message: '请输入维修项目', trigger: ['blur', 'change'] },
	        mobile: [
						{ required: true, message: '请输入手机号码', trigger: ['blur', 'change'] },
						{ pattern: /^((\+|00)86)?1((3[\d])|(4[5,6,7,9])|(5[0-3,5-9])|(6[5-7])|(7[0-8])|(8[\d])|(9[1,8,9]))\d{8}$/, message: '手机格式错误', trigger: ['change', 'blur'] }
					],
	        appointment: { required: true, message: '请输入预约日期', trigger: ['blur', 'change'] },
	        description: { required: true, message: '请输入问题描述', trigger: ['blur', 'change'] },
	      }
	    };
	  },
	  methods: {
			dateCancel() {
				console.log('cancel');
				this.showAppointment = false
			},
			dateConfirm({value}) {
				this.form.appointment = yyyymmdd(value)
				this.showAppointment = false
			},
			formatter(type, value) {
				if (type === 'year') {
						return `${value}年`
				}
				if (type === 'month') {
						return `${value}月`
				}
				if (type === 'day') {
						return `${value}日`
				}
				return value
			},
			repairItemClick(id, txt) {
				switch (id) {
					case 2: this.form.item = txt; break
					case 3: this.form.item = txt; break
					case 4: this.form.item = txt; break
					case 5: this.form.item = txt; break
					default: break
				}
				this.showRepairItem = false
			},
			closeRepairItem() {
				console.log('close')
				this.showRepairItem = false
			},
			openRepairItem() {
				console.log('open')
			},
			onSubmit(){
				console.log('submit');
				// this.$refs.uForm.validateField('item', async err => {
				// 	console.log(err)
				// })
				// this.$refs.uForm.validateField('appointment', async err => {
				// 	console.log(err)
				// })
				this.$refs.uForm.validate().then(res => {
					console.log('success');
				}).catch(err => {
					console.log('error');
				})
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
			this.$refs.datetimePicker.setFormatter(this.formatter)
	  }
	};
</script>

<style lang="scss" scoped>
	.edit-repair{
		height: 100%;
		background-color: #FAFAFA;
		padding-bottom: 233rpx;

		.annex{
			padding: 30rpx;
			height: 276rpx;
			background-color: #fff;
			
			::v-deep .u-upload{
				margin-top: 30rpx;
			}
			
			::v-deep .u-upload__button{
				border: #D3D4D6 1rpx solid;
				border-radius: 10rpx;
				background-color: #fff;
				margin: 0;
			}
		}
			
		.title{
			color: #ccc;
			font-size: 30rpx;
			padding: 20rpx 30rpx;
		}
		
		::v-deep .u-cell-group__wrapper{
			background-color: #fff;
		}
		
		::v-deep .u-toolbar__title{
			font-weight: 700;
		}
		
		::v-deep .u-form-item__body__right__message{
			margin-left: 0 !important;
		}
		
		.form{
			padding: 0 30rpx;
			background-color: #fff;
			
			::v-deep .u-form {
			  color: #979797;
			}
			
			::v-deep .u-form-item:nth-child(4){
				
				.u-form-item__body{
					flex-direction: column !important;
						
					.u-form-item__body__left{
						margin-bottom: 20rpx !important;
					}
					
					.u-textarea{
						padding: 0;
					}
				}
			}
		}
		
		::v-deep .u-transition{
			border-radius: 30rpx 30rpx 0 0;
			
			.u-popup__content{
				border-radius: 30rpx 30rpx 0 0;
			}
		}
		
		.repair-item{
			border-radius: 30rpx 30rpx 0 0;
			background-color: #FAFAFA;
			
			ul{
				border-radius: 30rpx 30rpx 0 0;
				
				li{
					background-color: #fff;
					border-bottom: 1rpx solid #FAFAFA;
					text-align: center;
					height: 98rpx;
					line-height: 98rpx;
					
					&:first-child{
						font-weight: 700;
						border-radius: 30rpx 30rpx 0 0;
					}
					
					&:last-child{
						margin-top: 20rpx;
						color: #979797;
					}
				}
			}
		}
	}
</style>