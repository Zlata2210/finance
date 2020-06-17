const qiwi = require('./qiwi.js');

//document.getElementById('btn').style.display="inline";
function UserQiwi() {
  this.fun = function () {

    let wallet = new qiwi();
    wallet.Balance();
  }
}
module.exports = UserQiwi;
