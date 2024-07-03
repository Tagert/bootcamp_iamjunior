import { ServicesModel } from "../models/service.model.js";

export const GET_ALL_SERVICES = async (req, res) => {
  try {
    const services = await ServicesModel.find();

    if (!services.length) {
      return res.status(404).json({ message: "Data not exist" });
    }

    console.log(services);

    return res.status(200).json({ services });
  } catch (err) {
    console.log("HANDLED ERROR:", err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
