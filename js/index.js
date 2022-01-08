(function () {
  const re1 = /hello/;
  console.log(re1.test("hellos"));

  const re2 = /ab{2,5}c/g;
  console.log(re2.test("abbc"));
  console.log("abc abbc abbbc abbbbc abbbbbc abbbbbbc".match(re2));

  const re3 = /a[123]b/;
  console.log(re3.test("a2b"));
  console.log("a0b a1b a2b a3b a4b");
})();
