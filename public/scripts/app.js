$(function () {

  $(".button").click(function(){
      $(".new-tweet").show(1000);
  });

  $('.new-tweet').find('input').on('click', function(event) {
    event.preventDefault()
    var data = $('.new-tweet form').serialize();
    postTweets(data);

    // Error returned if tweet length is too long or short

    if($(".tweet-input").val().length == 0) {
      alert("Please enter text!");
    }

    if($(".tweet-input").val().length > 140) {
      alert("Please shorten your tweet! (140 Characters Maximum)");
    }

  });

    function createTweetElement(data){

      // Redefining and appending variables for jQuery

      let username = data['user'].name;
      let handle = data['user'].handle;
      let avatar = data['user'].avatars['small'];
      let text = data['content'].text;
      let days = moment(data['created_at']).fromNow();

      let $tweet = $("<article>").addClass("tweets");
      let $header = $("<header>").addClass("header");

      let $img = $("<img>").addClass("avatar");
      $img.attr('src', avatar);
      $header.append($img);

      let $h1 = $("<h1>");
      $h1.text(username);
      $header.append($h1);

      let $h2 = $("<h2>");
      $h2.addClass('handle').text(handle);
      $header.append($h2);

      $tweet.append($header);

      let $p = $("<p>");
      $p.text(text);
      $tweet.append($p);

      let $footer = $("<footer>").addClass("footer");

      let $h3 = $("<h3>");
      $h3.text(days);
      $footer.append($h3);

      let $i = $("<i>");
      $i.addClass("fas fa-heart");
      $footer.append($i);

      let $i2 = $("<i>");
      $i2.addClass("fas fa-retweet");
      $footer.append($i2);

      let $i3 = $("<i>");
      $i3.addClass("fas fa-flag");
      $footer.append($i3);

      $tweet.append($footer);

      return $tweet;
    }


    // RenderTweets: Cycles through tweets and prints tweet history

    function renderTweets(tweets) {

      var createTweets;

      for(var i = 0; i < tweets.length; i++) {
        createTweets = tweets[i];
        let $element = createTweetElement(createTweets);
        $('#tweetlist').prepend($element)
      }
    }


    // AJAX loadTweets function

    function loadTweets () {
      $.ajax({
        url: '/tweets',
        method: 'GET',
        success: function (moreTweetsHtml){
        console.log('Success: ', moreTweetsHtml);
        renderTweets(moreTweetsHtml)
      }
    });
    }

   loadTweets();


   // AJAX postTweets function

   function postTweets(data) {

     $.ajax({
       url: '/tweets',
       method: 'POST',
       data: data,
       success: function (moreTweetsHtml){
       console.log('Success: ', moreTweetsHtml);
       loadTweets();
       $('.tweet-input').val('');
       $('.counter').text("140");
       }
     });
 }
});
