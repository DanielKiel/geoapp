<template>
  <div>
    <galleries-list></galleries-list>
  </div>
</template>

<script>
// @ is an alias to /src
import GalleriesList from '@/components/main/GalleriesList'
import Loader from '@/components/util/Loader'

export default {
  name: 'galleries',
  components: {
    GalleriesList, Loader
  }
}
</script>
