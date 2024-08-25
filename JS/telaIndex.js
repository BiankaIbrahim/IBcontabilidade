document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.slider');
    const cards = document.querySelectorAll('.card');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');

    let currentIndex = 0;
    let autoSlideInterval;

    const updateSliderPosition = () => {
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    };

    const showPrevCard = () => {
        currentIndex = (currentIndex === 0) ? cards.length - 1 : currentIndex - 1;
        updateSliderPosition();
    };

    const showNextCard = () => {
        currentIndex = (currentIndex === cards.length - 1) ? 0 : currentIndex + 1;
        updateSliderPosition();
    };

    const startAutoSlide = () => {
        autoSlideInterval = setInterval(showNextCard, 3000); // Alterna a cada 3 segundos
    };

    const stopAutoSlide = () => {
        clearInterval(autoSlideInterval);
    };

    prevButton.addEventListener('click', () => {
        stopAutoSlide();
        showPrevCard();
        startAutoSlide(); // Reinicia o slide automático após a navegação manual
    });

    nextButton.addEventListener('click', () => {
        stopAutoSlide();
        showNextCard();
        startAutoSlide(); // Reinicia o slide automático após a navegação manual
    });

    startAutoSlide(); // Inicia o slide automático
});
