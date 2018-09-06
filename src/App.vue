<template>
  <div id="app">
    <div class="container">
      <div class="row">
        <div class="col-4">
          <router-link to="/">Home</router-link> |
          <router-link to="/about">About</router-link>
        </div>
        <div class="col-8">
          <router-view/>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
