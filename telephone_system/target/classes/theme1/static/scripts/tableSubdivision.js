var flag=0;//Если 0-Режим просмотра 1-режим удаления
var zap=-1;//Выделенная запись в таблице ADSL
var page=1;//Текущая страница
var countPage = 1;//Число страниц
var mainURL;//Поддомен
var currentLine=-1;//Строка таблицы выбранная в данный момент

//Клик по строке таблицы
function viewclick(obj){
	if(flag==0){    		
		zap = obj.id;
		loadADSLTable(page);		
	}
}

function viewSubdivision(obj){
	$("#view").dialog('open');
	if(flag==0){
		zap = obj.id;	
	}
}

//Отправка запроса на получение данных-> получение результата запровс -> отображение полученных данных
function loadADSLTable(elem){
		$.ajax({		
            type: 'GET',
            url:  mainURL + '/subdivisionList?page=' + elem + '&sizePage=20&name=' + encodeURIComponent(document.getElementById("ads_name_").value) + '&code=' + encodeURIComponent(document.getElementById("subdiv_code_").value),
            dataType: 'json',
            async: true,
            success: function(data) {
            	countPage = data.countPAge;
            	var elem2 = document.getElementById("ADSLList");//Таблица
        		var adslList='<table border="1" id="usersTable" width="600px">'+
        			'<thead>'+
        				'<tr>'+
        					'<th width="20px">#</th>'+
        					'<th id="column-header-1">Код</th>'+
        					'<th id="column-header-2">Отдел</th>'+
        					'<th width="10px"></th>'+
        				'</tr>'+
        			'</thead>';
        			for(var i=0;i < parseInt(data.name.length); i++){
        				if(i != zap){
        					//Вставка
        					adslList+='<tbody>'+
        					'<tr onClick = "viewclick(this)" id="' + i + '">'+
        						'<td id="id' + i + '" width="20px">' + (i+1) + '</td>   <td width="20px" id="code' + i + '"   >' + data.code[i] + '</td>   <td  id="name' + i + '">' + data.name[i] + '</td>'+
        						'<td  width="10px"> <button id = "'+data.name[i] + '(' + data.code[i] + ')' +'" class="del" style="cursor:pointer" onClick = "viewSubdivision(this)"><img src="styles/kartoteka/img/tableView.png" style="vertical-align: middle"></img></button> </td>'+
        					'</tr>'+
        					'</tbody>';
        				}
        				else{
        					loadInfo1(data.name[i], data.code[i]);//Запоним данными поля ввода
        					currentLine = i;//Номер выделенной в данный момент строки
        					adslList+='<tbody>'+
        					'<tr onClick = "viewclick(this)" id="' + i + '">'+
        						'<td id="id' + i + '" width="20px" style="background: #cc0;">' + (i+1) + '</td>    <td width="20px" id="code' + i + '"  style="background: #cc0;">' + data.code[i] + '</td>    <td id="name' + i + '" style="background: #cc0;">'+data.name[i]+'</td>'+
        						'<td  width="10px"> <button id = "'+data.name[i] + '(' + data.code[i] + ')' +'" class="del" style="cursor:pointer" onClick = "viewSubdivision(this)"><img src="styles/kartoteka/img/tableView.png" style="vertical-align: middle"></img></button> </td>'+
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
        			if(data.page+1 <= Math.ceil(data.countPAge)) button_p +='<button class="page-с" style="cursor:pointer" value="'+(data.page+1)+'">'+(data.page+1)+'</button>&nbsp;';
        			if(data.page+2 <= Math.ceil(data.countPAge)) button_p +='<button class="page-с" style="cursor:pointer" value="'+(data.page+2)+'">'+data.page+2+'</button>&nbsp;';
        			button_p +='<button class="page-r" style="cursor:pointer">&gt;</button>&nbsp;';
        			button.innerHTML = button_p;   
            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert('Error' + jqXHR.status + ' ' + jqXHR.responseText);
            }
        });
}

function loadADSLTableDel(elem){
	$.ajax({		
        type: 'GET',
        url:  mainURL + '/subdivisionList?page=' + elem + '&sizePage=20&name=' + encodeURIComponent(document.getElementById("ads_name_").value) + '&code=' + encodeURIComponent(document.getElementById("subdiv_code_").value),
        dataType: 'json',
        async: true,
        success: function(data) {
        	countPage = data.countPAge;
        	var elem2 = document.getElementById("ADSLList");//Таблица
    		var adslList='<table border="1" id="usersTable" width="600px">'+
    			'<thead>'+
    				'<tr>'+
    					'<th width="10px">#</th>'+
    					'<th>Код</th>'+
    					'<th>Отдел</th>'+
    					'<th width="10px"></th>'+
    				'</tr>'+
    			'</thead>';
    		/*
    			for(var i=0;i < parseInt(data.name.length); i++){
    					//Вставка
    					adslList+='<tbody>'+
    					'<tr onClick = "viewclick(this)" id="' + i + '">'+
    						'<td id="id' + i + '" width="20px">' + (i+1) + '</td>   <td width="20px" id="code' + i + '"   >' + data.code[i] + '</td>   <td  id="name' + i + '">' + data.name[i] + '</td>'+
    						'<td  width="10px"> <button id = "'+data.name[i] + '(' + data.code[i] + ')' +'" class="del" style="cursor:pointer" onClick = "viewSubdivision(this)"><img src="styles/kartoteka/img/tableView.png" style="vertical-align: middle"></img></button> </td>'+
    					'</tr>'+
    					'</tbody>';
    			}
    		*/	
    			for(var i=0;i < parseInt(data.name.length); i++){
					adslList += '<tbody>'+
									'<tr><td class="' + i + '" id="id' + i + '" width="20px">' + (i+1) + '</td>      <td width="20px" id="code' + i + '" class="' + i + '">' + data.code[i] + '</td>      <td  id="name' + i + '" class="' + i + '">' + data.name[i] + '</td><td width="10px"> <button id = "'+data.name[i] + '(' + data.code[i] + ')'+'" class="del" style="cursor:pointer" onClick = "getdetails(this)"><img src="styles/kartoteka/img/tableDel.png" style="vertical-align: middle"></img></button>        </td></tr>'+
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
    			if(data.page+1 <= Math.ceil(data.countPAge)) button_p +='<button class="page-с" style="cursor:pointer" value="'+(data.page+1)+'">'+(data.page+1)+'</button>&nbsp;';
    			if(data.page+2 <= Math.ceil(data.countPAge)) button_p +='<button class="page-с" style="cursor:pointer" value="'+(data.page+2)+'">'+data.page+2+'</button>&nbsp;';
    			button_p +='<button class="page-r" style="cursor:pointer">&gt;</button>&nbsp;';
    			button.innerHTML = button_p;   
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert('Error' + jqXHR.status + ' ' + jqXHR.responseText);
        }
    });
}

//Загрузка данных
function loadInfo1(name, code){
	document.getElementById("_code_").value = code;
	document.getElementById("_name_").value = name;
}

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
	if (confirm("Вы точно эотите удалить отдел?")) {
		var param = obj.id;
		if(param!=''){
			$.ajax({
				type: 'DELETE',
				url:  mainURL + '/subdivisionList',
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
	page = $(this).attr("value");
	if(flag==0)
		loadADSLTable(page);
	else
		loadADSLTableDel(page);
});
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

    //Изменение
    $(document).on("click", "#modSubdiv", function() {
    	
    	var SubdivisionDataObject= {
				'subdivisionName': document.getElementById("role" + currentLine).innerText,
				'subdivisionCode': document.getElementById("code" + currentLine).innerText,
				'newcod': document.getElementById("_code_").value,
				'newname': document.getElementById("_name_").value
		};
    	
    	//console.log(SubdivisionDataObject);
    	$.ajax({
			type: 'POST',
			url:  mainURL + '/subdivisionList',
			contentType: 'application/json; charset=utf-8',
			data: JSON.stringify(SubdivisionDataObject),
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
    });
      
  //Обработка нажатия кнопки создать
    $(document).on("click", "#create", function() {
    	if(!($("#dialog").dialog("isOpen")))
    		$("#dialog").dialog('open');
    	else
    		$("#dialog").dialog('close');
    });
    
    //Обработка кнопки ввод
    $(document).on("click", "#vvod", function() {
    	if(document.getElementById("adsl_").value!=""){
    		$.get(mainURL + "/subdivision/subdivision_create?name=" + encodeURIComponent(document.getElementById("adsl_").value)+"&code=" + encodeURIComponent(document.getElementById("code_").value),function(data,status){
    			var resp_vvod = document.getElementById("response_vvod");
    			if(data == "success")
    				alert('Вставка нового отдела успешно завершена');
    			else
    				if(data == "entry more then zero")
    					alert('Такой отдел уже есть в базе');
    				else
    					alert('Ошибка коммуникации');
    		loadADSLTable(page);
        });
    	}
    	else{
    		var resp_vvod = document.getElementById("response_vvod");
    		alert('Заполните все поля');
    	}
    });