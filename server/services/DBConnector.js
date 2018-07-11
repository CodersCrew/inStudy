
function DBConnector(context) {
  this.connection = null;
  this.context = context;

  console.log(this.context, 'yy')
}

DBConnector.prototype.prepare = function () {

}


module.exports = DBConnector;
