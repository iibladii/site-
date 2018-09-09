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

function loadADSLTable(elem){
	$.get("/subdivision/subdivision_info?name="+encodeURIComponent(document.getElementById("ads_name_").value)+'&elem='+encodeURIComponent(elem)+"&code="+encodeURIComponent(document.getElementById("subdiv_code_").value),function(data,status){
		var elem2 = document.getElementById("ADSLList");//Таблица
		var adslList='<table border="1" id="usersTable">'+
			'<thead>'+
				'<tr>'+
					'<th>Подразделение</th>'+
				'</tr>'+
			'</thead>';
			for(var i=0;i < parseInt(data.roleList.length); i++){
				if(data.roleList[i]!=zap.toString()){
					adslList+='<tbody>'+
					'<tr><td class="info">'+data.roleList[i]+'</td></tr>'+
					'</tbody>';
				}
				else{
					adslList+='<tbody>'+
					'<tr><td class="info" style="background: #cc0;">'+data.roleList[i]+'</td></tr>'+
					'</tbody>';
				}
			}
			adslList+='</table>';
			elem2.innerHTML = adslList;
			
			var button_p = document.getElementById("buttonList");
			var button='';
			if((data.page - 3) > 0) button += '<button class="page-с" style="cursor:pointer" value='+(data.page - 3)+'>&lt;</button>&nbsp';
			else
				if((data.page - 2) > 0) button += '<button class="page-с" style="cursor:pointer" value='+(data.page - 2)+'>&lt;</button>&nbsp';
				else
					if((data.page - 1) > 0) button += '<button class="page-с" style="cursor:pointer" value='+(data.page - 1)+'>&lt;</button>&nbsp';
					else button += '<button class="page-с" style="cursor:pointer" value='+(data.page)+'>&lt;</button>&nbsp';
			if(data.page - 2 > 0) button += '<button class="page-с" style="cursor:pointer" value='+(data.page - 2)+'>'+(data.page - 2)+'</button>&nbsp';
			if(data.page - 1 > 0) button += '<button class="page-с" style="cursor:pointer" value='+(data.page - 1)+'>'+(data.page - 1)+'</button>&nbsp';
			if(data.page > 0) button += '<button class="page-с" style="cursor:pointer; background: #0c0;" value='+(data.page)+'>'+(data.page)+'</button>&nbsp';
			if(data.page + 1 <= Math.ceil(parseInt(data.count_elements)/20)) button += '<button class="page-с" style="cursor:pointer" value='+(data.page + 1)+'>'+(data.page + 1)+'</button>&nbsp';
			if(data.page + 2 <= Math.ceil(parseInt(data.count_elements)/20)) button += '<button class="page-с" style="cursor:pointer" value='+(data.page + 2)+'>'+(data.page + 2)+'</button>&nbsp';
			if((data.page + 3) <= Math.ceil(parseInt(data.count_elements)/20)) button += '<button class="page-с" style="cursor:pointer" value='+(data.page + 3)+'>&gt;</button>&nbsp';
			else
				if((data.page + 2) <= Math.ceil(parseInt(data.count_elements)/20)) button += '<button class="page-с" style="cursor:pointer" value='+(data.page + 2)+'>&gt;</button>&nbsp';
				else
					if((data.page + 1) <= Math.ceil(parseInt(data.count_elements)/20)) button += '<button class="page-с" style="cursor:pointer" value='+(data.page + 1)+'>&gt;</button>&nbsp';
					else button += '<button class="page-с" style="cursor:pointer" value='+(data.page)+'>&gt;</button>&nbsp';	
			page=data.page;
			button_p.innerHTML = button;
	});
}

