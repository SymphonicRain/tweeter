/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



$(document).ready(function() {
  console.log("IMREADY");
  console.log($(window));
  
  $(".errorLong").slideUp(0);
  $(".errorShort").slideUp(0);
  $("section.new-tweet").slideUp(0);
  $(".scroll").hide();

  $(".expand").on("click", () =>{
    const $section = $("section.new-tweet")
    if ($section.is(":visible")) {
      $section.slideUp();
    } else {
      $section.slideDown(200);
      $section.find("textarea").focus();
    }
  })

  $(window).scroll(function(){
    if($(document).scrollTop() > 200){
      $(".scroll").show();
    }
    if($(document).scrollTop() <= 200){
      $(".scroll").hide();
    }

  });

  $(".scroll").on("click", () => {
    const $section = $("section.new-tweet")
    $section.slideDown(200);
    $section.find("textarea").focus();
  })


  $( "form" ).submit(function( event ) {
    event.preventDefault();
    const tweetLength = $( "#tweet-text" ).val().length;
    if (tweetLength < 1) {
      $(".errorShort").slideDown();
      return;
    }
    if (tweetLength > 140) {
      $(".errorLong").slideDown();
      return;
    }

    if (140 >= tweetLength &&  tweetLength > 0) {
      $(".errorLong").slideUp(0);
      $(".errorShort").slideUp(0);
      $.post("/tweets/", $( "#tweet-text" ).serialize());
      setTimeout(()=> loadTweets(), 200);
      $( "#tweet-text" ).val(""); 
    }
  });

});


const safeProof = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};


const createTweetElement = (tweet) => {
  return `<article class="tweets">
<header class="tweet-header"><div>${tweet.user.name} <img src="${tweet.user.avatars}" width = 50px></div><div>${tweet.user.handle}</div></header>
<p class="tweet-body">${safeProof(tweet.content.text)}</p>

<footer class="tweet-footer">${timeago.format(tweet["created_at"])} <div class="footer-icons"><i class="fa-solid fa-flag hovericon1"></i> <i class="fa-solid fa-retweet hovericon1"></i><i class="fa-regular fa-heart hovericon1"></i></div></footer>

</article>
`
};


const renderTweets = (arrayOfTweets) => {
  const container = $('.timeline');
  container.empty();
  for (const tweets of arrayOfTweets) {
    let newTweet = createTweetElement(tweets);
    container.append(newTweet);
  }
};

const loadTweets = () => {
  $.ajax('/tweets/', { method: 'GET' })
    .then(function (tweets) {
      console.log('Success: ', tweets);
      renderTweets(tweets);
    });
};

loadTweets();

