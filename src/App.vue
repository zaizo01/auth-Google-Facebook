<template>
  <v-app>
    <v-app-bar
      app
      color="nav"
      dark
    >
        <div class="d-flex justify-space-between">
            <span class="mr-2">Vue</span>
              <router-link to="/login" class="pl-3">Login</router-link>
            <span class="mr-2 pl-8">Vue</span>
            <v-btn small color="primary" class="ml-4" @click="closeSession">Sign out</v-btn>
            
        </div>
    </v-app-bar>

   <v-main>
      <v-container class="">
        <router-view></router-view>
       </v-container>
   </v-main>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex';


export default {
  name: 'App',
  data() {
    return {
      
    }
  },
  methods: {
    ...mapActions(['closeSession'])
  },
};
</script>
