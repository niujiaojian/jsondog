export type JsonType = 'string' | 'number' | 'boolean' | 'null' | 'array' | 'object' | 'integer'

export interface CodegenOptions {
  rootName: string
  indent: number
  arrayAsText?: boolean
  useBigInt?: boolean
}

const indentStr = (n: number) => ' '.repeat(n)

export const toPascalCase = (s: string): string =>
  s.replace(/[^a-zA-Z0-9]+(.)|^(.)/g, (_, c1, c2) => (c1 || c2 || '').toUpperCase())
   .replace(/[^a-zA-Z0-9]/g, '')

export const toCamelCase = (s: string): string => {
  const p = toPascalCase(s)
  return p ? p[0].toLowerCase() + p.slice(1) : p
}

export const toSnakeCase = (s: string): string =>
  s.replace(/([A-Z])/g, '_$1').replace(/[^a-zA-Z0-9]+/g, '_').replace(/^_+|_+$/g, '').toLowerCase()

export const toKebabCase = (s: string): string => toSnakeCase(s).replace(/_/g, '-')

const inferType = (v: any): JsonType => {
  if (v === null || v === undefined) return 'null'
  if (typeof v === 'string') return 'string'
  if (typeof v === 'boolean') return 'boolean'
  if (typeof v === 'number') return Number.isInteger(v) ? 'integer' : 'number'
  if (Array.isArray(v)) return 'array'
  return 'object'
}

const arrayElementType = (arr: any[]): JsonType => {
  if (arr.length === 0) return 'null'
  const types = new Set(arr.map(inferType))
  if (types.has('number') && types.has('integer')) types.delete('integer')
  if (types.size === 1) return [...types][0] as JsonType
  return 'null'
}

const collectFields = (obj: Record<string, any>): Map<string, { type: JsonType; sample: any }> => {
  const fields = new Map<string, { type: JsonType; sample: any }>()
  for (const [k, v] of Object.entries(obj)) {
    let t = inferType(v)
    if (t === 'array' && Array.isArray(v) && v.length > 0) {
      const elemT = arrayElementType(v)
      fields.set(k, { type: `array<${elemT}>` as JsonType, sample: v[0] })
      continue
    }
    fields.set(k, { type: t, sample: v })
  }
  return fields
}

const nestedObjects = (obj: Record<string, any>): Array<{ key: string; value: Record<string, any> }> => {
  const out: Array<{ key: string; value: Record<string, any> }> = []
  for (const [k, v] of Object.entries(obj)) {
    if (v !== null && typeof v === 'object' && !Array.isArray(v)) {
      out.push({ key: k, value: v as Record<string, any> })
    } else if (Array.isArray(v) && v.length > 0 && typeof v[0] === 'object' && v[0] !== null) {
      out.push({ key: k, value: v[0] as Record<string, any> })
    }
  }
  return out
}

const sqlType = (t: JsonType, opts: CodegenOptions): string => {
  switch (t) {
    case 'string': return 'VARCHAR(255)'
    case 'integer': return opts.useBigInt ? 'BIGINT' : 'INT'
    case 'number': return 'DECIMAL(18,6)'
    case 'boolean': return 'BOOLEAN'
    case 'null': return 'TEXT'
    default:
      if (String(t).startsWith('array')) return 'TEXT'
      return 'TEXT'
  }
}

