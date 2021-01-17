<template>
  <div class="home">
      <h1 class="text-center mt-5">Welcome {{user.name}}</h1>
  </div>
</template>

<script>
import { mapState } from 'vuex'


export default {
  name: 'Home',
  data() {
    return {
      
    }
  },
  computed: {
    ...mapState(['user'])
  },
}
</script>
