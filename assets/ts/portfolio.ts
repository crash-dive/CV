const carouselInterval = 5000;
const carousels = document.querySelectorAll<HTMLDivElement>('.carousel');

for (let carousel of carousels) {
    const screenshots = carousel.querySelector<HTMLOListElement>('.screenshots');
    const indexes = carousel.querySelector<HTMLOListElement>('.indexes');
    const closeFullscreenBtn = carousel.querySelector('.close-fullscreen');
    
    let interval = startCarousel(carousel);
    
    screenshots.addEventListener('click', openFullscreen);
    closeFullscreenBtn.addEventListener('click', closeFullscreen);
    
    indexes.addEventListener('click', changeToSelectedIndex);
    
    carousel.addEventListener('touchstart', carouselTouchStart);
    carousel.addEventListener('touchmove', carouselTouchMove);

    function openFullscreen(e: Event): void {
        if (
            !carousel.classList.contains('fullscreen') &&
            e.target instanceof HTMLImageElement
        ) {
            carousel.classList.add('fullscreen');
            stopCarousel(interval);
            document.onkeydown = fullscreenKeyboardNavigation;
            document.documentElement.style.overflow = 'hidden';
        }
    }

    function closeFullscreen(): void {
        if (carousel.classList.contains('fullscreen')) {
            carousel.classList.remove('fullscreen');
            interval = startCarousel(carousel);
            document.onkeydown = null;
            document.documentElement.style.removeProperty('overflow');
        }
    }

    function fullscreenKeyboardNavigation(e: KeyboardEvent) {
        if (
            e.key === 'Escape' || 
            e.key === 'Esc'
        ) {
            closeFullscreen();
        }
        else if (e.key === 'ArrowLeft') {
            previousScreenshot(carousel);
        }
        else if (e.key === 'ArrowRight') {
            nextScreenshot(carousel);
        }
    };

    function changeToSelectedIndex(e: Event): void {
        if (e.target instanceof HTMLButtonElement) {
            let selectedIndex = e.target.parentElement;

            if (!selectedIndex.classList.contains('active-index')) {
                let currentScreenshot = screenshots.querySelector('.active-screenshot');
                let currentIndex = indexes.querySelector('.active-index');
    
                let selectedScreenshot = document.getElementById(selectedIndex.dataset.screenshot);
    
                changeScreenshot(
                    currentScreenshot,
                    currentIndex,
                    selectedScreenshot,
                    selectedIndex
                );

                stopCarousel(interval);
            }
        }
    }

    let xTouchStart: number = null;
    let yTouchStart: number = null;

    function carouselTouchStart(e: TouchEvent) {
        const firstTouch = e.touches[0];
        xTouchStart = firstTouch.clientX;
        yTouchStart = firstTouch.clientY;
    };

    function carouselTouchMove(e: TouchEvent) {
        if (
            xTouchStart !== null &&
            yTouchStart !== null
        ) {
            const endTouch = e.touches[0];
            const xTouchDiff = xTouchStart - endTouch.clientX;
            const yTouchDiff = yTouchStart - endTouch.clientY;

            if (swipedLeftOrRight(xTouchDiff, yTouchDiff)) {
                if (swipedLeft(xTouchDiff)) {
                    previousScreenshot(carousel);
                    stopCarousel(interval);
                } 
                else if (swipedRight(xTouchDiff)) {
                    nextScreenshot(carousel);
                    stopCarousel(interval);
                }
            }

            xTouchStart = null;
            yTouchStart = null;
        }
    };

    function swipedLeftOrRight(xTouchDiff: number, yTouchDiff: number): boolean {
        return Math.abs(xTouchDiff) > Math.abs(yTouchDiff);
    }

    function swipedLeft(xTouchDiff: number): boolean {
        return xTouchDiff > 0;
    }

    function swipedRight(xTouchDiff: number): boolean {
        return xTouchDiff < 0;
    }
}

function startCarousel(carousel: HTMLDivElement): number {
    return setInterval(() => {
        nextScreenshot(carousel);
    }, carouselInterval);
}

function stopCarousel(interval: number): void {
    clearInterval(interval);
}

function nextScreenshot(carousel: HTMLDivElement): void {
    const currentScreenshot = carousel.querySelector<HTMLLIElement>('.active-screenshot');
    const currentIndex = carousel.querySelector<HTMLLIElement>('.active-index');
    
    const nextScreenshot = currentScreenshot.nextElementSibling ?? currentScreenshot.parentElement.firstElementChild;
    const nextIndex = currentIndex.nextElementSibling ?? currentIndex.parentElement.firstElementChild;

    changeScreenshot(
        currentScreenshot,
        currentIndex,
        nextScreenshot,
        nextIndex
    );
}

function previousScreenshot(carousel: HTMLDivElement): void {
    const currentScreenshot = carousel.querySelector<HTMLLIElement>('.active-screenshot');
    const currentIndex = carousel.querySelector<HTMLLIElement>('.active-index');
    
    const previousScreenshot = currentScreenshot.previousElementSibling ?? currentScreenshot.parentElement.lastElementChild;
    const previousIndex = currentIndex.previousElementSibling ?? currentIndex.parentElement.lastElementChild;

    changeScreenshot(
        currentScreenshot,
        currentIndex,
        previousScreenshot,
        previousIndex
    );
}

function changeScreenshot(
    currentScreenshot: Element,
    currentIndex: Element,
    changeToScreenshot: Element,
    changeToIndex: Element
): void {
    currentScreenshot.classList.remove('active-screenshot');
    currentIndex.classList.remove('active-index');
    
    changeToScreenshot.classList.add('active-screenshot');
    changeToIndex.classList.add('active-index');
}
