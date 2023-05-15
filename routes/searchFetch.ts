import { collection, getDocs, QueryDocumentSnapshot } from "firebase/firestore";
import express, { Request, Response, Router } from "express";
import ImageServices from "../datebase/ImageServices";
const { db } = require("../datebase//firebase");
const router: Router = express.Router();

router.get("/:param", async (req: Request, res: Response) => {
  const keyword: string = req.params.param;
  console.log(keyword);
  const results: any[] = [];
  const collections = ["waters", "rice-bowls"];

  for (const collectionName of collections) {
    const collectionRef = collection(db, collectionName);
    const querySnapshot = await getDocs(collectionRef);
    querySnapshot.forEach((document: QueryDocumentSnapshot) => {
      const data = document.data();
      const { title, desc } = data;
      if (title.includes(keyword) || desc.includes(keyword)) {
        results.push(data);
      }
    });
  }

  for (const key in results) {
    const imagePath = results[key].img;
    if (imagePath) {
      const imageUrl = await ImageServices.getImageUrl(imagePath);
      results[key].url = imageUrl;
    }
  }
  res.json(results);
});

export default router;
