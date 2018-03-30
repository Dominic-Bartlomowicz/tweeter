// Character counter: determines the number of keystrokes by the user and returns the number of maximum characters left to type

$(function() {

    $('textarea').on("keyup", function(event) {

      var maxLength = $(this).val().length;
      if (event.key == "Backspace") {
        maxLength - 1;
      }

      var charLeft = (140-maxLength);
      $(this).siblings(".counter").text(charLeft);

      if(charLeft <= 0){
        $(this).siblings(".counter").text(charLeft).css('color', 'red');
      }

      else if(charLeft > 0){
        $(this).siblings(".counter").text(charLeft).css('color', 'black');
      }

    });
});
