$(document).ready(function(){
    $("nav, .repair__services").on("click","a", function (event) {
        event.preventDefault();
        var id  = $(this).attr('href'),
            top = $(id).offset().top - 70;
        $('body,html').animate({scrollTop: top}, 1500);
    });
});

$('.header__nav-item a').click(function(e){
  e.preventDefault();
  $('.burger').toggleClass('active');
  $('.header__nav').toggleClass('header__nav-active');
  $('.header__button').toggleClass('header__button-active');
  $('.header').toggleClass('header__float-show');
})



// float header

function toggleHeader() {
    var scroll_status = $(document).scrollTop();
    var ww = $(window).width();
    if (scroll_status > $(".header").height() && ww > 991) {
  
      $(".header").addClass('header_float');
      $('.header__nav').addClass('header__nav_height');
    }
    else {
      $(".header").removeClass('header_float');
      $('.header__nav').removeClass('header__nav_height');
    }
  }
  $(document).scroll(function () {
    toggleHeader();
  })

$(document).scroll(function () {
  svg4everybody();
})

// sliders

  $(document).ready(function () {
    //initialize swiper when document ready
    let mySwiper = new Swiper ('.swiper-container', {
      // Optional parameters
      slidesPerView: 2,
      spaceBetween: 20,
      autoHeight: true,
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      
      breakpoints: {
        320: {
          slidesPerView: 1,
        },
        576: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 2,
        },

      },
      on: {
        init: function() {
          checkArrow();
        },
        resize: function () {
          checkArrow();
        }
      },
    })
  });

  function checkArrow() {
    var swiperPrev = document.querySelector('.swiper-button-prev');
    var swiperNext = document.querySelector('.swiper-button-next');
    if ( window.innerWidth > 450 ) {
      //console.log('Success', window.innerWidth);
      swiperPrev.style.display = 'block';
      swiperNext.style.display = 'block';
    } else {
      swiperPrev.style.display = 'none';
      swiperNext.style.display = 'none';
    }
  }

  $('.repair__slider').each(function(){
    let swiper = new Swiper('.repair__slider', {
        // Optional parameters
        direction: 'vertical',
        slidesPerView: 1,
        spaceBetween: 30,
        noSwipingClass: "repair__slider",
        
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            },
            //effect: 'fade',
    })
});

/* window thanks */

$('.send-form').submit(function() {
    $.post($(this).attr('action'), $(this).serialize(), function(res) {         
   if (res.success == 1) {
       $('.popupCall').bPopup().close();
         $('.popupThanks').bPopup({
           closeClass:'close-popup-one',
               amsl: 0
          });
         setTimeout(function(){$('.popupThanks').bPopup().close();}, 6000);
     }else{
     alert(res.text);
     }
  }, 'json');
  return false;
})

/* wow animation */

new WOW().init();

// popup

$('.popupCall, .popupPolytic, .popupThanks').hide();

$('.linkCall').click(function(e){
    e.preventDefault();
	$('.popupCall').bPopup({
        closeClass:'popup__close, close',
        amsl: 0
    })
})

$('.linkCallThx').click(function(e){
    e.preventDefault();
	$('.popupThanks').bPopup({
        closeClass:'popup__close',
        amsl: 0
    })
})

// mask
$(document).ready(function () {
    $("input[name='phone']").mask(" +7 (999) 999-99-99");
});

$('.burger').click(function () {
    $(this).toggleClass('active');
    $('.header__nav').toggleClass('header__nav-active');
    $('.header__button').toggleClass('header__button-active');
    $('.header').toggleClass('header__float-show');
});

$('.not-show').hide();

$('.show-btn').click(function (e) {
    e.preventDefault();
    $('.not-show').fadeIn();
    $(this).hide();
});

$('.not-show-brands').hide();

$('.show-btn-brands').click(function (e) {
    e.preventDefault();
    $('.not-show-brands').fadeIn();
    $(this).hide();
});

// map

// ymaps.ready(init);

// function init() {
//     var myMap = new ymaps.Map("map", {
//             center: [55.73, 37.75],
//             zoom: 9,
//             controls: [],
            
//         }, 
//         {
//             searchControlProvider: 'yandex#search'
//         }),
        
//         yellowCollection = new ymaps.GeoObjectCollection(null, {
//             preset: 'islands#yellowIcon'
//         }),
//         blueCollection = new ymaps.GeoObjectCollection(null, {
//             preset: 'islands#blueIcon'
//         }),
//         yellowCoords = [[55.73, 37.75], [55.81, 37.75]],
//         blueCoords = [[55.73, 37.65], [55.81, 37.65]];

//     for (var i = 0, l = yellowCoords.length; i < l; i++) {
//         yellowCollection.add(new ymaps.Placemark(yellowCoords[i]));
//     }
//     for (var i = 0, l = blueCoords.length; i < l; i++) {
//         blueCollection.add(new ymaps.Placemark(blueCoords[i]));
//     }

//     myMap.controls.add('zoomControl');
//     myMap.behaviors.disable('scrollZoom');

//     myMap.geoObjects.add(yellowCollection).add(blueCollection);

//     // Через коллекции можно подписываться на события дочерних элементов.
//     yellowCollection.events.add('click', function () { alert('Кликнули по желтой метке') });
//     blueCollection.events.add('click', function () { alert('Кликнули по синей метке') });

