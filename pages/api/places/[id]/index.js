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
    response.status(200).json(placeToUpdate);
  }

  if (request.method === "GET") {
    const places = await Place.findById(id);

    if (!places) {
      return response.status(404).json({ status: "Not Found" });
    }

    response.status(200).json(places);

    if (!id) {
      return;
    }
  }
}
