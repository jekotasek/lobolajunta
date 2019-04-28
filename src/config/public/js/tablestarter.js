document.getElementById('title').focus();
$(document).ready(function() {
  $('#promos').dataTable( {
    "language": {"url": "/js/localisation.json"},
    select: {
      style: 'multi'
    }
  });
  $('#products').dataTable( {
    "language": {"url": "/js/localisation.json"},
    select: {
      style: 'multi'
    }
  });
});