export interface ToolMeta {
  id: string
  name: string
  nameEn: string
  desc: string
  descEn: string
  path: string
  category: 'core' | 'convert' | 'codegen' | 'advanced'
  icon: string
  soon?: boolean
}

export const useTools = () => {
  const tools: ToolMeta[] = [
    {
      id: 'format', name: 'JSON 格式化', nameEn: 'JSON Formatter',
      desc: '美化、缩进 JSON，支持 2/4/Tab 空格',
      descEn: 'Beautify and indent JSON',
      path: '/format', category: 'core', icon: 'mdi:format-align-left'
    },
    {
      id: 'minify', name: 'JSON 压缩', nameEn: 'JSON Minifier',
      desc: '去除空白，压缩为单行',
      descEn: 'Remove whitespace, minify to one line',
      path: '/minify', category: 'core', icon: 'mdi:compress'
    },
    {
      id: 'validate', name: 'JSON 校验', nameEn: 'JSON Validator',
      desc: '检查 JSON 语法，报告错误行号与修复建议',
      descEn: 'Check JSON syntax with error location and fix hints',
      path: '/validate', category: 'core', icon: 'mdi:check-circle-outline'
    },
    {
      id: 'tree', name: 'JSON 树查看器', nameEn: 'JSON Tree Viewer',
      desc: '可折叠树形查看，支持搜索与路径复制',
      descEn: 'Collapsible tree view with search and path copy',
      path: '/tree', category: 'core', icon: 'mdi:file-tree-outline'
    },
    {
      id: 'editor', name: 'JSON 编辑器', nameEn: 'JSON Editor',
      desc: '语法高亮、行号、实时校验',
      descEn: 'Syntax highlighting, line numbers, live validation',
      path: '/editor', category: 'core', icon: 'mdi:code-braces'
    },
    {
      id: 'yaml', name: 'JSON 转 YAML', nameEn: 'JSON to YAML',
      desc: 'JSON 与 YAML 双向转换',
      descEn: 'Convert JSON to YAML and back',
      path: '/convert/yaml', category: 'convert', icon: 'mdi:swap-horizontal'
    },
    {
      id: 'xml', name: 'JSON 转 XML', nameEn: 'JSON to XML',
      desc: 'JSON 与 XML 双向转换',
      descEn: 'Convert JSON to XML and back',
      path: '/convert/xml', category: 'convert', icon: 'mdi:swap-horizontal'
    },
    {
      id: 'csv', name: 'JSON 转 CSV', nameEn: 'JSON to CSV',
      desc: 'JSON 与 CSV 双向转换',
      descEn: 'Convert JSON to CSV and back',
      path: '/convert/csv', category: 'convert', icon: 'mdi:swap-horizontal'
    },
    {
      id: 'jsonpath', name: 'JSONPath 查询', nameEn: 'JSONPath Tester',
      desc: '用 JSONPath 表达式查询 JSON',
      descEn: 'Query JSON with JSONPath expressions',
      path: '/jsonpath', category: 'core', icon: 'mdi:search-web'
    },
    {
      id: 'typescript', name: 'JSON 转 TypeScript', nameEn: 'JSON to TypeScript',
      desc: '生成 TypeScript interface / type',
      descEn: 'Generate TypeScript interfaces',
      path: '/codegen/typescript', category: 'codegen', icon: 'mdi:language-typescript'
    },
    {
      id: 'go', name: 'JSON 转 Go', nameEn: 'JSON to Go',
      desc: '生成 Go struct 结构体',
      descEn: 'Generate Go structs',
      path: '/codegen/go', category: 'codegen', icon: 'mdi:language-go'
    },
    {
      id: 'java', name: 'JSON 转 Java', nameEn: 'JSON to Java',
      desc: '生成 Java POJO 类',
      descEn: 'Generate Java POJO classes',
      path: '/codegen/java', category: 'codegen', icon: 'mdi:language-java'
    },
    {
      id: 'csharp', name: 'JSON 转 C#', nameEn: 'JSON to C#',
      desc: '生成 C# class 类',
      descEn: 'Generate C# classes',
      path: '/codegen/csharp', category: 'codegen', icon: 'mdi:language-csharp'
    },
    {
      id: 'python', name: 'JSON 转 Python', nameEn: 'JSON to Python',
      desc: '生成 Python dataclass',
      descEn: 'Generate Python dataclasses',
      path: '/codegen/python', category: 'codegen', icon: 'mdi:language-python'
    },
    {
      id: 'sql', name: 'JSON 转 SQL', nameEn: 'JSON to SQL',
      desc: '生成建表 SQL 语句',
      descEn: 'Generate SQL CREATE TABLE',
      path: '/codegen/sql', category: 'codegen', icon: 'mdi:database'
    },
    {
      id: 'mybatis', name: 'JSON 转 MyBatis', nameEn: 'JSON to MyBatis',
      desc: '生成 MyBatis Mapper XML',
      descEn: 'Generate MyBatis Mapper XML',
      path: '/codegen/mybatis', category: 'codegen', icon: 'mdi:xml'
    },
    {
      id: 'diff', name: 'JSON 对比', nameEn: 'JSON Diff',
      desc: '对比两段 JSON 的差异',
      descEn: 'Compare two JSON documents',
      path: '/diff', category: 'advanced', icon: 'mdi:file-compare'
    },
    {
      id: 'schema', name: 'JSON Schema', nameEn: 'JSON Schema',
      desc: '生成与校验 JSON Schema',
      descEn: 'Generate and validate JSON Schema',
      path: '/schema', category: 'advanced', icon: 'mdi:shield-check-outline'
    },
    {
      id: 'mock', name: 'JSON Mock 生成', nameEn: 'JSON Mock Generator',
      desc: '按样本结构生成随机假数据',
      descEn: 'Generate random mock data from sample',
      path: '/mock', category: 'advanced', icon: 'mdi:shuffle-variant'
    },
    {
      id: 'flatten', name: 'JSON 扁平化', nameEn: 'JSON Flatten',
      desc: '嵌套对象扁平化与反扁平化',
      descEn: 'Flatten and unflatten nested objects',
      path: '/flatten', category: 'advanced', icon: 'mdi:arrow-collapse-all'
    },
    {
      id: 'transform', name: 'JSON 键排序', nameEn: 'JSON Sort Keys',
      desc: '按键名升序或降序递归排序',
      descEn: 'Recursively sort object keys',
      path: '/transform', category: 'advanced', icon: 'mdi:sort-alphabetical-variant'
    },
    {
      id: 'visualize', name: 'JSON 可视化', nameEn: 'JSON Visualizer',
      desc: '统计键数、类型分布、嵌套深度',
      descEn: 'Analyze keys, types and depth',
      path: '/visualize', category: 'advanced', icon: 'mdi:chart-bar'
    },
    {
      id: 'encode', name: 'JSON 编解码', nameEn: 'JSON Encode',
      desc: 'Base64 与 URL 编码解码',
      descEn: 'Base64 and URL encode/decode',
      path: '/encode', category: 'advanced', icon: 'mdi:lock-outline'
    }
  ]

  const available = computed(() => tools.filter(t => !t.soon))
  const byCategory = (cat: ToolMeta['category']) => tools.filter(t => t.category === cat)

  return { tools, available, byCategory }
}