var flag=0;//Если 0-Режим просмотра 1-режим удаления
var zap="";//Выделенная запись в таблице ADSL
var page=1;//Текущая страница

function UNblockInput(){
	$('#save').prop("disabled", false);//Разблокируем кнопку
	$('#UserInfo input').prop("disabled", false);//Разблокируем
	$('#UserInfo select').prop("disabled", false);//Разблокируем
}

function blockInput(){
	$('#save').attr('disabled', 'disabled');//Заблокируем кнопку
	$('#UserInfo input').attr('disabled', 'disabled');//Заблокируем
	$('#UserInfo select').attr('disabled', 'disabled');//Заблокируем
}

//Отправка запроса на получение данных-> получение результата запровс -> отображение полученных данных
function loadADSLTable(elem){
        $.ajax({
            type: 'GET',
            url:  '/departmentList?page=' + elem + '&sizePage=20&name=' + encodeURIComponent(document.getElementById("ads_name_").value),
            dataType: 'json',
            async: true,
            success: function(data) {
                var elem2 = document.getElementById("ADSLList");//Таблица
        		var adslList='<table border="1" id="usersTable" width="600px">'+
        			'<thead>'+
        				'<tr>'+
        					'<th>Отдел</th>'+
        				'</tr>'+
        			'</thead>';
        			for(var i=0;i < parseInt(data.name.length); i++){
        				if(data.name[i]!=zap.toString()){
        					
        					//Если в ячейку таблицы не влезают символы делаем перенос
        					var longelem;
        					//if(data.name[i].length>20){longelem = data.name[i].substring(0,20)+'\r\n'+data.name[i].substring(20,data.name[i].length);}
        					//else
        						longelem = data.name[i];
        					
        					//Вставка с учётом переноса
        					adslList+='<tbody>'+
        					'<tr><td class="info">'+longelem+'</td></tr>'+
        					'</tbody>';
        				}
        				else{
        					loadInfo(data.name[i]);//Запоним данными поля ввода
        					adslList+='<tbody>'+
        					'<tr><td id="currentCode" class="info" style="background: #cc0;">'+data.name[i]+'</td></tr>'+
        					'</tbody>';
        				}
        			}
        			adslList+='</table>';
        			elem2.innerHTML = adslList;
        			//Создадим кнопки
        			var button = document.getElementById("buttonList");
        			var button_p = '<button class="page-l" style="cursor:pointer">&lt;</button>&nbsp;';
        			if(data.page-2 > 0) button_p +='<button class="page-с" style="cursor:pointer" value="'+(data.page-2)+'">'+(data.page-2)+'</button>&nbsp;';
        			if(data.page-1 > 0) button_p +='<button class="page-с" style="cursor:pointer" value="'+(data.page-1)+'">'+(data.page-1)+'</button>&nbsp;';
        			if(data.page>0) button_p +='<button class="page-с" style="cursor:pointer; background:green"  value="'+data.page+'">'+data.page+'</button>&nbsp;';
        			if(data.page+1 <= Math.ceil(parseInt(data.countPage)/20)) button_p +='<button class="page-с" style="cursor:pointer" value="'+(data.page+1)+'">'+(data.page+1)+'</button>&nbsp;';
        			if(data.page+2 <= Math.ceil(parseInt(data.countPage)/20)) button_p +='<button class="page-с" style="cursor:pointer" value="'+(data.page+2)+'">'+data.page+2+'</button>&nbsp;';
        			button_p +='<button class="page-r" style="cursor:pointer">&gt;</button>&nbsp;';
        			button.innerHTML = button_p;   
            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert('Error' + jqXHR.status + ' ' + jqXHR.responseText);
            }
        });
}

