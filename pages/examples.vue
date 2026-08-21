<template>
  <div class="max-w-5xl mx-auto px-4 py-10">
    <h1 class="text-3xl font-bold mb-2">JSON 示例库</h1>
    <p class="text-gray-500 dark:text-gray-400 mb-8">各场景 JSON 样例，点击即可复制到格式化工具。</p>

    <div class="grid md:grid-cols-2 gap-4">
      <div v-for="ex in examples" :key="ex.title" class="rounded-xl border border-jsonborder overflow-hidden">
        <div class="flex items-center justify-between px-4 py-2 border-b border-jsonborder bg-gray-50 dark:bg-white/5">
          <span class="font-medium text-sm">{{ ex.title }}</span>
          <el-button size="small" @click="use(ex.content)">复制</el-button>
        </div>
        <pre class="p-3 font-mono text-xs overflow-auto max-h-48"><code>{{ ex.content }}</code></pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const examples = [
  {
    title: 'API 响应（分页列表）',
    content: `{
  "code": 0,
  "message": "ok",
  "data": {
    "list": [
      { "id": 1, "name": "foo", "active": true },
      { "id": 2, "name": "bar", "active": false }
    ],
    "total": 2,
    "page": 1,
    "pageSize": 10
  }
}`
  },
  {
    title: '嵌套配置文件',
    content: `{
  "app": {
    "name": "my-app",
    "port": 8080,
    "database": {
      "host": "localhost",
      "port": 5432,
      "pool": { "min": 2, "max": 10 }
    }
  },
  "logging": ["info", "warn", "error"]
}`
  },
  {
    title: '数组 of 对象',
    content: `[
  { "type": "doc", "id": 101, "tags": ["a", "b"] },
  { "type": "img", "id": 102, "url": "https://example.com/x.png" },
  { "type": "note", "id": 103, "text": "hello" }
]`
  },
  {
    title: 'GeoJSON Feature',
    content: `{
  "type": "Feature",
  "geometry": {
    "type": "Point",
    "coordinates": [125.6, 10.1]
  },
  "properties": {
    "name": "Dinagat Islands"
  }
}`
  },
  {
    title: '用户档案',
    content: `{
  "userId": "u_001",
  "profile": {
    "name": "张三",
    "age": 28,
    "address": { "city": "北京", "zip": "100000" }
  },
  "hobbies": ["reading", "coding"],
  "verified": true
}`
  },
  {
    title: '商品（电商）',
    content: `{
  "sku": "SKU-9923",
  "title": "无线耳机",
  "price": 199.00,
  "currency": "CNY",
  "stock": 150,
  "attributes": { "color": "black", "bluetooth": "5.2" },
  "images": ["1.jpg", "2.jpg"]
}`
  }
]

const use = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
    useState<string>('home-input').value = text
    ElMessage.success('已复制，正在跳转格式化工具')
    navigateTo('/format')
  } catch { /* ignore */ }
}

useSeo({
  title: 'JSON 示例库 - JSONDog',
  description: 'API 响应、配置文件、GeoJSON、电商商品等各场景 JSON 示例，可直接复制使用。',
  path: '/examples'
})
</script>