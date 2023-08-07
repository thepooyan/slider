$(function () {
    const mainSlider = dc.id("mainSlider");
    if (mainSlider) {
        new HomeSlider(mainSlider);
    }
})

class HomeSlider {
    constructor(container) {
        this.nextBtn = container.query("#right");
        this.prevBtn = container.query("#left");
        this.images = container.queries('img');
        this.anchor = container.query('a');
        this.dotsContainer = container.query('.dots');
        
        this.init();
    }
    get activeImageIndex() {
       return this.activeImageIndexVal ? this.activeImageIndexVal : 0;
    }
    set activeImageIndex(val) {
        if (val > this.images.length-1) val = 0; 
        if (val < 0) val = this.images.length - 1;
        
        this.activeImageIndexVal = val;
    }
    init() {
        this.images[0].classList.add('active');
        this.anchor.href = this.images[0].dataset.href;
        this.createDots();

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
            },
            set set(index) {
                that.activeImageIndex = index;
            }
        }
    }
    createDots() {
        let allDots = [];

        this.images.forEach((i, index) => {
            let dot = document.createElement('span');
            allDots.push(dot);

            dot.addEventListener('click', ()=>{
                this.move(index);
                allDots.forEach(i => i.classList.remove('active'));
                dot.classList.add('active');
            });
            this.dotsContainer.appendChild(dot);
        })

        allDots[0].classList.add('active');
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
    move(index) {
        this.activeImage.get.classList.remove('active');
        this.activeImage.set = index;
        this.activeImage.get.classList.add('active');
        this.anchor.href = this.activeImage.get.dataset.href;
    }
}