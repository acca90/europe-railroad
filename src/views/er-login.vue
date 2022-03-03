<template>
  <div id="bg" class="container-fluid">
    <div class="row">
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
            <h1>Precise Help</h1>
          </div>
          <div class="row">
            <p>
              <b>
                Для біженців, волонтерів та людей та організацій, зацікавлених у допомозі Україні. Будь ласка, надайте вашу інформацію, і програма потім порівняє біженців, які потребують допомоги, з волонтерами в околицях для забезпечення транспорту.
              </b>
            </p>
            <p>
              Pentru refugiați, voluntari și persoane și/sau organizații interesate să ajute la eforturile de ajutorare ucrainene. Vă rugăm să furnizați informațiile dvs., iar cererea va asocia apoi refugiații care au nevoie de asistență cu voluntari din zona înconjurătoare pentru a asigura transportul.
            </p>
            <p>
              <b>
                For refugees, volunteers and people and/or organizations interested in helping with Ukrainian relief efforts. Please provide your information and the application will then match refugees needing assistance with volunteers in the surrounding area to provide transportation.
              </b>
            </p>
          </div>
          <div class="row custom-margin">
            <div class="col-md-8 offset-md-2 col-sm-6 offset-sm-3 col-xs-12">
              <button
                  class="btn btn-large btn-primary custom-margin"
                  v-on:click="logOnFacebook"
              >
                <i class="fa fa-facebook"></i>
                LOG IN WITH FACEBOOK
              </button>

<!--              <button class="btn btn-large btn-danger custom-margin">-->
<!--                <i class="fa fa-google"></i>-->
<!--                LOG IN WITH GOOGLE-->
<!--              </button>-->
<!--              <button class="btn btn-large btn-dark custom-margin">-->
<!--                <i class="fa fa-apple"></i>-->
<!--                LOG IN WITH APPLE-->
<!--              </button>-->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "er-login",
  data() {
    return {
      isLogged: false,
    };
  },
  methods: {
    ...mapActions(["login", "logout"]),
    logOnFacebook() {
      this.auth.facebook(this.facebookHandler);
    },
    facebookHandler(errorResp, successResp) {
      if (errorResp) {
        this.errorHandler(errorResp);
      } else {
        this.successHandler(successResp);
      }
    },
    errorHandler(resp) {
      console.error(resp);
      this.logout().then(() => this.$router.push("/login"));
    },
    successHandler(resp) {
      this.login(resp.accessToken).then(() => this.$router.push("/"));
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
  margin: 5px;
}
p {
  text-align: justify;
}
</style>
