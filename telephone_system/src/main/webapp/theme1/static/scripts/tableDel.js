var flag=0;//Если 0-Режим просмотра 1-режим удаления
var zap="";//Выделенная запись
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
	$.get("/getUsers",function(data,status){
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
	load_table();
	
	var elem6 = document.getElementById("UserInfo");//Таблица
	elem6.innerHTML=''+
	'<div>Данные пользователя:</div>'+
		'<div>'+
			'&nbsp;'+
			'<div>'+
				'<div class="informationL">*Имя:</div>'+
				'<div class="informationR" id="fname"><input type="text" id="fname_in" size="28"></input></div>'+
			'</div>'+
			'&nbsp;'+
			'<div>'+
				'<div class="informationL">Фамилия:</div>'+
				'<div class="informationR" id="sname"><input type="text" id="sname_in" size="28"></input></div>'+
			'</div>'+
			'&nbsp;'+
			'<div>'+
				'<div class="informationL">Отчество:</div>'+
				'<div class="informationR" id="tname"><input type="text" id="tname_in" size="28"></input></div>'+
			'</div>'+
			'&nbsp;'+
			'<div>'+
				'<div class="informationL">*Логин:</div>'+
				'<div class="informationR" id="login"><input type="text" id="login_in" size="28"></input></div>'+
			'</div>'+
			'&nbsp;'+
			'<div>'+
				'<div class="informationL">*Новый пароль:</div>'+
				'<div class="informationR" id="pass1"><input type="text" id="pass1_in" size="28"></input></div>'+
			'</div>'+
			'&nbsp;'+
			'<div>'+
				'<div class="informationL">*Подтверждение пароля:</div>'+
				'<div class="informationR"  id="pass2"><input type="text" id="pass2_in" size="28"></input></div>'+
			'</div>'+
			'&nbsp;'+
			'<div>'+
				'<div class="informationL">Роли:</div>'+
				'<div class="informationR" id="RoleList"><select class="js-example-basic-multiple" id="coopUpdate" name="states[]" multiple="multiple" style="width: 200px;"></select></div>'+
			'</div>'+
			'&nbsp;'+
			
			//'<div>'+
			//	'<div><select name="select" size="12" multiple style="visibility:hidden;"></select></div>'+
			//'</div>'+
			
			'<div>'+
				'<div class="informationL"></div>'+
				'<div class="informationR" id="save_div"><button id="save">Сохранить</button></div>'+
			'</div>'+
		'</div>';
	blockInput();

	
/*	
	var data = [
	    {
	        id: 0,
	        text: 'enhancement'
	    },
	    {
	        id: 1,
	        text: 'bug'
	    },
	    {
	        id: 2,
	        text: 'duplicate'
	    },
	    {
	        id: 3,
	        text: 'invalid'
	    },
	    {
	        id: 4,
	        text: 'wontfix'
	    }
	];
	
$('.js-example-basic-multiple').select2({
	data: data
});
*/
});
/*
	if(!str.localeCompare("Удалит1")){
*/


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
			load_table();
			/*
			$.get("/getUsers",function(data,status){
				var elem2 = document.getElementById("UserList");//Таблица
				var userList='<table border="1" id="usersTable">'+
					'<thead>'+
						'<tr>'+
							'<th>Пользователь</th>'+
						'</tr>'+
					'</thead>';
					for(var i=0;i < parseInt(data.size); i++){
						userList+='<tbody>'+
							'<tr><td class="info">'+data.name[i]+'</td>'+
						'</tbody>';
					}
					userList+='</table>';
					elem2.innerHTML=userList;
			});*/
			
	}
});

	//Обработка кликов по таблице->колонка удаления
    $(document).on("click", "#usersTable tbody tr td.del", function() {
    	//Если кликнули в режиме удаления
    	if(flag==1){
    		//alert( $(this).text() );
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
    	$.get("/ajax/getRole?name="+$(this).text()+"",function(data,status){
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
    		elem4.innerHTML='<input type="text" id="login_in" size="28" value="'+data.login+'"></input>';
    		elem5.innerHTML='<input type="password" id="pass1_in" size="28" value=""></input>';
    		elem6.innerHTML='<input type="password" id="pass2_in" size="28" value=""></input>';
    
    		var elem9 = document.getElementById("RoleList");
    		elem9.innerHTML='<select class="js-example-basic-multiple" name="states[]" multiple="multiple" style="width: 200px;"></select>';
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

    //Обработка нажатия кнопки ввод на всплывающей панели
    $(document).on("click", "#save", function() {
    	var xhr = new XMLHttpRequest();
    	var params =
    	'fname=' + encodeURIComponent(document.getElementById("fname_in").value) +
    	'&sname=' + encodeURIComponent(document.getElementById("sname_in").value) +
    	'&tname=' + encodeURIComponent(document.getElementById("tname_in").value) +
    	'&login=' + encodeURIComponent(document.getElementById("login_in").value) +
    	'&pass1=' + encodeURIComponent(document.getElementById("pass1_in").value);
    	
    	
    	
    	/*
    	//alert(document.getElementById("RoleList").value);
    	alert(document.getElementById("coopUpdate").value);
    	getSelection(document.getElementById("coopUpdate"));
    	for (var i = 0; i < document.getElementById("coopUpdate").options.length; i++)
    		if (document.getElementById("coopUpdate").options[i].selected)
    			//selectedOptions.push(o.options[i].value);
    			params += '&select2=' + encodeURIComponent(document.getElementById("coopUpdate").value);
    	alert(params);
    	*/
    	alert(document.getElementById("coopUpdate"));
    	for ( var i = 0; i < document.getElementById("coopUpdate").selectedOptions.length; i++) {
    		  alert( document.getElementById("coopUpdate").selectedOptions[i].value);
    		}
    	
    	
    	
    	xhr.open("GET", '/cooperators/update?' + params, true);
    	xhr.send();    	
    	if (xhr.status != 200) {
    		alert( xhr.status + ': ' + xhr.statusText );
    	}
    	else {
    		 // вывести результат
  		  var rsp = xhr.responseText;
  		  if(rsp.toString() == "Save success"){
  			  //Оповестим об успехе сохранения
  			  var elem6 = document.getElementById("save_div");
  			  elem6.innerHTML='<button id="save" style="cursor:pointer">Сохранить</button><br/><br/><p style="color:#005500">Изменение данных успешно</p>';
    		}
    	}
    });
    
    var RestPost1 = function() {
    	var xhr = new XMLHttpRequest();

    	var body = '';
    	xhr.open("POST", '/dd', true, 'priya', 'priya');
    	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    	xhr.send(body);
    	/*
        $.ajax({
            type: 'POST',
            url:  '/dd',
            dataType: 'json',
            async: true,
            success: function(result) {
                alert(result);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert(jqXHR.status + ' ' + jqXHR.responseText);
            }
            
        });*/
    }