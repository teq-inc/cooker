$(function (){

// cooker
// ==================================================

  $('.inputcounter').inputcounter({
    warningCounter: 12,
    errorCounter:   24
  });
  
	$('a[href^=#]').scrollmethod();
	
	$('.drawer').drawer();
	
	$('.switchers').switchers();
	
/*
	$('.slidebar_right').slidebars({
      position: 'right',
	});
	
	$('.slidebar_bottom').slidebars({
    position: 'bottom',
	});
*/
	
});

