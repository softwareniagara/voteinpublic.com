poll-app
========

Poll-app is an app for creating and consuming geo-spatial polls. It was created during the
[Software Niagara](http://www.softwareniagara.com) Secret Hackathon hosted by
[Furi Enterprises](http://www.furi.ca) in November 2012.

## Description

Poll-app is a web-based application that allows citizens, leaders, non-profits,
charities, companies, and other organizations to ask questions from the public
and get answers.

Here's how it works:

1. Ask a question using the web application.
2. Print out the generated poster. It includes the question and answers.
3. Place the poster in public and/or private spaces
4. Citizens come along and scan the answer they want with their phone.
5. Their vote and current location is registered on the web application.
6. A map is generated showing how people voted on the question.
7. The results are clustered by geographic location.

What is unique about this app is that it mixes online and real world interactions, allowing you
to use an online system to ask questions, but at the same time, providing a means to effectively
target who can answer the question by requiring voters to vote at the location where the question
is posted.

This is a powerful concept. For example, you can ask if paid parking should be enforced
downtown and limit the answers to those people that live, work and play downtown by only posting
the question in downtown locations. You could also post a question all over a city and see a heat map
of how people responded from area to area.

Find whatever creative uses you can for this app. The source code is available for you to use.

## Technical Notes

This web application uses Node.js and MongoDB. It also uses PDFKit for pdf generation and node-qrcode
for qr code generation. You'll need a system capable of running these tools.

Node-qrcode requires node-canvas to work, which has some dependencies.

On Ubuntu:

``` bash
sudo apt-get install libpixman-1-dev libcairo2-dev
```

On OS X with Homebrew:

```
brew install cairo && brew link cairo
```

## License

This software is licensed under the BSD 3-clause license:

Copyright (c) 2012, Software Niagara
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that
the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
* Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
* Neither the name of the Software Niagara nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED
WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A
PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
THE POSSIBILITY OF SUCH DAMAGE.
