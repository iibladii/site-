//<!--Генерация таблицы-->$("#poisk").click(function(){//Обработка нажатия кнопки с id = poisk             $('button').click(function(){//Обработка нажатий всех кнопок
var current_number_button=1;
var max_number_button=5;

function getDataInitial(number, att1, att2, room, department, adsl, subdivision, subdivision_code, page){
	$.ajax({
        type: 'GET',
        url: '/ajaxtest?number='+number+"&att1="+att1+"&att2="+att2+"&room="+room+"&department="+department+"&adsl="+adsl+"&subdivision="+subdivision+"&subdivision_code="+subdivision_code+"&page="+page,
        dataType: 'json',
        async: true,
        success: function(result) {
  			createCalendar("content","count_elem","button_page", result);
  			//alert(result);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert(jqXHR.status + ' ' + jqXHR.responseText);
        }
    });
}

function createCalendar(id,id1,id2, data) {
	  var elem = document.getElementById(id);//Таблица
	  var elem1 = document.getElementById(id1);//Надпись о числе страниц
	  var elem2 = document.getElementById(id2);//Кнопки с выбором страницы
	  var table = '<table><thead><tr><th>#</th><th>Номер</th><th>Связанные номера</th><th>Охрана</th><th>Подразделение</th><th>Местоположение</th><th>Отдел</th><th>Код подразделения</th></tr></thead><tbody><tr>';
	  for(var i=0;i < parseInt(data.size); i++){
		  table += '<td>'+(i+1)+'</td>';
		  table += '<td>'+data.number[i]+'</td>';
		  table += '<td>'+data.att1[i]+'</td>';
		  table += '<td>'+data.att2[i]+'</td>';
		  table += '<td>'+data.department[i]+'</td>';
		  table += '<td>'+data.room[i]+'</td>';
		  table += '<td>'+data.subdivision[i]+'</td>';
		  table += '<td>'+data.code[i]+'</td>';
		  table += '</tr><tr>';
	  }
	  //закрыть таблицу
	  table += '</tr></tbody></table>';
	  //только одно присваивание innerHTML
	  elem.innerHTML = table;		  
	  var button_p = '<button class="page-l" style="cursor:pointer">&lt;</button>&nbsp;';
	  if(data.page_no-2>0) button_p +='<button class="page-с" style="cursor:pointer" value="'+(data.page_no-2)+'">'+(data.page_no-2)+'</button>&nbsp;';
	  if(data.page_no-1>0) button_p +='<button class="page-с" style="cursor:pointer" value="'+(data.page_no-1)+'">'+(data.page_no-1)+'</button>&nbsp;';
	  if(data.page_no>0) button_p +='<button class="page-с" style="cursor:pointer; background:green"  value="'+data.page_no+'">'+data.page_no+'</button>&nbsp;';
	  if(data.page_no+1<=Math.ceil(parseInt(data.page_count)/20)) button_p +='<button class="page-с" style="cursor:pointer" value="'+(data.page_no+1)+'">'+(data.page_no+1)+'</button>&nbsp;';
	  if(data.page_no+2<=Math.ceil(parseInt(data.page_count)/20)) button_p +='<button class="page-с" style="cursor:pointer" value="'+(data.page_no+2)+'">'+data.page_no+2+'</button>&nbsp;';
	  button_p +='<button class="page-r" style="cursor:pointer">&gt;</button>&nbsp;';
	  elem2.innerHTML = button_p;    
	  //Формируем надпись о номере текущей страницы и числе страниц
	  var countElem;
	  countElem='<a>&nbsp;Страница '+data.page_no+' из '+Math.ceil(parseInt(data.page_count)/20)+'</a>';
	  elem1.innerHTML = countElem;
}



function departmentListInit(){
	$.ajax({
        type: 'GET',
        url:   '/Select2kartotekaList_department' ,
        dataType: 'json',
        async: true,
        success: function(result) {
        	//alert(result[0].selected)
        	$('#DepartmentList_').select2({
                data: result
        	});
        	//Выбор пустой опции
        	$('#DepartmentList_').val(null).trigger('change');
        	
        	//$('#DepartmentList_').select2({ placeholder: "Select Franchise" });
        	/*
        	//Очистка
        	$('#DepartmentList_').select2( "destroy" );
        	
        	$('#DepartmentList_').select2({
        		data: result
        	});*/
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert(jqXHR.status + ' ' + jqXHR.responseText);
        }
    });
	
	//init subdivision
	$('#SubdivisionList_').select2({
		data: []
	});
	
	//init events
	//Событие выбора элемента отдела из списка
	$('#DepartmentList_').on('select2:select', function (e) {

		//$('#DepartmentList_ option:selected').each(function() {
		//	dep = $(this).text();
		//});
		//console.log(e.params.data.text);
		//Очистка
    	//$('#SubdivisionList_').select2( "destroy" );
		
    	
		$.ajax({
	        type: 'GET',
	        url:   '/Select2kartotekaList_subdivision?name='+ e.params.data.text,
	        dataType: 'json',
	        async: true,
	        success: function(result) {
	        	//Очистка поля
	        	$("#SubdivisionList_").html('').select2();
	        	//Заполнение данными
	        	$('#SubdivisionList_').select2({
	        		data: result
	        	});
	        },
	        error: function(jqXHR, textStatus, errorThrown) {
	            alert(jqXHR.status + ' ' + jqXHR.responseText);
	        }
	    });
	});
	
}

