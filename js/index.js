;(function () {
  // RegExp的变异方法
  const regExpMethods = ['test']
  // 缓存RegExp的原型对象
  const regExpCopy = RegExp.prototype
  const regExper = Object.create(RegExp.prototype)
  regExpMethods.forEach((method) => {
    regExper[method] = function (...args) {
      const result = regExpCopy[method].apply(this, args)
      console.log(`${this}.${method}('${args[0]}') = ${result}`)
      return result
    }
  })

  // String的变异方法
  const stringMethods = ['match']
  const stringCopy = String.prototype
  const stringer = Object.create(String.prototype)
  stringMethods.forEach((method) => {
    stringer[method] = function (...args) {
      const result = stringCopy[method].apply(this, args)
      console.log('拦截string方法')
      return result
    }
  })

  Object.defineProperty(String, 'match', {
    get() {
      console.log(12123)
      return 123
    },
    set(newValue) {
      console.log(newValue)
    },
  })

  var regex = {}
  var _regex = new Proxy(regex, {
    get: function (target, prop, receiver) {
      return target[prop]
    },
    set: function (target, prop, value, receiver) {
      target[prop] = value
      Object.setPrototypeOf(target[prop], regExper)
      return true
    },
  })

  _regex.re = /hello/
  _regex.re.test('hellos')

  _regex.re2 = /ab{2,5}c/g
  _regex.re2.test('abbc')

  // '123'.match(_regex.re)

  // const re2 = /ab{2,5}c/g
  // re2.test('abbc')
  // 'abc abbc abbbc abbbbc abbbbbc abbbbbbc'.match(re2)

  // // var re3 = /a[123]b/g
  // re3.test('a2b')
  // 'a0b a1b a2b a3b a4b'.match(re3)

  // // var re4 = /a[^123]b/g
  // 'a0b a1b a2b a3b a4b'.match(re4)

  // // var re5 = /a\db/g
  // 'a0b a1b a2b a3b a4b'.match(re5)

  // // var re6 = /a^\db/g
  // 'a0b a1b a2b a3b a4b'.match(re6)

  // // var re61 = /\wb/g
  // 'a0b a1b a2b a3b a4b'.match(re61)

  // // let re7 = /\s/g
  // 'a0b a1b a2b a3b a4b'.match(re7)

  // // let re8 = /\S/g
  // 'a0b a1b a2b a3b a4b'.match(re8)
})()
