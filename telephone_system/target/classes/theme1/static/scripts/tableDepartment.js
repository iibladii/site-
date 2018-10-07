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
        		var adslList='<table border="1" id="usersTable">'+
        			'<thead>'+
        				'<tr>'+
        					'<th>Отдел&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</th>'+
        				'</tr>'+
        			'</thead>';
        			for(var i=0;i < parseInt(data.name.length); i++){
        				if(data.name[i]!=zap.toString()){
        					
        					adslList+='<tbody>'+
        					'<tr><td class="info">'+data.name[i]+'</td></tr>'+
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
    					'<th>Отдел&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</th>'+
    				'</tr>'+
    			'</thead>';
    			for(var i=0;i < parseInt(data.name.length); i++){
    				if(data.name[i]!=zap.toString()){
    					adslList += '<tbody>'+
    									'<tr><td class="info">'+data.name[i]+'</td><td class="del"></td></tr>'+
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

//Загрузка данных
function loadInfo(str){
	var elem6 = document.getElementById("UserInfo");//Таблица
	elem6.innerHTML=''+
	'<div>Данные отдел:</div>'+
	'<div>'+
		'&nbsp;'+
		'<div>'+
			'<div class="informationL">Наименование отдела:</div>'+
			'<div class="informationR" id="fname"><input type="text" id="adsl_Name" size="28" value="'+str+'"></input></div>'+
		'</div>'+
		'&nbsp;'+
		'<div>'+
			'<div class="informationL">Сопоставленные подразделения:</div>'+
			'<div id="selectSubdivision"><select id="subdivisionList_" class="js-example-basic-multiple_" name="states[]" multiple="multiple" style="width: 330px;"></select></select></div>'+
			'<br/>'+
		'</div>'+
		'<div>'+
			'<div class="informationL"></div>'+
			'<div class="informationR" id="save_div"><button id="save" style="cursor:pointer">Сохранить</button></div>'+
		'</div>'+
	'</div>';
	var elem = document.getElementById("selectSubdivision");
	var dat = '<select class="js-example-basic-single" name="state" style="width: 200px;" multiple="multiple"></select>';
	elem.innerHTML = dat;
	
	//Загрузка списка отделов в формате наименование/код
	if(str!='')
		$.ajax({
			type: 'GET',
			url:   '/getSubdivisionList?name='+encodeURIComponent(str),
			dataType: 'json',
			async: true,
			success: function(data) {
				//alert(data[0].selected);
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
	
}

//При загрузке документа заполним таблицу
$(document).ready(function() {
	loadInfo("");
	blockInput();
	loadADSLTable(1);	
	
	//Заполним выподающий список
	var data_ = [];
	$.ajax({
        type: 'GET',
        url:   '/getSubdivisionList' ,
        dataType: 'json',
        async: true,
        success: function(result) {
        	$('.js-example-basic-single_').select2({
        		data: result
        	});
        	//$('.js-example-basic-single_').val([' ']).trigger("change"); 
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert(jqXHR.status + ' ' + jqXHR.responseText);
        }
    });
	
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
    