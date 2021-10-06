const carouselInterval = 5000;

let carousels = document.getElementsByClassName('carousel');

for (let carousel of carousels) {
    let screenshotList = carousel.querySelector<HTMLOListElement>('.screenshots');
    let indexList = carousel.querySelector<HTMLOListElement>('.indexes');

    let interval = startCarousel(screenshotList, indexList);

    indexList.addEventListener('click', (e) => {
        if (e.target instanceof HTMLButtonElement) {
            let clickedIndex = e.target.parentElement;

            if (!clickedIndex.classList.contains('active-index')) {
                let currentScreenshot = screenshotList.querySelector('.active-screenshot');
                let currentIndex = indexList.querySelector('.active-index');
    
                let nextScreenshot = document.getElementById(clickedIndex.dataset.screenshot);
    
                switchScreenshot(
                    currentScreenshot,
                    currentIndex,
                    nextScreenshot,
                    clickedIndex
                );

                clearInterval(interval);

                interval = startCarousel(screenshotList, indexList);
            }
        }
    });
}

function startCarousel(screenshotList: HTMLOListElement, indexList: HTMLOListElement): number {
    return setInterval(() => {
        let currentScreenshot = screenshotList.querySelector('.active-screenshot');
        let currentIndex = indexList.querySelector('.active-index');
        
        let nextScreenshot = currentScreenshot.nextElementSibling ?? screenshotList.firstElementChild;
        let nextIndex = currentIndex.nextElementSibling ?? indexList.firstElementChild;

        switchScreenshot(
            currentScreenshot,
            currentIndex,
            nextScreenshot,
            nextIndex
        );
    }, carouselInterval);
}

function switchScreenshot(
    currentScreenshot: Element,
    currentIndex: Element,
    nextScreenshot: Element,
    nextIndex: Element
): void {
    currentScreenshot.classList.remove('active-screenshot');
    currentIndex.classList.remove('active-index');
    
    nextScreenshot.classList.add('active-screenshot');
    nextIndex.classList.add('active-index');
}