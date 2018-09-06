<template>
  <div>
    <google-map></google-map>
  </div>
</template>

<script>
// @ is an alias to /src
import GoogleMap from '@/components/main/GoogleMap'

export default {
  name: 'home',
  components: {
    GoogleMap
  }
}
</script>
