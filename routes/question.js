var Question = require('./../models/question.js')
  , Answer = require('./../models/answer.js')
  , exec = require('child_process').exec
  , qrcode = require('qrcode')
  , PDFDocument = require('pdfkit')
  , Cookies = require('cookies');

/*
 * GET /questions
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

        var path = "tmp/" + question._id
          , yes_img = path + ".yes.png"
          , no_img = path + ".no.png"
          , poster = path + ".pdf"
          , url = "http://website.com/questions/" + question._id
          , yes_url = url + "/yes"
          , no_url = url + "/no";

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
            doc.text('Created with <website_url>', 650, 590);
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
            doc.text('Created with <website_url>', 450, 760);
          }
          doc.write(poster); // And finally save it.
        };
        
        var saveYesImgCb = function(err, bytes) {
          if (err) throw err;
          qrcode.save(no_img, no_url, saveNoImgCb);
        };

        var saveNoImgCb = function(err, bytes) {
          if (err) throw err;
          buildPoster('portrait'); // accepts 'portrait' or 'landscape'
        };

        qrcode.save(yes_img, yes_url, saveYesImgCb);

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
 * We need to do some content negotation here too. But I'm very tired right now. 
 * I'll implement this tomorrow. 
 *
 * 1) On failure when create via json, it should return 422 code
 * 2) On failure when create via html, it should redirect to 500 code page (user probably doesn't care about proper code - they just care that shit blew up - tell them the app is broke).
 * 3) On success when created via json, it should return 201 code
 * 4) On success when create via html, it should do what it does now.
 */
exports.create = function(req, res) {
  var questionValue = req.body.question.trim();

  /*
   * Validations Hacks
   * this is no means the best practice. All validations should go into the model
   * this code should be refractored at some point.
   * - Michael (Nov 11, 2012)
  */
    if (questionValue == '') {
      req.session.error = 'You must ask a question!';
      res.redirect('/');
      return false;
    }

    // Minimum Length should be 140 characters
    if (questionValue.length > 140) {
      req.session.error = 'Your question must be less than 140 characters! Please revise.';
      res.redirect('/');
      return false;  
    }

    // Add a question mark if there isn't one present as the last character
    // should go into an after save filter inside the model
    if (questionValue.slice(-1) !== '?') {
      questionValue += '?';
    }

    //
  /*
  * End of Validation Hacks
  */

  var question = new Question({
    value: questionValue
  });

  return question.save(function(err, question) {
    if (err || !question) {
      res.redirect('/404');
      return false;
    }

    // redirect to show route after create question
    res.redirect('/questions/' + question.id);
  });
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
  // Get the answer. Who cares if it is valid. That will get verified in the 
  // next step.
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

    
  });
};