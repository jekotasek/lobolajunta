document.getElementById('title').focus();
$(document).ready(function() {
$('#productstable').dataTable( {
  "language": {
    "url": "/js/localisation.json"
},
    select: {
        style: 'multi'
    }
  } );
} );