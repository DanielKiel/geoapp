<template>
    <b-card v-if="activeGallery.id !== undefined">
        <b-card-header>
            {{activeGallery.title}}
        </b-card-header>
        <b-card-body>
            <div><span v-html="activeGallery.description"></span></div>
            <photos-list :data="activeGallery.photos"></photos-list>
        </b-card-body>
        <b-card-footer>
            <b-button @click="activeGallery = {}" v-scroll-to="'#gal_' + activeGallery.id"><font-awesome-icon icon="window-close"></font-awesome-icon></b-button>
        </b-card-footer>
    </b-card>
</template>

<script>
    import PhotosList from '@/components/main/PhotosList'
    export default {
        name: "GalleryView",
        components: {PhotosList},
        props: ['obj'],
        data: function() {
            return {
                activeGallery: this.obj
            }
        }
    }
</script>

<style scoped>

</style>