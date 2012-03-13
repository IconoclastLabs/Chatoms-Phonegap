$(document).ready(function() {
				  
	chatomsLoad();
				  
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

function chatomsLoad()
{
	
}

// This function grabs all the chatoms from starters.json and then parses them into arrays for each category
function grabAllChatoms()
{
	// read file of all conversation starters			  
	$.getJSON('assets/js/starters.json', function(allChatoms)
	{
		// First randomize the array
		allChatoms.sort(function() {return 0.5 - Math.random()}) //Array elements now scrambled
		// iterate over all the JSON and place in correct category location
		var localStarters = Array();
		var curCategory;
			
		$.each(allChatoms, function(i, curChatom) {
			curCategory = curChatom.starters_category_id;
			// make it an array if it's not
			if (localStarters[curCategory] instanceof Array)
			{
				// nothing
			}
			else 
			{
				localStarters[curCategory] = Array();
			} // end if
					 
			localStarters[curCategory].push(curChatom.text); 
		});  // end each
		
		return localStarters;			  
	});	
	
}


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