export const genTypeScript = (data: any, opts: CodegenOptions): string => {
  const lines: string[] = []
  const seen = new Set<string>()

  const emit = (name: string, obj: Record<string, any>) => {
    const pascal = toPascalCase(name)
    if (seen.has(pascal)) return
    seen.add(pascal)
    const fields = collectFields(obj)
    for (const { key, value } of nestedObjects(obj)) {
      emit(key, value)
    }
    lines.push(`interface ${pascal} {`)
    for (const [k, f] of fields) {
      const tsType = tsFieldType(f.type, k)
      lines.push(`${indentStr(opts.indent)}${k}: ${tsType};`)
    }
    lines.push('}')
    lines.push('')
  }

  const tsFieldType = (t: JsonType, key: string): string => {
    if (t === 'string') return 'string'
    if (t === 'number' || t === 'integer') return 'number'
    if (t === 'boolean') return 'boolean'
    if (t === 'null') return 'null'
    if (t === 'object') return toPascalCase(key)
    if (String(t).startsWith('array<')) {
      const inner = String(t).slice(6, -1) as JsonType
      if (inner === 'object') return `${toPascalCase(key)}[]`
      return `${tsFieldType(inner, key)}[]`
    }
    return 'any'
  }

  const root = Array.isArray(data) && data.length > 0 && typeof data[0] === 'object'
    ? data[0] as Record<string, any>
    : data as Record<string, any>
  emit(opts.rootName, root)
  return lines.join('\n').trim()
}

export const genJava = (data: any, opts: CodegenOptions): string => {
  const lines: string[] = []
  const seen = new Set<string>()

  const javaType = (t: JsonType, key: string): string => {
    if (t === 'string') return 'String'
    if (t === 'number') return 'Double'
    if (t === 'integer') return opts.useBigInt ? 'Long' : 'Integer'
    if (t === 'boolean') return 'Boolean'
    if (t === 'null') return 'Object'
    if (t === 'object') return toPascalCase(key)
    if (String(t).startsWith('array<')) {
      const inner = String(t).slice(6, -1) as JsonType
      if (inner === 'object') return `List<${toPascalCase(key)}>`
      return `List<${javaType(inner, key)}>`
    }
    return 'Object'
  }

  const emit = (name: string, obj: Record<string, any>) => {
    const pascal = toPascalCase(name)
    if (seen.has(pascal)) return
    seen.add(pascal)
    const fields = collectFields(obj)
    for (const { key, value } of nestedObjects(obj)) {
      emit(key, value)
    }
    lines.push(`public class ${pascal} {`)
    for (const [k, f] of fields) {
      const jt = javaType(f.type, k)
      const field = toCamelCase(k)
      lines.push(`${indentStr(opts.indent)}private ${jt} ${field};`)
    }
    lines.push('')
    for (const [k, f] of fields) {
      const jt = javaType(f.type, k)
      const field = toCamelCase(k)
      const cap = toPascalCase(k)
      lines.push(`${indentStr(opts.indent)}public ${jt} get${cap}() { return ${field}; }`)
      lines.push(`${indentStr(opts.indent)}public void set${cap}(${jt} ${field}) { this.${field} = ${field}; }`)
    }
    lines.push('}')
    lines.push('')
  }

  const root = Array.isArray(data) && data.length > 0 && typeof data[0] === 'object'
    ? data[0] as Record<string, any>
    : data as Record<string, any>
  emit(opts.rootName, root)
  return lines.join('\n').trim()
}

export const genGo = (data: any, opts: CodegenOptions): string => {
  const lines: string[] = []
  const seen = new Set<string>()

  const goType = (t: JsonType, key: string): string => {
    if (t === 'string') return 'string'
    if (t === 'number') return 'float64'
    if (t === 'integer') return 'int'
    if (t === 'boolean') return 'bool'
    if (t === 'null') return 'interface{}'
    if (t === 'object') return toPascalCase(key)
    if (String(t).startsWith('array<')) {
      const inner = String(t).slice(6, -1) as JsonType
      if (inner === 'object') return `[]${toPascalCase(key)}`
      return `[]${goType(inner, key)}`
    }
    return 'interface{}'
  }

  const emit = (name: string, obj: Record<string, any>) => {
    const pascal = toPascalCase(name)
    if (seen.has(pascal)) return
    seen.add(pascal)
    const fields = collectFields(obj)
    for (const { key, value } of nestedObjects(obj)) {
      emit(key, value)
    }
    lines.push(`type ${pascal} struct {`)
    const entries = [...fields]
    const maxName = Math.max(...entries.map(([k]) => toPascalCase(k).length), 0)
    const maxType = Math.max(...entries.map(([, f]) => goType(f.type, 'x').length), 0)
    for (const [k, f] of entries) {
      const fn = toPascalCase(k)
      const ft = goType(f.type, k)
      lines.push(`${indentStr(opts.indent)}${fn.padEnd(maxName)}  ${ft.padEnd(maxType)} \`json:"${k}"\``)
    }
    lines.push('}')
    lines.push('')
  }

  const root = Array.isArray(data) && data.length > 0 && typeof data[0] === 'object'
    ? data[0] as Record<string, any>
    : data as Record<string, any>
  emit(opts.rootName, root)
  return lines.join('\n').trim()
}

