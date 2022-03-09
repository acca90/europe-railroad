<template>
  <div class="col-12">
    <div class="header">
      <h2>{{ txt.header }}</h2>
    </div>
    <div class="row form">
      <div class="col-md-3"></div>
      <div class="col-md-6">
        <div>
          <img :src="user.picture" class="rounded-circle"/>
          <div class="card-body">
            <h4 class="card-title">{{ user.name }}</h4>
          </div>
        </div>
      </div>
      <div class="col-md-3"></div>
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
.header {
  padding-top: 2rem;
}
</style>