//Формирование таблицы для удаления подразделений
function loadADSLTableDel(elem){
	$.ajax({
        type: 'GET',
        url:  '/departmentList?page=' + elem + '&sizePage=20&name=' + encodeURIComponent(document.getElementById("ads_name_").value),
        dataType: 'json',
        async: true,
        success: function(data) {
            var elem2 = document.getElementById("ADSLList");//Таблица
    		var adslList='<table border="1" id="usersTable">'+
    			'<thead>'+
    				'<tr>'+
    					'<th>Отдел</th>'+
    					'<th>&nbsp&nbsp</th>'+
    				'</tr>'+
    			'</thead>';
    			for(var i=0;i < parseInt(data.name.length); i++){
    				//if(data.name[i]!=zap.toString()){
    					adslList += '<tbody>'+
    									'<tr><td class="info">'+data.name[i]+'</td><td class="del"></td></tr>'+
    								'</tbody>';
    				//}
    			}
    			adslList+='</table>';
    			elem2.innerHTML = adslList;
    			//Создадим кнопки
    			var button = document.getElementById("buttonList");
    			var button_p = '<button class="page-l" style="cursor:pointer">&lt;</button>&nbsp;';
    			if(data.page-2 > 0) button_p +='<button class="page-с" style="cursor:pointer" value="'+(data.page-2)+'">'+(data.page-2)+'</button>&nbsp;';
    			if(data.page-1 > 0) button_p +='<button class="page-с" style="cursor:pointer" value="'+(data.page-1)+'">'+(data.page-1)+'</button>&nbsp;';
    			if(data.page>0) button_p +='<button class="page-с" style="cursor:pointer; background:green"  value="'+data.page+'">'+data.page+'</button>&nbsp;';
    			if(data.page+1 <= Math.ceil(parseInt(data.countPage)/20)) button_p +='<button class="page-с" style="cursor:pointer" value="'+(data.page+1)+'">'+(data.page+1)+'</button>&nbsp;';
    			if(data.page+2 <= Math.ceil(parseInt(data.countPage)/20)) button_p +='<button class="page-с" style="cursor:pointer" value="'+(data.page+2)+'">'+data.page+2+'</button>&nbsp;';
    			button_p +='<button class="page-r" style="cursor:pointer">&gt;</button>&nbsp;';
    			button.innerHTML = button_p;   
              
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert('Error' + jqXHR.status + ' ' + jqXHR.responseText);
        }
    });
}

//Загрузка списка отделов в формате наименование/код в select2 в всплывающем окне
function reloadSelect2(str){
	if(str!='')
		$.ajax({
			type: 'GET',
			url:   '/getSubdivisionList?name='+encodeURIComponent(str),
			dataType: 'json',
			async: true,
			success: function(data) {
				$('.js-example-basic-single').select2({
					data: data
				});
			},
			error: function(jqXHR, textStatus, errorThrown) {
				alert(jqXHR.status + ' ' + jqXHR.responseText);
			}
		});
	else
		//$('.js-example-basic-single').val([]);
		$('.js-example-basic-single').select2({
			data: ''
		});
}

//Заполним выподающий список списком подразделений
function initSelect2Set(){
	var elem = document.getElementById("selectSubdivision");
	var dat = '<select id="subdivisionList_" class="js-example-basic-single" name="state" style="width: 200px;" multiple="multiple"></select>';
	elem.innerHTML = dat;

	$.ajax({
        type: 'GET',
        url:   '/getSubdivisionList' ,
        dataType: 'json',
        async: true,
        success: function(result) {
        	//Очистка поля
        	$('#subdivisions_').html('').select2();
        	console.log('fdfd');
        	$('.js-example-basic-single_').select2({
        		data: result
        	});
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert(jqXHR.status + ' ' + jqXHR.responseText);
        }
    });
}


