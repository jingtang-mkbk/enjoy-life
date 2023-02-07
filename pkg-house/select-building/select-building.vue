<template>
	<u-cell-group>
		<u-cell v-for="it in buildingInfo" :key="it.id" :title="it.txt" isLink url="/pkg-house/select-room/select-room"></u-cell>
	</u-cell-group>
</template>

<script>
	export default{
		data() {
			return {
				buildingInfo: [
					{ txt: '北京西三旗花园1号楼', id: 1 },
					{ txt: '北京西三旗花园2号楼', id: 2 },
					{ txt: '北京西三旗花园3号楼', id: 3 },
					{ txt: '北京西三旗花园4号楼', id: 4 },
				]
			}
		}
	}
</script>

<style>
</style>