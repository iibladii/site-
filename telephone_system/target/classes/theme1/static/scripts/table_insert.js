//<!--Генерация таблицы-->$("#poisk").click(function(){//Обработка нажатия кнопки с id = poisk             $('button').click(function(){//Обработка нажатий всех кнопок
var current_number_button=1;
var max_number_button=5;
$(document).ready(function() {
	$("body").on("click", ".page-l", function (){//Обрабатывает нажатие кнопки с классом page-p кнопки с номерами страниц
		(current_number_button-1) >= 1 ? current_number_button-- : current_number_button;//Проверка на выход за левую границу и изменение значения переменной(Сдвиг на одну страницу влево)
		$.get("/ajaxtest?number="+document.getElementById("number").value+"&att1="+document.getElementById("att1").value+"&att2="+document.getElementById("att2").value+"&room="+document.getElementById("room").value+"&department="+document.getElementById("department").value+"&adsl="+document.getElementById("adsl").value+"&subdivision="+document.getElementById("subdivision").value+"&subdivision_code="+document.getElementById("subdivision_code").value+"&page="+current_number_button+"",function(data,status){
			 function createCalendar(id,id1,id2) {
			  var elem = document.getElementById(id);//Таблица
			  var elem1 = document.getElementById(id1);//Надпись о числе страниц
			  var elem2 = document.getElementById(id2);//Кнопки с выбором страницы
			  //var table = '<table><thead><tr><th>#</th><th>Номер</th><th>Аттрибут 1</th><th>Аттрибут 2</th><th>Подразделение</th><th>Местоположение</th><th>Отдел</th><th>Код подразделения</th><th>Адсл</th></tr></thead><tbody><tr>';
			  var table = '<table><thead><tr><th>#</th><th>Номер</th><th>Связанные номера</th><th>Охрана</th><th>Подразделение</th><th>Местоположение</th><th>Код подразделения</th></tr></thead><tbody><tr>';
			  for(var i=0;i < parseInt(data.size); i++){
				  table += '<td>'+(i+1)+'</td>';
				  table += '<td>'+data.number[i]+'</td>';
				  table += '<td>'+data.att1[i]+'</td>';
				  table += '<td>'+data.att2[i]+'</td>';
				  table += '<td>'+data.room[i]+'</td>';
				  table += '<td>'+data.subdivision[i]+'</td>';
				  //table += '<td>'+data.department[i]+'</td>';
				  table += '<td>'+data.code[i]+'</td>';
				  //table += '<td>'+data.adsl[i]+'</td>';
				  table += '</tr><tr>';
			  }
			    // закрыть таблицу
			  table += '</tr></tbody></table>';
			  // только одно присваивание innerHTML
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
			createCalendar("content","count_elem","button_page")
		 });
	});
	
	$("body").on("click", ".page-r", function (){//Обрабатывает нажатие кнопки с классом page-p кнопки с номерами страниц
		(current_number_button) < max_number_button ? current_number_button++ : current_number_button;//Проверка на выход за правую границу и изменение значения переменной(Сдвиг на одну страницу вправо)
		$.get("/ajaxtest?number="+document.getElementById("number").value+"&att1="+document.getElementById("att1").value+"&att2="+document.getElementById("att2").value+"&room="+document.getElementById("room").value+"&department="+document.getElementById("department").value+"&adsl="+document.getElementById("adsl").value+"&subdivision="+document.getElementById("subdivision").value+"&subdivision_code="+document.getElementById("subdivision_code").value+"&page="+current_number_button+"",function(data,status){
			 function createCalendar(id,id1,id2) {
			  var elem = document.getElementById(id);//Таблица
			  var elem1 = document.getElementById(id1);//Надпись о числе страниц
			  var elem2 = document.getElementById(id2);//Кнопки с выбором страницы
			  //var table = '<table><thead><tr><th>#</th><th>Номер</th><th>Аттрибут 1</th><th>Аттрибут 2</th><th>Подразделение</th><th>Местоположение</th><th>Отдел</th><th>Код подразделения</th><th>Адсл</th></tr></thead><tbody><tr>';
			  var table = '<table><thead><tr><th>#</th><th>Номер</th><th>Связанные номера</th><th>Охрана</th><th>Подразделение</th><th>Местоположение</th><th>Код подразделения</th></tr></thead><tbody><tr>';
			  for(var i=0;i < parseInt(data.size); i++){
				  table += '<td>'+(i+1)+'</td>';
				  table += '<td>'+data.number[i]+'</td>';
				  table += '<td>'+data.att1[i]+'</td>';
				  table += '<td>'+data.att2[i]+'</td>';
				  table += '<td>'+data.room[i]+'</td>';
				  table += '<td>'+data.subdivision[i]+'</td>';
				  //table += '<td>'+data.department[i]+'</td>';
				  table += '<td>'+data.code[i]+'</td>';
				  //table += '<td>'+data.adsl[i]+'</td>';
				  table += '</tr><tr>';
			  }
			    // закрыть таблицу
			  table += '</tr></tbody></table>';
			  // только одно присваивание innerHTML
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
			createCalendar("content","count_elem","button_page")
		 });
	});
	
	$("body").on("click", ".page-с", function (){//Обрабатывает нажатие кнопки с классом page-p кнопки с номерами страниц
		//$(".page-с").css('color', '#000');//Покрасим все кнопки в один цвет
		//$(this).css('color', '#F00');//Установим нажатой кнопке нужный цвет
		
		$.get("/ajaxtest?number="+document.getElementById("number").value+"&att1="+document.getElementById("att1").value+"&att2="+document.getElementById("att2").value+"&room="+document.getElementById("room").value+"&department="+document.getElementById("department").value+"&adsl="+document.getElementById("adsl").value+"&subdivision="+document.getElementById("subdivision").value+"&subdivision_code="+document.getElementById("subdivision_code").value+"&page="+$(this).attr("value")+"",function(data,status){
			 function createCalendar(id,id1,id2) {
			  var elem = document.getElementById(id);//Таблица
			  var elem1 = document.getElementById(id1);//Надпись о числе страниц
			  var elem2 = document.getElementById(id2);//Кнопки с выбором страницы
			  //var table = '<table><thead><tr><th>#</th><th>Номер</th><th>Аттрибут 1</th><th>Аттрибут 2</th><th>Подразделение</th><th>Местоположение</th><th>Отдел</th><th>Код подразделения</th><th>Адсл</th></tr></thead><tbody><tr>';
			  var table = '<table><thead><tr><th>#</th><th>Номер</th><th>Связанные номера</th><th>Охрана</th><th>Подразделение</th><th>Местоположение</th><th>Код подразделения</th></tr></thead><tbody><tr>';
			  for(var i=0;i < parseInt(data.size); i++){
				  table += '<td>'+(i+1)+'</td>';
				  table += '<td>'+data.number[i]+'</td>';
				  table += '<td>'+data.att1[i]+'</td>';
				  table += '<td>'+data.att2[i]+'</td>';
				  table += '<td>'+data.room[i]+'</td>';
				  table += '<td>'+data.subdivision[i]+'</td>';
				  //table += '<td>'+data.department[i]+'</td>';
				  table += '<td>'+data.code[i]+'</td>';
				  //table += '<td>'+data.adsl[i]+'</td>';
				  table += '</tr><tr>';
			  }
			    // закрыть таблицу
			  table += '</tr></tbody></table>';
			  // только одно присваивание innerHTML
			  elem.innerHTML = table;
			  
			var button_p = '<button class="page-l" style="cursor:pointer">&lt;</button>&nbsp;';
			if(data.page_no-2>0) button_p +='<button class="page-с" style="cursor:pointer" value="'+(data.page_no-2)+'">'+(data.page_no-2)+'</button>&nbsp;';
			if(data.page_no-1>0) button_p +='<button class="page-с" style="cursor:pointer" value="'+(data.page_no-1)+'">'+(data.page_no-1)+'</button>&nbsp;';
			if(data.page_no>0) button_p +='<button class="page-с" style="cursor:pointer; background:green"  value="'+data.page_no+'">'+data.page_no+'</button>&nbsp;';
			current_number_button=data.page_no;
			max_number_button=Math.ceil(parseInt(data.page_count)/20);
			if(data.page_no+1<=Math.ceil(parseInt(data.page_count)/20)) button_p +='<button class="page-с" style="cursor:pointer" value="'+(data.page_no+1)+'">'+(data.page_no+1)+'</button>&nbsp;';
			if(data.page_no+2<=Math.ceil(parseInt(data.page_count)/20)) button_p +='<button class="page-с" style="cursor:pointer" value="'+(data.page_no+2)+'">'+data.page_no+2+'</button>&nbsp;';
			button_p +='<button class="page-r" style="cursor:pointer">&gt;</button>&nbsp;';
			elem2.innerHTML = button_p;  
			  
			  //Формируем надпись о номере текущей страницы и числе страниц
			  var countElem;
				  countElem='<a>&nbsp;Страница '+data.page_no+' из '+Math.ceil(parseInt(data.page_count)/20)+'</a>';
				  
			  elem1.innerHTML = countElem;
			}
			 
			createCalendar("content","count_elem","button_page")
		 });
	});
		
	$("body").on("click", ".page-p", function (){//Обрабатывает нажатие кнопки с классом page-p кнопка поиск
		$.get("/ajaxtest?number="+document.getElementById("number").value+"&att1="+document.getElementById("att1").value+"&att2="+document.getElementById("att2").value+"&room="+document.getElementById("room").value+"&department="+document.getElementById("department").value+"&adsl="+document.getElementById("adsl").value+"&subdivision="+document.getElementById("subdivision").value+"&subdivision_code="+document.getElementById("subdivision_code").value+"&page="+1+"",function(data,status){
			 function createCalendar(id,id1,id2) {
			  var elem = document.getElementById(id);
			  var elem1 = document.getElementById(id1);
			  var elem2 = document.getElementById(id2);
			  //var table = '<table><thead><tr><th>#</th><th>Номер</th><th>Аттрибут 1</th><th>Аттрибут 2</th><th>Подразделение</th><th>Местоположение</th><th>Отдел</th><th>Код подразделения</th><th>Адсл</th></tr></thead><tbody><tr>';
			  var table = '<table><thead><tr><th>#</th><th>Номер</th><th>Связанные номера</th><th>Охрана</th><th>Подразделение</th><th>Местоположение</th><th>Код подразделения</th></tr></thead><tbody><tr>';
			  for(var i=0;i < parseInt(data.size); i++){
				  table += '<td>'+(i+1)+'</td>';
				  table += '<td>'+data.number[i]+'</td>';
				  table += '<td>'+data.att1[i]+'</td>';
				  table += '<td>'+data.att2[i]+'</td>';
				  table += '<td>'+data.room[i]+'</td>';
				  table += '<td>'+data.subdivision[i]+'</td>';
				  //table += '<td>'+data.department[i]+'</td>';
				  table += '<td>'+data.code[i]+'</td>';
				  //table += '<td>'+data.adsl[i]+'</td>';
				  table += '</tr><tr>';
			  }
			    // закрыть таблицу
			  table += '</tr></tbody></table>';
			  // только одно присваивание innerHTML
			  elem.innerHTML = table;
			  
			  var button_p = '<button  class="page-l" style="cursor:pointer">&lt;</button>&nbsp;';
				if(data.page_no-2>0) button_p +='<button class="page-с" style="cursor:pointer" value="'+(data.page_no-2)+'">'+(data.page_no-2)+'</button>&nbsp;';
				if(data.page_no-1>0) button_p +='<button class="page-с" style="cursor:pointer" value="'+(data.page_no-1)+'">'+(data.page_no-1)+'</button>&nbsp;';
				if(data.page_no>0) button_p +='<button class="page-с" style="cursor:pointer; background:green"  value="'+data.page_no+'">'+data.page_no+'</button>&nbsp;';
				current_number_button=data.page_no;
				max_number_button=Math.ceil(parseInt(data.page_count)/20);
				if(data.page_no+1<=Math.ceil(parseInt(data.page_count)/20)) button_p +='<button class="page-с" style="cursor:pointer" value="'+(data.page_no+1)+'">'+(data.page_no+1)+'</button>&nbsp;';
				if(data.page_no+2<=Math.ceil(parseInt(data.page_count)/20)) button_p +='<button class="page-с" style="cursor:pointer" value="'+(data.page_no+2)+'">'+data.page_no+2+'</button>&nbsp;';
				button_p +='<button  class="page-r" style="cursor:pointer">&gt;</button>&nbsp;';
				elem2.innerHTML = button_p;  
			  
			  //Формируем надпись о номере текущей страницы и числе страниц
			  var countElem;
				  countElem='<a>&nbsp;Страница '+data.page_no+' из '+Math.ceil(parseInt(data.page_count)/20)+'</a>';
				  
			  elem1.innerHTML = countElem;
			}
			 
			createCalendar("content","count_elem","button_page")
		 });
	});
	
	$.get("/ajaxtest?number=&att1=&att2=&room=&department=&adsl=&subdivision=&subdivision_code=&page=1",function(data,status){
		 function createCalendar1(id,id1,id2) {
		  var elem = document.getElementById(id);
		  var elem1 = document.getElementById(id1);
		  var elem2 = document.getElementById(id2);
		  //var table = '<table><thead><tr><th>#</th><th>Номер</th><th>Аттрибут 1</th><th>Аттрибут 2</th><th>Подразделение</th><th>Местоположение</th><th>Отдел</th><th>Код подразделения</th><th>Адсл</th></tr></thead><tbody><tr>';
		  var table = '<table><thead><tr><th>#</th><th>Номер</th><th>Связанные номера</th><th>Охрана</th><th>Подразделение</th><th>Местоположение</th><th>Код подразделения</th></tr></thead><tbody><tr>';
		  for(var i=0;i < parseInt(data.size); i++){
			  table += '<td>'+(i+1)+'</td>';
			  table += '<td>'+data.number[i]+'</td>';
			  table += '<td>'+data.att1[i]+'</td>';
			  table += '<td>'+data.att2[i]+'</td>';
			  table += '<td>'+data.room[i]+'</td>';
			  table += '<td>'+data.subdivision[i]+'</td>';
			  //table += '<td>'+data.department[i]+'</td>';
			  table += '<td>'+data.code[i]+'</td>';
			  //table += '<td>'+data.adsl[i]+'</td>';
			  table += '</tr><tr>';
		  }
		    // закрыть таблицу
		  table += '</tr></tbody></table>';
		  
		  var button_p = '<button  class="page-l" style="cursor:pointer">&lt;</button>&nbsp;';
			if(data.page_no-2>0) button_p +='<button class="page-с" style="cursor:pointer" value="'+(data.page_no-2)+'">'+(data.page_no-2)+'</button>&nbsp;';
			if(data.page_no-1>0) button_p +='<button class="page-с" style="cursor:pointer" value="'+(data.page_no-1)+'">'+(data.page_no-1)+'</button>&nbsp;';
			if(data.page_no>0) button_p +='<button class="page-с" style="cursor:pointer; background:green" value="'+data.page_no+'">'+data.page_no+'</button>&nbsp;';
			current_number_button=data.page_no;
			max_number_button=Math.ceil(parseInt(data.page_count)/20);
			if(data.page_no+1<=Math.ceil(parseInt(data.page_count)/20)) button_p +='<button class="page-с" style="cursor:pointer" value="'+(data.page_no+1)+'">'+(data.page_no+1)+'</button>&nbsp;';
			if(data.page_no+2<=Math.ceil(parseInt(data.page_count)/20)) button_p +='<button class="page-с" style="cursor:pointer" value="'+(data.page_no+2)+'">'+data.page_no+2+'</button>&nbsp;';
			button_p +='<button  class="page-r" style="cursor:pointer">&gt;</button>&nbsp;';
			elem2.innerHTML = button_p; 
		  // только одно присваивание innerHTML
		  elem.innerHTML = table;
		  countElem='<a>&nbsp;Страница '+data.page_no+' из '+Math.ceil(parseInt(data.page_count)/20)+'</a>';
		  elem1.innerHTML = countElem;
		} 
		createCalendar1("content","count_elem","button_page")
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

