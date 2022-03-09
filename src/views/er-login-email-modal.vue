<template>
    <div class="modal static fade"
         id="staticBackdrop"
         tabindex="-1"
         data-bs-backdrop="static"
         aria-labelledby="exampleModalLabel"
         aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ txt.headerText }}</h5>
            <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                v-on:click="resetModal"
            ></button>
          </div>

          <!--   Body & footer for SignUp        -->
          <div class="modal-body" v-if="!signUp">
            <div class="container">
              <form class="text-left">
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label"
                  >{{ txt.email }}</label
                  >
                  <input
                      type="email"
                      class="form-control"
                      id="exampleInputEmail1"
                      placeholder="your@email.com"
                      aria-describedby="emailHelp"
                  />
                </div>
                <div class="mb-3" v-if="forgotpass && !loading">
                  <button type="submit" class="btn btn-primary" v-on:click.prevent="sendForgotPasswordEmail">
                    <i class="fa fa-sign-in"></i>
                    {{ txt.sendMail }}
                  </button>
                </div>
                <div class="mb-3" v-if="!forgotpass && !loading">
                  <label for="exampleInputPassword1" class="form-label"
                  >{{ txt.password }}</label
                  >
                  <input
                      type="password"
                      class="form-control"
                      id="exampleInputPassword1"
                  />
                  <a href="" v-on:click.prevent="forgotpass = true"
                  >{{ txt.forgotPass }}</a
                  >
                </div>
                <div v-if="loading" style="text-align: center;">
                  <i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer" v-if="!signUp">
            <button type="submit" class="btn btn-primary" >
              <i class="fa fa-sign-in"></i>
              {{ txt.signIn }}
            </button>

            <button type="submit" class="btn btn-secondary" v-on:click="signUpForm" >
              <i class="fa fa-user-plus"></i>
              {{ txt.signUp }}
            </button>

            <button
                type="button"
                class="btn btn-danger"
                data-bs-dismiss="modal"
                v-on:click="resetModal"
            >
              <i class="fa fa-remove"></i>
              {{ txt.close }}
            </button>
          </div>

          <!--  Body & footer for SignUp        -->
          <div class="modal-body" v-if="signUp">
            <div class="container">
              <form class="text-left">
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label"
                  >{{ txt.email }}</label
                  >
                  <input
                      type="email"
                      class="form-control"
                      id="exampleInputEmail1"
                      placeholder="your@email.com"
                      aria-describedby="emailHelp"
                      v-model="formSignUp.email"
                  />
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label">{{ txt.password }}</label>
                  <input type="password" class="form-control" id="inputPassword" v-model="formSignUp.password">
                </div>
                <div class="mb-3">
                  <label for="firstName" class="form-label">{{ txt.firstName }}</label>
                  <input type="text" class="form-control" id="inputFirstName" v-model="formSignUp.firstName">
                </div>
                <div class="mb-3">
                  <label for="lastName" class="form-label">{{ txt.lastName }}</label>
                  <input type="text" class="form-control" id="inputLastName" v-model="formSignUp.lastName">
                </div>

                <div class="mb-3 form-check">
                  <input class="form-check-input" type="checkbox" v-model="checkbox">
                  <label class="form-check-label" for="flexCheckChecked">
                    {{ txt.checkbox }}
                  </label>
                </div>

                <div class="mb-3">
                  <div v-if="error" class="alert" :class="alert_class" role="alert">
                    <i class="fa fa-warning"></i>
                    {{ error }}
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div class="modal-footer" v-if="signUp">
            <button type="submit" class="btn btn-secondary" v-on:click="cleanSignUpForm">
              <i class="fa fa-sign-in"></i>
              {{ txt.back }}
            </button>
             <button type="submit" class="btn btn-primary" v-on:click="submitForm">
              <i class="fa fa-sign-in"></i>
              {{ txt.submit }}
            </button>
          </div>


        </div>
      </div>

    </div>
</template>

<script>
import {mapActions, mapState} from 'vuex';
export default {
  name: "er-login-email",
  data() {
    return {
      isLogged: false,
      forgotpass: false,
      loading: false,
      emailSentAlert: "",
      signIn: false,
      signUp: false,
      txt: {
        headerText: "Login with email",
        email: "Email address",
        sendMail: "Send email",
        password: "Password",
        forgotPass: "Forgot your password?",
        signIn: "Sign In",
        signUp: "Sign Up",
        close: "Close",
        firstName: "First Name",
        lastName: "Last Name",
        checkbox: "I'm over 18 years old.",
        back: "Back",
        submit: "Submit",
        formAlert: "You must fill in all the fields",
      },
      formSignUp: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      },
      checkbox: false,
      error: "",
    };
  },
  methods: {
    forgotPass() {
      this.forgotpass = !this.forgotpass;
    },
    sendForgotPasswordEmail() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;

        this.resetModal()
      }, 2.0*1000);
    },
    resetModal() {
      this.isLogged = false;
      this.forgotpass = false;
      this.cleanSignUpForm();
    },
    submitForm() {
       if (
        this.formSignUp.firstName &&
        this.formSignUp.lastName &&
        this.formSignUp.email &&
        this.formSignUp.password &&
        this.checkbox
      ) {
        alert("submitted")
      } else {
        this.alert(this.txt.formAlert, "alert-warning");
      }
    },
    alert(message, type) {
      this.alert_class = type;
      this.error = message;
    },
    signUpForm() {
      this.signUp = true;
      this.txt.headerText = "Sign up Form";
    },
    cleanSignUpForm() {
      this.txt.headerText = "Login with email";
      this.formSignUp = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      }
      this.signUp = false;
      this.checkbox = false;
      this.error = "";
    },
  }
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