export const genPython = (data: any, opts: CodegenOptions): string => {
  const lines: string[] = ['from dataclasses import dataclass', 'from typing import List, Any', '']
  const seen = new Set<string>()

  const pyType = (t: JsonType, key: string): string => {
    if (t === 'string') return 'str'
    if (t === 'number') return 'float'
    if (t === 'integer') return 'int'
    if (t === 'boolean') return 'bool'
    if (t === 'null') return 'Any'
    if (t === 'object') return toPascalCase(key)
    if (String(t).startsWith('array<')) {
      const inner = String(t).slice(6, -1) as JsonType
      if (inner === 'object') return `List[${toPascalCase(key)}]`
      return `List[${pyType(inner, key)}]`
    }
    return 'Any'
  }

  const emit = (name: string, obj: Record<string, any>) => {
    const pascal = toPascalCase(name)
    if (seen.has(pascal)) return
    seen.add(pascal)
    const fields = collectFields(obj)
    for (const { key, value } of nestedObjects(obj)) {
      emit(key, value)
    }
    lines.push('@dataclass')
    lines.push(`class ${pascal}:`)
    if (fields.size === 0) { lines.push(`${indentStr(opts.indent)}pass`); lines.push(''); return }
    for (const [k, f] of fields) {
      lines.push(`${indentStr(opts.indent)}${k}: ${pyType(f.type, k)}`)
    }
    lines.push('')
  }

  const root = Array.isArray(data) && data.length > 0 && typeof data[0] === 'object'
    ? data[0] as Record<string, any>
    : data as Record<string, any>
  emit(opts.rootName, root)
  return lines.join('\n').trim()
}

export const genCSharp = (data: any, opts: CodegenOptions): string => {
  const lines: string[] = ['using System.Collections.Generic;', '']
  const seen = new Set<string>()

  const csType = (t: JsonType, key: string): string => {
    if (t === 'string') return 'string'
    if (t === 'number') return 'double'
    if (t === 'integer') return opts.useBigInt ? 'long' : 'int'
    if (t === 'boolean') return 'bool'
    if (t === 'null') return 'object'
    if (t === 'object') return toPascalCase(key)
    if (String(t).startsWith('array<')) {
      const inner = String(t).slice(6, -1) as JsonType
      if (inner === 'object') return `List<${toPascalCase(key)}>`
      return `List<${csType(inner, key)}>`
    }
    return 'object'
  }

  const emit = (name: string, obj: Record<string, any>) => {
    const pascal = toPascalCase(name)
    if (seen.has(pascal)) return
    seen.add(pascal)
    const fields = collectFields(obj)
    for (const { key, value } of nestedObjects(obj)) {
      emit(key, value)
    }
    lines.push(`public class ${pascal} {`)
    for (const [k, f] of fields) {
      const ct = csType(f.type, k)
      const prop = toPascalCase(k)
      lines.push(`${indentStr(opts.indent)}public ${ct} ${prop} { get; set; }`)
    }
    lines.push('}')
    lines.push('')
  }

  const root = Array.isArray(data) && data.length > 0 && typeof data[0] === 'object'
    ? data[0] as Record<string, any>
    : data as Record<string, any>
  emit(opts.rootName, root)
  return lines.join('\n').trim()
}

