$(document).ready(function() {
  
  $(".errorLong").slideUp(0);
  $(".errorShort").slideUp(0);
  $("section.new-tweet").slideUp(0);
  $(".scroll").hide();

  $(".right").on("click", () =>{
    const $section = $("section.new-tweet");
    if ($section.is(":visible")) {
      $section.slideUp();
    } else {
      $section.slideDown(200);
      $section.find("textarea").focus();
    }
  });

  $(window).scroll(function() {
    if ($(document).scrollTop() > 200) {
      $(".scroll").show();
    }
    if ($(document).scrollTop() <= 200) {
      $(".scroll").hide();
    }
  });

  $(".scroll").on("click", () => {
    const $section = $("section.new-tweet");
    $section.slideDown(200);
    $section.find("textarea").focus();
  });

  $("form").submit(function(event) {
    let $form = $(this);
    let $textarea = $form.find("textarea");
    // storing references under variables for readability and potential future restructure
    event.preventDefault();
    const tweetLength = $textarea.val().length;
    verifyTweetLength(tweetLength);
 
  });

  $(window).bind('beforeunload', function(){
    if ($("#tweet-text").val().length > 0) {
      return 'Are you sure you want to leave? Your unsubmitted tweet will not be saved!';
    }
  });

});

const safeProof = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;

  // this code is present so that if the user submits a tweet containing malicious code it will not be rendered when the tweet is added to the website.
};


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
    .fail(()=> alert("Something went wrong! Please refresh your page and try again!"));
};

const verifyTweetLength = (num) => {
  let $form = $("form");
  let $textarea = $form.find("textarea");
  if (num < 1) {
    $(".errorLong").slideUp(0);
    $(".errorShort").slideDown(200);
    return;
  } else if (num > 140) {
    $(".errorShort").slideUp(0);
    $(".errorLong").slideDown(200);
    return;
  } else {
    $(".errorLong").slideUp(0);
    $(".errorShort").slideUp(0);
    $.post("/tweets/", $textarea.serialize())
      .done(function() {
        loadTweets();
        $textarea.val("");
        $form.find("output").val("140");
      })
      .fail(() => alert("Something went wrong! Please refresh your page and try again."));
  }
}

loadTweets();

