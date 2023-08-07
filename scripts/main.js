$(function () {
    const mainSlider = dc.id("mainSlider");
    if (mainSlider) {
        let a =new HomeSlider(mainSlider);
    }
})

class HomeSlider {
    constructor(container) {
        this.nextBtn = container.query("#right");
        this.prevBtn = container.query("#left");
        this.images = container.queries('img');
        this.anchor = container.query('a');
        this.images[0].classList.add('active');
        this.anchor.href = this.images[0].dataset.href;

        this.nextBtn.addEventListener('click', () => {
            this.next();
        })
        this.prevBtn.addEventListener('click', () => {
            this.prev();
        })

        let that = this;
        this.activeImage = {
            next: function() {
                that.activeImageIndex++;
            },
            prev: function() {
                that.activeImageIndex--;
            },
            get get() {
                return that.images[that.activeImageIndex];
            }
        }
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
        this.activeImage.get.classList.remove('active');
        this.activeImage.next();
        this.activeImage.get.classList.add('active');
        this.anchor.href = this.activeImage.get.dataset.href;
    }
    prev() {
        this.activeImage.get.classList.remove('active');
        this.activeImage.prev();
        this.activeImage.get.classList.add('active');
        this.anchor.href = this.activeImage.get.dataset.href;
    }
}