import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

const images = [
 {
  preview: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400',
  original: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=1200',
  description: 'Cat'
},
{
  preview: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400',
  original: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200',
  description: 'Mountains'
},
  {
    preview: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_640.jpg',
    original: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg',
    description: 'Tree at sunset',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2016/02/13/12/26/aurora-1197753_640.jpg',
    original: 'https://cdn.pixabay.com/photo/2016/02/13/12/26/aurora-1197753_1280.jpg',
    description: 'Northern lights',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2017/01/20/00/30/maldives-1993704_640.jpg',
    original: 'https://cdn.pixabay.com/photo/2017/01/20/00/30/maldives-1993704_1280.jpg',
    description: 'Tropical beach',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2016/11/19/14/00/code-1839406_640.jpg',
    original: 'https://cdn.pixabay.com/photo/2016/11/19/14/00/code-1839406_1280.jpg',
    description: 'Code on screen',
  },
];

const gallery = document.querySelector('.gallery');

const galleryMarkup = images
  .map(({ preview, original, description }) => {
    return `
      <li class="gallery-item">
        <a class="gallery-link" href="${original}">
          <img
            class="gallery-image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
      </li>
    `;
  })
  .join('');

gallery.innerHTML = galleryMarkup;

gallery.addEventListener('click', handleGalleryClick);

function handleGalleryClick(event) {
  event.preventDefault();

  const image = event.target;

  if (!image.classList.contains('gallery-image')) {
    return;
  }

  const largeImageUrl = image.dataset.source;
  const description = image.alt;

  const instance = basicLightbox.create(`
    <div class="modal-image-wrapper">
      <img src="${largeImageUrl}" alt="${description}" />
      <p>${description}</p>
    </div>
  `);

  instance.show();
}