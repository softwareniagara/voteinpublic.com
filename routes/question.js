/*
 * question.js
 *
 * This router is responsible for CRUD operations on question models and
 * dealing with views for those CRUD operations.
 *
 * This router uses content negotiation and can serve views in html or json.
 */

var Question    = require('./../models/question.js')
  , Answer      = require('./../models/answer.js')
  , exec        = require('child_process').exec
  , qrcode      = require('qrcode')
  , PDFDocument = require('pdfkit')
  , fs          = require('fs')
  , Cookies     = require('cookies');

/*
 * GET /questions
 *
 * This route returns of a list of questions in html or json.
 */
exports.index = function(req, res) {
  var callback;

  switch (req.params.format) {
    case '.json':
      callback = function(err, questions) {
        if (err || !questions) {
          res.statusCode = '500';
          res.setHeader('Content-Type', 'application/json');
          return res.send({'error': err});
        } else {
          res.statusCode = '200';
          res.setHeader('Content-Type', 'application/json');
          return res.send(questions);
        }
      };
      break;
    default: 
      callback = function(err, questions) {
        if (err || !questions) {
          res.redirect('/404');
          return false;
        }

        return res.render("./../views/questions/index", {
          title: 'Questions',
          questions: questions
        });
      };
  }
  
  return Question.find(callback);
};

/*
 * GET /questions/:id
 *
 * This route returns a question in html or json.
 */

exports.show = function(req, res) {
  var callback;

  switch (req.params.format) {
    case 'json':
      callback = function(err, question) {
        if (err || !question) {
          res.statusCode = '404';
          res.setHeader('Content-Type', 'application/json');
          return res.send({
            'error': 'The record you were looking for could not be found.'
          });
        } else {
          res.statusCode = '200';
          res.setHeader('Content-Type', 'application/json');
          return res.send(question);
        }
      };
      break;
    default:
      callback = function(err, question) {
        if (err || !question) {
          res.redirect('/404');
          return false;
        }

        return res.render("./../views/questions/show", {
          title: question.value,
          question: question
        });
      };
  }
  
  return Question.findOne({_id: req.params.id}, callback);
};

/*
 * POST /question
 *
 * This route allows a user to create a question from multi-part form data or json.
 */
exports.create = function(req, res) {
  var questionValue = req.body.question.trim()
    , question = new Question({value: questionValue})
    , callback;

  console.log(question);

  switch (req.params.format) {
    case 'json':
      callback = function(err, question) {
        if (err) {
          res.statusCode = '422';
          res.setHeader('Content-Type', 'application/json');
          return res.send(err);
        }
        res.statusCode = '200';
        res.setHeader('Content-Type', 'application/json');
        return res.send(question);
      };
      break;
    default:
      callback = function(err, question) {
        if (err) {
          // WTF this is ugly.
          if (err.errors && err.errors.value && err.errors.value.type) {
            err = err.errors.value.type;
          } else {
            err = 'Oops. Your question could not be asked. Please try again.';
          }
          req.session.error = err;
          return res.redirect('/');
        }

        return res.redirect('/questions/'+question.id);
      };
  }

  return question.save(callback);
};

/*
 * GET /question/:id/:answer
 * 
 * This is an intermediary step where we will be using an HTML5 api to grab the
 * user's location from their device's operating system. We will then send the
 * lat/lng to POST /question/:id/:answer. 
 *
 * There should be no API end-point here. An API user should be responsible for
 * getting the lat/lng themselves and posting it to /question/:id/:answer.
 */
 exports.addGeolocationToAnswer = function(req, res) {
  // Get the answer. Who cares if it is valid. That will get verified in the next step.
  var answer      = req.params.answer
    , question_id = req.params.id;
  
  return res.render("./../views/questions/location", {
    title: 'Verifying location',
    answer: answer,
    question_id: question_id
  });
 };

/*
 * POST /question/:id/:answer
 *
 * This is an api endpoint only. Don't do any template rendering or redirect
 * here.
 */
exports.answer = function(req, res) {
  var selectedAnswer = req.params.answer
    , lat = req.body.latitude
    , lng = req.body.longitude
    , cookies = new Cookies(req, res)
    , baseName = 'spaceweasel_';
    
  return Question.findOne({
    _id: req.params.id
  }, function(err, question) {
    // If the user has a cookie for this question, they cannot vote.
    if (cookies.get(baseName + question.id)) {
      res.statusCode = '403';
      res.setHeader('Content-Type', 'application/json');
      return res.send({
        'error': 'You have already cast your vote. You are not permitted to vote again.'
      });
    }
  
    var answer = new Answer({
      value: selectedAnswer,
      question_id: question.id,
      coordinates: [lat, lng]
    });
    
    return answer.save(function(err, answer) {
      if (err || !answer) {
        res.statusCode = '422';
        res.setHeader('Content-Type', 'application/json');
        return res.send({
          'error': 'Could not save your answer.'
        });
      } else {
        // User voted. Cast a cookie so they cannot cast a vote.
        cookies.set(baseName + question.id, question.id);
        res.statusCode = '200';
        res.setHeader('Content-Type', 'application/json');
        res.send({
          'success': 'Everything went great.'
        });
      }
    });
  });
};

/*
 * GET /poster/create/:id
 */
exports.create_poster = function(req, res) {
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
