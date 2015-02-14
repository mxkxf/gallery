'use strict';

var $ = require('jquery');

$(function() {

  var $gallery      = $('.gallery'),
      $galleryInner = $('.gallery-inner', $gallery),
      $galleryItem,
      galleryHeight = 0,
      galleryWidth  = 0,
      $buttonPrev   = $('.gallery-prev', $gallery),
      $buttonNext   = $('.gallery-next', $gallery),
      slideWidth    = 0,
      speed         = 400,
      easing        = 'swing',
      startingPos;

  $(window).on('load', function() {
    galleryInit();
    $galleryInner.children(':last-child').insertBefore($galleryInner.children(':first-child'));
  });

  $(window).on('resize', galleryInit);

  function galleryInit() {
    galleryHeight = 0;
    galleryWidth  = 0;
    slideWidth = $galleryInner.children(':first-child').outerWidth(true);
    $galleryInner.css('left', 0 - slideWidth);
    $galleryInner.children().each(function() {
      $galleryItem = $(this);
      if ($galleryItem.height() > galleryHeight) {
        galleryHeight = $galleryItem.height();
      }
      galleryWidth += $galleryItem.width();
    });
    $gallery.height(galleryHeight);
    $galleryInner.width(galleryWidth);
  }

  $buttonPrev.on('click', function(e) {
    startingPos = $galleryInner.position().left;
    $galleryInner.children(':last-child').insertBefore($galleryInner.children(':first-child'));
    $galleryInner.css('left', (startingPos - slideWidth) + 'px');
    $galleryInner.not(':animated').animate({left: startingPos + 'px'}, speed, easing);
  });

  $buttonNext.on('click', function(e) {
    startingPos = $galleryInner.position().left;
    $galleryInner.children(':first-child').insertAfter($galleryInner.children(':last-child'));
    $galleryInner.css('left', (startingPos + slideWidth) + 'px');
    $galleryInner.not(':animated').animate({left: startingPos + 'px'}, speed, easing);
  });

});