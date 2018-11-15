var flag=0;//Если 0-Режим просмотра 1-режим удаления
var zap=-1;//Выделенная запись в таблице ADSL
var page=1;//Текущая страница
var mainURL;//URL
/*
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
*/
//Клик по строке таблицы
function viewclick(obj){
	if(flag==0){
		zap = obj.id;
		loadADSLTable(page);
		//UNblockInput();    		
	}
}

function viewDepartment(obj){
	$("#view").dialog('open');
	if(flag==0){
		zap = obj.id;
	//	loadADSLTable(page);
		//UNblockInput();    		
	}
}

//Отправка запроса на получение данных-> получение результата запровс -> отображение полученных данных
function loadADSLTable(elem){
        $.ajax({
            type: 'GET',
            url:  mainURL + '/departmentList?page=' + elem + '&sizePage=20&name=' + encodeURIComponent(document.getElementById("ads_name_").value) + '&code=' + encodeURIComponent(document.getElementById("code_name_").value),
            dataType: 'json',
            async: true,
            success: function(data) {
                var elem2 = document.getElementById("ADSLList");//Таблица
        		var adslList='<table border="1" id="usersTable" width="600px">'+
        			'<thead>'+
        				'<tr>'+
        					'<th width="10px">#</th>'+
        					'<th>Код</th>'+
        					'<th>Подразделение</th>'+
        					'<th width="10px"></th>'+
        				'</tr>'+
        			'</thead>';
        			for(var i=0;i < parseInt(data.name.length); i++){
        				if(i != zap){
        					//Вставка
        					adslList+='<tbody>'+
        					'<tr onClick = "viewclick(this)" id="' + i + '">'+
        						'<td id="id' + i + '" width="20px">' + (i+1) + '</td>   <td width="20px" id="code' + i + '"   >' + data.code[i] + '</td>   <td  id="name' + i + '">' + data.name[i] + '</td>'+
        						'<td  width="10px"> <button id = "'+data.name[i] + '(' + data.code[i] + ')' +'" class="del" style="cursor:pointer" onClick = "viewDepartment(this)"><img src="styles/kartoteka/img/tableView.png" style="vertical-align: middle"></img></button> </td>'+
        					'</tr>'+
        					'</tbody>';
        				}
        				else{
        					loadInfo1(data.name[i], data.code[i]);//Запоним данными поля ввода
        					adslList+='<tbody>'+
        					'<tr onClick = "viewclick(this)" id="' + i + '">'+
        						'<td id="id' + i + '" width="20px" style="background: #cc0;">' + (i+1) + '</td>    <td width="20px" id="code' + i + '"  style="background: #cc0;">' + data.code[i] + '</td>    <td id="name' + i + '" style="background: #cc0;">'+data.name[i]+'</td>'+
        						'<td  width="10px"> <button id = "'+data.name[i] + '(' + data.code[i] + ')' +'" class="del" style="cursor:pointer" onClick = "viewDepartment(this)"><img src="styles/kartoteka/img/tableView.png" style="vertical-align: middle"></img></button> </td>'+
        					'</tr>'+
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
        url:  mainURL + '/departmentList?page=' + elem + '&sizePage=20&name=' + encodeURIComponent(document.getElementById("ads_name_").value) + '&code=' + encodeURIComponent(document.getElementById("code_name_").value),
        dataType: 'json',
        async: true,
        success: function(data) {
            var elem2 = document.getElementById("ADSLList");//Таблица
    		var adslList='<table border="1" id="usersTable">'+
    			'<thead>'+
    				'<tr>'+
    					'<th width="10px">#</th>'+
    					'<th>Код</th>'+
    					'<th>Подразделение</th>'+
    					'<th width="10px"></th>'+
    				'</tr>'+
    			'</thead>';
    			for(var i=0;i < parseInt(data.name.length); i++){
    					adslList += '<tbody>'+
    									'<tr><td class="' + i + '" id="id' + i + '" width="20px">' + (i+1) + '</td>      <td width="20px" id="code' + i + '" class="' + i + '">' + data.code[i] + '</td>      <td  id="name' + i + '" class="' + i + '">' + data.name[i] + '</td><td width="10px">      <button id = "'+data.name[i]+'" class="del" style="cursor:pointer" onClick = "getdetails(this)"><img src="styles/kartoteka/img/tableDel.png" style="vertical-align: middle"></img></button>        </td></tr>'+
    								'</tbody>';
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
/*
//Загрузка списка отделов в формате наименование/код в select2 в всплывающем окне
function reloadSelect2(name, code){
	if(name!='')
		$.ajax({
			type: 'GET',
			url:   mainURL + '/getSubdivisionList?name=' + encodeURIComponent(name) + '&code=' + encodeURIComponent(code),
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
		$('.js-example-basic-single').select2({
			data: ''
		});
}*/

//Заполним выподающий список списком подразделений
function initSelect2Set(){
	var elem = document.getElementById("subdivisions_");
	var dat = '<select id="subdivisionList_" class="js-example-basic-single" name="state" style="width: 200px;" multiple="multiple"></select>';
	elem.innerHTML = dat;

	$.ajax({
        type: 'GET',
        url:   mainURL + '/getSubdivisionList' ,
        dataType: 'json',
        async: true,
        success: function(result) {
        	//Очистка поля
        	$('#subdivisions_').html('').select2();
        	//console.log('fdfd');
        	$('.js-example-basic-single_').select2({
        		data: result
        	});
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert(jqXHR.status + ' ' + jqXHR.responseText);
        }
    });
}

//Загрузка списка отделов в формате наименование/код в select2 в всплывающем окне
function reloadSelect21(name, code){
	if(name!='')
		$.ajax({
			type: 'GET',
			url:   mainURL + '/getSubdivisionList?name=' + encodeURIComponent(name) + '&code=' + encodeURIComponent(code),
			dataType: 'json',
			async: true,
			success: function(data) {
				$('._js-example-basic-single_').select2({
					data: data
				});
			},
			error: function(jqXHR, textStatus, errorThrown) {
				alert(jqXHR.status + ' ' + jqXHR.responseText);
			}
		});
	else
		$('._js-example-basic-single_').select2({
			data: ''
		});
}

//Загрузка данных в форму изменения
function loadInfo1(name, code){
	document.getElementById("_departmentCode_").value = code;
	document.getElementById("_department_").value = name;
	
	$('#_subdivisions_').html('').select2();
	var elem = document.getElementById("_subdivisions_");
	var dat = '<select id="_subdivisionList_" class="js-example-basic-single" name="state" style="width: 100%;" multiple="multiple"></select>';
	elem.innerHTML = dat;
	
	reloadSelect21(name, code);
}


/*
//Загрузка данных
function loadInfo(name, code){
	var elem6 = document.getElementById("UserInfo");//Таблица
	elem6.innerHTML=''+
	'<div>Выбранный отдел:</div>'+
	'<div>'+
		'&nbsp;'+
		'<div>'+
			'<div>Код подразделения:</div><br/>'+
			'<div><input style=" width:400px" type="text" id="adsl_Code" value="' + code + '" readonly="readonly"></input></div>'+
		'</div>'+
		'&nbsp;'+
		'<div>'+
			'<div>Наименование подразделения:</div><br/>'+
			'<div><input style=" width:400px" type="text" id="adsl_Name" value="' + name + '" readonly="readonly"></input></div>'+
		'</div>'+
		'&nbsp;'+
		'<div>'+
			'<div">Сопоставленные отделы:</div><br/>'+
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
	
	reloadSelect2(name, code);
}*/

//При загрузке документа заполним таблицу
$(document).ready(function() {
	
	//Вычисление поддомена
	var ch = 0;
	var ref = window.location.href;
	var path = window.location.pathname;
	for(var i = ref.length - 1; i > 0; i--){
		if(ref[i] == '/') { ch = i; break;}
	}
	mainURL = ref.substring(0, ch);
	
	loadInfo1("","");
	//blockInput();
	loadADSLTable(1);	
});

//Обработка нажатия кнопки удалеия
function getdetails(obj) {
	if (confirm("Вы точно хотите удалить подразделение?")) {
		var param = obj.id;
		var param_ = [];
		param_.push(param);
		if(param!=''){
			$.ajax({
				type: 'DELETE',
				url:  mainURL + '/departmentList',
				contentType: 'application/json; charset=utf-8',
				data: JSON.stringify(param_),
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
			//blockInput();
			loadADSLTable(page);
		}
	}
}

//Обработка нажатия на кнопку удалить
$(document).on('click','#btn',function(){
	var elem = document.getElementById("menu_knopki");//Кнопка
	var elem3 = document.getElementById("ADSLList");//Таблица
	if(flag==0){
		//blockInput();
		flag=1;
			elem.innerHTML ='&nbsp;'+
			'<button  id="create" style="cursor:pointer"><img src="styles/kartoteka/img/plus.png" style="vertical-align: middle"></img>Создать</button>'+
			'&nbsp;'+
			'<button id="btn" style="cursor:pointer"><img src="styles/kartoteka/img/krest.png" style="vertical-align: middle"></img>Просмотр</button>';
			loadADSLTableDel(page);
	}
	else{
		//if(document.getElementById("adsl_Name").value!=''){
		//	blockInput();
		//}
		flag=0;
			elem.innerHTML ='&nbsp;'+
			'<button id="create" style="cursor:pointer"><img src="styles/kartoteka/img/plus.png" style="vertical-align: middle"></img>Создать</button>'+
			'&nbsp;'+
			'<button id="btn" style="cursor:pointer"><img src="styles/kartoteka/img/krest.png" style="vertical-align: middle"></img>Удаление</button>';
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


/*
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
 */


    //Обработка нажатия кнопки поиск
    $(document).on("click", "#poisk", function() {
    	loadInfo1("","");
    	//blockInput();
    	zap=-1;
    	if(flag==0)
    		loadADSLTable(1);
    	else
    		loadADSLTableDel(1);
    });
    
    
    /*
    //Клик по строке таблицы
    $(document).on("click", "#usersTable tbody tr td.info", function() {
    	if(flag==0){
    		//console.log($(this).attr("class"));
    		//console.log($(this).attr("id"));
    		zap = $(this).attr("id");
    		//zap=$(this).text();
    		loadADSLTable(page);
    		UNblockInput();    		
    	}
    });*/
      
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
/*    
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
    				'departmentCode': document.getElementById("departmentCode_").value,
    				'subdivisionName': arr
    		};    		
    		$.ajax({
    			type: 'PUT',
    			url:  mainURL + '/departmentList',
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
*/    
  //Обработка нажатия кнопки сохранить
    $(document).on("click", "#_vvod", function() {
    	var msg =[];
    	if(document.getElementById("_department_").value == '')
    		msg.push("\r\nВведите наименование отдела")
    	if(msg.length == 0) {
    		var arr = [];//Массив содержащий список ролей данного пользователя
    		var values = $('#_subdivisions_').val();//Вернём все значения списком
    		
    		//Получим позиции всех выбранных значений в списке
    		$('#_subdivisions_ option:selected').each(function() {
    			arr.push($(this).text());
    		});

    		var DepartmentDataObject= {
    				'departmentName': document.getElementById("_department_").value,
    				'departmentCode': document.getElementById("_departmentCode_").value,
    				'subdivisionName': arr
    		};
    		$.ajax({
    			type: 'POST',
    			url:  mainURL + '/departmentList',
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