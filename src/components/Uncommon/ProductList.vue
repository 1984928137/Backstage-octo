<template>
  <div>
    <div class="select-box">
      <el-form
        :inline="true"
        :model="productQuireData"
        class="demo-form-inline"
      >
        <el-form-item label="标题">
          <el-input v-model="productQuireData.user" placeholder="搜索" />
        </el-form-item>
        <el-form-item label="详情">
          <el-input v-model="productQuireData.region" placeholder="搜索">
            <!-- <el-option label="Zone one" value="shanghai" /> -->
            <!-- <el-option label="Zone two" value="beijing" /> -->
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="primary" @click="toggleSelection()"
            >Clear selection</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div class="select-table">
      <el-table
        ref="multipleTableRef"
        row-class-name="table-heigth"
        :data="tableData[productListData.page - 1]"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        highlight-current-row
        :row-style="rowState"
        @current-change="handleCurrentChanges"
        :default-sort="{ prop: 'price,address,name', order: 'descending' }"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column sortable label="price" width="180">
          <template #default="scope">
            <span v-show="!scope.row.isShow">{{ scope.row.price }}</span>
            <el-input
              v-show="scope.row.isShow"
              v-model="price[scope.$index].value"
              placeholder="Please input"
            />
          </template>
        </el-table-column>
        <el-table-column sortable label="Name" width="180">
          <template #default="scope">
            <span v-show="!scope.row.isShow">{{ scope.row.name }}</span>
            <el-input
              v-show="scope.row.isShow"
              v-model="name[scope.$index].value"
              placeholder="Please input"
            />
          </template>
        </el-table-column>
        <el-table-column sortable label="Address" width="180">
          <template #default="scope">
            <span v-show="!scope.row.isShow">{{ scope.row.address }}</span>
            <el-input
              v-show="scope.row.isShow"
              v-model="address[scope.$index].value"
              placeholder="Please input"
            />
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
            <el-button
              size="small"
              type="success"
              @click="confirm(scope.$index, scope.row)"
              >确认</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
  <div class="example-pagination-block">
    <el-pagination
      :page-size="5"
      :current-page="pageIndex"
      :default-current-page="1"
      :pager-count="7"
      layout="prev, pager, next"
      :total="productListData.count"
      background
      :hide-on-single-page="value"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onBeforeMount,
  onBeforeUpdate,
  onUpdated,
  reactive,
  ref,
  toRefs,
} from "vue";
import { exRequest,RouterAPI } from "../../axios/api";
import { InitProduct } from "../../TS/productList";
import type { ProductListData, ProductQuireData } from "../../TS/productList";

export default defineComponent({
  name: "ProductList",
  setup() {
    const data = reactive(new InitProduct());
    function productData(){
      return exRequest.get({
        url:RouterAPI.Product,
        data:''
      })
    }
    onBeforeMount(async () => {
      console.log("onBeforeMount");
      data.obj = await productData("")
        // .then((res) => {
        //   data.productListData.count = res.data.result.length;
        //   data.splitArray(res.data.result);
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

<style lang="scss" scoped>
.select-table {
  height: 350px;
}
:deep(.table-heigth){
  height: 50px;
}
</style>
