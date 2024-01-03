<template>
  <div class="home">
    <div class="containers"></div>
    <div class="main">
      <div class="lecturer">
        <div class="detail">
          <div class="title"><h2>金牌讲师</h2></div>
          <p>
            中国网通海尔集团 中石油 中外运 顶津食品 黑龙江省测绘局 辽宁省委党校
            黑龙江省委党校 平安 国美集团 龙煤集团 中国建设银行
            哈尔滨空中交通管理局 中国农业银行 黑龙江邮政储汇 沈阳606研究所
            哈尔滨703研究所 中国社会科学院应化所 远大购物中心
            农垦总医院长春国商集团惠普方太厨具 中国劲酒 KFC 招商银行 中保财险
            哈工大 华林佳通 蓝星石化 南方航空 中国联通 中国电信 中邮普泰
            华为集团 哈兽研 用友软件 哈药集团 贵州益佰医药集团 海洋王照明
            嵩山食品 神州数码
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.containers {
  height: 100vh;
  background-image: url("https://26823097.s61i.faiusr.com/2/AD0IuZPlDBACGAAg26rrggYoo7eSzwEwgA84zAg.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}
.main {
  max-width: 1280px;
  margin: 0 auto;
}
.lecturer {
  height: 340px;
  padding: 20px;
  margin-top: 30px;
  display: flex;
  color: white;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(97, 58, 171);
  .detail {
    width: 500px;
    .title {
      background-image: url("https://26823097.s61i.faiusr.com/4/AD0IuZPlDBAEGAAgqrTrggYo-ue3iwUwjQI4KQ.png.webp");
      background-repeat: no-repeat;
    }
    p {
      font-size: 16px;
      text-indent: 2em;
      margin-top: 18px;
    }
  }
}
</style>
