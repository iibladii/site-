$.get("/getUserNameRole",function(data,status){
var body = document.getElementById("menu");
var headr = ''+
	'<ul class="h-menu">'+
'<li><a href="">Просмотр картотеки</a>'+
	'<ul>'+
       '<li><a href="/kartoteka">Картотека</a></li>'+
       '<li><a href="/errorCable">Неисправные пары</a></li>'+
       //'<li><a href="/adsl">ADSL</a></li>'+
       '<li><a href="/errorCable">Аварийные точки</a></li>'+
       '<li><a href="/subdivision">Подразделение</a></li>'+
       '<li><a href="/department">Отдел</a></li>'+
    '</ul>'+
'</li>';

var i;
for (i = 0; i < data.size; i++) {
	if(data.roleList[i]=="ROLE_ADMIN"){
		headr += 	'<li><a href="">Управление персоналом</a>'+
						'<ul>'+
							'<li><a href="/cooperators">Сотрудники</a></li>'+
							'<li><a href="">Активность</a></li>'+
						'</ul>'+
					'</li>';
	}
}
headr += '</ul>';
body.innerHTML=headr;
});