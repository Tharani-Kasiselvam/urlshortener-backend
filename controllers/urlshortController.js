const Url = require('../models/url')
const { nanoid } = require('nanoid')
require('dotenv').config()

const urlshortController = {

    //define the URL controllers
    generateShortUrl : async (req, res) => {
      const BASE_URL = process.env.BASE_URL;

        try{
            const { origUrl } = req.body;
            console.log("origUrl:",origUrl)
            const urlId = nanoid(5);

            let url = await Url.findOne({ origUrl })

            const shortUrl = `${BASE_URL}/${urlId}`

            if (url) {
                res.status(400).send({ error: "URL already registered, kindly validate the URL"})
            }

            else {
                url = new Url({
                    origUrl,
                    shortUrl,
                    urlId,
                    date: new Date(),
                });
                await url.save();
                res.status(200).send({ message:"shortUrl created",shortUrl})
            }
        } catch (err) {
            console.log(err);
            res.status(500).send({ error: 'Server Error or Invalid URL' })
        }
    },

    accessShortUrl : async (req,res) => {
        try {
            const url = await Url.findOne({ urlId: req.params.urlId });
            if (url) {
              await Url.updateOne(
                {
                  urlId: req.params.urlId,
                },
                { $inc: { clicks: 1 } }
              );
              return res.redirect(url.origUrl);
            } else res.status(404).json('Not found');
          } catch (err) {
            console.log(err);
            res.status(500).json('Server Error');
          }
    }
}

module.exports = urlshortController;
