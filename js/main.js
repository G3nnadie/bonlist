$(document).ready(function () {

  // Kupon Print 
  $('#button_kupon_print').click(function (e) {
  e.preventDefault();

  $( "#kupon_form" ).submit();
  
  });

  // Metro 
  $('#metro_button').click(function (e) {
  e.preventDefault();

  $( "#metro_form" ).submit();
  
  });
  

  // Kupon 
  $('#getkupon_button').click(function (e) {
  e.preventDefault();
  
    $.ajax({
            type: "POST",
            url: '/cmd/kupon.php',
            data: { action_id: $("#getkupon_action_id").val(), cnt: $("#getkupon_cnt").val()},
            success: function (data) {
                
        var list     = JSON.parse ( data );
    
        //alert($("#getkupon_action_id").val());        
        //alert($("#getkupon_cnt").val());        
    
        if (list['code']==200){
        
        
        $( "#kupon_prepare" ).hide(); 
        $( "#kupon_ready" ).show();   
        $( "#kupon_order_id" ).val(list['order_id']); 
          
          var kupons = list.kupon_list;
          var tbl = '';
        for (i=0;i<kupons.length;i++){
          tbl = tbl + '<li class="coupon__list__item fx align-start"><label class="coupon__list__check checkbox fx"><input type="checkbox" name="kupon[]" value="'+kupons[i]['id']+'" checked="" /><span class="checkbox__custom"></span></label><span class="coupon__list__name">'+kupons[i]['title']+'</span><span class="coupon__list__num">в„– '+kupons[i]['num']+'</span></li>';
        }
        
        $( "#kupon_list" ).html(tbl);
 
          
        
        
        } else {
        alert('РћС€РёР±РєР° РїРѕР»СѓС‡РµРЅРёСЏ РєСѓРїРѕРЅРѕРІ');        
        }
      
            },
            error: function (jqXHR, text, error) {  
            }
        }); 
  
  
  });
  
  
  // Login
  $('#login_button').click(function (e) {
  e.preventDefault();

    $.ajax({
            type: "POST",
            url: '/cmd/auth.php',
            data: { pass: $("#login_password").val(), phone: $("#login_phone").val()},
            success: function (data) {
                
        var list     = JSON.parse ( data );
    
        if (list['code']==200){
        window.location.replace("/");         
        } else
        alert('РћС€РёР±РєР° Р°РІС‚РѕСЂРёР·Р°С†РёРё');       
      
            },
            error: function (jqXHR, text, error) {  
            }
        }); 
  
  
  });

  // Registration
  $('#reg_button').click(function (e) {
  e.preventDefault();

    $.ajax({
            type: "POST",
            url: '/cmd/reg.php',
            data: { name: $("#reg_name").val(), email: $("#reg_email").val(), pass: $("#reg_password").val(), phone: $("#reg_phone").val(), user_id: $("#reg_user_id").val(), smscode: $("#reg_smscode").val()},
            success: function (data) {
                
        var list     = JSON.parse ( data );
        
      
        if (list['code']==200){
        
        if (list['reg'] == 1) {
        $( "#reg_add" ).hide(); 
        $( "#reg_p" ).hide();           
            $("#reg_user_id").val(list['user_id']);       
        alert( "Р’РІРµРґРёС‚Рµ SMS-РєРѕРґ РґР»СЏ РїРѕРґС‚РІРµСЂР¶РґРµРЅРёСЏ С‚РµР»РµС„РѕРЅР°" );
        $( "#reg_label" ).show();  
        $("#reg_button").html('Р—Р°РІРµСЂС€РёС‚СЊ СЂРµРіРёСЃС‚СЂР°С†РёСЋ');       
        }
        
        if (list['activate'] == 1) {
        $("#reg_form").html('Р РµРіРёСЃС‚СЂР°С†РёСЏ Р·Р°РІРµСЂС€РµРЅР° СѓСЃРїРµС€РЅРѕ');      
        }       
        
        
        } else {
        alert('РћС€РёР±РєР° СЂРµРіРёСЃС‚СЂР°С†РёРё');       
        }
        
        
        
            },
            error: function (jqXHR, text, error) {  
            }
        }); 
  
  
  });
  
  // Dropdown
  $('.nav__link').click(function (e) {
    e.preventDefault();
    $(this).parent('.nav__item').toggleClass('active');
    $(this).parent('.nav__item').find('.nav__drop').slideToggle( 300, function() {});
  });

  // Search autocomplete
  var countries = [
    { value: 'Andorra', data: 'AD' },
    { value: 'Zimbabwe', data: 'ZZ' }
  ];

  $('#autocomplete').autocomplete({
    lookup: countries,
    onSelect: function (suggestion) {
      // alert('You selected: ' + suggestion.value + ', ' + suggestion.data);
    },
    showNoSuggestionNotice: true,
    noSuggestionNotice: 'РќРёС‡РµРіРѕ РЅРµ РЅР°Р№РґРµРЅРѕ'
  });

  // Show menu
  $('.navbar-toggle').click(function() {
    $(this).toggleClass('active');
    $('.aside').toggleClass('open');
  });

  $(document).click(function(event) {
    if ($(event.target).closest('.navbar-toggle').length 
      || $(event.target).closest('.aside').length ) return;
      $('.aside').removeClass('open');
      $('.navbar-toggle').removeClass('active');
      event.stopPropagation();
  });

  // Tabs
  $('.tabs__item').not(':first').hide();
  $('.tabs__name').click(function() {
    $('.tabs__name').removeClass('active').eq($(this).index()).addClass('active');
    $('.tabs__item').hide().eq($(this).index()).fadeIn()
  }).eq(0).addClass('active');

  // Modal
  $('.open-modal-login').click(function(e) {
    e.preventDefault();
    $('.modal_login').fadeIn();
  })
  $('.open-modal-reg').click(function(e) {
    e.preventDefault();
    $('.modal_reg').fadeIn();
  })
  $('.open-modal-append').click(function(e) {
    e.preventDefault();
    $('.modal_append').fadeIn();
  })
  $('.open-modal-coupon').click(function(e) {
    e.preventDefault();
  $( "#kupon_prepare" ).show(); 
  $( "#kupon_ready" ).hide(); 
  
    $.ajax({
            type: "POST",
            url: '/cmd/action.php',
            data: { action_id: this.id },
            success: function (data) {
                
        var list     = JSON.parse ( data );
        
        $( "#kupon_action_title" ).html(list['title']);
        $( "#getkupon_action_id" ).val(list['id']);
      
            },
            error: function (jqXHR, text, error) {  
            }
        }); 
    
  
    $('.modal_coupon').fadeIn();
  })
  $('.way-nav__metro').click(function(e) {
    e.preventDefault();
    $('.modal_city').fadeIn();
  })

  $('.form__modal__reg').click(function(e) {
    e.preventDefault();
    $('.modal').fadeOut();
    $('.modal_reg').fadeIn();
  });
  $('.form__modal__login').click(function(e) {
    e.preventDefault();
    $('.modal').fadeOut();
    $('.modal_login').fadeIn();
  });

  $('.modal__close').click(function() {
    $('.modal').fadeOut();
  });

  $(document).click(function(event) {
    if ($(event.target).closest('.open-modal-login').length 
      || $(event.target).closest('.open-modal-reg').length
      || $(event.target).closest('.open-modal-coupon').length
      || $(event.target).closest('.open-modal-append').length
      || $(event.target).closest('.way-nav__metro').length
      || $(event.target).closest('.modal__box').length ) return;
      $('.modal').fadeOut();
      event.stopPropagation();
  });

  // Amount
  $('.amount__down').click(function () {
  var $input = $( "#getkupon_cnt");
    var count = parseInt($input.val()) - 1;
    count = count < 1 ? 1 : count;
    $input.val(count);
    $input.change();
    return false;
  });
  $('.amount__up').click(function () {
  var $input = $( "#getkupon_cnt");
    $input.val(parseInt($input.val()) + 1);
    $input.change();
    return false;
  });

  // Star
  $('#score').raty({
    score: function() {
      return $(this).attr('data-rating');
    },
    path: '/img/icons'
  });

  // Desc tabs
  $('.desc__item').not(':first').hide();
  $('.desc__head__desc').click(function() {
    $('.desc__head__desc').removeClass('active').eq($(this).index()).addClass('active');
    $('.desc__item').hide().eq($(this).index()).fadeIn()
  }).eq(0).addClass('active');

  // Maskedinput
  $(function($){
    $('.phone-mask').mask(('+7 ') + '(999) 999-99-99');
  });

  // Gallery sl
  $('.stocks__gallery__big').slick({
    arrows: false,
    autoplay: false,
    slidesToShow: 1,
    infinite: false,
    swipe: false,
    autoplaySpeed: 5000,
    dots: false,
    asNavFor: '.stocks__gallery__small'
  });

  $('.stocks__gallery__small').slick({
    arrows: false,
    autoplay: false,
    slidesToShow: 4,
    infinite: false,
    swipe: false,
    autoplaySpeed: 5000,
    focusOnSelect: true,
    dots: false,
    asNavFor: '.stocks__gallery__big',
    responsive: [
      {
        breakpoint: 480,
        settings: {
          swipe: true,
          slidesToShow: 2
        }
      }
    ]
  });

});