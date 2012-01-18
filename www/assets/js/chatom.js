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
				  
	// handle saving checkboxes when they click done
	$("#DoneCategories").click(function(event) {
		saveCategories();
	});

// Load up the categories for this user
	categoriesLoad();
  
}); // end Docready


function categoriesLoad()
{
	Lawnchair(function(){
		this.get('config', function(config) {
			if (config == null)
			{
				console.log("Config Missing: Saving Default");				
				this.save({key:'config', categories:[1,2,3,4]}, function(newConfig){
					//console.log(newConfig);
				});
			}
			else
			{
				console.log(config);
				// for every enabled category, set the value to true
				$.each(config.categories, function(index, value) {
					$(".categoryRadio[value=" + value + "]").prop("checked", true);
				}); 
			}
		});
	}); // end Lawnchair
	
} // end categoriesLoad

function saveCategories()
{
	Lawnchair(function(){
		this.save({key:'config', categories:checkedCategories()}, function(newConfig){
					//console.log(newConfig);
		});
	});		
}

function checkedCategories()
{
	var checked = [];
	$(".categoryRadio:checked").each(function(index) {
		checked.push($(this).attr("value"));
		//console.log($(this).attr("value"));
	});
	return checked;
} // end checkedCategories
