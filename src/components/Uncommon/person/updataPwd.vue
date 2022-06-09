<template>
    <div>

    </div>
</template>

<script >
    import { defineComponent, reactive, ref } from 'vue'

    export default defineComponent({
        name:'',
        setup() {
            const num = ref(10)
            const user = reactive({
                name:'这么明显啊',
                age: 20
            })
            function updataBtn(){
                num.value++
            }
            return {
                num
            }
        }
    })
</script>

<style>

</style>