/*
//Выбор
$('#DepartmentList_').on('select2:select', function (e) {
    var data = e.params.data;
    console.log(data);
});
*/
/*
//Событие выбора элемента отдела из списка
$('#DepartmentList_').on('select2:select', function (e) {

	$('#DepartmentList_ option:selected').each(function() {
		dep = $(this).text();
	});
	
	$.ajax({
        type: 'GET',
        url:   '/Select2kartotekaList_department?depName=',
        dataType: 'json',
        async: true,
        success: function(result) {
        	$('#SubdivisionList_').select2({
        		data: result
        	});
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert(jqXHR.status + ' ' + jqXHR.responseText);
        }
    });
});
*/

$(document).ready(function() {
	
	//Инициализация таблицы при открытии страницы
	getDataInitial('','','','','','','','','');

	//Инициализация списка подразделений
	departmentListInit();
	
	/*
	//init
	var dut = [1,2];
	$('.js-example-basic-multiple_').select2({
		data: dut
	});
	*/
	
	//Обрабатывает нажатие кнопки с классом page-p кнопки с номерами страниц
	$("body").on("click", ".page-l", function () {
		getDataInitial((current_number_button-1) >= 1 ? current_number_button-- : current_number_button);
	});
	
	//Обрабатывает нажатие кнопки с классом page-p кнопки с номерами страниц
	$("body").on("click", ".page-r", function (){
		getDataInitial((current_number_button) < max_number_button ? current_number_button++ : current_number_button);
	});
	
	//Обрабатывает нажатие кнопки с классом page-p кнопки с номерами страниц
	$("body").on("click", ".page-с", function (){
		getDataInitial($(this).attr("value"));
	});
	
	//Обрабатывает нажатие кнопки с классом page-p кнопка поиск
	$("body").on("click", ".page-p", function (){
		/*
		alert('number:  '+document.getElementById("number").value);
		alert('att1:  '+document.getElementById("att1").value);
		alert('att2:  '+document.getElementById("att2").value);
		alert('room:  '+document.getElementById("room").value);
		alert('department:  '+document.getElementById("department").value);
		//alert('adsl:  '+document.getElementById("adsl").value);
		alert('subdivision:  '+document.getElementById("subdivision").value);
		alert('subdivision_code:  '+document.getElementById("subdivision_code").value);
		alert('page:  '+'1');
		*/
		getDataInitial(
				document.getElementById("number").value,
				document.getElementById("att1").value,
				document.getElementById("att2").value,
				document.getElementById("room").value,
				document.getElementById("department").value,
				//document.getElementById("adsl").value,
				'',
				document.getElementById("subdivision").value,
				document.getElementById("subdivision_code").value,
				'1'
				);
	});
});




/*
$(document).on("click", "#vvod", function() {
	var arr = [];//Массив содержащий список ролей данного пользователя
	var values = $('#roles_').val();//Вернём все значения списком
	//Получим позиции всех выбранных значений в списке
	$('#roles_ option:selected').each(function() {
		arr.push($(this).text());
	});
});*/
$(document).on("click", "#vvod", function() {
	var dep;//Выбранный отдел
	//Получим позиции всех выбранных значений в списке
	$('#roles_ option:selected').each(function() {
		dep = $(this).text();
	});
	
	
	var arr =
		[
			document.getElementById("p1").value,
			document.getElementById("p2").value,
			document.getElementById("p3").value,
			document.getElementById("p4").value,
			document.getElementById("p5").value,
		];
	var KartotekaDataObject= {
			'telephone': document.getElementById("number_").value,
			'departmentName': document.getElementById("sname_").value,
			'subdivisionName': document.getElementById("tname_").value,
			'att1': document.getElementById("DepartmentList_").value,
			'att2': document.getElementById("SubdivisionList_").value,
			'cross': arr,
			'comments': getElementById("note").value,
			'room': document.getElementById("place_").value
	};
	$.ajax({
		type: 'PUT',
		url:  '/kartoteka',
		contentType: 'application/json; charset=utf-8',
		data: JSON.stringify(CooperatorsDataObject),
		dataType: 'json',
		async: true,
        success: function(result) {
  			//createCalendar("content","count_elem","button_page", result);
  			alert(result);
  			//Обновление таблицы при открытии страницы
  			getDataInitial('','','','','','','','','');
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert(jqXHR.status + ' ' + jqXHR.responseText);
        }
    });
	
	
	
	
});


//Обработка нажатия кнопки создать
$(document).on("click", "#create", function() {
	if(!($("#dialog").dialog("isOpen")))
		$("#dialog").dialog('open');
	else
		$("#dialog").dialog('close');
});

/*
//Обработка нажатия кнопки ввод
$(document).on("click", "#vvod", function() {
	$.get("/ajax/kartoteka_create/number_",function(data,status){

	}
});
*/

/*
$('#mySelect2').select2({
	  ajax: {
	    url: '/subdivision/get_dataList',
	    processResults: function (data) {
	      // Tranforms the top-level key of the response object from 'items' to 'results'
	      return {
	        results: data.items
	      };
	    }
	  }
	});
*/

