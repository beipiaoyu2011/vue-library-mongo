<template>
	<div>
		<div class="loginBox">
			<h3>REGIST LIBRARY</h3>
			<div class="inputItem">
				名字：
				<input placeholder="请输入用户名" type="text" v-model="username">
			</div>
			<div class="inputItem">
				密码：
				<input placeholder="密码" type="text" v-model="password">
			</div>
			<div class="loginBtnItem">
				<button @click="loginEvent" class="loginBtn">注册</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			username: '',
			password: '',
		};
	},
	created() {
		// this.getUser();
	},
	methods: {
		loginEvent() {
			this.register();
		},
		register() {
			this.userData = null;
			this.dataService.register({
				_this: this,
				options: {
					username: this.username,
					password: this.password,
				},
				callback0: res => {
					const { data } = res.body;
					if (data.code == 102) {
						alert('注册失败');
					} else if (data.code == 0) {
						alert('注册成功');
					}
				},
			});
		},
	},
};
</script>

<style lang="less">
@import '~@less/login.less';
</style>

