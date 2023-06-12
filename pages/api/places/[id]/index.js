//import { places } from '../../../../lib/db.js';
import dbConnect from '../../../../db/connect.js';
import Place from '../../../../db/models/Place.js';

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    const places = await Place.findById(id);

  if (!places) {
    return response.status(404).json({ status: "Not Found"});
  }
  
  response.status(200).json(places);

  if (!id) {
    return;
  }
} 
}

//   const place = places.find((place) => place.id === id);

//   if (!place) {
//     return response.status(404).json({ status: 'Not found' });
//   }

//   response.status(200).json(place);
// }