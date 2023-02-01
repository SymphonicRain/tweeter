$(document).ready(function() {
  // --- our code goes here ---
  console.log("IMREADY");

  $("#tweet-text").on("keyup", function() {
    let currentNode = $("#tweet-text").parent();
    setTimeout(() =>{
      let charLimit = currentNode.parent().find("output").val();
      charLimit = 140 - $("#tweet-text").val().length;
      currentNode.parent().find("output").val(charLimit);
      
      if (currentNode.parent().find("output").val() < 0) {
        currentNode.parent().find("output").css({"color": "red"});
      } else (
        currentNode.parent().find("output").css({"color": "#545149"})     
      )
 
    }, 0);
  })
});



