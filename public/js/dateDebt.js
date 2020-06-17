
document.addEventListener('DOMContentLoaded', function(){
    var d = new Date();
    var day = d.getDate();
    var month = d.getMonth() + 1;
    var year = d.getFullYear();
    var name_inputBegin = document.getElementById('datedebt');
      var name_inputEnd = document.getElementById('dateDebtEnd');
      if (day<=9) {
        name_inputBegin.max =""+year+ "-" + (("0" + month).slice(-2)) + "-" +"0"+(day) +"";
        name_inputBegin.value = ""+year+ "-" + (("0" + month).slice(-2)) + "-" +"0"+(day) +"";

      } else {
        name_inputBegin.max = ""+year+ "-" + (("0" + month).slice(-2)) + "-" +(day) +"";
        name_inputBegin.value = ""+year+ "-" + (("0" + month).slice(-2)) + "-" +(day) +"";

      }


});
