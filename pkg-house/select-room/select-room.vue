<template>
	<u-cell-group>
		<u-cell v-for="it in roomInfo" :key="it.id" :title="it.txt" isLink url="/pkg-house/add-house-info/add-house-info"></u-cell>
	</u-cell-group>
</template>

<script>
	export default{
		data() {
			return {
				roomInfo: [
					{ txt: '北京西三旗花园1号楼 101', id: 1 },
					{ txt: '北京西三旗花园2号楼 102', id: 2 },
					{ txt: '北京西三旗花园3号楼 103', id: 3 },
					{ txt: '北京西三旗花园4号楼 201', id: 4 },
					{ txt: '北京西三旗花园5号楼 202', id: 4 },
					{ txt: '北京西三旗花园6号楼 203', id: 4 }
				]
			}
		}
	}
</script>

<style>
</style>