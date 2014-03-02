$(function (){

  $('#input').inputcounters({
      warningCounter:2,
      errorCounter:4
  });

	$('a[href^=#]').scrollmethods();

	$('.dropdown').dropdowns();

	$('.tooltips').tooltips();
	
	$('.switchers').switchers();
	
	$('.slidebar_right').slidebars({
      position: 'right',
	});
	
	$('.slidebar_bottom').slidebars({
    position: 'bottom',
	});
	
});