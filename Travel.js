const sliderItems = document.querySelector('.slider-items');
const sliderItem = document.querySelectorAll('.slider-item');
const sliderArrowLeft = document.querySelector('.slider-arrow-left');
const sliderArrowRight = document.querySelector('.slider-arrow-right');

let startX, currentX, endX, moveX, threshold = 50;
let counter = 0;
const interval = 6000; // 6 seconds

function slideLeft() {
  if (counter > 0) {
    counter--;
  } else {
    counter = sliderItem.length - 1;
  }
  sliderItems.style.transform = `translateX(-${counter * 33.33}%)`;
}

function slideRight() {
  if (counter < sliderItem.length - 1) {
    counter++;
  } else {
    counter = 0;
  }
  sliderItems.style.transform = `translateX(-${counter * 33.33}%)`;
}

function handleTouchStart(e) {
  startX = e.touches[0].clientX;
}

function handleTouchMove(e) {
  e.preventDefault();
  currentX = e.touches[0].clientX;
  moveX = currentX - startX;
  sliderItems.style.transform = `translateX(-${counter * 33.33 + moveX}px)`;
}

function handleTouchEnd(e) {
  endX = e.changedTouches[0].clientX;
  if (moveX > threshold && counter > 0) {
    slideLeft();
  } else if (moveX < -threshold && counter < sliderItem.length - 1) {
    slideRight();
  } else {
    sliderItems.style.transform = `translateX(-${counter * 33.33}%)`;
  }
}

sliderArrowLeft.addEventListener('click', slideLeft);
sliderArrowRight.addEventListener('click', slideRight);
sliderItems.addEventListener('touchstart', handleTouchStart);
sliderItems.addEventListener('touchmove', handleTouchMove);
sliderItems.addEventListener('touchend', handleTouchEnd);

setInterval(slideRight, interval);


