document.addEventListener('DOMContentLoaded', function(){
    var d = new Date();
    var day = d.getDate();
    var month = d.getMonth() + 1;
    var year = d.getFullYear();
    var name_input1 = document.getElementById('dates');
      var name_input = document.getElementById('date');
        if (day<=9) {
          name_input1.max = ""+year+ "-" + (("0" + month).slice(-2)) + "-" +"0"+(day) +"";
          name_input1.value =  ""+year+ "-" + (("0" + month).slice(-2)) + "-" +"0"+(day) +"";

          name_input.max = ""+year+ "-" + (("0" + month).slice(-2)) + "-" +"0"+(day) +"";

          name_input.value = ""+year+ "-" + (("0" + month).slice(-2)) + "-" +"0"+(day) +"";

        ;

        }else {
          name_input1.max = ""+year+ "-" + (("0" + month).slice(-2)) + "-" +(day) +"";
          name_input1.value = ""+year+ "-" + (("0" + month).slice(-2)) + "-" +(day) +"";

          name_input.max = ""+year+ "-" + (("0" + month).slice(-2)) + "-" +(day) +"";
          name_input.value = ""+year+ "-" + (("0" + month).slice(-2)) + "-" +(day) +"";


        }

});
