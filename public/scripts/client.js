/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


/*
<section class="timeline">
  <article class="tweets">
          <header class="tweet-header"><div>username, <img src="https://s.yimg.com/cv/apiv2/default/mlb/20190319/500x500/yankees_wbgs.png" width = 50px, height="50px"></div><div>handle</div></header>
          <p class="tweet-body">text body2 alfalfa</p>

          
          <footer class="tweet-footer">time, <div class="footer-icons"><i class="fa-solid fa-flag hovericon1"></i> <i class="fa-solid fa-retweet hovericon1"></i><i class="fa-regular fa-heart hovericon1"></i></div></footer>

        </article>
*/
// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ]



$(document).ready(function() {
  // --- our code goes here ---
  console.log("IMREADY");
  $(".errorLong").slideUp(0);
  $(".errorShort").slideUp(0);


  const button = $(".submit");
  $( "form" ).submit(function( event ) {
    event.preventDefault();
    if ($( "#tweet-text" ).val().length < 1) {
      $(".errorShort").slideDown();
      return;
    }
    if ($( "#tweet-text" ).val().length > 140) {
      $(".errorLong").slideDown();
      return;
    }
    // $( "#tweet-text" ).serialize();
    if (140 >= $( "#tweet-text" ).val().length > 0) {
      $(".errorLong").slideUp(0);
      $(".errorShort").slideUp(0);
      $.post("/tweets/", $( "#tweet-text" ).serialize());
      setTimeout(()=> loadTweets(), 200);
      $( "#tweet-text" ).val() = "";  // need to empty it after

      
    }
  });
//   const $tweet = createTweetElement(tweetData);

// // Test / driver code (temporary)
//   $('.timeline').append($tweet); 

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



/*
for each json.parseuser
body.append `${user.name}`

*/



// const $tweet = createTweetElement(tweetData);

// // Test / driver code (temporary)
// console.log($tweet); // to see what it looks like
// $('#timeline').append($tweet); 