function loadADSLTableDel(elem){
	$.get("/subdivision/subdivision_info?name="+encodeURIComponent(document.getElementById("ads_name_").value)+'&elem='+encodeURIComponent(elem)+"&code="+encodeURIComponent(document.getElementById("subdiv_code_").value),function(data,status){
		var elem2 = document.getElementById("ADSLList");//Таблица
		var adslList='<table border="1" id="usersTable">'+
			'<thead>'+
				'<tr>'+
					'<th>Подразделение&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</th><th>&nbsp&nbsp</th>'+
				'</tr>'+
			'</thead>';
			for(var i=0;i < parseInt(data.roleList.length); i++){
				
				adslList+='<tbody>'+
					'<tr><td class="info">'+data.roleList[i]+'</td><td class="del"></td></tr>'+
				'</tbody>';
			}
			adslList+='</table>';
			elem2.innerHTML=adslList;
			
			var button_p = document.getElementById("buttonList");
			var button='';
			if((data.page - 3) > 0) button += '<button class="page-с" style="cursor:pointer" value='+(data.page - 3)+'>&lt;</button>&nbsp';
			else
				if((data.page - 2) > 0) button += '<button class="page-с" style="cursor:pointer" value='+(data.page - 2)+'>&lt;</button>&nbsp';
				else
					if((data.page - 1) > 0) button += '<button class="page-с" style="cursor:pointer" value='+(data.page - 1)+'>&lt;</button>&nbsp';
					else button += '<button class="page-с" style="cursor:pointer" value='+(data.page)+'>&lt;</button>&nbsp';
			if(data.page - 2 > 0) button += '<button class="page-с" style="cursor:pointer" value='+(data.page - 2)+'>'+(data.page - 2)+'</button>&nbsp';
			if(data.page - 1 > 0) button += '<button class="page-с" style="cursor:pointer" value='+(data.page - 1)+'>'+(data.page - 1)+'</button>&nbsp';
			if(data.page > 0) button += '<button class="page-с" style="cursor:pointer; background: #0c0;" value='+(data.page)+'>'+(data.page)+'</button>&nbsp';
			if(data.page + 1 <= Math.ceil(parseInt(data.count_elements)/20)) button += '<button class="page-с" style="cursor:pointer" value='+(data.page + 1)+'>'+(data.page + 1)+'</button>&nbsp';
			if(data.page + 2 <= Math.ceil(parseInt(data.count_elements)/20)) button += '<button class="page-с" style="cursor:pointer" value='+(data.page + 2)+'>'+(data.page + 2)+'</button>&nbsp';
			if((data.page + 3) <= Math.ceil(parseInt(data.count_elements)/20)) button += '<button class="page-с" style="cursor:pointer" value='+(data.page + 3)+'>&gt;</button>&nbsp';
			else
				if((data.page + 2) <= Math.ceil(parseInt(data.count_elements)/20)) button += '<button class="page-с" style="cursor:pointer" value='+(data.page + 2)+'>&gt;</button>&nbsp';
				else
					if((data.page + 1) <= Math.ceil(parseInt(data.count_elements)/20)) button += '<button class="page-с" style="cursor:pointer" value='+(data.page + 1)+'>&gt;</button>&nbsp';
					else button += '<button class="page-с" style="cursor:pointer" value='+(data.page)+'>&gt;</button>&nbsp';	
			page=data.page;
			button_p.innerHTML = button;
	});
}

//Загрузка инфы
function loadInfo(str){
	var elem6 = document.getElementById("UserInfo");//Таблица
	elem6.innerHTML=''+
	'<div>Данные подразделение:</div>'+
	'<div>'+
		'&nbsp;'+
		'<div>'+
			'<div class="informationL">Наименование подразделения:</div>'+
			'<div class="informationR" id="fname"><input type="text" id="adsl_Name" size="28" value="'+str+'"></input></div>'+
		'</div>'+
		'&nbsp;'+
		'<div>'+
			'<div class="informationL">Код подразделения:</div>'+
			'<div class="informationR" id="cname"><input type="text" id="c_Name" size="28" value="'+str+'"></input></div>'+
		'</div>'+
		'&nbsp;'+
		'<div>'+
			'<div class="informationL"></div>'+
			'<div class="informationR" id="save_div"><button id="save" style="cursor:pointer">Сохранить</button></div>'+
		'</div>'+
	'</div>';
}

