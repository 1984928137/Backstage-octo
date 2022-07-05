<template>
  <div>
    权限修改
    {{ permissData.name }}
    {{ permissData.role.toString() }}
    {{ permissData.permission }}
    <el-tree
      ref="treeRef"
      :props="props"
      :data="dataSource"
      node-key="id"
      check-strictly
      highlight-current
      show-checkbox
      :default-checked-keys="permissData.permission"
    >
      <template #default="{ node, data }">
        <span class="custom-tree-node">
          <span>{{ node.label }}</span>
          <span v-if="node.level==1">
            <button @click="append(data)">Append</button>
            <button @click="remove(node, data)">Delete</button>
          </span>
        </span>
      </template>
    </el-tree>
    <el-button @click="getCheckedKeys">get by key</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent,onBeforeMount, reactive, ref, toRefs } from "vue";
import { InitPermiss } from "../../TS/permissionModification";
import { exRequest,RouterAPI } from "../../axios/api";

export default defineComponent({
  name: "permission",
  setup() {
    const data = reactive(new InitPermiss());
    function authority(){
      return exRequest.get({
        url:RouterAPI.Product,
        data:''
      })
    }
    onBeforeMount(async () => {
      console.log("onBeforeMount");
      data.obj = await authority()
        // .then((res) => {
            data.dataSource = data.obj.result 
        //   return res.data.result;
        // })
        // .catch((err) => {
        //   console.log(err);
        // });
    });
    return {
      ...toRefs(data),
    };
  },
});
</script>

<style lang="scss" scoped></style>