//Загрузка данных
function loadInfo(str){
	var elem6 = document.getElementById("UserInfo");//Таблица
	elem6.innerHTML=''+
	'<div>Выбранный отдел:</div>'+
	'<div>'+
		'&nbsp;'+
		'<div>'+
			'<div>Наименование отдела:</div><br/>'+
			'<div><input style=" width:400px" type="text" id="adsl_Name" value="'+str+'" readonly="readonly"></input></div>'+
		'</div>'+
		'&nbsp;'+
		'<div>'+
			'<div">Сопоставленные подразделения:</div><br/>'+
			'<div style=" width:100%" id="selectSubdivision"></div>'+
			'<br/>'+
		'</div>'+
		'<div>'+
			'<div id="save_div"><button id="save" style="cursor:pointer">Сохранить</button></div>'+
		'</div>'+
	'</div>';

	var elem = document.getElementById("selectSubdivision");
	var dat = '<select id="subdivisionList_" class="js-example-basic-single" name="state" style="width: 100%;" multiple="multiple"></select>';
	elem.innerHTML = dat;
	
	reloadSelect2(str);
}

//При загрузке документа заполним таблицу
$(document).ready(function() {
	loadInfo("");
	blockInput();
	loadADSLTable(1);	
});

//Обработка нажатия на кнопку удалить
$(document).on('click','#btn',function(){
	var elem = document.getElementById("menu_knopki");//Кнопка
	var elem3 = document.getElementById("ADSLList");//Таблица
	if(flag==0){
		blockInput();
		flag=1;
			elem.innerHTML ='&nbsp;'+
			'<button  id="create" style="cursor:pointer"><img src="styles/kartoteka/img/plus.png" style="vertical-align: middle"></img>Создать</button>'+
			'&nbsp;'+
			'<button id="btn" style="cursor:pointer"><img src="styles/kartoteka/img/krest.png" style="vertical-align: middle"></img>Подтвердить удаление</button>';
			loadADSLTableDel(page);
	}
	else{
		if(document.getElementById("adsl_Name").value!=''){
			blockInput();
		}
		flag=0;
			elem.innerHTML ='&nbsp;'+
			'<button id="create" style="cursor:pointer"><img src="styles/kartoteka/img/plus.png" style="vertical-align: middle"></img>Создать</button>'+
			'&nbsp;'+
			'<button id="btn" style="cursor:pointer"><img src="styles/kartoteka/img/krest.png" style="vertical-align: middle"></img>Удалить</button>';
		
			//Инициализируем удаление выделенных строк
			//Подготовим данные
			var event = {
					// Получаем текст из всех указанных элементов в виде массива выборкой
					zp : [].map.call(document.getElementsByClassName("info"), function(el){
					    return el.textContent;
					}),
					sv : [].map.call(document.getElementsByClassName("del"), function(el){
					    return el.textContent;
					})
			};
			
			/*
			//Сформируем список параметров для запроса с учётом записей отмченных пользователем
			var param = "";
			for(var i=0; i<event.zp.length; i++) {
				if(event.sv[i] == "x")
					if(param!="")
						param+="," + event.zp[i]
					else
						param+=event.zp[i]
			*/
			var param = [];
			for(var i=0; i<event.zp.length; i++) {
				if(event.sv[i] == "x")
						param.push(event.zp[i]);
				
			}
			if(param!=''){
				$.ajax({
	    			type: 'DELETE',
	    			url:  '/departmentList',
	    			contentType: 'application/json; charset=utf-8',
	    			data: JSON.stringify(param),
	    			dataType: 'json',
	    			async: true,
	    			success: function(result) {
	    				alert('Статус: ' + result);
	    				loadADSLTable(1);
	    			},
	    			error: function(jqXHR, textStatus, errorThrown) {
	    				alert('Статус: ' + jqXHR.responseText);
	    				loadADSLTable(1);
	    			}
	    		});
				blockInput();
				loadADSLTable(page);
				
			
		}
		else
			loadADSLTable(page);
	}
});

