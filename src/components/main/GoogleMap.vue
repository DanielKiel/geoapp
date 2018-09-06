<template>
    <div>
        <GmapMap
                :center="{lat:coord.lat, lng:coord.lon}"
                :zoom="8"
                map-type-id="hybrid"
                style="width: 100%; height: 300px"
        >

            <GmapMarker
                    :key="index"
                    v-for="(m, index) in markers"
                    :position="m.position"
                    :clickable="true"
                    :draggable="true"
                    @click="showWindow(m)",
                    :icon="m.icon"
            />

            <GmapInfoWindow
                    :opened="infoWindow.opened"
                    :position="infoWindow.position"
                    @closeclick="closeInfoWindow"
            >
                <h3>{{infoWindow.title}}</h3>
            </GmapInfoWindow>

        </GmapMap>
    </div>
</template>

<script>
    import GeoCoordinates from '@/api/GeoCoordinates'
    export default {
        name: "GoogleMap",
        created() {
            let geo = new GeoCoordinates()
            geo.fetch().then(data => {
                this.$store.commit('setGeoCoordinates', data)
            })
        },
        computed: {
            markers() {
                return this.$store.state.geoCoordinates
            }
        },
        data() {
            return {
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