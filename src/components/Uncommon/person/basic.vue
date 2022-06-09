<template>
    <div>
        个人信息
        <div class="straightLine" >
            <span ></span>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent, reactive, ref } from 'vue'

    export default defineComponent({
        name:'',
        setup() {
            return {
            }
        }
    })
</script>

<style lang='scss' scoped>
.straightLine{
    height: 1px;
    background-color: rgb(12 12 12);
    width: 98%;
    margin: 3px auto;
}
</style>