// todo Создай галерею с возможностью клика по её элементам 
// todo и просмотра полноразмерного изображения в модальном окне.

// ? Выполняй это задание в файлах 01-gallery.html и 01-gallery.js. Разбей его на несколько подзадач:
// ? Создание и рендер разметки по массиву данных galleryItems и предоставленному шаблону элемента галереи.
// ? Реализация делегирования на div.gallery и получение url большого изображения.
// ? Подключение скрипта и стилей библиотеки модального окна basicLightbox. 
// ? Используй CDN сервис jsdelivr и добавь в проект ссылки на минифицированные(.min) файлы библиотеки.
// ? Открытие модального окна по клику на элементе галереи. Для этого ознакомься с документацией и примерами.
// ? Замена значения атрибута src элемента <img> в модальном окне перед открытием. 
// ? Используй готовую разметку модального окна с изображением из примеров библиотеки basicLightbox.

// ? Ссылка на оригинальное изображение должна храниться в data - атрибуте source на элементе < img >, и указываться в href ссылки. 
// ? Не добавляй другие HTML теги или CSS классы кроме тех, что есть в этом шаблоне.
// ? Обрати внимание на то, что изображение обернуто в ссылку, а значит при клике по умолчанию пользователь будет перенаправлен на другую страницу. 
// ? Запрети это поведение по умолчанию.


// ! АЛГОРИТМ РЕШЕНИЯ
// * 1. Создаем разметку по массиву данных galleryItems. 
// * 2. Рендерим созданную разметку в div class="gallery", для этого: 
// *    Находим элемент div class="gallery" по CSS-селектору через метод document.querySelector(selector).
// *    Добавляем все элементы галереи в DOM за одну операцию вставки через метод insertAdjacentHTML().
// * 3. Реализовываем делегирование на div.gallery, для этого: 
// *    добавляем слушателя на событие clic, используя метод addEventListener();
// *    создаем колбек-функцию, которая: проверяет то, что произошел клик на маленькую картинку и вызывает модальное окно.
// * 4. Подключаем скрипт и стили библиотеки модального окна basicLightbox.
// * 5. Пишем скрипт для открытия модального окна. 

// ! РЕШЕНИЕ

import { galleryItems } from './gallery-items.js';
// Change code below this line

// console.log(createGalleryItemsMarkup(galleryItems));

const galleryContainer = document.querySelector('.gallery');
const galleryItemsMarkup = createGalleryItemsMarkup(galleryItems);

galleryContainer.insertAdjacentHTML("beforeend", galleryItemsMarkup);
galleryContainer.addEventListener("click", onGalleryContainerClic);

function createGalleryItemsMarkup(galleryItems) {
    return galleryItems.map(({ preview, original, description }) => {
        return `
        <div class="gallery__item">
            <a class="gallery__link" href="${original}">
                <img
                    style="display:block"
                    class="gallery__image"
                    src="${preview}"
                    data-source="${original}"
                    alt="${description}"
                />
            </a>
        </div>
        `;
    }).join("");
}

function onGalleryContainerClic(event) {
        if (event.target.nodeName !== 'IMG') {
        return;
    }
        event.preventDefault();
        modalShow(event.target.dataset.source);
}
    let instance;
	    function modalShow(src) {
        instance = basicLightbox.create(
            `
        <div class="modal">
            <img src="${src}" style="height:100vh; display:block"></img>
        </div>
        `,
    {
        onShow: instance => {
        addListener();
        },
        onClose: instance => {
        removeListener();
        },
    },
);
    instance.show();
}

function addListener() {
    window.addEventListener('keydown', onEscClick);
}

function onEscClick(event) {
    if (event.code === 'Escape') {
    instance.close();
    }
} 

function removeListener() {
    window.removeEventListener('keydown', onEscClick);
}

