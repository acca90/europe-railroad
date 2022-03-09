<template>
  <div class="container">

    <div class="card mt-4 col-md-4 offset-md-4">
      <div class="card-header">
        <img :src="user.picture" class="rounded-circle"/>
        <h2>
          {{ user.name }}
        </h2>
      </div>
      <div class="card-body">
        <h5>{{ txt.linkit }}</h5>

        <button type="button" class="btn btn-dark">
          <i class="fa fa-apple"></i>
        </button>

        <button type="button" class="btn btn-danger">
          <i class="fa fa-google"></i>
        </button>

        <button type="button" class="btn btn-primary">
          <i class="fa fa-facebook"></i>
        </button>

      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "er-profile.vue",
  components: {},
  data() {
    return {
      txt: {
        header: "Profile",
        linkit: "Link your social networks",
      },
      user: {
        name: "",
        picture: "",
      },
    };
  },
  methods: {},
  mounted() {
    const allCookies = document.cookie;
    const cookiMap = {};
    allCookies.split(";").forEach((cookie) => {
      const cookiePair = cookie.split("=");
      if (cookiePair.length) {
        const key = cookiePair[0] || "";
        const value = cookiePair[1] || "";
        cookiMap[key.trim()] = value.trim();
      }
    });
    this.user.name = cookiMap.givenName;
    this.user.picture = decodeURIComponent(
      escape(window.atob(cookiMap.picture))
    );
  },
};
</script>

<style scoped>
img {
  height: 100px;
}

.card img {
  margin-top: 15px;
  margin-bottom: 15px;
}
.card .card-body {
  background: white;
}
button {
  margin: 5px;
  width: 50px;
}
</style>
