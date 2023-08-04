$(function () {
    const mainSlider = dc.id("mainSlider");
    if (mainSlider) {
        let a =new HomeSlider(mainSlider);
        a.next();
    }
})

class HomeSlider {
    images;

    constructor(container) {
        this.nextBtn = container.query("#right");
        this.prevBtn = container.query("#left");
        this.images = container.queries('img');
        this.images[0].classList.add('active');

        this.nextBtn.addEventListener('click', () => {
            this.next();
        })
        this.prevBtn.addEventListener('click', () => {
            this.prev();
        })
    }
    get activeImageIndex() {
       return this.activeImageIndexVal ? this.activeImageIndexVal : 0;
    }
    set activeImageIndex(val) {
        if (val > this.images.length-1) val = 0; 
        if (val < 0) val = this.images.length - 1;
        
        this.activeImageIndexVal = val;
    }
    next() {
        this.images[this.activeImageIndex].classList.remove('active');
        this.activeImageIndex++;
        this.images[this.activeImageIndex].classList.add('active');
    }
    prev() {
        this.images[this.activeImageIndex].classList.remove('active');
        this.activeImageIndex--;
        this.images[this.activeImageIndex].classList.add('active');
    }
}