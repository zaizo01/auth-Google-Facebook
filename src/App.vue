<template>
  <v-app>
    <Navbar v-if="user != ''"/>
   <v-main>
      <v-container>
        <router-view></router-view>
       </v-container>
   </v-main>
  </v-app>
</template>

<script>
import { mapState } from 'vuex';
import Navbar from './components/Navbar.vue';

export default {
  components: { Navbar },
  name: 'App',
  data() {
    return {
      
    }
  },
  computed: {
    ...mapState(['user'])
  },
};
</script>
