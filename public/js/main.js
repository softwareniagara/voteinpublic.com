;(function($) {
  PollApp = (typeof PollApp === 'undefined') ? {} : PollApp;

  PollApp.fitText = function() {
    var $el        = $('[data-fit-text]')
      , compressor = $el.data('fit-text');

    if (!compressor) compressor = 1;

    $el.fitText(compressor);
  };

  $(document).ready(function() {
    PollApp.fitText();
  });
})(jQuery);