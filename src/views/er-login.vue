<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-2 offset-md-5 text-center">
        <slot name="flag"></slot>
      </div>
    </div>
    <div class="row">
      <div class="card col-md-8 offset-md-2 col-sm-8 offset-sm-2 col-xs-12">
        <div class="card-body">

          A platform to help you on find a way out from this war

        </div>
      </div>
    </div>
    <div class="row custom-margin">
      <div class="col-md-8 offset-md-2 col-sm-6 offset-sm-3 col-xs-12">

        <button class="btn btn-large btn-primary custom-margin" v-on:click="auth.facebook()">
          <i class="fa fa-facebook"></i>
          LOG IN WITH FACEBOOK
        </button>

        <button class="btn btn-large btn-danger custom-margin">
          <i class="fa fa-google"></i>
          LOG IN WITH GOOGLE
        </button>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "er-login",
  data() {
    return {
      isLogged: false,
    }
  }
}
</script>

<style scoped>
.flag {
  width: 100px;
  height: unset;
  border-radius: unset;
  margin-bottom: 50px;
}
button.custom-margin {
  margin: 5px;
}
div.custom-margin {
  margin: 5px;
}
</style>
