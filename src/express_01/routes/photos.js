const path = require('path');
const fs = require('fs');
const photo = require("../models/photo");

exports.form = (req, res) => {
  res.render('form', {title: 'upload file'});
}

exports.submit = (dir) => {
  return (req, res, next) => {
    const img = req.files.image;
    const name = req.body.name || img.name;
    var filePath = path.join(dir, img.name);
    fs.rename(img.path, filePath, (err) => {
      if (err) return next(err);
      photo.create({
        name: name,
        path: img.name
      }, (err) => {
        if (err) return next(err);
        res.redirect('/');
      })
    })
  }
}

exports.list = (req, res, next) => {
  photo.find({}, (err, photos) => {
    if (err) return next(err);
    res.render('index', {
      title: 'Photos',
      photos: photos,
    })
  })
}

exports.download = (dir) => {
  return (req, res, next) => {
    var id = req.params.id;
    photo.findById(id, (err, photo) => {
      if (err) return next(err);
      var filePath = path.join(dir, photo.path);
      res.download(filePath);
    });
  }
}