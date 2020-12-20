import flatpickr from "flatpickr";
import 'flatpickr/dist/flatpickr.css';

const config = {
 dateFormat : "Y-m-d",
 onChange : function(selectDates,dateStr){
   let el = document.getElementById("js-input-date");
   
   let result = dateStr; 

   el.setAttribute("value",result);
 }
}

flatpickr('.js-flatpickr',config)
