

/*
$.get("http://127.0.0.1:8080/subdivision/get_dataList",function(data,status){
	var elem = document.getElementById("selectSubdivision");
	var dat = '<select class="js-example-basic-single" name="state" style="width: 250px;">';
	for(var i=0;i<data.results.length-1;i++)
		dat += '<option value="AL">'+data.results[i].text+'</option>';
	dat += '<option value="WY">Wyoming</option>';
	dat += '</select>';
	elem.innerHTML = dat;
	
	$('.js-example-basic-single').select2();
});

$.get("http://127.0.0.1:8080/subdivision/get_dataList",function(data,status){
	var elem = document.getElementById("selectSubdivisionCode");
	var dat = '<select class="js-example-basic-single" name="state" style="width: 250px;">';
	for(var i=0;i<data.results.length-1;i++)
		dat += '<option value="AL">'+data.results[i].text+'</option>';
	dat += '<option value="WY">Wyoming</option>';
	dat += '</select>';
	elem.innerHTML = dat;
	
	$('.js-example-basic-single').select2();
});
*/