import { Router } from "express";
// import CrawlController from "../controllers/CrawlController";
const Crawler = require("simplecrawler");

const router = Router();

router.get("/", async (req, res) => {
  var crawler = await Crawler("https://google.com");
  crawler.start();
  var data = await crawler.on(
    "fetchcomplete",
    (queueItem, responseBuffer, response) => {
      return responseBuffer.toString("utf-8");
    }
  );
  res.send(data);
});

export default router;
