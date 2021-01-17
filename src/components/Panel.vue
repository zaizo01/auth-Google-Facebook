<template>
  <div>
      <v-navigation-drawer color="nav" v-model="drawer" height="100vh">
       
            <v-row class="white--text mt-5">
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
                    <v-list-item-title class="white--text">Dashboard</v-list-item-title>
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
                    <v-list-item-title class="white--text">Admin</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
        </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'Panel',
    data() {
        return {
            computed: {
                ...mapState(['user'])
            },
        }
    },
}
</script>
