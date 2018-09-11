<template>
    <div>
        <b-input-group prepend="Suchen" class="sticky-top">
            <b-form-input v-model="query"></b-form-input>
            <b-input-group-append>
                <b-btn variant="success" disabled><font-awesome-icon icon="search"></font-awesome-icon></b-btn>
                <b-btn variant="danger" disabled><font-awesome-icon icon="times-circle" @click="query = ''"></font-awesome-icon></b-btn>
            </b-input-group-append>
        </b-input-group>

        <b-card v-if="galleries.length == 0 && query != ''">
            Keine Bildergalerien gefunden
        </b-card>

        <loader v-if="isBusy" msg="loading galleries"></loader>
        <b-card-group columns v-else>
            <b-card v-for="(gallery, key) in galleries" :key="key" :id="'gal_' + gallery.id"
                    :title="gallery.title"
                    :img-src="gallery.poster.path"
                    img-fluid
                    :img-alt="gallery.poster.title"
                    img-top
            >
                <div slot="footer">
                    <b-button size="sm"  variant="secondary" :to="'/gallery/' + gallery.id + '/' + encodeURIComponent(gallery.title) "><font-awesome-icon icon="eye" /> </b-button>
                </div>
            </b-card>
        </b-card-group>
        <b-pagination v-if="paginator.total > 0" :total-rows="paginator.total" v-model="paginator.current_page" :per-page="paginator.per_page" @input="changePage">
        </b-pagination>
    </div>
</template>

<script>
    import Galleries from '@/api/Galleries'
    import Loader from '@/components/util/Loader'

    export default {
        name: "GalleriesList",
        components: {Loader},
        created() {
            this.fetchGalleries()
        },
        computed: {
            galleries() {
                return this.paginator.data
            },
            paginator() {
                return this.$store.state.galleries
            }
        },
        watch: {
            query(newVal) {
                let url = AppConfig.api.url + '/api/v1/galleries?page=' + this.paginator.current_page + '&q=' + encodeURIComponent(this.query)
                this.fetchGalleries(url)
            }
        },
        data: function() {
            return {
                query: '',
                activeGallery: {},
                isBusy: false
            }
        },
        methods: {
            fetchGalleries(url) {
                this.isBusy = true
                let galleries = new Galleries()
                galleries.fetch(url).then(pag => {
                    this.$store.commit('setGalleries', pag)
                    this.$store.commit('finishLoadingGalleries')
                    this.isBusy = false
                })
            },
            changePage(page) {
                let url = AppConfig.api.url + '/api/v1/galleries?page=' + page + '&q=' + encodeURIComponent(this.query)
                this.fetchGalleries(url)
            }
        }
    }
</script>

<style scoped>

</style>