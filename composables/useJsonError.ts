import JSON5 from 'json5'

export interface JsonError {
  line?: number
  col?: number
  message: string
  hint?: string
}

const guessHint = (msg: string): string | undefined => {
  if (/unexpected end/i.test(msg)) return '可能缺少闭合的 } 或 ]，请检查末尾'
  if (/unexpected token/i.test(msg)) return '可能存在非法字符或缺少逗号 / 冒号'
  if (/duplicate key/i.test(msg)) return '存在重复的键名'
  if (/single quote/i.test(msg)) return 'JSON 字符串需用双引号 " 而非单引号'
  return undefined
}

export const useJsonError = () => {
  const parse = (text: string): { ok: boolean; value?: unknown; error?: JsonError } => {
    if (!text.trim()) return { ok: false, error: { message: '输入为空' } }
    try {
      return { ok: true, value: JSON5.parse(text) }
    } catch (e) {
      const err = e as Error & { position?: number }
      const message = err.message || '解析失败'
      let line: number | undefined
      let col: number | undefined
      if (typeof err.position === 'number') {
        const before = text.slice(0, err.position)
        const lines = before.split('\n')
        line = lines.length
        col = lines[lines.length - 1].length + 1
      }
      return { ok: false, error: { line, col, message, hint: guessHint(message) } }
    }
  }
  return { parse }
}