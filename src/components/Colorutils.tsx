import ColorThief from 'colorthief';

export async function getDominantColorFromImage(imageUrl: string): Promise<[number, number, number]> {
  const colorThief = new ColorThief();
  const image = new Image();
  image.crossOrigin = 'Anonymous';
  image.src = imageUrl;

  return new Promise<[number, number, number]>((resolve, reject) => {
    image.onload = () => {
      const dominantColor = colorThief.getColor(image);
      resolve(dominantColor);
    };

    image.onerror = error => {
      reject(error);
    };
  });
}
