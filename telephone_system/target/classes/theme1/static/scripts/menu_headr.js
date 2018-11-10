
var ch = 0;
var ref = window.location.href;
var path = window.location.pathname;
for(var i = ref.length - 1; i > 0; i--){
	if(ref[i] == '/') { ch = i; break;}
}
var mainURL = ref.substring(0, ch);

$.get(mainURL + "/getUserNameRole",function(data,status){
var body = document.getElementById("menu");
var headr = ''+
	'<ul class="h-menu">'+
'<li><a href="">Просмотр картотеки</a>'+
	'<ul>'+
       '<li><a href="' + mainURL + '/kartoteka">Картотека</a></li>'+
       '<li><a href="' + mainURL + '/errorCable">Неисправные пары</a></li>'+
       '<li><a href="' + mainURL + '/subdivision">Отдел</a></li>'+
       '<li><a href="' + mainURL + '/department">Подразделение</a></li>'+
    '</ul>'+
'</li>';

var i;
for (i = 0; i < data.size; i++) {
	if(data.roleList[i]=="ROLE_ADMIN"){
		headr += 	'<li><a href="">Управление персоналом</a>'+
						'<ul>'+
							'<li><a href="' + mainURL + '/cooperators">Сотрудники</a></li>'+
							//'<li><a href="">Активность</a></li>'+
						'</ul>'+
					'</li>';
	}
}
headr += '</ul>';
body.innerHTML=headr;
});