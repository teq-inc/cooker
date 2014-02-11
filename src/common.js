$(function (){

  $('#input').inputcounter({
      warningCounter:2,
      errorCounter:4
  });

	$('.scrollmethod').scrollmethod();
	
	$('.switchers').switchers();
	
	$('.slidebar_right').slidebar({
      position: 'right',
	});
	
	$('.slidebar_bottom').slidebar({
    position: 'bottom',
	});
	
});