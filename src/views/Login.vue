<template>
    <div class="d-flex justify-center align-center pt-12">
       <v-card
           class="p-5"
           elevation="4"
           max-width="500px"
         >
            <v-card-text class="text-h5 text-center" v-if="!register">Register</v-card-text>
            <v-card-text class="text-h5 text-center" v-if="register">Login</v-card-text>
            <v-card-text>
                <div class="d-flex justify-center ">
                <v-btn large color="primary" class="p-6 px-16" @click="facebookAuth()">
                     <v-icon class="pr-2">fab fa-facebook-square</v-icon>
                    Facebook</v-btn>

                <v-btn large color="secondary" class="p-6 px-16 ml-2" @click="googleAuth()">
                     <v-icon class="pr-2">fab fa-google</v-icon>
                    Google</v-btn>
                </div>
                <v-btn block larges class="my-3" @click="register = true" v-if="!register">Ya tienes cuenta? Ingresa aqui</v-btn>
                <v-btn block larges class="my-3" @click="register = false" v-if="register">No tienes cuenta? registrate aqui</v-btn>
            </v-card-text>
            <!-- <div>
            </div> -->
        </v-card>
    </div>
</template>

<script>
import { mapMutations} from 'vuex'
import { firebase, auth, db } from '@/firebase';
import router from '@/router';
export default {
    name: 'Login',
    data() {
        return {
            register: false
        }
    },
    methods: {
        ...mapMutations(['newUser']),
        googleAuth(){
            const provider = new firebase.auth.GoogleAuthProvider();
            this.loginWithSocialNetWork(provider);
        },
        facebookAuth(){
             const provider = new firebase.auth.FacebookAuthProvider();
             this.loginWithSocialNetWork(provider);
        },
        async loginWithSocialNetWork(provider){

            firebase.auth().languageCode = 'es';

            try {
                const result = await firebase.auth().signInWithPopup(provider);
                const user = result.user;

                const userInfo = {
                    name: user.displayName,
                    email: user.email,
                    uid: user.uid,
                    photo: user.photoURL
                }
                this.newUser(userInfo);

                await  db.collection('users').doc(user.uid).set(
                    userInfo
                )

                console.log('User authenticared in DB');
                router.push({name: 'Home'})

            } catch (error) {
                console.log(error);
            }
        }
    },
}
</script>