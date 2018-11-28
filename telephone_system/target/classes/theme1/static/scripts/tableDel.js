var flag=0;//Если 0-Режим просмотра 1-режим удаления
var zap="";//Выделенная запись
var mainURL;//Поддомен
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

//Обновление списка пользователей
function load_table(){
	$.get(mainURL + "/getUsers",function(data,status){
		var elem2 = document.getElementById("UserList");//Таблица
		var userList='<table border="1" id="usersTable">'+
			'<thead>'+
				'<tr>'+
					'<th>Пользователь</th>'+
				'</tr>'+
			'</thead>';
			for(var i=0;i < parseInt(data.size); i++){
				if(data.name[i]!=zap.toString()){
					userList+='<tbody>'+
					'<tr><td class="info">'+data.name[i]+'</td>'+
					'</tbody>';
				}
				else{
					userList+='<tbody>'+
					'<tr><td class="info" style="background: #fc0;">'+data.name[i]+'</td>'+
					'</tbody>';
				}
			}
			userList+='</table>';
			elem2.innerHTML=userList;
	});
}

$(document).ready(function() {//При загрузке документа заполним таблицу
	
	//Выделение поддомена
	var ch = 0;
	var ref = window.location.href;
	var path = window.location.pathname;
	for(var i = ref.length - 1; i > 0; i--){
		if(ref[i] == '/') { ch = i; break;}
	}
	mainURL = ref.substring(0, ch)
	
	
	
	load_table();
	
	var elem6 = document.getElementById("UserInfo");//Таблица
	elem6.innerHTML=''+
	'<div>Данные пользователя:</div>'+
		'<div>'+
			'&nbsp;'+
			'<div>'+
				'<div class="informationL">Имя:</div>'+
				'<div class="informationR" id="fname"><input type="text" id="fname_in" size="28" style="width: 196px;"></input></div>'+
			'</div>'+
			'&nbsp;'+
			'<div>'+
				'<div class="informationL">Фамилия:</div>'+
				'<div class="informationR" id="sname"><input type="text" id="sname_in" size="28" style="width: 196px;"></input></div>'+
			'</div>'+
			'&nbsp;'+
			'<div>'+
				'<div class="informationL">Отчество:</div>'+
				'<div class="informationR" id="tname"><input type="text" id="tname_in" size="28" style="width: 196px;"></input></div>'+
			'</div>'+
			'&nbsp;'+
			'<div>'+
				'<div class="informationL">Логин:</div>'+
				'<div class="informationR" id="login"><input type="text" id="login_in" size="28" style="width: 196px;" readonly="readonly"></input></div>'+
			'</div>'+
			'&nbsp;'+
			'<div>'+
				'<div class="informationL">Новый пароль:</div>'+
				'<div class="informationR" id="pass1"><input type="text" id="pass1_in" size="28" style="width: 196px;"></input></div>'+
			'</div>'+
			'&nbsp;'+
			'<div>'+
				'<div class="informationL">Подтверждение пароля:</div>'+
				'<div class="informationR"  id="pass2"><input type="text" id="pass2_in" size="28" style="width: 196px;"></input></div>'+
			'</div>'+
			'&nbsp;'+
			'<div>'+
				'<div class="informationL">Роли:</div>'+
				'<div class="informationR" id="RoleList"><select class="js-example-basic-multiple" id="coopUpdate" name="states[]" multiple="multiple" style="width: 200px;"></select></div>'+
			'</div>'+
			'&nbsp;'+
			'<div>'+
				'<div class="informationL"></div>'+
				'<div class="informationR" id="save_div"><button id="save">Сохранить</button></div>'+
			'</div>'+
		'</div>';
	
	
	var data_ = [];
	$('.js-example-basic-multiple').select2({
		data: data_
	});
	/*
	$.ajax({
        type: 'GET',
        url:   "/roleList" ,
        dataType: 'json',
        async: true,
        success: function(result) {
        	for (var i = 0; i < result.length; i++){
        		data_.push(result[i]);
        	}
        	$('.js-example-basic-multiple').select2({
        		data: data_
        	});
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert(jqXHR.status + ' ' + jqXHR.responseText);
        }
    });*/
	blockInput();
});

