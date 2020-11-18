var datepicker = require('gijgo');
var today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
var dd = String(today.getDate()).padStart(2,'0');
var mm = String(today.getMonth() + 1).padStart(2,'0');
var yyyy = today.getFullYear();

var formatedDate = dd+'-'+mm+'-'+yyyy;

$('#datepicker').datepicker({
    size: "medium",
    value: formatedDate,
    uiLibrary: "bootstrap4",
    footer: true,
    format: 'dd-mm-yyyy',
    minDate: today,
});