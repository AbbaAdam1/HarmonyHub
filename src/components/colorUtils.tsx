import ColorThief from 'colorthief';

export async function getDominantColorFromImage(imageUrl) {
  const colorThief = new ColorThief();
  const image = new Image();
  image.crossOrigin = 'Anonymous'; // Enable CORS for image loading
  image.src = imageUrl;

  return new Promise((resolve, reject) => {
    image.onload = () => {
      const dominantColor = colorThief.getColor(image);
      resolve(dominantColor);
    };

    image.onerror = error => {
      reject(error);
    };
  });
}