//     // Через коллекции можно задавать опции дочерним элементам.
//     blueCollection.options.set('preset', 'islands#blueDotIcon');
// }


// form

$('.link-skidka').on('click', function() {
  $('.input-hidden').val('Скидка 25%');
});

$('.link-master-one').on('click', function() {
  $('.input-hidden').val('Мастер 1 - Иван');
});

$('.link-master-two').on('click', function() {
  $('.input-hidden').val('Мастер 2 - Иван');
});

$('.link-master-three').on('click', function() {
  $('.input-hidden').val('Мастер 3 - Иван');
});

$('.link-repair-one').on('click', function() {
  $('.input-hidden').val('Вид работ - ремонт холодильников');
});

$('.link-repair-two').on('click', function() {
  $('.input-hidden').val('Вид работ - ремонт стиральных машин');
});

$('.link-repair-three').on('click', function() {
  $('.input-hidden').val('Вид работ - ремонт посудомоечных машин');
});

$('.link-services').on('click', function() {
  $('.input-hidden').val('Услуги');
});

//Переменная для включения/отключения индикатора загрузки
var spinner = $('.ymap-container').children('.loader');
//Переменная для определения была ли хоть раз загружена Яндекс.Карта (чтобы избежать повторной загрузки при наведении)
var check_if_load = false;
//Необходимые переменные для того, чтобы задать координаты на Яндекс.Карте
var myMapTemp, myPlacemarkTemp;

//Функция создания карты сайта и затем вставки ее в блок с идентификатором "map-yandex"
function init () {
  var myMapTemp = new ymaps.Map("map", {
    center: [55.730138, 37.594238], // координаты центра на карте
    zoom: 7, // коэффициент приближения карты
    controls: ['zoomControl', 'fullscreenControl'] // выбираем только те функции, которые необходимы при использовании
  });
  var myPlacemarkTemp = new ymaps.GeoObject({
    geometry: {
        type: "Point",
        coordinates: [55.730138, 37.594238] // координаты, где будет размещаться флажок на карте
    }
  });
  myMapTemp.geoObjects.add(myPlacemarkTemp); // помещаем флажок на карту

  myMapTemp.controls.add('zoomControl');
  myMapTemp.behaviors.disable('scrollZoom');

  // Получаем первый экземпляр коллекции слоев, потом первый слой коллекции
  var layer = myMapTemp.layers.get(0).get(0);

  // Решение по callback-у для определния полной загрузки карты
  waitForTilesLoad(layer).then(function() {
    // Скрываем индикатор загрузки после полной загрузки карты
    spinner.removeClass('is-active');
  });
}

// Функция для определения полной загрузки карты (на самом деле проверяется загрузка тайлов) 
function waitForTilesLoad(layer) {
  return new ymaps.vow.Promise(function (resolve, reject) {
    var tc = getTileContainer(layer), readyAll = true;
    tc.tiles.each(function (tile, number) {
      if (!tile.isReady()) {
        readyAll = false;
      }
    });
    if (readyAll) {
      resolve();
    } else {
      tc.events.once("ready", function() {
        resolve();
      });
    }
  });
}

function getTileContainer(layer) {
  for (var k in layer) {
    if (layer.hasOwnProperty(k)) {
      if (
        layer[k] instanceof ymaps.layer.tileContainer.CanvasContainer
        || layer[k] instanceof ymaps.layer.tileContainer.DomContainer
      ) {
        return layer[k];
      }
    }
  }
  return null;
}

// Функция загрузки API Яндекс.Карт по требованию (в нашем случае при наведении)
function loadScript(url, callback){
  var script = document.createElement("script");

  if (script.readyState){  // IE
    script.onreadystatechange = function(){
      if (script.readyState == "loaded" ||
              script.readyState == "complete"){
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {  // Другие браузеры
    script.onload = function(){
      callback();
    };
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
}

// Основная функция, которая проверяет когда мы навели на блок с классом "ymap-container"
var ymap = function() {
  $('.ymap-container').mouseenter(function(){
      if (!check_if_load) { // проверяем первый ли раз загружается Яндекс.Карта, если да, то загружаем
    
      // Чтобы не было повторной загрузки карты, мы изменяем значение переменной
        check_if_load = true; 
    
    // Показываем индикатор загрузки до тех пор, пока карта не загрузится
        spinner.addClass('is-active');

    // Загружаем API Яндекс.Карт
        loadScript("https://api-maps.yandex.ru/2.1/?lang=ru_RU&loadByRequire=1", function(){
           // Как только API Яндекс.Карт загрузились, сразу формируем карту и помещаем в блок с идентификатором "map-yandex"
           ymaps.load(init);
        });                
      }
    }
  );  
}

$(function() {

  //Запускаем основную функцию
  ymap();

});

let d = new Date();

function formatDate(date) {

  let dd = date.getDate();
  if (dd < 10) dd = '0' + dd;

  let mm = date.getMonth() + 1;
  if (mm < 10) mm = '0' + mm;

  let yy = date.getFullYear() % 100;
  if (yy < 10) yy = '0' + yy;

  return dd + '.' + mm + '.' + yy;
}

$('.currentDay').html(formatDate(d));