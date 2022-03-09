<template>
  <div id="bg" class="container-fluid">
    <div class="row mt-minus-top">
      <div class="col-md-2 offset-md-5 text-center">
      </div>
    </div>
    <div class="row text-center">
      <div class="col-md-12">
        <img alt="Help Ukraine"
             class="help"
             src="@/assets/peace.png"/>
      </div>
    </div>

    <div class="row">
      <div class="card col-md-8 offset-md-2 col-sm-8 offset-sm-2 col-xs-12">
        <div class="card-body">
          <div class="row">
            <h1>Ukraine Transport</h1>
          </div>

          <div class="row">
            <div class="col-md-12">
              <p class="text-center">
                <b>
                  Для біженців, які потребують транспортування, будь ласка, натисніть кнопку нижче
                </b>
              </p>
              <p class="text-center">
                For refugees requiring transportation please click on the below button
              </p>
            </div>
          </div>

          <div class="row ">
            <div class="col-md-12">
              <button class="btn btn-xs btn-danger" aria-current="page" v-on:click="iAmRefugee()">
                <b>I'm refugee / Я біженець</b>
              </button>
            </div>
          </div>

          <div class="row custom-margin">
            <p class="text-center">
              <b>
                Для волонтерів та людей та/або організацій, зацікавлених у допомозі українській допомоги, будь ласка, увійдіть за допомогою наведених нижче параметрів.
              </b>
            </p>
            <p class="text-center">
              For volunteers and people and/or organizations interested in helping with Ukrainian relief efforts, please login via the options below.
            </p>
          </div>

          <div class="row custom-margin">
            <div class="col-md-12">
              <button class="btn btn-large btn-dark custom-margin" v-on:click="logOnApple">
                <i class="fa fa-apple"></i>
                LOG IN WITH APPLE
              </button>

              <button class="btn btn-large btn-primary custom-margin" v-on:click="logOnFacebook">
                <i class="fa fa-facebook"></i>
                LOG IN WITH FACEBOOK
              </button>

              <button class="btn btn-large btn-danger custom-margin" v-on:click="logOnGoogle">
                <i class="fa fa-google"></i>
                LOG IN WITH GOOGLE
              </button>

              <button
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                  class="btn btn-large btn-success custom-margin" >
                <i class="fa fa-envelope"></i>
                LOG IN WITH EMAIL
              </button>

            </div>
          </div>

          <div class="row custom-margin">
            <p class="text-center">
              <b>
                Після того, як ви ввійдете в систему, програма дозволить вам шукати біженців, які потребують допомоги, з волонтерами в околицях для забезпечення транспорту.
              </b>
            </p>
            <p class="text-center">
              Once you've logged in, the application will allow you to search for refugees needing assistance with volunteers in the surrounding area to provide transportation.
            </p>
          </div>

        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <small>
          Peace. {{ new Date().getFullYear() }}
        </small>
      </div>
    </div>
    <er-login-email></er-login-email>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import ErLoginEmail from "./er-login-email-modal.vue";

export default {
  name: "er-login",
  components: {ErLoginEmail},
  data() {
    return {
      isLogged: false,
    };
  },
  methods: {
    ...mapActions(["login", "logout"]),
    logOnFacebook() {
      this.auth.social('facebook', this.socialHandler);
    },
    logOnGoogle() {
      this.auth.social('google-oauth2', this.socialHandler);
    },
    logOnApple() {
      this.auth.social('apple', this.socialHandler);
    },
    socialHandler(errorResp, successResp) {
      if (errorResp) {
        this.errorHandler(errorResp);
      } else {
        this.successHandler(successResp);
      }
    },
    errorHandler(resp) {
      this.logout().then(() => this.$router.push("/login"));
    },
    successHandler(resp) {
      console.log(JSON.stringify(resp));
      document.cookie = `pack=${btoa(resp)}`;
      document.cookie = `givenName=${resp.idTokenPayload.name};`;
      document.cookie = `picture=${btoa(resp.idTokenPayload.picture)};`;
      this.login(resp.accessToken).then(() => this.$router.push("/"));
    },
    iAmRefugee() {
      window.open('https://forms.docq.app/?domain=ukraine.docq.app&form=a92a63d6-e639-4162-b3ee-dcbb1a6e286b', '_blank')
    },
  },
};
</script>

<style scoped>
h1 {
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: solid 1px #c0c0c0;
}
.help {
  width: 300px;
  height: unset;
  border-radius: unset;
  margin-bottom: 25px;
}
button.custom-margin {
  margin: 5px;
}
div.custom-margin {
  margin-top: 15px;
}
p {
  text-align: justify;
}
.mt-minus-top {
  margin-top: -25px;
}
small {
  font-size: 10px;
}
.text-left {
  text-align: left;
}
a {
  text-decoration: none;
}
</style>
