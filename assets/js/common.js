$(function (){

// cooker
// ==================================================

  $('#input').inputcounters({
      warningCounter:2,
      errorCounter:4
  });

//	$('a[href^=#]').scrollmethods();

	$('.dropdown').dropdowns();

	$('.tooltips').tooltips();
	
	$('.switchers').switchers();
	
	$('.slidebar_right').slidebars({
      position: 'right',
	});
	
	$('.slidebar_bottom').slidebars({
    position: 'bottom',
	});
	
// bootstrap.affix
// ==================================================

  $('body').scrollspy({ target: '.ck-docs-sidenav' })

  $('.ck-docs-sidebar').affix({
    offset: {
      top: function () {
          return this.bottom = $('.ck-docs-nav').outerHeight() + $('.ck-docs-header').outerHeight();
      }, 
    }
  });

	
	
});

