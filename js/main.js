$(document).ready(function(){

	var items = getFromLocal('memos');
	var index;
	loadList(items);
	// if input is empty disable button
	$('button').prop('disabled', false);

	// bind input enter with button submit
	$('#main-input').keypress(function(e){
		if(e.which === 13) {
			if ($('#main-input').val().length !== 0)
				$('#main-button').click();
		}
	});

	$('#go-button').click(function(){
	console.log(JSON.stringify(items))
		window.location = './plan_my_day.html';
	});

	$('#main-button').click(function(){
		var task = $('#main-input').val();
		var loc = $('#main-loc').val();
		items.push({
		task: task,
		location: loc});
		//console.log(items[0]);
		$('#main-input').val('');
		$('#main-loc').val('');
		loadList(items);
		storeToLocal('memos', items);

	});
	// delete one item
	$('ul').delegate("span", "click", function(event){
		event.stopPropagation();
		index = $('span').index(this);
		$('li').eq(index).remove();
		items.splice(index, 1);
		storeToLocal('memos', items);

	});


	// loadList
	function loadList(items){
		$('li').remove();
		if(items.length > 0) {
			for(var i = 0; i < items.length; i++) {
				$('ul').append('<li class= "list-group-item" data-toggle="modal" data-target="#editModal">' + items[i].task+ " @ " + items[i].location + '<span class="glyphicon glyphicon-remove"></span</li>');
			}
		}
	};

	function storeToLocal(key, items){
		localStorage[key] = JSON.stringify(items);
	}

	function getFromLocal(key){
		if(localStorage[key])
			return JSON.parse(localStorage[key]);
		else
			return [];
	}

});
