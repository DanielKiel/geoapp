<template>
    <div>
        <b-input-group prepend="Suchen" class="sticky-top">
            <b-form-input v-model="query"></b-form-input>
            <b-input-group-append>
                <b-btn variant="success" disabled><font-awesome-icon icon="search"></font-awesome-icon></b-btn>
                <b-btn variant="danger" disabled><font-awesome-icon icon="times-circle" @click="query = ''"></font-awesome-icon></b-btn>
            </b-input-group-append>
        </b-input-group>

        <span id="view_map"></span>

        <b-card>
            <GmapMap
                    :center="{lat:coord.lat, lng:coord.lon}"
                    :zoom="8"
                    map-type-id="hybrid"
                    style="width: 100%; height: 500px"
            >
            <GmapCluster :gridSize="50">
                <GmapMarker
                        :key="index"
                        v-for="(m, index) in markers"
                        :position="m.position"
                        :clickable="true"
                        :draggable="true"
                        @click="showWindow(m)",
                        :icon="m.icon"
                />
            </GmapCluster>
                <GmapInfoWindow
                        :opened="infoWindow.opened"
                        :position="infoWindow.position"
                        @closeclick="closeInfoWindow"
                >
                    <h3>{{infoWindow.title}}</h3>
                </GmapInfoWindow>

            </GmapMap>
            <div slot="footer">
                <b-button :variant=" ! showMapsMarkersCloud ? 'secondary' : 'danger'" @click="$store.commit('changeShowMapsMarkersCloud')">{{ ! showMapsMarkersCloud ? 'Zeige Marker - Liste' : 'Verberge Marker - Liste'}}</b-button>
                <b-list-group v-if="showMapsMarkersCloud">
                    <b-list-group-item v-for="(marker, key) in markers" :key="key">
                        <b-link v-scroll-to="'#view_map'" @click="showWindow(marker)">{{marker.title}}</b-link>
                    </b-list-group-item>
                </b-list-group>
            </div>
        </b-card>
    </div>
</template>

<script>
    import GmapCluster from 'vue2-google-maps/dist/components/cluster'

    export default {
        name: "GoogleMap",
        components: {GmapCluster},
        computed: {
            markers() {
                return this.$store.state.geoCoordinates.filter( geo => {
                    if (this.query == '') {
                        return true
                    }

                    let regex = new RegExp('.*' + this.query + '.*', 'ig')

                    let result = regex.test(geo.title)

                    return result
                } )
            },
            showMapsMarkersCloud() {
                return this.$store.state.showMapsMarkersCloud
            }
        },
        data() {
            return {
                query: '',
                coord: {
                    lat: 50.466671,
                    lon: 12.066670
                },
                openWindow: true,
                infoWindow:{
                    opened: false,
                    position: {
                        lat: 50.466671,
                        lng: 12.066670
                    }
                }
            }
        },
        methods: {
            showWindow(marker) {

                this.infoWindow = {
                    opened: true,
                    position: marker.position,
                    title: marker.title
                }
            },

            closeInfoWindow() {
                this.$set(this.infoWindow, 'opened', false)
            }
        }
    }
</script>

<style scoped>

</style>