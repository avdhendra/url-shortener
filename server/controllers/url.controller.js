import Url from "../models/Url.js";
import { genRandomShortcode } from "../utils/shortcode.js";
import validUrl from "valid-url"
export const handleGenerateNewShortURL = async (req, res) => {
    console.log("hi")
    const { url } = req.body;
    console.log("url: ", url, req.body);
    const baseurl = process.env.BASE_URL
    try {

        if (!url) {
            return res.status(400).json({ error: "url is required" })
        }
        if (!validUrl.isUri(baseurl)) {
            return res.status(401).json({ error:'Invalid base url'})
        }
        if (!validUrl.isUri(url)) {

            return res.status(401).json({error:"invalid url"})

        } else {
            let longurl = await Url.findOne({ where: { redirectUrl: url } })
            if (longurl) {
                const shortUrl = baseurl + "/" + longurl.shortUrl
                return res.json(shortUrl)
            } else {
                console.log("hia")
                const { shortCode } = genRandomShortcode()
                const shortURL = baseurl + "/" + shortCode
                try {
                    await Url.create({
                        shortUrl: shortCode,
                        redirectUrl: url,
                        analytics: 0,
                        //userId: req.user.id
                    })
                    return res.status(200).json(shortURL)

                } catch (error) {
                    console.log("error", error)
                    res.status(500).json({ error: "Internal Server Error" })
                }



            }
        }
    } catch (error) {
        console.log("error", error)
        res.status(400).json({ error: "Internal Server Error" })
    }

}

export const RedirectToOriginalLink = async (req, res) => {
    try {
        const { id } = req.params
        let result = await Url.findOne({ where: { shortUrl: id } })
        if (!result) {
            return res.status(404).json({ error: "Short url does not exist" })

        }
        result.analytics = result.analytics + 1
        await result.save()
        res.redirect(result.redirectUrl)
    } catch (error) {
        console.log("error", error)
        res.status(500).json({ error: "Internal Server Error" })
    }
}


export const getUrl = async (req, res) => {

    try {
        const result = await Url.findAll()
        if (!result || result.length === 0) {
            return res.status(404).json({ error: "no url found" })
        } else {

            return res.status(200).json(result)
        }

    } catch (error) {
        console.log("error", error)
        res.status(500).json({ error: "Internal Server Error" })
    }
}
export const handleUpdateUrl = async (req, res) => {
    const { url } = req.body
    const { id } = req.params

    
    try {
        if (!url) {
            return res.status(400).json({ error: "url is required" })
        }
      
        if (!validUrl.isUri(url)) {

            return res.status(401).json({error:"invalid url"})

        } else {

            const { shortCode } = genRandomShortcode()
           
            let result = await Url.findOne({ where: { urlId: id } })
            result.redirectUrl = url
            result.shortUrl = shortCode
            result.analytics = 0
            await result.save()
            const allUrl=await Url.findAll()
            return res.status(200).json({data:allUrl, message: "redirect url updated successfully" })

        }
    } catch (error) {
        console.log("error", error)
        return res.status(500).json({ error: "Internal Server Error" })

    }
}

export const handleDeleteUrl = async (req, res) => {
console.log("handleDeleteUrl")
    const { id } = req.params
    console.log("handleDeleteUrl",id)
    try {
        let result = await Url.findOne({ where: { urlId: id } })
        if (!result) {
            return res.status(404).json({ message: "Url not found" })
        }

        await Url.destroy({ where: { urlId: id } })
        result=await Url.findAll()
        return res.status(200).json({ data:result, message: "Url deleted successfully" })

    } catch (error) {
        console.log("error", error)
        return res.status(500).json({ error: "Internal Server Error" })
    }


}


