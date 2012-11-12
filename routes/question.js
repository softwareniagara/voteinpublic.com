var Question = require('./../models/question.js')
  , Answer = require('./../models/answer.js')
  , exec = require('child_process').exec
  , qrcode = require('qrcode')
  , PDFDocument = require('pdfkit');

/*
 * GET /questions
 */
exports.index = function(req, res) {
  var callback;

  switch (req.params.format) {
    case '.json':
      callback = function(err, questions) {
        if (err || !questions) {
          return res.send({
            'error': err
          },{
            'Content-Type': 'application/json'
          }, 500);
        } else {
          return res.send(questions, {
            'Content-Type': 'application/json'
          }, 200);
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
          return res.send({
            'error': 'The record you were looking for could not be found.'
          }, {
            'Content-Type': 'application/json'
          }, 404);
        } else {
          return res.send(question, {
            'Content-Type': 'application/json'
          }, 200);
        }
      };
      break;
    default:
      callback = function(err, question) {
        if (err || !question) {
          res.redirect('/404');
          return false;
        }

        console.log(question);
        var path = "tmp/" + question._id
          , yes_img = path + ".yes.png"
          , no_img = path + ".no.png"
          , poster = path + ".pdf"
          , url = "http://website.com/questions/" + question._id
          , yes_url = url + "/yes"
          , no_url = url + "/no";

        // Can use the base64 image data for displaying the QR codes on a page.
        /*
        qrcode.toDataURL("qrcode-text", function(err, url){
          console.log(url);
        });
        */

        var buildPoster = function() {
        // Can use different fonts, but avoiding it because there's a bug where
        // it corrupts the pdf so you can't print it.
        var s = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.".substring(0,140) + "?";
          doc = new PDFDocument({
            layout: 'landscape'
            //layout: 'portrait' // is the default value
          }); // or simply `doc = new PDFDocument();` for portrait mode.
          doc.info['Author'] = "Software Niagara";
          doc.fontSize(50); 
          // doc.moveDown();
          // doc.text(s); // left-aligned by default
          doc.text(s,{
            align: 'center'
          });
          doc.fontSize(10);
          doc.text('by Software Niagara', 699, 600); // or github.com/SoftwareNiagara?
        };
        

        var saveYesImgCb = function(err, bytes) {
          if (err) throw err;
          buildPoster();
          doc.image(yes_img, 100, 400, {
            fit: [200, 200]
          }).rect(350, 100, 100, 100).stroke().text('Fit', 350, 85); // TODO: fine tune this stuff
          qrcode.save(no_img, no_url, saveNoImgCb);
        };

        var saveNoImgCb = function(err, bytes) {
          if (err) throw err;
          doc.image(no_img, 400, 400, {
            fit: [200, 200]
          }).rect(350, 100, 100, 100).stroke().text('Fit', 350, 85); // TODO: fine tune this stuff
          doc.write(poster);
        };

        qrcode.save(yes_img, yes_url, saveYesImgCb);
     /*   
        // Saves the QR code images as PNG files (if directory in path exists).
        qrcode.save(yes_img, yes_url, function(err, bytes){
          if (err) throw err;
          doc.image(yes_img, 100, 400, {
            fit: [200, 200]
          }).rect(350, 100, 100, 100).stroke().text('Fit', 350, 85);
          doc.write(poster);
        });
      */

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

  if (questionValue == '') {
    res.redirect('/');
    return false;
  }

  // Add a question mark if there isn't one present as the last character
  if (questionValue.slice(-1) !== '?') {
    questionValue += '?';
  }

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
 * We only access this route via ajax. So don't do any template rendering 
 * or rediring here.
 */
exports.answer = function(req, res) {
  var selectedAnswer = req.params.answer
    , lat = req.body.latitude
    , lng = req.body.longitude;
    
  return Question.findOne({
    _id: req.params.id
  }, function(err, question) {
    var answer = new Answer({
      value: selectedAnswer,
      question_id: question.id,
      latitude: lat,
      longitude: lng
    });
    
    return answer.save(function(err, answer) {
      if (err || !answer) {
        return res.rend({
          'error': 'Could not save your answer.'
        }, {
          'Content-Type': 'application/json'
        }, 422);
      } else {
        res.send({
          'success': 'Everything went great.'
        }, {
          'Content-Type': 'application/json'
        }, 200);
      }
    });
  });
};
