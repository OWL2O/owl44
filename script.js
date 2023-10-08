document.addEventListener('DOMContentLoaded', () => {
  const imageInput = document.getElementById('image-input');
  const uploadButton = document.getElementById('upload-button');
  const imageList = document.getElementById('image-list');
  let images = [];

  // Load images from local storage (if available)
  if (localStorage.getItem('images')) {
      images = JSON.parse(localStorage.getItem('images'));
      renderImages();
  }

  uploadButton.addEventListener('click', () => {
      const file = imageInput.files[0];
      if (!file) {
          alert('Please select an image to upload.'); 
          return;
      }

      // Convert the image file to a base64-encoded string
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
          const imageBase64 = reader.result;
          images.push(imageBase64);

          // Save images to local storage
          localStorage.setItem('images', JSON.stringify(images));

          // Clear the input field
          imageInput.value = '';

          // Refresh the image gallery
          renderImages();
      };
  });

  function renderImages() {
      imageList.innerHTML = '';
      images.forEach((imageBase64, index) => {
          const listItem = document.createElement('li');
          listItem.classList.add('image-item');
          const image = document.createElement('img');
          image.classList.add('image');
          const deleteButton = document.createElement('button');
          deleteButton.classList.add('delete-button');

          // Set a maximum width and height for the displayed images
          image.src = imageBase64;
          deleteButton.textContent = 'Delete';

          deleteButton.addEventListener('click', () => {
              // Remove the image from the array and re-render the gallery
              images.splice(index, 1);
              localStorage.setItem('images', JSON.stringify(images));
              renderImages();
          });

          listItem.appendChild(image);
          listItem.appendChild(deleteButton);
          imageList.appendChild(listItem);
      });
  }
});