export const genSql = (data: any, opts: CodegenOptions): string => {
  const root = Array.isArray(data) && data.length > 0 && typeof data[0] === 'object'
    ? data[0] as Record<string, any>
    : data as Record<string, any>
  if (typeof root !== 'object' || root === null) return '-- 请输入 JSON 对象'
  const fields = collectFields(root)
  const table = toSnakeCase(opts.rootName)
  const lines: string[] = [`CREATE TABLE ${table} (`]
  const cols: string[] = []
  for (const [k, f] of fields) {
    const col = toSnakeCase(k)
    if (f.type === 'object' || String(f.type).startsWith('array')) {
      cols.push(`${indentStr(opts.indent)}${col} ${opts.arrayAsText ? 'TEXT' : 'JSON'}`)
    } else {
      cols.push(`${indentStr(opts.indent)}${col} ${sqlType(f.type, opts)}`)
    }
  }
  lines.push(cols.join(',\n'))
  lines.push(');')
  return lines.join('\n')
}

export const genMyBatis = (data: any, opts: CodegenOptions): string => {
  const root = Array.isArray(data) && data.length > 0 && typeof data[0] === 'object'
    ? data[0] as Record<string, any>
    : data as Record<string, any>
  if (typeof root !== 'object' || root === null) return '<!-- 请输入 JSON 对象 -->'
  const fields = collectFields(root)
  const entity = toPascalCase(opts.rootName)
  const table = toSnakeCase(opts.rootName)
  const ns = `com.example.${entity}Mapper`
  const lines: string[] = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">`,
    `<mapper namespace="${ns}">`,
    ``,
    `  <resultMap id="${toCamelCase(entity)}Map" type="${entity}">`
  ]
  for (const [k] of fields) {
    const col = toSnakeCase(k)
    const prop = toCamelCase(k)
    lines.push(`    <result property="${prop}" column="${col}"/>`)
  }
  lines.push(`  </resultMap>`, ``)
  lines.push(`  <select id="selectById" parameterType="long" resultMap="${toCamelCase(entity)}Map">`)
  lines.push(`    SELECT * FROM ${table} WHERE id = #{id}`)
  lines.push(`  </select>`, ``)
  lines.push(`  <select id="selectAll" resultMap="${toCamelCase(entity)}Map">`)
  lines.push(`    SELECT * FROM ${table}`)
  lines.push(`  </select>`, ``)
  const cols = [...fields].map(([k]) => toSnakeCase(k)).join(', ')
  const props = [...fields].map(([k]) => `#{${toCamelCase(k)}}`).join(', ')
  lines.push(`  <insert id="insert" parameterType="${entity}" useGeneratedKeys="true" keyProperty="id">`)
  lines.push(`    INSERT INTO ${table} (${cols})`)
  lines.push(`    VALUES (${props})`)
  lines.push(`  </insert>`, ``)
  lines.push(`  <update id="update" parameterType="${entity}">`)
  lines.push(`    UPDATE ${table}`)
  lines.push(`    <set>`)
  for (const [k] of fields) {
    const col = toSnakeCase(k)
    const prop = toCamelCase(k)
    lines.push(`      <if test="${prop} != null">${col} = #{${prop}},</if>`)
  }
  lines.push(`    </set>`)
  lines.push(`    WHERE id = #{id}`)
  lines.push(`  </update>`, ``)
  lines.push(`  <delete id="deleteById" parameterType="long">`)
  lines.push(`    DELETE FROM ${table} WHERE id = #{id}`)
  lines.push(`  </delete>`, ``)
  lines.push(`</mapper>`)
  return lines.join('\n')
}

export interface CodegenLang {
  id: string
  name: string
  ext: string
  gen: (data: any, opts: CodegenOptions) => string
}

export const codegenLangs: CodegenLang[] = [
  { id: 'typescript', name: 'TypeScript', ext: 'ts', gen: genTypeScript },
  { id: 'java', name: 'Java', ext: 'java', gen: genJava },
  { id: 'go', name: 'Go', ext: 'go', gen: genGo },
  { id: 'python', name: 'Python', ext: 'py', gen: genPython },
  { id: 'csharp', name: 'C#', ext: 'cs', gen: genCSharp },
  { id: 'sql', name: 'SQL', ext: 'sql', gen: genSql },
  { id: 'mybatis', name: 'MyBatis XML', ext: 'xml', gen: genMyBatis }
]