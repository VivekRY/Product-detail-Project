const mainImage = document.getElementById("main-image");
const loaderContainer = document.querySelector(".loader-container");

mainImage.addEventListener("load", () => {
  loaderContainer.classList.add("loaded");
});

fetch("https://picsum.photos/v2/list?page=1&limit=5")
  .then((response) => response.json())
  .then((images) => {
    const thumbnailsContainer = document.querySelector(".thumbnails");

    mainImage.src = images[0].download_url;

    images.forEach((image, index) => {
      const thumbnail = document.createElement("img");
      thumbnail.src = image.download_url;
      thumbnail.alt = `Thumbnail ${index + 1}`;
      thumbnail.addEventListener("click", () => {
        mainImage.src = image.download_url;
      });
      thumbnailsContainer.appendChild(thumbnail);
    });

    let currentIndex = 0;
    const thumbnails = document.querySelectorAll(".thumbnails img");
    thumbnails[0].classList.add('selected');

    function showImage(index) {
      mainImage.src = images[index].download_url;
    }

    document.getElementById("next").addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % images.length;
      thumbnails.forEach((img) => img.classList.remove("selected"));
      thumbnails[currentIndex].classList.add('selected')
      showImage(currentIndex);
    });

    document.getElementById("prev").addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      thumbnails.forEach((img) => img.classList.remove("selected"));
      thumbnails[currentIndex].classList.add('selected')
      showImage(currentIndex);
    });
    const mainImages = document.querySelector(".main-image");

    thumbnails.forEach((thumbnail, index) => {
      thumbnail.addEventListener("click", () => {
        mainImages.src = thumbnail.src;
        thumbnails.forEach((img) => img.classList.remove("selected"));
        currentIndex=index;
        thumbnail.classList.add("selected");
      });
    });

    document
      .querySelector(".wishlist-icon")
      .addEventListener("click", function () {
        this.classList.toggle("filled");
    });
    const colorOptions = document.querySelectorAll(".color-option");

    colorOptions.forEach((color) => {
      color.addEventListener("click", function () {
        colorOptions.forEach((option) => option.classList.remove("selected"));

        this.classList.add("selected");

        const selectedColor = this.dataset.color;
        console.log(`Selected color: ${selectedColor}`);
      });
    });
  })
  .catch((error) => {
    console.error("Error fetching images:", error);
  });

document.getElementById("add-to-cart").addEventListener("click", () => {
  const quantity = document.getElementById("quantity").value;
  alert(`Added ${quantity} item(s) to the cart`);
});

document.getElementById("increase").addEventListener("click", () => {
  const quantityInput = document.getElementById("quantity");
  quantityInput.value = parseInt(quantityInput.value) + 1;
});

document.getElementById("decrease").addEventListener("click", () => {
  const quantityInput = document.getElementById("quantity");
  if (parseInt(quantityInput.value) > 1) {
    quantityInput.value = parseInt(quantityInput.value) - 1;
  }
});
