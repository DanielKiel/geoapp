<template>
    <div class="alert-info alert">
        <font-awesome-icon icon="spinner" size="1x" spin></font-awesome-icon> {{msg}}
    </div>
</template>

<script>
    export default {
        name: "Loader",
        props: ['msg'],
        data: function() {
            return {
                rotate: 90
            }
        }
    }
</script>

<style scoped>

</style>