$(function (){
// ==================================================

// cooker
// ---------------------------

$('.inputcounter').inputcounter({
  warningCounter: 12,
  errorCounter:   24,
  errorClass:     'danger'
});

// $('a:not(".dropdown-toggle")[href^=#]').scrollmethod();
$('.scrollmethod').scrollmethod();

$('.switchers').switchers();
// $('.switchers').switchers('open');

$('.slidebar-right').slidebar({
    position: 'right',
});

$('.slidebar-bottom').slidebar({
  position: 'bottom',
});

$('.drilldown').drilldown();

$('.dropdown').dropdown();

$('.navs-tabs').tabs();


// docs script
// ==================================================
$('#drawer').drawer();

// slidebar
// ---------------------------
var $slidebar = $('.slidebar');
var $slidebarRight = $('.slidebar-right');
var $slidebarBottom = $('.slidebar-bottom');

$slidebar.hide().addClass('hide');

$('.slidebar-example-right').on('click', function(){
  if($slidebarRight.hasClass('hide')){
    $slidebarRight.show().removeClass('hide');
  } else{
    $slidebarRight.hide().addClass('hide');
  }
});	
$('.slidebar-example-bottom').on('click', function(){
  if($slidebarBottom.hasClass('hide')){
    $slidebarBottom.show().removeClass('hide');
  } else{
    $slidebarBottom.hide().addClass('hide');
  }
});	

// ==================================================	
});