<template>
  <div>
     <v-row class="d-flex justify-center">
         <v-col cols="8">
             <v-card class="text-center">
                 <v-card-text class="mt-10">
                    <v-avatar color="primary" size="73">
                        <img :src="user.photo" alt="img user">
                    </v-avatar>
                 </v-card-text>
                  <v-card-text class="text-h5">{{user.name}}</v-card-text>
                    <input type="file" ref="btn" class="d-none" @change="searhImg($event)">
                    <v-btn small elevation="" color="nav" class="white--text mb-5 py-5 px-5 mr-5" @click="$refs.btn.click()">Searh image</v-btn>
                    <v-btn small color="nav" 
                           class="white--text mb-5 py-5 px-5" 
                           @click="submitImg()" 
                           :disabled="file === null"
                           :loading="loading">submit image</v-btn>

                    <v-card-text v-if="file !== null">
                        <v-img :src="urlTemporal"></v-img>
                        <p>{{file.name}}</p>
                    </v-card-text>
                    <v-alert
                    border="top"
                    color="red lighten-2"
                    dark
                    v-if="error"
                    >
                    File not Valid
                    </v-alert>
             </v-card>
         </v-col>
     </v-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import {firebase, db, auth, storage} from '@/firebase'

export default {
    name: 'Admin',
    data() {
        return {
            file: null,
            urlTemporal: '',
            loading: false,
            error: false
        }
    },
    computed: {
        ...mapState(['user'])
    },
    methods: {
        searhImg(event){
            console.log(event.target.files[0]);

            const typeFiles = event.target.files[0].type;
            if (typeFiles === 'image/jpeg' || typeFiles === 'image/png') {
                
                this.file = event.target.files[0];
                this.error = false;
            } else {
                this.error = true;
                this.file = null;
                return
            }

            const reader = new FileReader();
            reader.readAsDataURL(this.file);
            reader.onload = (e) => {
                this.urlTemporal = e.target.result;
            }
        },
        async submitImg(){
            try {

                this.loading = true;

                const refImage = storage.ref().child(this.user.email).child('profile photo');

                const resp = await refImage.put(this.file);

                console.log(resp);

                const urlDownload = await refImage.getDownloadURL();
                this.user.photo = urlDownload;
                
                await db.collection('users').doc(this.user.uid).update({
                    photo: urlDownload
                })
                console.log(urlDownload);
            } catch (error) {
                console.log(error);
            }

            finally {
                this.loading = false;
            }
        }
    },
}
</script>

