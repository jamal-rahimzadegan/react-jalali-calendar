function generateArr(length: number, formatArr?: Function): any[] {
  return Array.from({ length }, (v, k) => !!formatArr && formatArr(v, k));
}

export {generateArr}
