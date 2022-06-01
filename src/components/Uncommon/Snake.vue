<script setup lang="ts">
import { onBeforeMount, onMounted, ref, } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)
const score = ref(0)
const level = ref(0)

class Food {
  element: HTMLElement
  constructor() {
    this.element = document.getElementById('food')!
  }


  public get X(): number {
    return this.element.offsetLeft
  }


  public get Y(): number {
    return this.element.offsetTop
  }

  change() {
    let X: number = Math.round(Math.random() * 29) * 10
    let Y: number = Math.round(Math.random() * 29) * 10

    this.element.style.left = X.toString() + "px"
    this.element.style.top = Y.toString() + "px"
  }
}


class score_panel {
  element: HTMLElement
  last: number
  head: HTMLElement
  constructor() {
    this.element = document.getElementById('snake')!
    this.last = this.element.getElementsByTagName('div').length
    this.head = this.element.getElementsByTagName('div')[0]
  }


  public get X(): number {
    return this.head.offsetLeft
  }


  public get Y(): number {
    return this.head.offsetTop
  }


  public set Left(v: number) {
    this.head.style.left = v.toString() + "px";
    
  }


  public set Top(v: number) {
    this.head.style.top = v.toString() + "px"
  }



  keydown(food:Food) {
    let than = this
    window.onkeydown = function (e) {
      // than.Left = than.X + 10
      // than.Top = than.Y + 10
      e.keyCode == 65 ? than.Left = than.X - 10 
      : e.keyCode == 87 ? than.Top = than.Y - 10 
      :e.keyCode == 68 ? than.Left = than.X + 10
      :e.keyCode == 83 ? than.Top = than.Y + 10 : null

      if (than.X == food.X && than.Y == food.Y) {
        than.cet()
        food.change()
      }
    }
  }

  cet(){
    let div:HTMLElement = document.createElement('div')
    
    this.element.appendChild(div)
    score.value = score.value + 1
    if (score.value > 10) {
      level.value = level.value + 1
    }

  }
}

onMounted(
  () => {

    let food = new Food()
    let keys = new score_panel()
    food.change()
    console.log(keys.keydown(food))
  }
)







</script>

<template>
  <h1>{{ msg }}</h1>
  <!--  -->
  <div id="main">
    <div id="stage">
      <div id="snake">
        <div></div>
      </div>
      <div id="food"></div>
    </div>
    <div id="score_panel">
      <div id="score">
        SCORE:
        <span>{{ score }}</span>
      </div>
      <div id="level">
        Level:
        <span>{{ level }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
// less 语法 设置变量
@bgOne-color: #42b983;
@bgTwo-color: #b7d4a8;

#main {
  width: 360px;
  height: 420px;
  background-color: @bgOne-color;
  border-radius: 20px;
  border: black solid 10px;
  margin: 100px auto;
}

#stage {
  width: 310px;
  height: 310px;
  background-color: @bgTwo-color;
  border: black solid 3px;
  margin: 20px auto 0 auto;
  position: relative;

  #snake {
    & > div {
      width: 10px;
      height: 10px;
      background-color: black;
      border: solid 1px @bgTwo-color;
      position: absolute;
    }
  }

  #food {
    width: 10px;
    height: 10px;
    background-color: black;
    border: solid 1px @bgTwo-color;
    border-radius: 50%;
    position: absolute;

    left: 20px;
    top: 50px;
  }
}

#score_panel {
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
  font-weight: bolder;
  color: black;
  font-size: 20px;
}

#score {
  display: flex;
}

#level {
  display: flex;
}

a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
