export const cities = {
  Toulouse: [1.4441, 43.6047],
  Paris: [2.35, 48.86],
  Brest: [-4.485, 48.3904],
};

export const getCoordinate = (city: string) => {
  return (cities as any)[city];
};
