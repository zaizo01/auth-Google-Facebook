<template>
  <div>
    <v-toolbar dense color="nav" dark>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>Auth</v-toolbar-title>
        <v-spacer></v-spacer>
          <router-link to="/login">
            <v-toolbar-title>Login</v-toolbar-title>
          </router-link>
          <v-btn small color="primary" class="ml-4" @click="closeSession">Sign out</v-btn>
          <v-spacer></v-spacer>
    </v-toolbar>
    
    <div class="mx-auto overflow-hidden">
        <v-navigation-drawer color="nav" v-model="drawer" temporary app>
       
            <v-row class="white--text mt-4">
              <v-col class="d-flex justify-center">
                  <v-avatar color="primary" size="73">
                    <img :src="user.photo" alt="img user">
                  </v-avatar>
              </v-col>
            </v-row>
            <p class="mt-3 white--text d-flex justify-center">{{user.name}}</p>
          

        <v-list>
            <v-list-item>
                <v-list-item-icon>
                    <v-icon dark>fas fa-address-card</v-icon>
                </v-list-item-icon>
                 <v-list-item-content>
                    <router-link to="/">
                        <v-list-item-title class="white--text">Dashboard</v-list-item-title>
                    </router-link>
                </v-list-item-content>
              </v-list-item>

            <v-list-item>
                <v-list-item-icon>
                    <v-icon dark>fas fa-address-card</v-icon>
                </v-list-item-icon>
                 <v-list-item-content>
                    <v-list-item-title class="white--text">Photography</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

            <v-list-item>
                <v-list-item-icon>
                    <v-icon dark>fas fa-address-card</v-icon>
                </v-list-item-icon>
                 <v-list-item-content>
                    <router-link to="/admin">
                        <v-list-item-title class="white--text">Admin</v-list-item-title>
                    </router-link>
                </v-list-item-content>
              </v-list-item>
        </v-list>
    </v-navigation-drawer>
    </div>
    
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'Navbar',
  data() {
    return {
      drawer: true
    }
  },
  methods: {
    ...mapActions(['closeSession'])
  },
  computed: {
    ...mapState(['user'])
  },
};
</script>
