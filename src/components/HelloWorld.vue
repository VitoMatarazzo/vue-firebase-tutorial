<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>You are logged in as: {{ userEmail }}</h2>
    <input type="text" v-model="name" placeholder="Name"><br>
    <input type="text" v-model="location" placeholder="Location"><br>
    <textarea v-model="description" placeholder="Event description..."></textarea><br>
    <button v-on:click="logout">Logout</button>
    <button v-on:click="saveData">Save Event</button>
    <div class="Message_body" v-if="readDescription">
        <div v-for="line in descriptionLines">{{line}}<br></div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
//require("firebase/firestore");
    
    
export default {
    name: 'HelloWorld',
    data () {
        return {
            msg: 'Welcome to Your Vue.js App',
            userEmail: firebase.auth().currentUser.email,
            name: "",
            location: "",
            description: "",
            readDescription: ""
        }
    },
    computed: {
        descriptionLines: function() {
            return (this.readDescription || "").split("\n");
        }
    },
    methods: {
        logout: function() {
            firebase.auth().signOut().then( ()=> {
                this.$router.replace("login")
            })
        },
        
        saveData: function() {
            var db = firebase.firestore();
            const settings = {timestampsInSnapshots: true};
            db.settings(settings);
            
            db.collection("events").add({
                name: this.name,
                location: this.location,
                description: this.description
            })
            .then( (docRef) => {
                console.log("Document written with ID: ", docRef.id);
                docRef.get().then( (doc) => {
                    if (doc.exists) {
                        const data = doc.data();
                        console.log("Document data:", data );
                        this.readDescription = data.description;
                        console.log(this.readDescription);
                        
                    } else {
                        // doc.data() will be undefined in this case
                        console.log("No such document!");
                    }
                }).catch(function(error) {
                    console.log("Error getting document:", error);
                });
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
