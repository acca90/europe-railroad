<template>
  <div>
    <div class="header">
      <h2>{{ txt.support }}</h2>
    </div>

    <form class="row form was-validated">
      <div class="col-md-3"></div>
      <div class="col-md-6">
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
  data() {
    return {
      txt: {
        email: "електронна пошта",
        name: "ім'я",
        subject: "предмет",
        description: "опис",
        submit: "відправити",
        support: "підтримка",
        postError: "Щось пішло не так",
        postSuccess: "Успіх, форма надіслана",
        formAlert: "You must fill all fields",
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
      let alertPlaceholder = document.getElementById("liveAlertPlaceholder");
      let wrapper = document.createElement("div");
      wrapper.innerHTML =
        '<div class="alert alert-' +
        type +
        ' alert-dismissible" role="alert">' +
        message +
        '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';

      alertPlaceholder.append(wrapper);
    },
    sendForm() {
      const successOP = (resp) => {
        this.alert(this.txt.postSuccess, "success");
      };
      const failOP = (resp) => {
        this.alert(this.txt.postError, "danger");
      };
      this.$axios
        .post(
          "https://sc-ukraine.baba.ndmglobal.com/api/execute/email-support",
          this.form
        )
        .then(successOP, failOP);
    },
    validate() {
      if (
        this.form.email ||
        this.form.name ||
        this.form.description ||
        this.form.subject
      ) {
        this.sendForm();
      } else {
        this.alert(this.txt.formAlert, "alert");
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
