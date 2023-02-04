$(document).ready(function() {
  
  $("form").submit(function(event) {
    let $form = $(this);
    let $textarea = $form.find("textarea");
    // storing references under variables for readability and potential future restructure
    event.preventDefault();
    const tweetLength = $textarea.val().length;
    // verifyLength is a reusable helper function that takes in a number, a minumum and maximum as parameters and returns either "tooShort", "tooLong" or "valid".
    let validity = verifyLength(tweetLength, 1, 140);
    if (validity === "tooShort") {
      $(".errorLong").slideUp(0);
      $(".errorShort").slideDown(200);
    }
    if (validity === "tooLong") {
      $(".errorShort").slideUp(0);
      $(".errorLong").slideDown(200);
    }
    if (validity === "valid") {
      $(".errorLong").slideUp(0);
      $(".errorShort").slideUp(0);
      $.post("/tweets/", $textarea.serialize())
        .done(function() {
          loadTweets();
          $textarea.val("");
          $form.find("output").val("140");
        })
        .fail(() => alert("Something went wrong when posting your tweet! Please refresh your page and try again."));
    }
  });

  $(window).bind('beforeunload', function() {
    if ($("#tweet-text").val().length > 0) {
      return ('Are you sure you want to leave? Your unsubmitted tweet will not be saved!');
    }
  });
});

const safeProof = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;

  // this code is present so that if the user submits a tweet containing malicious code it will not be rendered when the tweet is added to the website.  It will take the submission and renders it as a string instead of code.
};

// timeago is a jquery function that takes a time, compares it to current time and displays it as <amount of time> ago.
const createTweetElement = (tweet) => {
  return `<article class="tweets">
  <header class="tweet-header">
    <div class="profilepic">
      <img src="${tweet.user.avatars}", width = 50px, >${tweet.user.name}
    </div>
    <div>${tweet.user.handle}</div>
  </header>
  <p class="tweet-body">${safeProof(tweet.content.text)}</p>

  <footer>${timeago.format(tweet["created_at"])} 
    <div class="footer-icons">
      <i class="fa-solid fa-flag hovericon1"></i>
      <i class="fa-solid fa-retweet hovericon1"></i>
      <i class="fa-regular fa-heart hovericon1"></i>
    </div>
  </footer>
</article>

`;
};

const renderTweets = (arrayOfTweets) => {
  const container = $('.timeline');
  container.empty();
  for (const tweets of arrayOfTweets) {
    let newTweet = createTweetElement(tweets);
    container.prepend(newTweet);
  }
};

const loadTweets = () => {
  $.ajax('/tweets/', { method: 'GET' })
    .then(function(tweets) {
      console.log('Success: ', tweets);
      renderTweets(tweets);
    })
    .fail(()=> alert("We were unable to load the tweets at the moment.  Please try again later"));
};

const verifyLength = (num, min, max) => {
  if (num < min) {
    return "tooShort";
  } else if (num > max) {
    return "tooLong";
  } else {
    return "valid";
  }
}

loadTweets();

