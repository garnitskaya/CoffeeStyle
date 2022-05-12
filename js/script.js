import mugs from './mugs.js';

// Mugs
const blocks = document.querySelectorAll('[sale]');

blocks.forEach((block, i) => {
    const img = block.querySelector('img'),
        priceBlock = block.querySelector('.price'),
        newPrice = document.createElement('div');

    priceBlock.classList.add('price__sale');
    newPrice.classList.add('sale');

    if (priceBlock.getAttribute('data-sale') == i) {
        newPrice.textContent = mugs[i][i];
    };

    priceBlock.prepend(newPrice);
    img.insertAdjacentHTML('beforebegin', '<span class="sale__label">On Sale.</span>');

});

// Slide
const sliderSwiper = document.querySelector('.mugs');
const sliderSwiperMore = document.querySelector('.more-products');
let { clientWidth } = document.body;
let slider;

const sliderInit = () => {
    new Swiper(sliderSwiper, {
        breakpoints: {
            640: {
                slidesPerView: 1,
                spaceBetween: 20
            },
            1024: {
                slidesPerView: 2,
                spaceBetween: 20
            }
        }
    })
};

const sliderInitMore = () => {
    slider = new Swiper(sliderSwiperMore, {
        breakpoints: {
            320: {
                enabled: true,
                slidesPerView: 2,
                spaceBetween: 17
            },
            1024: {
                enabled: false,
            }
        }
    })
}

const resizeHandlerSlider = () => {
    if (clientWidth !== document.body.clientWidth) {
        clientWidth = document.body.clientWidth;

        if (slider) {
            slider.destroy();
        }

        sliderInitMore();
    }
}
sliderInit();
window.addEventListener('resize', resizeHandlerSlider);

// Buttons
const btnShow = (selector) => {
    const blocks = document.querySelectorAll(selector);

    function showBtn(block) {
        const img = block.querySelector('img');
        const btn = block.querySelector('a');
        img.classList.add('hide')
        btn.classList.add('show')
    }

    function hideBtn(block) {
        const img = block.querySelector('img');
        const btn = block.querySelector('a');
        img.classList.remove('hide')
        btn.classList.remove('show')
    };

    blocks.forEach(block => {
        block.addEventListener('mouseover', (e) => {
            showBtn(block);
        });
        block.addEventListener('mouseout', (e) => {
            hideBtn(block);
        });
    });

}

btnShow('.mugs__img');
btnShow('.more-products__img');