<template>
	<div>login</div>
</template>

<script>
export default {
	data() {
		return {};
	},
	created() {    
		this.getUser();
	},
	methods: {
		getUser() {
			this.dataService.getUser({
				_this: this,
				options: {},
				callback0: res => {
					console.log(res.body.data);
				},
			});
		},
	},
};
</script>

<style>
</style>

