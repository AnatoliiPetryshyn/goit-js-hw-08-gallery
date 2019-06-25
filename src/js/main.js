'use strict';
import galleryItems from './gallery-items.js';

const refs = {
  ul: document.querySelector('.gallery'),
  div: document.querySelector('.lightbox'),
  lightboxImg: document.querySelector('.lightbox__image'),
  lightbox: document.querySelector('.lightbox'),
  closeModalBtn: document.querySelector('button[data-action="close-lightbox"]'),
  lightboxContent: document.querySelector('.lightbox__content'),
};

// создаем разметку галереи
const galleryMarkup = galleryItems.reduce((acc, item) => {
  const itemMarkup = `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${item.original}"
  >
    <img
      class="gallery__image"
      src="${item.preview}"
      data-source="${item.original}"
      alt="${item.description}"
    />

    <span class="gallery__icon">
      <i class="material-icons">zoom_out_map</i>
    </span>
  </a>
  </li>`;

  acc += itemMarkup;

  return acc;
}, '');

refs.ul.insertAdjacentHTML('beforeend', galleryMarkup);

//при наведении на картинку подгружаем изображение оригинального размера
refs.ul.addEventListener('mouseover', handleMouseoverImg);

function handleMouseoverImg(e) {
  if (e.target === e.currentTarget) {
    return;
  }

  refs.lightboxImg.src = e.target.dataset.source;
  refs.lightboxImg.alt = e.target.getAttribute('alt');
}

// отображаем изображение оригинального размера
refs.ul.addEventListener('click', handleImgClick);

function handleImgClick(e) {
  e.preventDefault();
  if (e.target === e.currentTarget) {
    return;
  }

  refs.div.classList.add('is-open');
  window.addEventListener('keydown', handleKeyPress);
}

// закрываем модальное окно
refs.closeModalBtn.addEventListener('click', closeModal);
refs.lightboxContent.addEventListener('click', handleOverlayClick);

function closeModal() {
  refs.lightbox.classList.remove('is-open');
  window.removeEventListener('keydown', handleKeyPress);
}

function handleOverlayClick(event) {
  if (event.target !== event.currentTarget) {
    return;
  }

  closeModal();
}

function handleKeyPress(event) {
  if (event.code !== 'Escape') {
    return;
  }

  closeModal();
}
