<!DOCTYPE HTML>
<html xmlns:th="http://www.thymeleaf.org">
<head>
    <title>Getting Started: Serving Web Content</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <script src="http://code.jquery.com/jquery-1.10.2.min.js" type="text/javascript" ></script>
	<script type="text/javascript" src="styles/static/scripts/table_insert.js"></script>
	<link rel="stylesheet" type="text/css" href="styles/kartoteka/style_menu.css"/>
	<link rel="stylesheet" type="text/css" href="styles/kartoteka/style_table.css"/>
	<link rel="stylesheet" type="text/css" href="styles/kartoteka/bloki.css"/>
	<link rel="stylesheet" type="text/css" href="styles/kartoteka/desineKartoteka.css"/>
	<!--
	<script type="text/javascript" src="styles/multyList/select2.min.js"></script>
	<link rel="stylesheet" type="text/css" href="styles/multyList/select2.min.css"/>
	-->
	<link rel="stylesheet" href="http://code.jquery.com/ui/1.11.1/themes/smoothness/jquery-ui.css"/>
	
  	<script type="text/javascript" src="http://code.jquery.com/ui/1.11.1/jquery-ui.js"></script>
  	<link rel="stylesheet" href="http://jqueryui.com/resources/demos/style.css"/>
  	
  	<script type="text/javascript" src="styles/multyList/select2.min.js"></script>
	<link rel="stylesheet" type="text/css" href="styles/multyList/select2.min.css"/>
	

	
	
	<script>
  		$(function() {
    		$( "#dialog" ).dialog({
    			autoOpen: false ,
    			width: 350
    			}); //Создадим окно закрытым http://jquery.page2page.ru/index.php5/%D0%94%D0%B8%D0%B0%D0%BB%D0%BE%D0%B3%D0%BE%D0%B2%D0%BE%D0%B5_%D0%BE%D0%BA%D0%BD%D0%BE_UI
  		});
  		$(function() {
    		$( "#tableOption" ).dialog({
    			maxWidth:280,
    	        maxHeight: 260,
    	        width: 280,
    	        height: 260,
    	        autoOpen: false
    			});
  		});
  		$(function() {
    		$( "#dialogView" ).dialog({
    			autoOpen: false ,
    			width: 380,
    			maxWidth:380,
    			});
  		});
  	</script>
