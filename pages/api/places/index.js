//import { places } from '../../../lib/db';
import dbConnect from "../../../db/connect";
import Place from "../../../db/models/Place";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const places = await Place.find();
    return response.status(200).json(places);
  }

  if (request.method === "POST") {
    try {
      const placeData = request.body;
      const place = new Place(placeData);
      console.log("place", place);
      await place.save();
      // We've created a new joke, now we're calling save() to have mongoose insert a new document into our database.

      // The three lines above are functionally the same as:
      // Product.create(request.body)
      // It's just a somewhat less opaque way.

      response.status(201).json({ status: "Place created" });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }
  return response.status(405).json({ message: "Method does not work!" });
}
