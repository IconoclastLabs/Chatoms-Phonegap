$(document).ready(function() {
  $("#getNewChatom").unbind('click').click(function(event) {
    event.preventDefault();
    //alert("YO");
    return newChatom(); 
  });



  newChatom = function() 
  {
    return $.getJSON('http://chatoms.com/chatom.json?personal=2', $(".categoryRadio:checked"), function(chatom) 
    {
        //$('.category-name').text(window.categories[chatom.starters_category_id - 1]);
        $("#curChatom").hide().text(chatom.text).fadeIn();
    }); // end getJSON

  }; // end newChatom
  
}); // end Docready