//Обработка нажатия на кнопку с номером страницы
$(document).on("click", ".page-с", function (){
	if(flag==0)
		loadADSLTable($(this).attr("value"));
	else
		loadADSLTableDel($(this).attr("value"));
});

	//Обработка кликов по таблице->колонка удаления
    $(document).on("click", "#usersTable tbody tr td.del", function() {
    	//Если кликнули в режиме удаления
    	if(flag==1){
    		if($(this).text()=='') 
    			$(this).text(function(index, text){
    				text = 'x';
    				return text;
    			});
    		else
        		$(this).text(function(index, text){
        			text = '';
                    return text;
        		});
    	}
    });
    
    //Обработка нажатия кнопки поиск
    $(document).on("click", "#poisk", function() {
    	loadInfo("");
    	blockInput();
    	zap="";
    	if(flag==0)
    		loadADSLTable(1);
    	else
    		loadADSLTableDel(1);
    });
    
    $(document).on("click", "#usersTable tbody tr td.info", function() {
    	if(flag==0){    		
    		zap=$(this).text();
    		loadADSLTable(page);
    		UNblockInput();    		
    	}
    });
      
  //Обработка нажатия кнопки создать
    $(document).on("click", "#create", function() {
    	if(!($("#dialog").dialog("isOpen")))
    		{
    			$("#dialog").dialog('open');
    			initSelect2Set();
    		}
    	else
    		$("#dialog").dialog('close');
    });
    
  //Обработка нажатия кнопки ввод во всплывающем окне
    $(document).on("click", "#vvod", function() {
    	//Проверим заполнение обязательных полей и сформируем сообщение с требованием заполнить поля
    	var msg =[];
    	if(document.getElementById("department_").value == '')
    		msg.push("\r\nВведите имя пльзователя")
    	if(msg.length == 0) {
    		var arr = [];//Массив содержащий список ролей данного пользователя
    		var values = $('#subdivisions_').val();//Вернём все значения списком
    		//Получим позиции всех выбранных значений в списке
    		$('#subdivisions_ option:selected').each(function() {
    			arr.push($(this).text());
    		});
    	
    		var DepartmentDataObject= {
    				'departmentName': document.getElementById("department_").value,
    				'subdivisionName': arr
    		};    		
    		$.ajax({
    			type: 'PUT',
    			url:  '/departmentList',
    			contentType: 'application/json; charset=utf-8',
    			data: JSON.stringify(DepartmentDataObject),
    			dataType: 'json',
    			async: true,
    			success: function(result) {
    				alert('Статус: ' + result);
    				loadADSLTable(1);
    			},
    			error: function(jqXHR, textStatus, errorThrown) {
    				alert('Статус: ' + jqXHR.responseText);
    				loadADSLTable(1);
    			}
    		});
    	}
    	else{
    		alert(msg);
    	}
    });
    
  //Обработка нажатия кнопки сохранить
    $(document).on("click", "#save", function() {
    	var msg =[];
    	if(document.getElementById("adsl_Name").value == '')
    		msg.push("\r\nВведите наименование отдела")
    	if(msg.length == 0) {
    		var arr = [];//Массив содержащий список ролей данного пользователя
    		var values = $('#subdivisionList_').val();//Вернём все значения списком
    		
    		//Получим позиции всех выбранных значений в списке
    		$('#subdivisionList_ option:selected').each(function() {
    			arr.push($(this).text());
    		});

    		var DepartmentDataObject= {
    				'departmentName': document.getElementById("adsl_Name").value,
    				'subdivisionName': arr
    		};
    		$.ajax({
    			type: 'POST',
    			url:  '/departmentList',
    			contentType: 'application/json; charset=utf-8',
    			data: JSON.stringify(DepartmentDataObject),
    			dataType: 'json',
    			async: true,
    			success: function(result) {
    				alert('Статус: ' + result);
    				loadADSLTable(1);
    			},
    			error: function(jqXHR, textStatus, errorThrown) {
    				alert('Статус: ' + jqXHR.responseText);
    				loadADSLTable(1);
    			}
    		});
    	}
    	else alert(msg);
    });