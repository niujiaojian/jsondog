<template>
  <div class="max-w-4xl mx-auto px-4 py-10">
    <h1 class="text-3xl font-bold mb-2">JSON 语法速查表</h1>
    <p class="text-gray-500 dark:text-gray-400 mb-8">JSON 核心语法、类型与规则一览。</p>

    <section v-for="s in sections" :key="s.title" class="mb-8">
      <h2 class="text-xl font-semibold mb-3 text-jsonblue">{{ s.title }}</h2>
      <div class="rounded-lg border border-jsonborder overflow-hidden">
        <table class="w-full text-sm">
          <thead class="bg-gray-100 dark:bg-white/5">
            <tr><th class="text-left p-2 font-medium">项</th><th class="text-left p-2 font-medium">说明</th><th class="text-left p-2 font-medium">示例</th></tr>
          </thead>
          <tbody>
            <tr v-for="row in s.rows" :key="row[0]" class="border-t border-jsonborder">
              <td class="p-2 font-mono text-jsonblue align-top">{{ row[0] }}</td>
              <td class="p-2 align-top">{{ row[1] }}</td>
              <td class="p-2 font-mono text-green-500 align-top">{{ row[2] }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="mt-8">
      <h2 class="text-xl font-semibold mb-3 text-jsonblue">完整示例</h2>
      <pre class="rounded-lg border border-jsonborder p-4 font-mono text-sm overflow-auto"><code>{{ example }}</code></pre>
    </section>
  </div>
</template>

<script setup lang="ts">
const sections = [
  {
    title: '数据类型',
    rows: [
      ['string', '字符串，必须用双引号', '"hello"'],
      ['number', '数字，整数或浮点', '42 / 3.14'],
      ['boolean', '布尔值', 'true / false'],
      ['null', '空值', 'null'],
      ['object', '对象，键值对集合', '{"k":"v"}'],
      ['array', '数组，有序列表', '[1, 2, 3]']
    ]
  },
  {
    title: '语法规则',
    rows: [
      ['双引号', '字符串与键名必须用双引号', '"key"'],
      ['逗号', '元素间用逗号分隔', '1, 2, 3'],
      ['冒号', '键值间用冒号', '"k": 1'],
      ['花括号', '对象用 {}', '{"a":1}'],
      ['方括号', '数组用 []', '[1,2]'],
      ['无尾逗号', '最后一个元素后不能有逗号', '"a":1']
    ]
  },
  {
    title: '转义字符',
    rows: [
      ['\\"', '双引号', '"say \\"hi\\""'],
      ['\\\\', '反斜杠', '"C:\\\\path"'],
      ['\\n', '换行', '"line1\\nline2"'],
      ['\\t', '制表符', '"a\\tb"'],
      ['\\uXXXX', 'Unicode', '"\\u4e2d"']
    ]
  }
]

const example = `{
  "name": "JSONDog",
  "version": "0.1.0",
  "openSource": true,
  "tools": ["format", "validate", "tree"],
  "config": {
    "indent": 2,
    "maxSize": null
  }
}`

useSeo({
  title: 'JSON 语法速查表 - JSONDog',
  description: 'JSON 数据类型、语法规则、转义字符速查表，快速查阅 JSON 核心语法。',
  path: '/cheatsheet'
})
</script>