$(document).on('click','#btn',function(){
	var elem = document.getElementById("menu_knopki");//Кнопка
	var elem3 = document.getElementById("UserList");//Таблица
	if(flag==0){
		blockInput();
		flag=1;
			elem.innerHTML ='&nbsp;'+
			'<button  id="create" style="cursor:pointer"><img src="styles/kartoteka/img/plus.png" style="vertical-align: middle"></img>Создать</button>'+
			'&nbsp;'+
			'<button id="btn" style="cursor:pointer"><img src="styles/kartoteka/img/plus.png" style="vertical-align: middle"></img>Подтвердить удаление</button>';
			
			$.get("/getUsers",function(data,status){
				var elem2 = document.getElementById("UserList");//Таблица
				var userList='<table border="1" id="usersTable">'+
					'<thead>'+
						'<tr>'+
							'<th>Пользователь</th><th>&nbsp;&nbsp;</th>'+
						'</tr>'+
					'</thead>';
					for(var i=0;i < parseInt(data.size); i++){
						userList+='<tbody>'+
							'<tr><td class="info">'+data.name[i]+'</td><td class="del"></td>'+
						'</tbody>';
					}
					userList+='</table>';
					elem2.innerHTML=userList;
			});
	}
	else{
			if(document.getElementById("login_in").value!=''){
				UNblockInput();
			}
			flag=0;
			elem.innerHTML ='&nbsp;'+
			'<button id="create" style="cursor:pointer"><img src="styles/kartoteka/img/plus.png" style="vertical-align: middle"></img>Создать</button>'+
			'&nbsp;'+
			'<button id="btn" style="cursor:pointer"><img src="styles/kartoteka/img/plus.png" style="vertical-align: middle"></img>Удалить</button>';
			//Сформируем массив логинов пользователей для удаления и выполним удаление
			var event = {
					// Получаем текст из всех указанных элементов в виде массива выборкой
					zp : [].map.call(document.getElementsByClassName("info"), function(el){
					    return el.textContent;
					}),
					sv : [].map.call(document.getElementsByClassName("del"), function(el){
					    return el.textContent;
					})
			};
			//Сформируем массив с логинами пользователей для удаления
			var param = [];
			for(var i=0; i<event.zp.length; i++)
				if(event.sv[i] == "x")
					param.push(event.zp[i]);
			//Отправим запрос на удаление
			$.ajax({
    			type: 'DELETE',
    			url:  mainURL + '/cooperators',
    			contentType: 'application/json; charset=utf-8',
    			data: JSON.stringify(param),
    			dataType: 'json',
    			async: true,
    			success: function(result) {
    				alert('Статус: ' + result);//Статус операции удаления
    				load_table();//Перезагрузка списка пользователей
    			},
    			error: function(jqXHR, textStatus, errorThrown) {
    				alert('Статус: ' + jqXHR.responseText);
    				load_table();//Перезагрузка списка пользователей
    			}
    		});
			//Удаление завершено
	}
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
    
  //Обработка кликов по таблице->колонка пользователя
    $(document).on("click", "#usersTable tbody tr td.info", function() {	
    	if(flag==0){
    	zap=$(this).text();
    	load_table();
    	$.get(mainURL + "/ajax/getRole?name="+$(this).text()+"",function(data,status){
    		var elem1 = document.getElementById("fname");//Имя
    		var elem2 = document.getElementById("sname");//Фамилия
    		var elem3 = document.getElementById("tname");//Отчество
    		var elem4 = document.getElementById("login");//Логин
    		var elem5 = document.getElementById("pass1");//Пароль
    		var elem6 = document.getElementById("pass2");//Пароль
    		var elem7 = document.getElementById("save_div");//Кнопка
    		elem1.innerHTML='<input type="text" id="fname_in" size="28" value="'+data.firstName+'"></input>';
    		elem2.innerHTML='<input type="text" id="sname_in" size="28" value="'+data.secondName+'"></input>';
    		elem3.innerHTML='<input type="text" id="tname_in" size="28" value="'+data.thirdName+'"></input>';
    		elem4.innerHTML='<input type="text" id="login_in" size="28" value="'+data.login+'" readonly="readonly"></input>';
    		elem5.innerHTML='<input type="password" id="pass1_in" size="28" value=""></input>';
    		elem6.innerHTML='<input type="password" id="pass2_in" size="28" value=""></input>';
    		var elem9 = document.getElementById("RoleList");
    		elem9.innerHTML='<select class="js-example-basic-multiple" id="coopUpdate" name="states[]" multiple="multiple" style="width: 200px;"></select>';
    		$('.js-example-basic-multiple').select2({
    			data: data.role_List
    		});
    		UNblockInput();
    	});
    }
    });
    
    //Обработка нажатия кнопки создать
    $(document).on("click", "#create", function() {
    	if(!($("#dialog").dialog("isOpen")))
    		$("#dialog").dialog('open');
    	else
    		$("#dialog").dialog('close');
    });

    //Обработка нажатия кнопки ввод на панели сбоку
    $(document).on("click", "#save", function() {
    	//Проверим заполнение обязательных полей и сформируем сообщение с требованием заполнить поля
    	var msg =[];
    	if(document.getElementById("sname_in").value == '')
    		document.getElementById("sname_in").value = ' '
    	if(document.getElementById("tname_in").value == '')
    		document.getElementById("tname_in").value = ' '
    	if(document.getElementById("fname_in").value == '')
    		msg.push("\r\nВведите имя пльзователя")
    	if(document.getElementById("login_in").value == '')
    		msg.push("\r\nВведите логин пльзователя")
    	if(document.getElementById("pass1_in").value == '')
    		msg.push("\r\nВведите пароль")
    	if(document.getElementById("pass2_in").value == '')
    		msg.push("\r\nВведите подтверждение пароля")
    	if(document.getElementById("pass1_in").value != document.getElementById("pass2_in").value)
    		msg.push("\r\nПароли не совпадают");
    	if(msg.length == 0) {
    		var arr = [];//Массив содержащий список ролей данного пользователя
    		var values = $('#coopUpdate').val();//Вернём все значения списком
    		//Получим позиции всех выбранных значений в списке
    		$('#coopUpdate option:selected').each(function() {
    			arr.push($(this).text());
    		});
    	
    		var CooperatorsDataObject= {
    				'fname': document.getElementById("fname_in").value,
    				'sname': document.getElementById("sname_in").value,
    				'tname': document.getElementById("tname_in").value,
    				'login': document.getElementById("login_in").value,
    				'pass': document.getElementById("pass1_in").value,
    				'roles': arr
    		};

    		$.ajax({
    			type: 'POST',
    			url:  mainURL + '/cooperators',
    			contentType: 'application/json; charset=utf-8',
    			data: JSON.stringify(CooperatorsDataObject),
    			dataType: 'json',
    			async: true,
    			success: function(result) {
    				alert('Статус: ' + result);
    			},
    			error: function(jqXHR, textStatus, errorThrown) {
    				alert('Статус: ' + jqXHR.responseText);
    			}
    		});
    	}
    	else{
    		alert(msg);
    	}
    });

    //Обработка нажатия кнопки ввод во всплывающем окне
    $(document).on("click", "#vvod", function() {
    	//Проверим заполнение обязательных полей и сформируем сообщение с требованием заполнить поля
    	var msg =[];
    	if(document.getElementById("sname_").value == '')
    		document.getElementById("sname_").value = ' '
    	if(document.getElementById("tname_").value == '')
    		document.getElementById("tname_").value = ' '
    	if(document.getElementById("fname_").value == '')
    		msg.push("\r\nВведите имя пльзователя")
    	if(document.getElementById("login_").value == '')
    		msg.push("\r\nВведите логин пльзователя")
    	if(document.getElementById("pass1_").value == '')
    		msg.push("\r\nВведите пароль")
    	if(document.getElementById("pass2_").value == '')
    		msg.push("\r\nВведите подтверждение пароля")
    	if(document.getElementById("pass1_").value != document.getElementById("pass2_").value)
    		msg.push("\r\nПароли не совпадают");
    	if(msg.length == 0) {
    		var arr = [];//Массив содержащий список ролей данного пользователя
    		var values = $('#roles_').val();//Вернём все значения списком
    		//Получим позиции всех выбранных значений в списке
    		$('#roles_ option:selected').each(function() {
    			arr.push($(this).text());
    		});
    	
    		var CooperatorsDataObject= {
    				'fname': document.getElementById("fname_").value,
    				'sname': document.getElementById("sname_").value,
    				'tname': document.getElementById("tname_").value,
    				'login': document.getElementById("login_").value,
    				'pass': document.getElementById("pass1_").value,
    				'roles': arr
    		};

    		$.ajax({
    			type: 'PUT',
    			url:  mainURL + '/cooperators',
    			contentType: 'application/json; charset=utf-8',
    			data: JSON.stringify(CooperatorsDataObject),
    			dataType: 'json',
    			async: true,
    			success: function(result) {
    				alert('Статус: ' + result);
    				load_table();//Перезагрузка списка пользователей
    			},
    			error: function(jqXHR, textStatus, errorThrown) {
    				alert('Статус: ' + jqXHR.responseText);
    				load_table();//Перезагрузка списка пользователей
    			}
    		});
    	}
    	else{
    		alert(msg);
    	}
    });