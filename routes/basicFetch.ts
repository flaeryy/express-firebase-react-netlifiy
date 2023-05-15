import express, { Request, Response, Router } from "express";
import FirebaseService from "../datebase/FirebaseService";
import ImageServices from "../datebase/ImageServices";

const router: Router = express.Router();
const firebaseService = FirebaseService.getInstance();

router.get("/:param", handleRequest);

console.log("bascifetch");

async function handleRequest(req: Request, res: Response) {
  const param: string = req.params.param;
  const json = await firebaseService.fetchDataCollection(param);

  for (const key in json) {
    const imagePath = json[key].img;
    if (imagePath) {
      const imageUrl = await ImageServices.getImageUrl(imagePath);
      json[key].url = imageUrl;
    }
  }

  res.json(json);
}

export default router;
