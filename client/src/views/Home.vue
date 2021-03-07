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
                <span slot="content">{{ test.log }}</span>
              </Collapsable>

              <!-- v-for="idx in testType.items.length" :key="idx.id" -->
              <!-- {{ idx }} {{ testType.items[2] }} -->
              <!-- <p>
                {{ idx - 1 }}
                {{ testType.items[idx - 1].v }}
              </p>
              <p>
                {{ idx }}
                {{ testType.items[idx].v }}
              </p> -->
              <!-- <div v-if="testType.items[2].t === 'log'">
                <div v-if="idx % 2 == 0">
                  <p>
                    {{ idx - 1 }}
                    {{ testType.items[idx - 1].v }}
                  </p>
                  <p>
                    {{ idx }}
                    {{ testType.items[idx].v }}
                  </p>
                  <Collapsable
                    slot="content"
                    :color="testType.items[idx - 1].v === 'Test Passed' ? 'green' : 'red'"
                    initialShowContent="true"
                  >
                    <span slot="title">{{ testType.items[idx - 1].v }}</span>
                    <span slot="content">{{ testType.items[idx].v }}</span>
                  </Collapsable>
                  <br />
                </div>
              </div>
              <div v-else>NO LOGS</div> -->
            </div>
            <!-- <Collapsable slot="content" color="red" initialShowContent="true">
              <span slot="title">Test Failed</span>
              <span slot="content">hulken dålig</span>
            </Collapsable> -->
          </Collapsable>
        </div>
        <!-- <Collapsable initialShowContent="true" :color="'black'">
          <span slot="title">Basic Tests</span>
          <Collapsable slot="content" color="red" initialShowContent="true">
            <span slot="title">Test Failed</span>
            <span slot="content">hulken dålig</span>
          </Collapsable>
          <Collapsable slot="content" color="green" initialShowContent="true">
            <span slot="title">Test Successfull</span>
            <span slot="content">hulken bra</span>
          </Collapsable>
        </Collapsable> -->
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

<style></style>
