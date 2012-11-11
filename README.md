poll-app
========

An app for creating and consuming polls.

Created during @SoftwareNiagara's Secret Hackathon, hosted by @Furi.

#### pdf generation

We're currently using pdftk to fill in fields from a template PDF.

    sudo apt-get install pdftk
    cd tmp/
    pdftk ../public/assets/Sign-Template-Form.pdf fill_form question_id.fdf output poster.pdf flatten
