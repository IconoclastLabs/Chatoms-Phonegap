window.chatoms = Array();
window.liveCategories = Array();

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
	curChatom = getRandomChatom();			  
	//alert(curChatom);			  
	$('.category-name').text(window.categories[curChatom.starters_category_id - 1]);
	$("#curChatom").hide().text(curChatom.text).fadeIn();

				  
  }; // end newChatom
				  
	// handle saving checkboxes when they click done
	$("#DoneCategories").click(function(event) {
		saveCategories();
	});

	// Load up the categories for this user
	categoriesLoad();
  	// Load chatoms
	chatomsLoad();
}); // end Docready

function updateCategories() 
{
	window.liveCategories = [];
	$('input:checkbox').each(function() {
		return window.liveCategories.push($(this).attr('value'));
	});	
	
}

function getRandomChatom()
{
	return window.chatoms.pop();	
}

function chatomsLoad()
{
	grabAllChatoms();
}

// This function grabs all the chatoms from starters.json and then parses them into arrays for each category
function grabAllChatoms()
{
	var jsonChatoms = Array();
	// read file of all conversation starters			  
	jsonChatoms = $.getJSON('assets/js/starters.json', function(allChatoms)
	{
		// First randomize the array
		allChatoms.sort(function() {return 0.5 - Math.random()}) //Array elements now scrambled
		// iterate over all the JSON and place in global if the category is live
		var localStarters = Array();
		var curCategory;
			
		$.each(allChatoms, function(i, curChatom) {
			curCategory = curChatom.starters_category_id;
			// check if category is in the allowed list 
		    //via http://stackoverflow.com/questions/1181575/javascript-determine-whether-an-array-contains-a-value
			   
			//if (window.liveCategories.indexOf(curCategory) > -1)
			//{
				localStarters.push(curChatom); 
			//} // end if
					 
			
		});  // end each
		
		window.chatoms = localStarters;
		return localStarters;			  
	});	
	
	
	return jsonChatoms;
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

	// keep array of categories
	updateCategories();
} // end categoriesLoad

function saveCategories()
{
	Lawnchair(function(){
		this.save({key:'config', categories:checkedCategories()}, function(newConfig){
					//console.log(newConfig);
		});
	});		
	// keep array of categories
	updateCategories();
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
