module.exports.register = function (Handlebars, options) {
  Handlebars.registerHelper("is_exp", function(exp1, v1, exp2, v2, block) {
  	if((exp1 + v1) == (exp2 + v2)) {
      return block.fn();
    } else {
  	  return block.inverse();
    }
  });
};
