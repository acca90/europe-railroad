<template>
  <div>
    <div class="header">
      <h4>{{ txt.support }}</h4>
    </div>

    <form class="row form-control needs-validation">
      <div class="col-md-12">
        <div>
          <label for="emailForm" class="form-label">{{ txt.email }}</label>
          <input
            type="email"
            id="emailForm"
            class="form-control"
            v-model="form.email"
            placeholder="name@example.com"
          />
        </div>

        <div>
          <label class="form-label">{{ txt.name }}</label>
          <input type="text" class="form-control" v-model="form.name" />
        </div>

        <label class="form-label">{{ txt.subject }}</label>
        <input type="text" class="form-control" v-model="form.subject" />

        <label class="form-label">{{ txt.description }}</label>
        <input type="text" class="form-control" v-model="form.description" />

        <button
          style="margin-top: 10px"
          type="submit"
          class="btn btn-primary"
          v-on:click.prevent="sendForm"
        >
          {{ txt.submit }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "er-support",
  data() {
    return {
      txt: {
        email: "Email",
        name: "Name",
        subject: "Subject",
        description: "Description",
        submit: "Submit",
        support: "Support",
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
    sendForm() {
      console.log(this.form);
    },
  },
};
</script>
<style scoped>
.form-control {
  text-align: left;
}
</style>
