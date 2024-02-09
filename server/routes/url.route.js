
import express from "express"
import { verifyToken } from "../middleware/authorization.js"
import { RedirectToOriginalLink, getUrl, handleDeleteUrl, handleGenerateNewShortURL, handleUpdateUrl } from "../controllers/url.controller.js"
const router = express.Router()

router.post('/', handleGenerateNewShortURL)
router.get("/geturl",verifyToken,getUrl)
router.put("/updateurl/:id", handleUpdateUrl)
router.delete("/deleteurl/:id", handleDeleteUrl)
router.get("/:id",RedirectToOriginalLink)


export default router