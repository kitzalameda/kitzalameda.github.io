new TypeIt("#heading", {
    strings: "Our journey together so far...",
    speed: 75,
    loop: false,
}).go();

// $('#fullpage').fullpage({
//     anchors: ['firstSection', 'secondSection'],
//     afterLoad: function(anchorLink, index, slideAnchor, slideIndex) {
//         if(index == 2) {
//             $.fn.fullpage.setAllowScrolling(false, 'up');
//         }
//     }
// });

$('.see-map i').on('click', function(e) {
    $('.section.body').addClass('shown');
});

$('.see-home i').on('click', function(e) {
    $('.section.body').removeClass('shown');
});

var letter = $('#letter').html();

function initMap(locations = 
    [
        [letter, 35.69482933913034, -100.87972470742659, 3, 'Click me', 'img/img57.png'],
        ['Bubba (You)', 33.69482933913034, -117.87972470742659, 2, 'You', 'img/img50.png'],
        ['Bubba (Me)', 14.866261257914537, 120.79675180817016, 1, 'Me', 'img/img51.png'],
    ], centerLat = 0, centerLng = 10.25) {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 3.6,
        center: new google.maps.LatLng(centerLat, centerLng),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    
    var infowindow = new google.maps.InfoWindow();

    var marker, i;
    
    for (i = 0; i < locations.length; i++) {  
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i][1], locations[i][2]),
            map: map,
            title: locations[i][4],
            icon: locations[i][5]
        });
        
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
            infowindow.setContent(locations[i][0]);
            infowindow.open(map, marker);
            }
        })(marker, i));
    }
    
    google.maps.event.addListener(infowindow, 'domready', function(){
        $('body .place-window .place-title, body .place-window img').on('click', function(e) {
            $('body').addClass('static');
            var place = $(this).closest('.place-window').data('place');
            $('.place-modal-overlay').removeClass('hidden');
            $('.place-modal.'+place+'').addClass('active');
            $('.place-modal.'+place+' .place-carousel').not('.slick-initialized').slick();
            
        });
        $('.place-modal .close').on('click', function(e) {
            $('body').removeClass('static');
            $('.place-modal-overlay').addClass('hidden');
            $('.place-modal').removeClass('active');
        });

        $('body .letter-window .letter-title').on('click', function(e) {
            $('body').addClass('static');
            $('.place-modal-overlay').removeClass('hidden');
            $('.letter-modal').addClass('active');
        });

        $('.letter-modal .close').on('click', function(e) {
            $('body').removeClass('static');
            $('.place-modal-overlay').addClass('hidden');
            $('.letter-modal').removeClass('active');
        });
    });

}

function replaceMarker(location, centerLat, centerLng) {
    initMap(location, centerLat, centerLng);
}

$('.change-markers.us').click(function(e) {
    $('.change-markers').removeClass('active');
    $(this).addClass('active');
    var locations = [
        [letter, 35.69482933913034, -100.87972470742659, 3, 'Click me', 'img/img57.png'],
        ['Bubba (You)', 33.69482933913034, -117.87972470742659, 2, 'You', 'img/img50.png'],
        ['Bubba (Me)', 14.866261257914537, 120.79675180817016, 1, 'Me', 'img/img51.png'],
    ];
    replaceMarker(locations, 0, 10.25);
});

$('.change-markers.places').click(function(e) {
    $('.change-markers').removeClass('active');
    $(this).addClass('active');
    var baguio = $('#baguio').html(),
        elyu   = $('#elyu').html(),
        zambales = $('#zambales').html(),
        boracay = $('#boracay').html(),
        bulacan = $('#bulacan').html(),
        manila = $('#manila').html(),
        locations = [
        [manila, 14.650081198904624, 121.03857023136749, 7],
        [bulacan, 14.788662103783661, 120.8499825157401, 5],
        [elyu, 16.695968059759387, 120.47131645126285, 4],
        [zambales, 15.09166639719111, 120.11122905803516, 3],
        [boracay, 11.968603, 121.918381, 2],
        [baguio, 16.419154110089867, 120.57847442998921, 1]
    ];
    replaceMarker(locations, 12.416582048046246, 121.50458029528278);
});

window.initMap = initMap;