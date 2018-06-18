const DAYS = [
  { value: 0, text: 'SUN', cnText: '日' },
  { value: 1, text: 'MON', cnText: '一' },
  { value: 2, text: 'TUE', cnText: '二' },
  { value: 3, text: 'WED', cnText: '三' },
  { value: 4, text: 'THU', cnText: '四' },
  { value: 5, text: 'FRI', cnText: '五' },
  { value: 6, text: 'SAT', cnText: '六' }
]

const MONTHS = [
  { value: 0, text: 'JAN', full: 'January', cnText: '一月' },
  { value: 1, text: 'FEB', full: 'February', cnText: '二月' },
  { value: 2, text: 'MAR', full: 'March', cnText: '三月' },
  { value: 3, text: 'APR', full: 'April', cnText: '四月' },
  { value: 4, text: 'MAY', full: 'May', cnText: '五月' },
  { value: 5, text: 'JUN', full: 'June', cnText: '六月' },
  { value: 6, text: 'JUL', full: 'July', cnText: '七月' },
  { value: 7, text: 'AUG', full: 'August', cnText: '八月' },
  { value: 8, text: 'SEP', full: 'September', cnText: '九月' },
  { value: 9, text: 'OCT', full: 'October', cnText: '十月' },
  { value: 10, text: 'NOV', full: 'November', cnText: '十一月' },
  { value: 11, text: 'DEC', full: 'December', cnText: '十二月' }
]

const FADE_STATUSES = {
    init: 0,
    fadeIn: 10,
    fadeInEnd: 20,
    fadeOut: 30,
    fadeOutEnd: 40
}

const FADE_EFFECTS = {
  fadeIn: 'fade-in',
  fadeOut: 'fade-out'
}

const THEME_TYPES = {
  primary: 'primary',
  danger: 'danger',
  success: 'success',
  warning: 'warning',
  lite: 'lite',
  dark: 'dark',
  default: 'default'
}
const THEME_TYPES_ARRAY = Object.keys(THEME_TYPES).map(key => THEME_TYPES[key])

export {
  DAYS,
  MONTHS,
  FADE_STATUSES,
  FADE_EFFECTS,
  THEME_TYPES,
  THEME_TYPES_ARRAY
}
