<template>
  <div class="home">
    <div v-show="failed || passed">
      <h3>failed: {{ failed }}</h3>
      <h3>passed: {{ passed }}</h3>
    </div>
    <div>
      <div>
        <h1>basic Tests</h1>
        <!-- <div v-for> -->
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import io from "socket.io-client";

export default {
  name: "Home",
  data() {
    return {
      failed: 0,
      passed: 0,
      results: [],
    };
  },
  created() {
    this.socket = io("http://localhost:5000", { transport: ["websocket"] });
  },
  mounted() {
    this.socket.on("outData", (data) => {
      this.failed = data.result.assertions.failed;
      this.passed = data.result.assertions.passed;
      console.log(data);
    });
  },
};
</script>
