$(function () {
    const mainSlider = dc.id("mainSlider");
    if (mainSlider) {
        new HomeSlider(mainSlider, { timer: 2000 });
    }
})

class HomeSlider {
    constructor(container, options) {
        this.nextBtn = container.query("#right");
        this.prevBtn = container.query("#left");
        this.images = container.queries('img');
        this.anchor = container.query('a');
        this.dotsContainer = container.query('.dots');
        this.dots = this.createDots();

        let specialCase;
        if (this.images.length === 1) specialCase = 'single'
        if (this.images.length === 0) specialCase = 'empty';

        if (specialCase) {
            container.classList.add(specialCase);
            this.images[0]?.classList.add('active');
            return
        } else
            this.init(options);
    }
    get activeDot() {
        return this.dots[this.activeIndex];
    }
    get activeImage() {
        return this.images[this.activeIndex];
    }
    get activeIndex() {
        return this.activeImageIndexVal ? this.activeImageIndexVal : 0;
    }
    set activeIndex(val) {
        if (val > this.images.length - 1) val = 0;
        if (val < 0) val = this.images.length - 1;

        this.activeImageIndexVal = val;
    }
    init(options) {
        //set initial active items
        this.images[0].classList.add('active');
        this.dots[0].classList.add('active');
        this.anchor.href = this.images[0].dataset.href;

        //add next/prev click events
        this.nextBtn.addEventListener('click', () => {
            this.next();
        })
        this.prevBtn.addEventListener('click', () => {
            this.prev();
        })

        //set timer if given in the options
        if (options.timer) {
            this.timerInterval = options.timer;
            this.setMoveTimeout();
        }
    }
    createDots() {
        let allDots = [];

        this.images.forEach((i, index) => {
            let dot = document.createElement('span');
            allDots.push(dot);

            dot.addEventListener('click', () => { this.move(index); });

            this.dotsContainer.appendChild(dot);
        })

        return allDots;
    }
    next() {
        let index = this.activeIndex + 1;
        this.move(index);
    }
    prev() {
        let index = this.activeIndex - 1;
        this.move(index);
    }
    move(index) {
        this.activeImage.classList.remove('active');
        this.activeDot.classList.remove('active');
        this.activeIndex = index;
        this.activeImage.classList.add('active');
        this.activeDot.classList.add('active');
        this.anchor.href = this.activeImage.dataset.href;

        if (this.timerInterval) this.setMoveTimeout();
    }
    setMoveTimeout() {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            this.next();
        }, this.timerInterval);
    }
}