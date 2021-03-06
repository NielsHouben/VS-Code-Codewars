<template>
  <div class="container">
    <div @click="showContent = !showContent" :class="this.color">
      <div class="triangle" :class="!showContent ? 'arrowDown' : ''"></div>
      <h3 class="title">
        <slot name="title"></slot>
      </h3>
    </div>
    <div v-show="showContent">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "result",
  props: ["color", "initialShowContent"],
  data() {
    return {
      showContent: this.initialShowContent,
    };
  },
  created() {
    // console.log(this.showContent);
    // if (this.initialShowContent) {
    //   console.log(this.initialShowContent);
    // }
  },
  watch: {},
  mounted() {},
  methods: {},
};
</script>

<style>
.container {
  border: 2px solid;
  margin: 10px;
  padding: 10px;
  text-align: left;
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
