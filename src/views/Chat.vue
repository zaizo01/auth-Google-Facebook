<template>
  <div>
      <v-row>
         <v-col>
             <v-card>
                 <v-card-text>Welcome {{user.name}}</v-card-text>

                 <v-card-text style="height: 60vh; overflow: auto" v-chat-scroll>
                     <div :class="item.name === user.name ? 'text-sm-right' : 'text-sm-left'"
                            v-for="(item, index) in messages" :key="index">
                         <v-chip>
                             <v-avatar>
                                 <img :src="item.photo" alt="image profile">
                             </v-avatar>
                                 <p class="pt-4 pl-4">{{item.message}}</p>
                         </v-chip>
                         <p class="text-caption">{{item.date}}</p>
                     </div>
                 </v-card-text>

                 <v-card-text>
                     <v-form @submit.prevent="submitMsg" v-model="valid">
                         <v-text-field 
                         v-model="message"
                         label="Write a message"
                         required
                         :rules="nameRules"></v-text-field>
                     </v-form>
                 </v-card-text>
                 
             </v-card>
         </v-col>
      </v-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import {db} from '@/firebase';
import moment from 'moment';
export default {
    data() {
        return {
            message: '',
            valid: false,
            nameRules: [
                value => !!value || 'you must write a message...' 
            ],
            messages: []
        }
    },
    computed: {
        ...mapState(['user'])
    },
    methods: {
        submitMsg(){
            if (this.valid) {
                console.log('message', this.message);

                db.collection('chats').add({
                    message: this.message,
                    user: this.user.name,
                    photo: this.user.photo,
                    date: Date.now()
                }).catch(error => {
                    console.log(error);
                })

                this.message = ''
            } else {
                console.log('BAD');
            }
        }
    },
    created() {
        moment.locale('es');   

        let ref = db.collection('chats').orderBy('date', 'desc').limit(10);

        ref.onSnapshot(querySnapshot => {

            this.messages = []
            
            querySnapshot.forEach(doc => {
                this.messages.unshift({
                     message: doc.data().message,
                    photo: doc.data().photo,
                    name: doc.data().name,
                    date: moment(doc.data().name).format('lll')
                })
            });
        })
    },
}
</script>
