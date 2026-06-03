import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';

const API_KEY = import.meta.env.VITE_PIXABAY_API_KEY;

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');

// let lightbox = new SimpleLightbox('.gallery a');

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  const query = event.target.elements.searchQuery.value.trim();

  if (!query) {
    iziToast.warning({
      message: 'Please enter a search query',
      position: 'topRight',
    });

    return;
  }

  gallery.innerHTML = '';

  fetchImages(query);
}

function fetchImages(query) {
  axios
    .get('https://pixabay.com/api/', {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    })
    .then(response => {
      const images = response.data.hits;

      if (images.length === 0) {
        iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });

        return;
      }

      renderGallery(images);
    })
    .catch(error => {
      console.log(error);

      iziToast.error({
        message: 'Something went wrong',
        position: 'topRight',
      });
    });
}

function renderGallery(images) {
  const markup = images
    .map(
      image => `
      <li class="gallery-item">
        <a href="${image.largeImageURL}">
          <img
            src="${image.webformatURL}"
            alt="${image.tags}"
          />
        </a>

        <div class="info">
          <p><b>Likes</b><br>${image.likes}</p>
          <p><b>Views</b><br>${image.views}</p>
          <p><b>Comments</b><br>${image.comments}</p>
          <p><b>Downloads</b><br>${image.downloads}</p>
        </div>
      </li>
    `
    )
    .join('');

  gallery.innerHTML = markup;

//   lightbox.refresh();
}