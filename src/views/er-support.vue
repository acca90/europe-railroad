<template>
  <div class="col-6">
    <div class="header">
      <h2>{{ txt.support }}</h2>
    </div>

    <form class="row form">
      <div class="col-md-3"></div>
      <div class="col-md-6">
        <div v-if="error" class="alert" :class="alert_class" role="alert">
          <i class="fa fa-warning"></i>
          {{ error }}
        </div>

        <div>
          <label for="emailForm" class="form-label">{{ txt.email }}</label>
          <input
            required
            type="email"
            id="emailForm"
            class="form-control"
            v-model="form.email"
            placeholder="name@example.com"
          />
        </div>

        <div>
          <label class="form-label">{{ txt.name }}</label>
          <input
            required
            type="text"
            class="form-control"
            v-model="form.name"
          />
        </div>

        <label class="form-label">{{ txt.subject }}</label>
        <input
          required
          type="text"
          class="form-control"
          v-model="form.subject"
        />

        <label class="form-label">{{ txt.description }}</label>
        <!--text area-->
        <textarea
          required
          class="form-control"
          aria-label="With textarea"
          v-model="form.description"
          rows="5"
        >
        </textarea>

        <div id="liveAlertPlaceholder"></div>
        <button
          style="margin-top: 10px"
          type="submit"
          class="btn btn-primary"
          v-on:click.prevent="validate"
        >
          {{ txt.submit }}
        </button>
      </div>
      <div class="col-md-3"></div>
    </form>
  </div>
</template>
<script>
export default {
  name: "er-support",
  components: {},
  data() {
    return {
      error: "",
      alert_class: "",
      txt: {
        email: "електронна пошта / Email",
        name: "повне ім'я / Full Name",
        subject: "предмет / Subject",
        description: "опис / Description",
        submit: "відправити / Enviar",
        support: "підтримка / Support",
        postError: "Щось пішло не так / Something went wrong",
        postSuccess: "Успіх, форма надіслана / Success, form submitted",
        formAlert:
          "Ви повинні заповнити всі поля / You must fill in all the fields",
      },
      form: {
        email: "",
        name: "",
        subject: "",
        description: "",
      },
    };
  },
  methods: {
    alert(message, type) {
      this.alert_class = type;
      this.error = message;
    },
    sendForm() {
      const successOP = () => {
        this.alert(this.txt.postSuccess, "alert-success");
      };
      const failOP = (resp) => {
        this.alert(this.txt.postError, "alert-danger");
        console.error(resp);
      };
      this.$axios
        .post(
          "https://sc-ukraine.ndmglobal.com/api/execute/email-support",
          this.form
        )
        .then(successOP, failOP);
    },
    validate() {
      if (
        this.form.email &&
        this.form.name &&
        this.form.description &&
        this.form.subject
      ) {
        this.sendForm();
      } else {
        this.alert(this.txt.formAlert, "alert-warning");
      }
    },
  },
};
</script>
<style scoped>
.header {
  padding-top: 2rem;
}
.form {
  text-align: left;
}
</style>
