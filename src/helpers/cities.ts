export const cities = {
  Toulouse: {
    geojsonUrl:
      'https://france-geojson.gregoiredavid.fr/repo/departements/31-haute-garonne/departement-31-haute-garonne.geojson',
    coordinate: [1.4441, 43.6047],
  },
  Paris: {
    geojsonUrl:
      'https://france-geojson.gregoiredavid.fr/repo/departements/75-paris/departement-75-paris.geojson',
    coordinate: [2.35, 48.86],
  },
  Brest: {
    geojsonUrl:
      'https://france-geojson.gregoiredavid.fr/repo/departements/29-finistere/departement-29-finistere.geojson',
    coordinate: [-4.485, 48.3904],
  },
};

export const parisCoordinate = [2.35, 48.86];

// I didn't find geojsonUrl for Brest and toulouse (I have used geojsonUrl of their respective departments)
const departements = {
  Finistère: 'Brest',
  Paris: 'Paris',
  'Haute-Garonne': 'Toulouse',
};

// find the selected city from a given departement
export const getCityFromDepartement = (departement: string) => {
  return (departements as any)[departement] as string;
};

export const getCoordinate = (city: string) => {
  return (cities as any)[city].coordinate as Array<number>;
};
