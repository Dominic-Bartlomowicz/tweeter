const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];


$(function () {

  $('.new-tweet').find('input').on('click', function(event) {
    event.preventDefault()
    var data = $('.new-tweet form').serialize();
    postTweets(data);
    console.log(data);
    // window.location.reload();

    if($(".tweet-input").val().length > 140) {
      alert("Please shorten your tweet!");
    }

  });

    function createTweetElement(data){

      let username = data['user'].name;
      let handle = data['user'].handle;
      let avatar = data['user'].avatars['small'];
      let text = data['content'].text;
      let days = moment(data['created_at']).fromNow();
      console.log(days);

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

      $tweet.append($footer);

      return $tweet;
    }

    function renderTweets(tweets) {

      var createTweets;

      for(var i = 0; i < tweets.length; i++) {
        createTweets = tweets[i];
        let $element = createTweetElement(createTweets);
        $('#tweetlist').prepend($element)
      }
    }

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


   function postTweets(data) {

     $.ajax({
       url: '/tweets',
       method: 'POST',
       data: data,
       success: function (moreTweetsHtml){
       console.log('Success: ', moreTweetsHtml);
       loadTweets();
       }
     });
 }
});





//
// app.get('/tweets', (req, res) => {
//   res.json(tweets)
// })
//
// app.post('/tweets', (req, res) => {
//   const newTweet = {
//     name: req.body.user.name
//     avatar: req.body.user.avatar.small
//     handle: req.body.handle
//     text: req.body.content
//     time: req.body.created_at
//   }
//   tweets[nextTweetId] = newTweet;
//   nextTweetId += 1;
//   res.redirect('/')
// })
