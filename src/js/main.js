'use strict';

var $ = require('jquery');

$(function() {

  var $gallery        = $('.gallery'),
      $galleryInner   = $('.gallery-inner', $gallery),
      galleryHeight   = 0,
      galleryWidth    = 0,
      $buttonPrev     = $('.gallery-prev', $gallery),
      $buttonNext     = $('.gallery-next', $gallery),
      slideWidth      = 0,
      moveSlides      = 1,
      speed           = 400,
      easing          = 'swing';

  $(window).on('load resize', function() {

    galleryHeight = 0;
    galleryWidth  = 0;

    slideWidth = $galleryInner.children(':first-child').outerWidth();
    $galleryInner.css('left', 0 - slideWidth);
    $('.gallery-inner > *:last-child').insertBefore('.gallery-inner > *:first-child');

    $galleryInner.children().each(function() {
      var $galleryItem = $(this);
      if ($galleryItem.height() > galleryHeight) {
        galleryHeight = $galleryItem.height();
      }
      galleryWidth += $galleryItem.width();
    });

    $gallery.height(galleryHeight);
    $galleryInner.width(galleryWidth);

    // $('.gallery-inner > *').width($gallery.width());

  });

  $buttonPrev.on('click', function(e) {
    var startingPos = $('.gallery-inner').position().left;
    $('.gallery-inner > *:last-child').insertBefore('.gallery-inner > *:first-child');
    $galleryInner.css('left', (startingPos - slideWidth) + 'px');
    $galleryInner.not(':animated').animate({left: startingPos + 'px'}, speed, easing);
  });

  $buttonNext.on('click', function(e) {
    var startingPos = $('.gallery-inner').position().left;
    $('.gallery-inner > *:first-child').insertAfter('.gallery-inner > *:last-child');
    $galleryInner.css('left', (startingPos + slideWidth) + 'px');
    $galleryInner.not(':animated').animate({left: startingPos + 'px'}, speed, easing);
  });

});