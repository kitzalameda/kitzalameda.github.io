var swiper = new Swiper('.swiper-container', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    loop: true,
    slideToClickedSlide: true,
    coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows : false,
    },
    on: {
        click: function(){
            console.log(this.clickedSlide);
        }
    }
});