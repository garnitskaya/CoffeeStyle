import mugs from './mugs.js';

// Mugs
const mugsBlock = document.querySelector('.mugs__blocks');
const moreProductsBlock = document.querySelector('.more-products__blocks');

const featuredMugs = mugs.filter(item => item.featured);

function showMugs(mugs, block, className) {
    mugs.forEach(({ img, name, price, newPrice, sale }) => {

        const element = document.createElement('div');
        element.classList.add(`${className}__block`, 'block', 'swiper-slide');

        element.innerHTML = `
            <div class="${className}__img">
                ${sale ? `<span class="sale__label">On Sale.</span>` : ''}
                <img src=${img} alt=${name}>
                <a href="#" target='_blank' class="${className}__button button">Explore Mug</a>
            </div>
            <div class="${className}__name name">${name}</div>
            
            ${sale ?
                `<div class="${className}__price price">
                    <span class="sale">${newPrice}</span>
                    <span class="price__sale">${price}</span>
                </div>` :
                `<div class="${className}__price price">${price}</div>`}
    `
        block.append(element);
    })
};

showMugs(featuredMugs, mugsBlock, 'mugs');
showMugs(mugs, moreProductsBlock, 'more-products');

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