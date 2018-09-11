<template>
  <div>
    <loader v-if="isBusy" msg="loading gallery"></loader>
    <gallery-view v-else-if="activeGallery.id !== undefined" :obj="activeGallery"></gallery-view>
  </div>
</template>

<script>
// @ is an alias to /src
import GalleryView from '@/components/main/GalleryView'
import Loader from '@/components/util/Loader'
import Galleries from '@/api/Galleries'

export default {
  name: 'galleries',
  components: {
    GalleryView, Loader
  },
  props: ['id', 'title'],
  created() {
      this.isBusy = true
      let galleries = new Galleries()
      galleries.fetchOne(this.id)
          .then( response => {
              this.activeGallery = response
              this.isBusy = false
          })
          .catch(error => {

          })
  },
  data: function() {
      return {
          isBusy: true,
          activeGallery: {}
      }
  }
}
</script>
