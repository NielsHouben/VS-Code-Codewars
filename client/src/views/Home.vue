<template>
  <div class="home">
    <div v-show="failed || passed">
      <h3>failed: {{ failed }}</h3>
      <h3>passed: {{ passed }}</h3>
    </div>
    <div>
      <div>
        <!-- <div v-for> -->
        <div v-for="testType in results" :key="testType.id">
          <!-- {{ results }} -->
          <Collapsable initialShowContent="true" :color="'black'">
            <span slot="title">{{ testType.title }}</span>
            <!-- <p slot="content">{{ testType }}</p> -->
            <div v-for="test in testType.tests" :key="test.id" slot="content">
              <Collapsable
                slot="content"
                :color="test.passed ? 'green' : 'red'"
                :initialShowContent="!test.passed"
              >
                <span slot="title">{{ test.evaluation }}</span>
                <pre class="content" slot="content">{{ test.log }}</pre>
              </Collapsable>
            </div>
          </Collapsable>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const util = require("util");
function log(stuff) {
  console.log(util.inspect(stuff, false, null, true));
}
log("initiated");
// @ is an alias to /src
import io from "socket.io-client";
import Collapsable from "@/components/collapsable.vue";

export default {
  name: "Home",
  components: {
    Collapsable,
  },
  data() {
    return {
      failed: 0,
      passed: 0,
      results: [],
    };
  },
  created() {
    this.socket = io("http://localhost:3000", { transport: ["websocket"] });
  },
  mounted() {
    this.socket.on("outData", (data) => {
      console.log(data);
      this.failed = data.result.assertions.failed;
      this.passed = data.result.assertions.passed;
      this.results = [];
      for (let idx = 0; idx < data.result.output.length; idx++) {
        // console.log(
        //   "REEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE"
        // );
        let testType = {};
        let element = data.result.output[idx];
        testType.title = element.v;
        testType.tests = [];
        for (let i = 0; i < element.items.length - 1; i += 1) {
          if (element.items[i].t != "log") {
            let test = {};
            test.evaluation = element.items[i].v;
            if (element.items[i - 1] && element.items[i - 1].t == "log") {
              test.log = element.items[i - 1].v;
            }
            if (test.evaluation == "Test Passed") test.passed = true;
            testType.tests.push(test);
          }
        }
        this.results.push(testType);
      }
    });
    this.socket.on("test", (data) => {
      console.log(data);
    });
  },
  methods: {},
};
</script>

<style>
.content {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #000811;
}
</style>
