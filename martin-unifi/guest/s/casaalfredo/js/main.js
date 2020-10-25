/**
 * Script para gerenciar a tela wifi da Martin.
 * @author Alexandre Bolzon
 */
$(document).ready(function() {

  var header = $('header'),
      terms = $('#terms'),
      content = $('#content'),
      welcome = $('.welcome'),
      btnConnect = $('#btnConnect');

  function upSize() {
    $('.login').height(content.outerHeight(true));
    var w = $(window).width();
    w = Math.ceil(w / 1.5);
    $('.pratos').height(w);
  }

  function upConBtn() {
    var checked = terms.prop('checked'),
        text = checked ? btnConnect.attr('data-content') : 'aceite os termos';
    btnConnect.prop('disabled', !checked).val(text);
  }

  $('#btnAccept').click(function() {
    $('#tou').modal('hide');
    terms.prop('checked', true);
    upConBtn();
  });

  btnConnect.attr('data-content', btnConnect.val());
  upConBtn();
  terms.on('change', upConBtn);

  upSize();
  $(window).on('resize', upSize);

  var msgs = [ 'Welkom, vind ons leuk op', 'Welcome, like us on' ];
  msgs.push(welcome.text());

  var idx = 0;
  setInterval(function() {
    welcome.text(msgs[idx++]);
    if (idx >= msgs.length) idx = 0;
  }, 4000);

  content.fadeIn(500);

  function vegas(selector, imgs) {
    var slides = [];
    for (var i in imgs)
      slides.push({ src: 'images/pratos/' + imgs[i] });
    $(selector).vegas({
      timer: false,
      shuffle: true,
      preload: true,
      overlay: 'images/overlays/05.png',
      // transition: 'random',
      // transitionDuration: 4000,
      animation: 'random',
      slides: slides
    });
  }

  vegas('#pratos-tipicos', [ 'prato-tipico.png', 'prato-tipico2.png' ]);
  vegas('#pratos-executivos', [ 'prato-executivo.png', 'prato-executivo2.png' ]);
  vegas('#quarta-country', [ 'quarta-country.png', 'quarta-country2.png' ]);
  vegas('#happy-martin', [ 'happy-martin.png', 'happy-martin2.png', 'happy-martin3.png', 'happy-martin4.png' ]);
  vegas('#doces-tipicos', [ 'doce-tipico.png', 'doce-tipico2.png', 'doce-tipico3.png' ]);
  vegas('#cafes-especiais', [ 'cafe-especial.png', 'cafe-especial2.png' ]);
});