$(document).ready(function() {//При загрузке документа заполним таблицу
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
		
			//Инициализируем удаление выделенных строк/////////////////////////
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
			
			//Сформируем список параметров для запроса с учётом записей отмченных пользователем
			var param = "";
			for(var i=0; i<event.zp.length; i++) {
				if(event.sv[i] == "x")
					if(param!="")
						param+="," + event.zp[i]
					else
						param+=event.zp[i]
			}
			if(param!=''){
			//Отправим запрос на удаление
			$.get("/subdivision/subdivision_del?name=" + encodeURIComponent(param) ,function(data,status){
				if (!(status == "success")) {
		    		  //обработать ошибку
		    		  alert( status + ': ' + statusText ); // пример вывода: 404: Not Found
		    		  //Оповестим об ошибке коммуникации
		    		  loadInfo(document.getElementById("adsl_Name").value);
					  var elem6 = document.getElementById("save_div");
					  elem6.innerHTML='<button id="save" style="cursor:pointer">Сохранить</button><br/><br/><p style="color:#550000">Ошибка: ' + status + '</p>';
		    		}
		    	else {
		    		  //Вывести результат
		    		  var rsp = data;
		    		  if(rsp.toString() == "Delete success"){
		    			  //Оповестим об успехе сохранения
		    			  loadInfo(document.getElementById("adsl_Name").value);
		    			  var elem6 = document.getElementById("save_div");
		    			  elem6.innerHTML='<button id="save" style="cursor:pointer">Сохранить</button><br/><br/><p style="color:#005500">Удаление успешно</p>';
		    		  }
		    		  else{
		    			  //Оповестим об ошибке сохранения
		    			  loadInfo(document.getElementById("adsl_Name").value);
		    			  var elem6 = document.getElementById("save_div");
		    			  elem6.innerHTML='<button id="save" style="cursor:pointer">Сохранить</button><br/><br/><p style="color:#550000">Процесс удаления завершился ошибкой</p>';
		    		  }
		    		}
				blockInput();
				loadADSLTable(page);
			});
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

  //Обработка нажатия кнопки сохранить
    $(document).on("click", "#save", function() {
    	//Инициализируем сохранение
    	alert("fdf");
    	var xhr = new XMLHttpRequest();
    	var params = 'name=' + encodeURIComponent(document.getElementById("adsl_Name").value) +
    	  '&oldName=' + encodeURIComponent(zap) ;
    	xhr.open("GET", '/subdivision/subdivision_update?' + params, false);
    	xhr.send();
    	if (xhr.status != 200) {
    		  // обработать ошибку
    		  alert( xhr.status + ': ' + xhr.statusText ); // пример вывода: 404: Not Found
    		  //Оповестим об ошибке коммуникации
    		  loadInfo(document.getElementById("adsl_Name").value);
			  var elem6 = document.getElementById("save_div");
			  elem6.innerHTML='<button id="save" style="cursor:pointer">Сохранить</button><br/><br/><p style="color:#550000">Сервер не отвечает</p>';
    		}
    	else {
    		  // вывести результат
    		  var rsp = xhr.responseText;
    		  if(rsp.toString() == "Save success"){
    			  //Оповестим об успехе сохранения
    			  loadInfo(document.getElementById("adsl_Name").value);
    			  var elem6 = document.getElementById("save_div");
    			  elem6.innerHTML='<button id="save" style="cursor:pointer">Сохранить</button><br/><br/><p style="color:#005500">Сохранение успешно</p>';
    		  }
    		  else{
    			  //Оповестим об ошибке сохранения
    			  loadInfo(document.getElementById("adsl_Name").value);
    			  var elem6 = document.getElementById("save_div");
    			  elem6.innerHTML='<button id="save" style="cursor:pointer">Сохранить</button><br/><br/><p style="color:#550000">Запись уже существует</p>';
    		  }
    		}
    	zap=document.getElementById("adsl_Name").value;
    	if(flag==0)
    		loadADSLTable(page);
    	else
    		loadADSLTableDel(page);
    });
    
  //Обработка кликов по таблице->колонка пользователя
    $(document).on("click", "#usersTable tbody tr td.info", function() {
    	if(flag==0){    		
    		zap=$(this).text();
    		loadADSLTable(page);
    		loadInfo($(this).text());
    		UNblockInput();
    	}
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
    		$.get("/subdivision/subdivision_create?name=" + encodeURIComponent(document.getElementById("adsl_").value)+"&code=" + encodeURIComponent(document.getElementById("code_").value),function(data,status){
    			var resp_vvod = document.getElementById("response_vvod");
    			if(data == "success")
    				resp_vvod.innerHTML='<p style="color:#005500">Вставка нового подразделения успешно завершена</p>';
    			else
    				if(data == "entry more then zero")
    					resp_vvod.innerHTML='<p style="color:#550000">Такой подразделение уже есть в базе</p>';
    				else
    					resp_vvod.innerHTML='<p style="color:#550000">Ошибка коммуникации</p>';
    		loadADSLTable(page);
        });
    	}
    	else{
    		var resp_vvod = document.getElementById("response_vvod");
    		resp_vvod.innerHTML='<p style="color:#550000">Заполните все поля</p>';
    	}
    });