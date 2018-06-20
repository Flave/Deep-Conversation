const express = require('express');
const multer = require('multer');
const path = require('path');
const vision = require('@google-cloud/vision');
const request = require('request-promise-native');
const _ = require('lodash');
const colors = require('colors');
var cors = require('cors')

const mimeTypes = ["image/jpeg", "image/png"];
const visionClient = vision({
  projectId: 'intelligent-conversations',
  keyFilename: './config/keyfile.json'
});

const imageFilter = function (req, file, cb) {
  // accept image only
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};

// Needed because sometimes fetching labels fails?
const recursivelyFetchLabels = (possibleImages) => {
  return visionClient
    .detectLabels(possibleImages[0].link)
    .then((results) => {

      // not quite sure what this is supposed to accomplish
      if(possibleImages.length === 1)
        return new Error('Could not retrieve labels for this batch of images!');
      if(!results[0].length)
        return {labels: undefined, usedImage: possibleImages[0].link};

      return {fullResult: results, labels: results[0], usedImage: possibleImages[0].link};
    })
    .catch((err) => {
      console.log("=====> Could not get labels: ")
      console.log(err);
      // if error ocurred
      if(possibleImages.length > 1)
        return recursivelyFetchLabels(possibleImages.slice(1))
      return err;
    });
}

const fetchLabels = (imageLink) => {
  return visionClient
    .detectLabels(imageLink)
    .then((results) => {
      console.log(results);
      return results[0];
    })
    .catch((err) => {
      return err;
    });
}

const router = new express.Router();
const cseKey = "AIzaSyAOlR56ts5jlG55ZJmMpvpOZOZFqwavD7U";
const cseId = "011687790957766324826:mksf6hhinvi";
const upload = multer({ dest: './uploads', fileFilter: imageFilter });

// Route use 
router.get('/term', cors(), (req, res) => {
  const data = {
    query: req.query.q
  };

  request(`https://www.googleapis.com/customsearch/v1?key=${cseKey}&cx=${cseId}&searchType=image&imgSize=medium&num=10&q=${req.query.q}`)
    .then((response) => {
      const imageData = JSON.parse(response);
      const images = _.filter(imageData.items, (item) => 
        mimeTypes.indexOf(item.mime) !== -1
      );
      if(images.length > 0)
        return recursivelyFetchLabels(images);
      else 
        throw new Error('NO_IMAGES_FOUND');
    })
    .then((labelsData) => {
      data.image = labelsData.usedImage;
      data.labels = labelsData.labels;
      // for development
      // data.results = labelsData.fullResult;
      res.json(data);
    })
    .catch((err) => {
      console.log(colors.red(err));
      data.error = err.message;
      res.json(data);
    })
});

// Route used to upload an initial image and to fetch the consecutieve labels
router.post('/upload', cors(), upload.single('startImage'), (req, res) => {
  console.log(req.file.path)
  const data = {
    image: req.file.path
  }
  console.log(colors.rainbow('fetching labels'))
  fetchLabels(req.file.path)
    .then((labelsData) => {
      data.labels = labelsData;
      console.log(colors.rainbow('got labels'))
      res.json(data);
    })
});

module.exports = router;