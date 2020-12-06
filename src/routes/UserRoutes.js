import { Router } from "express";
import UserController from "../controllers/UserController";

const router = Router();

router.post("/signup", UserController.createUser);
router.post("/login", UserController.loginUser);
// router.post("/", BookController.addBook);
// router.get("/:id", BookController.getABook);
// router.put("/:id", BookController.updatedBook);
// router.delete("/:id", BookController.deleteBook);

export default router;
