<template>
  <div class="appFooter">
    <div class="footers">
      <h3>
        <p>智慧星球</p>
        <p>ZIHUIXINGQIU</p>
      </h3>
      <ul>
        <li>联系邮箱: xxx@com</li>
        <li>QQ: 1111111111</li>
        <li>联系地址: XXX省XXX市XXX县XXX路XXX号</li>
        <li>联系电话: 000-0000000</li>
      </ul>
      <div>本站开始于2023年12月2日</div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.appFooter {
  background-color: rgb(15, 17, 29);
  .footers {
    padding: 50px 20px;
    max-width: 1200px;
    margin: 60px auto 0px;
    h3 {
      color: white;
      margin-bottom: 20px;
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      margin-bottom: 50px;
      color: rgba(148, 150, 161, 1);
      font-size: 14px;
    }
    div {
      text-align: center;
      font-size: 16px;
      color: rgba(148, 150, 161, 1);
    }
  }
}
</style>
