$(document).ready(function() {

  $("#tweet-text").on("input", function() {
    let currentNode = $("#tweet-text").parent();
    setTimeout(() =>{
      let charLimit = currentNode.parent().find("output").val();
      charLimit = 140 - $("#tweet-text").val().length;
      currentNode.parent().find("output").val(charLimit);
      
      if (currentNode.parent().find("output").val() < 0) {
        currentNode.parent().find("output").addClass("redText");
      } else {
        currentNode.parent().find("output").removeClass("redText");
      }
    }, 0);
  });
});



