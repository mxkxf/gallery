'use strict';

var $ = require('jquery');

(function() {

  var $gallery         = $('.gallery'),
      $galleryInner    = $('.gallery-inner', $gallery),
      galleryInnerLeft = 0,
      $galleryItem,
      galleryItemWidth = 0,
      galleryHeight    = 0,
      galleryWidth     = 0,
      $buttonPrev      = $('.gallery-prev', $gallery),
      $buttonNext      = $('.gallery-next', $gallery),
      speed            = 400,
      easing           = 'swing';

  function galleryInit() {
    galleryHeight = 0;
    galleryWidth  = 0;
    galleryItemWidth = $galleryInner.children(':first-child').outerWidth(true);
    $galleryInner.css('left', 0 - galleryItemWidth);
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

  $(window).on('load', function() {
    galleryInit();
    $galleryInner.children(':last-child').insertBefore($galleryInner.children(':first-child'));
  });

  $(window).on('resize', galleryInit);

  $buttonPrev.on('click', function(e) {
    galleryInnerLeft = $galleryInner.position().left;
    $galleryInner.children(':last-child').insertBefore($galleryInner.children(':first-child'));
    $galleryInner.css('left', (galleryInnerLeft - galleryItemWidth) + 'px');
    $galleryInner.not(':animated').animate({left: galleryInnerLeft + 'px'}, speed, easing);
  });

  $buttonNext.on('click', function(e) {
    galleryInnerLeft = $galleryInner.position().left;
    $galleryInner.children(':first-child').insertAfter($galleryInner.children(':last-child'));
    $galleryInner.css('left', (galleryInnerLeft + galleryItemWidth) + 'px');
    $galleryInner.not(':animated').animate({left: galleryInnerLeft + 'px'}, speed, easing);
  });

})($);