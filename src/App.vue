<template>
  <div id="app" v-if="offline">
    <div class="container">
      Soory, you are offline at the moment
    </div>
  </div>
  <div id="app" v-else>
    <div class="container">
      <div class="row">
        <div class="col-12 col-sm-2">
          <div class="sticky-top">
            <b-img src="/img/geo_logo.jpg" fluid></b-img>
            <b-nav fill tabs>
              <b-nav-item to="/">Startseite</b-nav-item>
              <b-nav-item to="/galleries">Bildergalerien</b-nav-item>
              <b-nav-item to="/minerals">Mineralien</b-nav-item>
            </b-nav>
          </div>

        </div>
        <div class="col-12 col-sm-10">
          <router-view/>
        </div>
      </div>
      <div class="fixed-bottom">
        <b-button class="float-right" v-scroll-to="'#app'" size="sm" variant="info">
          <font-awesome-icon icon="arrow-up"></font-awesome-icon>
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
  import GeoCoordinates from '@/api/GeoCoordinates'
  import Galleries from '@/api/Galleries'
  import Minerals from '@/api/Minerals'
  import Timestamps from '@/api/Timestamps'

  export default {
      mounted() {
          let timestamps = new Timestamps()
          timestamps.fetch().then(data => {
              this.$store.commit('freshTimestamps', data)
          })

          window.addEventListener('offline', () => {
              this.offline = true
          })
      },
      computed: {
          timestamps() {
            return this.$store.state.timestamps
          },
          lastMineralsUpdate() {
              return this.$store.state.lastMineralsUpdate
          },
          lastGeosUpdate() {
              return this.$store.state.lastGeosUpdate
          }
      },
      watch: {
          timestamps(newVal, oldVal) {
              if (this.lastMineralsUpdate === null || newVal.minerals > this.lastMineralsUpdate) {
                  let minerals = new Minerals()
                  minerals.fetch().then(data => {
                      this.$store.commit('setMinerals', data)
                      this.$store.commit('finishLoadingMinerals')
                  })
              }

              if (this.lastGeosUpdate === null || newVal.geoCoordinates > this.lastGeosUpdate) {
                  let geos = new GeoCoordinates()
                  geos.fetch().then(data => {
                      this.$store.commit('setGeoCoordinates', data)
                      this.$store.commit('finishLoadingGeoCoordinates')
                  })
              }
          }
      },
      data: function() {
          return {
              offline: false
          }
      }
  }
</script>
