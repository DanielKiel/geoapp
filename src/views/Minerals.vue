<template>
  <div>
    <minerals-list></minerals-list>
  </div>
</template>

<script>
// @ is an alias to /src
import MineralsList from '@/components/main/MineralsList'

export default {
  name: 'home',
  components: {
    MineralsList
  }
}
</script>
