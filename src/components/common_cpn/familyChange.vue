<template>
    <div>
        <div>
            
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent, reactive, ref ,toRefs} from 'vue'
    import { exRequest, RouterAPI } from "../../axios/api";
    import { InitData } from "../../TS/commons/familyChange"

    export default defineComponent({
        name:'familyChange',
        setup() {
            const Data = reactive(new InitData());
            return {
                ...toRefs(Data),
            }
        }
    })
</script>

<style lang='scss' scoped>

</style>
