<template>
  <div :style="{ '--lines': this.lines }">
    <!-- <style>
      :root {
        --lines: {{ lines }};
      }
    </style> -->
    <div class="container" :class="`border${this.color} `">
      <div @click="showContent = !showContent" :class="this.color">
        <div class="triangle" :class="!showContent ? 'arrowDown' : ''"></div>
        <h3 class="title">
          <slot name="title"></slot>
        </h3>
      </div>
      <transition name="slide-fade">
        <div v-show="showContent">
          <!-- :class="{ active: showContent }" -->
          <!-- @mouseover="prevent = true" @mouseleave="prevent = false" -->
          <!-- <p>hej jag försvinner</p> -->
          <div>
            <slot name="content"></slot>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: "result",
  props: ["logs", "color", "initialShowContent"],
  data() {
    return {
      showContent: this.initialShowContent,
      prevent: false,
      // lines: "-54px",
      lines: `-${18 * this.logs}px`,
    };
  },
  created() {
    // console.log(this.showContent);
    // if (this.initialShowContent) {
    //   console.log(this.initialShowContent);
    // }
    console.log(this.$children);
    // console.log(this.$slots.title);
    // console.log(this.$slots.content);
  },
  watch: {
    prevent: function (value) {
      console.log(this.$slots.title);
      console.log(value);
    },
  },
  mounted() {},
  methods: {},
};
</script>

<style>
/* MAKE ONE TRANSITION FOR MOVE AND ONE FOR SLIDDE, ONLY APPLY SLIDE (IN TEMPLATE) IF LOGS IS PRESENT  */

/* :root {
  --lines: -18px;
} */
/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all 0.3s;
  /* opacity: 0; */
  /* transition: opacity 0.5s; */
}
.slide-fade-leave-active {
  /* opacity: 0; */
  transition: all 0.3s; /*cubic-bezier(1, 0.5, 0.8, 0.7)*/
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  /* --lines: -18px; */
  opacity: 0;
  /* transform: translateY(-100%); */
  /* margin-top: calc(-16px + var(--lines)); 16, 18 */
  /* margin-top: -16px; */
  margin-top: calc(-16px + var(--lines));
  /* margin-top: -70px; */
  /* transform: translateY(-60%); */
  /* opacity: 0; */
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transition: all 0.1s;
}

.list-enter,
.list-leave-to {
  visibility: hidden;
  height: 0;
  margin: 0;
  padding: 0;
  opacity: 0;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.3s;
}
/* .content {
  opacity: 0;
  height: 0;
  transition: opacity 0.3s, height 0.3s 0.1s;
}
.active .content {
  opacity: 1;
  height: auto;
  transition: opacity 0.3s 0.1s, height 0.3s;
} */

.container {
  border: 2px solid;
  border-radius: 20px;
  /* border-color: red; */
  margin: 10px;
  padding: 10px;
  text-align: left;
}
.borderred {
  border-color: rgb(230, 0, 0);
}
.bordergreen {
  border-color: rgb(0, 200, 0);
}
.title {
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;

  /*
     Introduced in IE 10.
     See http://ie.microsoft.com/testdrive/HTML5/msUserSelect/
   */
  -ms-user-select: none;
  user-select: none;
}
.red {
  color: rgb(230, 0, 0);
}
.green {
  color: rgb(0, 200, 0);
}
.triangle {
  float: left;
  margin: 1px;
  margin-right: 10px;
  /* background-color: black; */
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;

  border-left: 20px solid;
  transform: rotate(90deg);
  transition: all 0.2s ease-in-out;
}
.arrowDown {
  transform: rotate(0deg);
}
</style>
