<template>
    <div>
        <b-modal v-if="activePhoto.id != undefined" id="photo_viewer" :title="activePhoto.title" size="lg" centered>
            <b-img :src="activePhoto.poster.path" fluid />

            <div slot="modal-footer">
                <span class="text-left">{{activeKey + 1}} of {{photos.length}}</span>
                <b-button size="sm" @click="previous">Prev</b-button>
                <b-button size="sm" @click="next">Next</b-button>
            </div>
        </b-modal>

        <b-card-group columns>
            <b-card v-for="(photo, key) in photos"
                :key="key"
                :img-src="photo.poster.path"
                img-fluid
                img-alt="image"
                img-top
            >
            <div slot="footer">
                <b-button class="w-100" v-b-modal.photo_viewer @click="activePhoto = photo, activeKey = key">Vollbild</b-button>
            </div>
            </b-card>
        </b-card-group>
    </div>
</template>

<script>
    export default {
        name: "PhotosList",
        props: ['data'],
        data: function() {
            return {
                photos: this.data,
                activePhoto: {},
                activeKey: 0
            }
        },
        methods: {
            previous() {
                if (this.photos[this.activeKey -1 ] !== undefined) {
                    this.activeKey = this.activeKey - 1
                    this.activePhoto = this.photos[this.activeKey]
                    return
                }

                this.first()
            },
            next() {
                if (this.photos[this.activeKey + 1 ] !== undefined) {
                    this.activeKey = this.activeKey + 1
                    this.activePhoto = this.photos[this.activeKey]
                    return
                }

                this.first()
            },
            first() {
                this.activeKey = 0
                this.activePhoto = this.photos[this.activeKey]
            }
        }
    }
</script>

<style scoped>

</style>