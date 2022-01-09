;(function () {
  // RegExp的变异方法
  const regExpMethods = ['test']
  // 缓存RegExp的原型对象
  const regExpCopy = RegExp.prototype
  const regExper = Object.create(RegExp.prototype)
  regExpMethods.forEach((method) => {
    regExper[method] = function (...args) {
      const result = regExpCopy[method].apply(this, args)
      console.log(`RegExp:`, this)
      console.log(`String:`, args[0])
      console.log(`Method:`, method)
      console.log(`Result:`, result)
      console.log('----------------------')
      return result
    }
  })

  // String的变异方法
  const stringMethods = ['reg_match', 'reg_replace']
  stringMethods.forEach((method) => {
    String.prototype[method] = function (...args) {
      const _method = method.split('_')[1]
      const result = this[_method].apply(this, args)
      console.log(`RegExp:`, args[0])
      console.log(`String:`, JSON.stringify(this))
      console.log(`Method:`, _method)
      console.log(`Result:`, result)
      console.log('----------------------')
      return result
    }
  })

  var regex = {}
  var _ = new Proxy(regex, {
    get: function (target, prop, receiver) {
      return target[prop]
    },
    set: function (target, prop, value, receiver) {
      target[prop] = value
      Object.setPrototypeOf(target[prop], regExper)
      return true
    },
  })

  _.re = /hello/
  _.re.test('hellos')

  _.re2 = /ab{2,5}c/g
  _.re2.test('abbc')
  'abc abbc abbbc abbbbc abbbbbc abbbbbbc'.reg_match(_.re2)

  _.re3 = /a[123]b/g
  _.re3.test('a2b')
  'a0b a1b a2b a3b a4b'.reg_match(_.re3)

  _.re4 = /a[^123]b/g
  'a0b a1b a2b a3b a4b'.reg_match(_.re4)

  _.re5 = /a\db/g
  'a0b a1b a2b a3b a4b'.reg_match(_.re5)

  _.re6 = /a^\db/g
  'a0b a1b a2b a3b a4b'.reg_match(_.re6)

  _.re61 = /\wb/g
  'a0b a1b a2b a3b a4b'.reg_match(_.re61)

  _.re7 = /\s/g
  'a0b a1b a2b a3b a4b'.reg_match(_.re7)

  _.re8 = /\S/g
  'a0b a1b a2b a3b a4b'.reg_match(_.re8)

  _.re9 = /\d{2,5}/g
  '123 1 123 1456'.reg_match(_.re9)

  _.re10 = /\d{2,5}?/g
  '123 1 72321456'.reg_match(_.re10)

  _.re11 = /good|nice/g
  'good idea, nice try.'.reg_match(_.re11)

  _.re12 = /#([0-9a-zA-Z]{6}|[0-9a-zA-Z]{3})/g
  '#ff bba #Fc01DF #FFF #ffE'.reg_match(_.re12)

  _.re13 = /^([01][0-9]|[2][0-3]):[0-5][0-9]$/
  _.re13.test('23:59')
  _.re13.test('02:07')

  _.re14 = /^\d{4}-([0][1-9]|[1][0-2])-([0][1-9]|[12][0-9]|[3][01])$/
  _.re14.test('2017-06-10')

  _.re15 = /^[a-zA-Z]:\\([^\\:*<>|"?\r\n/]+\\)*([^\\:*<>|"?\r\n/]+)?$/
  _.re15.test('F:\\study\\javascript\\regex\\regular expression.pdf')

  _.re16 = /id=".*?"/g
  '<div id="container" class="main"></div>'.reg_match(_.re16)

  _.re17 = /^|$/g
  'hello'.reg_replace(_.re17, '#')

  _.re18 = /^|$/gm
  '"I\nlove\njavascript'.reg_replace(_.re18, '#')

  _.re19 = /\b/g
  '[JS] Lesson_01.mp4'.reg_replace(_.re19, '#')

  _.re20 = /\B/g
  '[JS] Lesson_01.mp4'.reg_replace(_.re20, '#')

  _.re21 = /(?=l)/g
  'hello'.reg_replace(_.re21, '#')

  _.re22 = /(?!l)/g
  'hello'.reg_replace(_.re22, '#')

  _.re23 = /(?!^)(?=(\d{3})+$)/g
  '123456789'.reg_replace(_.re23, ',')

  _.re24 = /\B(?=(\d{3})+\b)/g
  '12345678 123456789'.reg_replace(_.re24, ',')

  _.re25 = /(?=.*[0-9])(?=.*\w)^\w{6,12}$/g
  _.re25.test('123z456')

  _.re26 = /(\d{4})-(\d{2})-(\d{2})/
  '2017-06-12'.reg_match(_.re26)
  _.re26.test('2022-01-09')
  '2017-06-12'.reg_replace(_.re26, '$2/$3/$1')

  _.re27 = /^(\d{15}|\d{17}[\dxX])$/
})()
