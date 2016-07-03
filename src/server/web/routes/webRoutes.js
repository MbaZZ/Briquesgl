
/*
 * GET home page.
 */

module.exports.index = function(req, res){
  //res.render('index', { title: 'Test de ton titre' })
};
module.exports.test1 = function(req, res){
  res.render('index', { title: 'Test de ton titre' })
};
