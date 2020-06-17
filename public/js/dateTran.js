document.addEventListener('DOMContentLoaded', function(){
    var d = new Date();
    var day = d.getDate();
    var month = d.getMonth() + 1;
    var year = d.getFullYear();
    var name_input3 = document.getElementById('datetranzaction');
    if (day<=9) {
      name_input3.max =  ""+year+ "-" + (("0" + month).slice(-2)) + "-" +"0"+(day) +"";

      name_input3.value = ""+year+ "-" + (("0" + month).slice(-2)) + "-" +"0"+(day) +""
    } else {
      name_input3.max = ""+year+ "-" + (("0" + month).slice(-2)) + "-" +(day) +"";
      name_input3.value = ""+year+ "-" + (("0" + month).slice(-2)) + "-" +(day) +"";
    }

});
