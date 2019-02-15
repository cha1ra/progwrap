<template>
  <v-layout>
    <v-flex text-xs-center>
      <p>{{ $store.state.message }}</p>
      <div class="link" @click="$store.dispatch('doit')" @click.shift="$store.commit('reset')">
        <a>clicked!: {{ $store.state.counter }}</a>
      </div>
      <img src="/v.png" alt="Vuetify.js" class="mb-5">
      <blockquote class="blockquote">&#8220;First, solve the problem. Then, write the code.&#8221;
        <footer>
          <small>
            <em>&mdash;John Johnson</em>
          </small>
        </footer>
      </blockquote>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data: function() {
    return {
      title: 'Hello',
      message: 'this is message.'
    }
  }
}
</script>
