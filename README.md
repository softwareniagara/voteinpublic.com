poll-app
========

An app for creating and consuming polls.

Created during @SoftwareNiagara's Secret Hackathon, hosted by @Furi.

#### pdf generation

We're currently using pdftk to fill in fields from a template PDF.

    sudo apt-get install pdftk
    cd tmp/
    pdftk ../public/assets/Sign-Template-Form.pdf fill_form question_id.fdf output poster.pdf flatten


*NOTE:* This was a failed attempt. The template PDF had a script that was
supposed to create QR codes based on the values we gave it, but we couldn't get
that to work. So we decided to use node-qrcode and node-pdfkit instead.
Leaving this branch up in case anyone wants to learn from the attempt.
