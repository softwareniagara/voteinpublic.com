var Question    = require('./../models/question.js')
  , exec        = require('child_process').exec
  , qrcode      = require('qrcode')
  , PDFDocument = require('pdfkit')
  , fs          = require('fs');

/*
 * POST /poster/:id
 */
exports.create = function(req, res) {
  Question.findOne({_id: req.params.id}, function(err, question) {
    if (err || !question) {
      res.redirect('/404');
      return false;
    }

    var path = "tmp/" + question._id
      , yes_img = path + ".yes.png"
      , no_img = path + ".no.png"
      , poster = path + ".pdf"
      , url = "http://voteinpublic.com/questions/" + question._id
      , yes_url = url + "/yes"
      , no_url = url + "/no"
      , ad = 'Created using voteinpublic.com';

    // Want to display the QR code on a webpage?
    // Embed it in an image using the base64 image data.
    // qrcode.toDataURL("qrcode-text", function(err, url){
    //   console.log(url);
    // });

    var buildPoster = function(layout) {
      // Can't use different fonts, there's a bug that corrupts the pdf.
      // We can eventually replace 'Yes' and 'No' with a green check mark
      // and red X respectively. See http://pdfkit.org/docs/vector.html
      doc = new PDFDocument({
        layout: layout
      });
      doc.info['Author'] = "Software Niagara";
      if (layout == 'landscape')
      {
        if (question.value.length <= 40) doc.fontSize(70);
        else if (question.value.length <= 70) doc.fontSize(50);
        else doc.fontSize(45);
        doc.text(question.value); // Left-aligned by default.
        doc.fontSize(45);
        doc.image(yes_img, 100, 330, {
          fit: [200, 200]
        }).text('Yes', 155, 530);
        // Add 'no' QR code to the bottom right.
        doc.image(no_img, 475, 330, {
          fit: [200, 200]
        }).text('No', 550, 530);
        // Add some advertising text in bottom right corner.
        doc.fontSize(10);
        doc.text(ad, 650, 590);
      }
      else // portrait
      {
        if (question.value.length <= 40) doc.fontSize(70);
        else if (question.value.length <= 70) doc.fontSize(60);
        else doc.fontSize(44);
        doc.text(question.value); // Left-aligned by default.
        doc.fontSize(45);
        doc.image(yes_img, 60, 450, {
          fit: [200, 200]
        }).text('Yes', 120, 650);
        // Add 'no' QR code to the bottom right.
        doc.image(no_img, 350, 450, {
          fit: [200, 200]
        }).text('No', 425, 650);
        // Add some advertising text in bottom right corner.
        doc.fontSize(10);
        doc.text(ad, 450, 760);
      }

      // send the pdf to the browser
      outputPDF(doc);
    };

    var saveYesImgCb = function(err, bytes) {
      if (err) throw err;
      qrcode.save(no_img, no_url, saveNoImgCb);
    };

    var saveNoImgCb = function(err, bytes) {
      if (err) throw err;
      buildPoster('portrait'); // accepts 'portrait' or 'landscape'
      fs.unlink(yes_img, function(err) { if (err) throw err; });
      fs.unlink(no_img, function(err) { if (err) throw err; });
    };

    // Save images, build poster, delete images.
    qrcode.save(yes_img, yes_url, saveYesImgCb);

    var outputPDF = function(doc) {
      doc.output(function(data) {
        res.writeHead(200, {
          'Content-type': 'application/pdf',
          'Content-disposition': 'attachment; filename=voteinpublic_poster.pdf'
        });
        return res.end(data, 'binary');
      });
    };
  });
};