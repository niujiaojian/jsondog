<template>
  <div class="max-w-3xl mx-auto px-4 py-10">
    <h1 class="text-3xl font-bold mb-4">隐私政策</h1>
    <div class="prose dark:prose-invert max-w-none">
      <p>JSONDog 高度重视你的隐私。本站是一个<strong>纯前端应用</strong>，核心承诺如下：</p>
      <h2>数据不离开浏览器</h2>
      <p>你在任何工具中输入、粘贴、上传的 JSON 内容，<strong>仅在本地浏览器内运算，不会发送到任何服务器</strong>。我们没有后端，也没有数据收集接口。</p>
      <h2>本地存储</h2>
      <p>主题偏好（深色 / 浅色）与语言选择保存在浏览器的 localStorage 中，仅用于记住你的偏好，不会上传。</p>
      <h2>统计分析</h2>
      <p>本站可能使用匿名流量统计（如 Google Analytics）了解访问情况，不涉及你处理的 JSON 内容。</p>
      <h2>开源可审计</h2>
      <p>全部源代码开源，你可自行审计确认无任何数据外传行为。</p>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({ title: '隐私政策 - JSONDog', meta: [{ name: 'description', content: 'JSONDog 隐私政策：纯前端，数据永不上传，开源可审计。' }] })
</script>