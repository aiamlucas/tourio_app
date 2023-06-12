//import { places } from '../../../../lib/db.js';
import dbConnect from "../../../../db/connect.js";
import Place from "../../../../db/models/Place.js";
import useSWRMutation from "swr/mutation";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "DELETE") {
    const placeToDelete = await Place.findByIdAndDelete(id);
    response.status(200).json(placeToDelete);
  }

  if (request.method === "PATCH") {
    const placeToUpdate = await Place.findByIdAndUpdate(id, {
      $set: request.body,
    });
    // Find the joke by its ID and update the content that is part of the request body!
    response.status(200).json(placeToUpdate);
    // If successful, you'll receive an OK status code.
  }

  if (request.method === "GET") {
    const places = await Place.findById(id);

    if (!places) {
      return response.status(404).json({ status: "Not Found" });
    }

    response.status(200).json(places);

    // async function sendRequest(url, { arg }) {
    //   const response = await fetch(url, {
    //     methot: "PATCH",
    //     body: JSON.stringify(arg),
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });
    //   if (response.ok) {
    //     await response.json();
    //   } else {
    //     console.error(`Error: ${response.status}`);
    //   }
    // }

    // const { trigger, isMutating } = useSWRMutation(
    //   `/api/places/${id}`,
    //   sendRequest
    // );

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