</head>
<body>





	<div id="dialogView" title="Модификация элементов карточки">
	Введите номер:<br/>
	<input id="_number_" name="number" type="text" size="30" placeholder="Номер" style="width: 290px;"></input>
	<br/>
	<br/>
	Введите связанные номера:<br/>
	<input id="_att1_" name="att1" type="text" size="30" placeholder="Связанные номера" style="width: 290px;"></input>
	<br/>
	<br/>
	Введите охрана:<br/>
	<input id="_att2_" name="att2" type="text" size="30" placeholder="Охрана" style="width: 290px;"></input>
	<br/>
	<br/>
	Введите местоположение:<br/>
	<input id="_place_" name="place" type="text" size="30" placeholder="Местоположение" style="width: 290px;"></input>	
	<br/>
	<br/>
	Введите отдел:<br/>
	<select id="_DepartmentList_" class="js-example-basic-single_" name="states[]"  style="width: 300px;"></select>
	<!-- <input id="Department_" name="department" type="text" size="30" placeholder="Отдел"></input> -->
	<br/>
	<br/>
	Выберите подразделение:<br/>
	<select id="_SubdivisionList_" class="js-example-basic-single" name="states[]"   style="width: 300px;"></select>
	<!-- <div id="selectSubdivision_">Connect...</div> -->
	<br/>
	<br/>
	Введите элементы кросса:<br/>
	<input id="_p1" name="adsl" type="text" size="30" placeholder="Элемент 1" style="width: 290px;"></input><br/>
	<input id="_p2" name="adsl" type="text" size="30" placeholder="Элемент 2" style="width: 290px;"></input><br/>
	<input id="_p3" name="adsl" type="text" size="30" placeholder="Элемент 3" style="width: 290px;"></input><br/>
	<input id="_p4" name="adsl" type="text" size="30" placeholder="Элемент 4" style="width: 290px;"></input><br/>
	<input id="_p5" name="adsl" type="text" size="30" placeholder="Элемент 5" style="width: 290px;"></input><br/>
	<input id="_p6" name="adsl" type="text" size="30" placeholder="Элемент 6" style="width: 290px;"></input><br/>
	<br/>
	Комментарии:<br/>
	<textarea id="_note" rows="10" cols="32" style="width: 290px;"></textarea><br/>
	<br/>
    <button class="page-p" id="_vvod" style="cursor:pointer">Ввод</button>
    &nbsp;
    <button id="pre_prosmotr" style="cursor:pointer"><img src="styles/kartoteka/img/kartockaPrint.png" style="vertical-align: middle"></img></button>
	</div>
	
	



	<div id="dialog" title="Создание новой карточки">
	Введите номер:<br/>
	<input id="number_" name="number" type="text" size="30" placeholder="Номер" style="width: 290px;"></input>
	<br/>
	<br/>
	Введите связанные номера:<br/>
	<input id="att1_" name="att1" type="text" size="30" placeholder="Связанные номера" style="width: 290px;"></input>
	<br/>
	<br/>
	Введите охрана:<br/>
	<input id="att2_" name="att2" type="text" size="30" placeholder="Охрана" style="width: 290px;"></input>
	<br/>
	<br/>
	Введите местоположение:<br/>
	<input id="place_" name="place" type="text" size="30" placeholder="Местоположение" style="width: 290px;"></input>	
	<br/>
	<br/>
	Введите отдел:<br/>
	<select id="DepartmentList_" class="js-example-basic-single_" name="states[]"  style="width: 296px;"></select>
	<!-- <input id="Department_" name="department" type="text" size="30" placeholder="Отдел"></input> -->
	<br/>
	<br/>
	Выберите подразделение:<br/>
	<select id="SubdivisionList_" class="js-example-basic-single" name="states[]"   style="width: 296px;"></select>
	<!-- <div id="selectSubdivision_">Connect...</div> -->
	<br/>
	<br/>
	Введите элементы кросса:<br/>
	<input id="p1" name="adsl" type="text" size="30" placeholder="Элемент 1" style="width: 290px;"></input><br/>
	<input id="p2" name="adsl" type="text" size="30" placeholder="Элемент 2" style="width: 290px;"></input><br/>
	<input id="p3" name="adsl" type="text" size="30" placeholder="Элемент 3" style="width: 290px;"></input><br/>
	<input id="p4" name="adsl" type="text" size="30" placeholder="Элемент 4" style="width: 290px;"></input><br/>
	<input id="p5" name="adsl" type="text" size="30" placeholder="Элемент 5" style="width: 290px;"></input><br/>
	<input id="p6" name="adsl" type="text" size="30" placeholder="Элемент 6" style="width: 290px;"></input><br/>
	<br/>
	Введите комментарии:<br/>
	<textarea id="note" rows="10" cols="32" style="width: 290px;"></textarea><br/>
	<br/>
    <button class="page-p" id="vvod" style="cursor:pointer">Ввод</button>
	</div>
	
	<!-- Окно с выбором опций таблицы -->
	<div id="tableOption" title="Опции таблицы">
		<div>
        	<div>
        		<input type="checkbox" id="_number" name="feature" value="scales" checked="true"/>
        		<label for="_number">Номер</label>
    		</div>
    		<div>
        		<input type="checkbox" id="_chainNumber" name="feature" value="horns" checked="true"/>
        		<label for="_chainNumber">Связанные номера</label>
    		</div>
    		<div>
        		<input type="checkbox" id="_security" name="feature" value="claws" checked="true"/>
        		<label for="_security">Охрана</label>
    		</div>
    		<div>
        		<input type="checkbox" id="_department" name="feature" value="claws" checked="true"/>
        		<label for="_department">Отдел</label>
    		</div>
    		<div>
        		<input type="checkbox" id="_subdivision" name="feature" value="claws" checked="true"/>
        		<label for="_subdivision">Подразделение</label>
    		</div>
    		<div>
        		<input type="checkbox" id="_subdivisionCode" name="feature" value="claws" checked="true"/>
        		<label for="_subdivisionCode">Код подразделения</label>
    		</div>
    		<div>
        		<input type="checkbox" id="_aim" name="feature" value="claws" checked="true"/>
        		<label for="_aim">Местоположение</label>
    		</div>
    		<div>
        		<input type="checkbox" id="_kross" name="feature" value="claws"/>
        		<label for="_kross">Состав кросса</label>
    		</div>
    	</div>
    	<br/>
    	<button id="accept" style="cursor:pointer">Принять</button>
	</div>
	
	
	<script src="styles/static/scripts/loadSDname.js"></script><!-- Загрузим инфу об подразделениях -->
	<!--Шапка основной страницы-->
	<div id="header_table" style="height:22px; background-color:#9f9f9f; font-family: Arial; font-size: 13px;">
		<script src="styles/static/scripts/menu_headr_icon.js"></script> <!-- Грузим шапку меню -->
		<div style="width:350px;height:20px;float:right;">
			<div align="right">
					<div style="width:64px;height:5px;float:right;"><form th:action="@{/logout}" method="post"><input type="submit" value="Выход"/></form></div>
				 	<div style="width:150px;height:10px;float:right;margin-top: +0.25em;" th:inline="text">Вы вошли как:&nbsp;[[${#httpServletRequest.remoteUser}]]&nbsp;</div>
			</div>
		</div>
	</div>
	<!--Меню-->
	<div id="menu">
		<script src="styles/static/scripts/menu_headr.js"></script> <!-- Грузим шапку меню -->
   	</div>
   <div id="splitter"></div>
   <div id="menu_knopki">
		&nbsp;
		<button style="cursor:pointer" id="create"><img src="styles/kartoteka/img/plus.png" style="vertical-align: middle"></img>Создать</button>
		<button style="cursor:pointer" id="kartotekaF"><img src="styles/kartoteka/img/book.png" style="vertical-align: middle"></img>Картотека</button>
		<button style="cursor:pointer" id="kartotekaT"><img src="styles/kartoteka/img/korzina.png" style="vertical-align: middle"></img>Корзина</button>
		<button style="cursor:pointer" id="Option"><img src="styles/kartoteka/img/tableOption.png" style="vertical-align: middle"></img>Опции таблицы</button>
   </div>
   <div id="filtr">
   		<script src="styles/static/scripts/filtr.js"></script><!-- Грузим фильтр -->
   </div>
   <div id="splitter"></div><!--Разделитель-->
   <div id="spisok"><!--Тут основная картотека-->
	<p></p><!--Переход на новую строку перед ниформацией о числе страниц-->
    <div class="wrap"><!--div с двойным позиционированием по правому и левому краю-->
        <div class="left" id="count_elem"></div><div class="right" id="button_page"></div>
    </div>
	<p></p><!--Переход на новую строку после информации о числе страниц-->
   <div id="content"><!-- Тут происходит прорисовка основной таблицы --></div>
   </div>
</body>
</html>