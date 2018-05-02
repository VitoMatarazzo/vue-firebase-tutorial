<template>
    <div class="login">
        <h3>Sign In</h3>
        <input type="text" v-model="email" placeholder="Email"><br>
        <input type="password" v-model="password" placeholder="Password"><br>
        <button v-on:click="login">Submit</button>
        <p>You don't have an account? You can <router-link to="/sign-up">create one</router-link></p>
    </div>
</template>

<script>
    import firebase from "firebase";
    
    export default {
        name: 'login',
        data: function() {
            return {
                email: "",
                password: ""
            }
        },
        methods: {
            login: function() {
                firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
                    (user) => {
                        this.$router.replace("hello");
                    },
                    (error) => {
                        alert("Oops. " + error.message);
                    }
                );
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .login {
        margin-top: 40px;
    }
    input {
        width: 20%;
        padding: 15px;
    }
    button {
        margin-top: 20px;
        width: 10%;
        cursor: pointer;
    }
    p{
        margin-top: 40px;
        font-size: 13px;
    }
    p a{
        text-decoration: underline;
        cursor: pointer;
    }
</style>
