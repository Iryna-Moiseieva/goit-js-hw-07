// todo Сделай такую же галерею как в первом задании, но используя библиотеку SimpleLightbox, 
// todo которая возьмет на себя обработку кликов по изображениям, открытие и закрытие модального окна,
// todo а также пролистывание изображений при помощи клавиатуры. 

// ? Выполняй это задание в файлах 02 - lightbox.html и 02 - lightbox.js.

// ? Разбей его на несколько подзадач:
// ? Создание и рендер разметки по массиву данных galleryItems и предоставленному шаблону элемента галереи. 
// ? Используй готовый код из первого задания.
// ? Подключение скрипта и стилей библиотеки используя CDN сервис cdnjs.
// ? Необходимо добавить ссылки на два файла: simple - lightbox.min.js и simple - lightbox.min.css.
// ? Инициализация библиотеки после того, как элементы галереи созданы и добавлены в div.gallery. 
// ? Для этого ознакомься с документацией SimpleLightbox - в первую очередь секции «Usage» и «Markup».
// ? Посмотри в документации секцию «Options» и добавь отображение подписей к изображениям из атрибута alt. 
// ? Пусть подпись будет снизу и появляется через 250 миллисекунд после открытия изображения.


// ! АЛГОРИТМ РЕШЕНИЯ

// * 1. Создаем разметку по массиву данных galleryItems. 
// * 2. Рендерим созданную разметку в div class="gallery", для этого: 
// *    Находим элемент div class="gallery" по CSS-селектору через метод document.querySelector(selector).
// *    Добавляем все элементы галереи в DOM за одну операцию вставки через метод insertAdjacentHTML().
// * 4. Подключаем скрипт и стили библиотеки  lightbox.
// * 5. Добавляем отображение подписей к изображениям из атрибута alt.

// ! РЕШЕНИЕ

import { galleryItems } from './gallery-items.js';
// Change code below this line
// console.log(galleryItems);

const galleryContainer = document.querySelector('.gallery');
const galleryItemsMarkup = createGalleryItemsMarkup(galleryItems);

galleryContainer.insertAdjacentHTML("beforeend", galleryItemsMarkup);

function createGalleryItemsMarkup(galleryItems) {
    return galleryItems.map(({ preview, original, description }) => {
        return `
        <li>
	        <a class="gallery__item" href="${original}">
	            <img 
	                style="display:block"
	                class="gallery__image"
	                src="${preview}"
	                alt="${description}"
	                />
	        </a>
	    </li>
        `;
    }).join("");
}


let gallery = new SimpleLightbox('.gallery a', {
	captions: true,
	captionsData: 'alt',
	captionDelay: 250,
    });

