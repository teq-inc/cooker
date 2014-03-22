$(function (){
// ==================================================

// cooker
// ---------------------------

$('.inputcounter').inputcounter({
  warningCounter: 12,
  errorCounter:   24
});

$('a[href^=#]').scrollmethod();

$('.drawer').drawer({
  desktopEvent:'click'
});

$('.switchers').switchers();

$('.slidebar-right').slidebar({
    position: 'right',
});

$('.slidebar-bottom').slidebar({
  position: 'bottom',
});

$('.drilldown').drilldown();


// docs script
// ==================================================

// slidebar
// ---------------------------
$slidebar = $('.slidebar')
$slidebarRight = $('.slidebar-right')
$slidebarBottom = $('.slidebar-bottom')

$slidebar.hide().addClass('hide')

$('.slidebar-example-right').on('click', function(){
  if($slidebarRight.hasClass('hide')){
    $slidebarRight.show().removeClass('hide')
  } else{
    $slidebarRight.hide().addClass('hide')
  }
});	
$('.slidebar-example-bottom').on('click', function(){
  if($slidebarBottom.hasClass('hide')){
    $slidebarBottom.show().removeClass('hide')
  } else{
    $slidebarBottom.hide().addClass('hide')
  }
});	

// ==================================================	
});