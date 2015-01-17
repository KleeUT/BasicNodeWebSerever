
exports.testSomething = function(test){
    test.expect(1);
    test.ok(true, "this assertion should pass");
    test.done();
};

exports.testSubstring = function(test){
    var raw = "/command/create";
    var secondSlash = raw.indexOf('/',1);
    var sub = raw.substring(secondSlash + 1, raw.length);
    test.ok(sub.equals("create", "aaa"));
};

