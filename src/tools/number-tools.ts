// @ts-nocheck
type NestedObject = { [key: string]: any }

class NumberTools {
  PERSIAN_DIGITS: readonly string[]
  ENGLISH_DIGITS: readonly string[]
  REGEX_LIST: NestedObject

  constructor() {
    this.PERSIAN_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']
    this.ENGLISH_DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    this.REGEX_LIST = {
      engNum: /[0-9]/g,
      perNum: [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g]
    }
  }

  private sanitizedTxt(txt: string | number): string {
    if ([undefined, null].includes(txt)) return ''
    if (typeof txt === 'number') return txt.toString()
    return txt
  }

  toEnglishDigit(txt: string): string {
    txt = this.sanitizedTxt(txt)

    let i = 0
    for (i; i < this.PERSIAN_DIGITS.length; i++) {
      txt = txt.replace(this.REGEX_LIST.perNum[i], i)
    }

    return txt
  }

  toPersian(txt: string | number): string {
    txt = this.sanitizedTxt(txt)
    return txt.replace(this.REGEX_LIST.engNum, (w) => this.PERSIAN_DIGITS[+w])
  }

  toCurrency(amount: string | number): string {
    amount = this.sanitizedTxt(amount)
    return amount
  }

  shortenNumber(num: number | string): string {
    num = this.sanitizedTxt(num)
    // @ts-ignore
    return new Intl.NumberFormat('en', { notation: 'compact' }).format(num)
  }

  addLeadingZero(num: number | string): string {
    num = this.sanitizedTxt(num)
    return String(num).padStart(2, '0')
  }
}

export default new NumberTools()
