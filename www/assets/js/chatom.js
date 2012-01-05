$(document).ready(function() {
  
	window.categories = [];
		$('input:checkbox').each(function() {
		return window.categories.push($(this).attr('name'));
	});				  
				  
				  
  $("#getNewChatom").unbind('click').click(function(event) {
    event.preventDefault();
    return newChatom(); 
  });

  newChatom = function() 
  {
    return $.getJSON('http://chatoms.com/chatom.json', $(".categoryRadio:checked"), function(chatom) 
    {
        $('.category-name').text(window.categories[chatom.starters_category_id - 1]);
        $("#curChatom").hide().text(chatom.text).fadeIn();
    }); // end getJSON

  }; // end newChatom
  
}); // end Docready
