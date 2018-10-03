package controllers;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;
import java.util.TreeSet;

import javax.validation.Valid;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.AliasFor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import controllers.Department;
import object.CooperatorsDataObject;
import repository.AdslRepository;
import repository.SecurityRepository;
import repository.SubdivisionRepository;
import repository.TelephoneRepository;
import repository.UserRepository;
import repository.User_roleRepository;
import repository.DepartmentRepository;
import repository.DotsRepository;
import repository.ErrorCableRepository;
import repository.RoleRepository;
import tables.SecurityView;
import tables.UserInfo;
import tables.UserInfoV2;
import tables.UserNameId;
import tables.adslInfo;
import tables.companateSelect2;
import tables.subdivision;
import tables.subdivisionSelect2;
import tables.errorCableInfo;
import tables.table1;

@Controller
public class GreetingController {
	@Autowired
	private DepartmentRepository departmentRepository;
	@Autowired
	private TelephoneRepository telephoneRepository;
	@Autowired
	private AdslRepository adslRepository;
	@Autowired
	private ErrorCableRepository errorCableRepository;
	@Autowired
	private SecurityRepository securityRepository;
	@Autowired
	private SubdivisionRepository subdivisionRepository;
	@Autowired
	private RoleRepository roleRepository;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private User_roleRepository user_roleRepository;
	@Autowired
	private DotsRepository dotsRepository;

	@Secured(value = { "ROLE_ADMIN" })
	@RequestMapping(value = "/greeting", method = RequestMethod.GET)
	/**
	 * Тестовый метод(del)
	 * @param name
	 * @param model
	 * @return
	 */
	public String greeting(@RequestParam(value = "name", required = false, defaultValue = "World") String name,
			Model model) {
		model.addAttribute("name", name);
		return "greeting";
	}
	
	@ResponseBody
	@RequestMapping(value = "/load_data")
	/**
	 * Тестовй класс загрузка данных из файла(del)
	 * Наполнение дб из exel!!!
	 * @return
	 * @throws IOException
	 */
	public String importData() throws IOException {
		String response="";
		
		InputStream in = new FileInputStream("C:\\Users\\megroup9gmail.com\\Desktop\\work.xls");
        HSSFWorkbook wb = new HSSFWorkbook(in);
 
        Sheet sheet = wb.getSheetAt(0);
        Iterator<Row> it = sheet.iterator();
        while (it.hasNext()) {
            Row row = it.next();
            Iterator<Cell> cells = row.iterator();
            while (cells.hasNext()) {
                Cell cell = cells.next();
                int cellType = cell.getCellType();
                switch (cellType) {
                    case Cell.CELL_TYPE_STRING:
                        System.out.print(cell.getStringCellValue() + "=");
                        response += cell.getStringCellValue()+ "  ";
                        break;
                    case Cell.CELL_TYPE_NUMERIC:
                        System.out.print("[" + cell.getNumericCellValue() + "]");
                        //response += cell.getStringCellValue().toString();
                        break;
 
                    case Cell.CELL_TYPE_FORMULA:
                        System.out.print("[" + cell.getNumericCellValue() + "]");
                        break;
                    default:
                        System.out.print("|");
                        break;
                }
            }
            System.out.println("end");
        }
		
		return response;
	}
	
	@RequestMapping(value = "/kartoteka", method = RequestMethod.GET)
	/**
	 * Страница картотека
	 * @param model
	 * @return
	 */
	public String kartoteka(Model model) {
		String name = WebSecurityConfig.getCurrentUsername();//Получим логин пользователя
		model.addAttribute("name", name);
		return "kartoteka";
	}
	
	@RequestMapping(value = "/subdivision", method = RequestMethod.GET)
	/**
	 * Страница подразделение
	 * @param model
	 * @return
	 */
	public String subdivision(Model model) {
		String name = WebSecurityConfig.getCurrentUsername();//Получим логин пользователя
		model.addAttribute("name", name);
		return "subdivision";
	}

	@RequestMapping(value = "/ajax/getRole", method = RequestMethod.GET)
	@ResponseBody
	/**
	 * Получение всех ролей пользователей
	 * @param name имя пользователя
	 * @return списов ролей пользователей в формате Json
	 */
	public UserInfoV2 getRole(@RequestParam(value = "name") String name) {
		// Получим пользователей
		List<User> results = userRepository.find(name);
		if (!results.isEmpty()) {// Если у данного пользователя есть роли
			Iterator<User> iterator = results.iterator();
			User us = (User) iterator.next();
			// Сохраним Основные данные о пользователе
			UserInfoV2 ui = new UserInfoV2(us.getFirstname(), us.getSecondname(), us.getThirdname(), us.getUsername());
			// Приступим к поиску ролей
			// Получим таблицу с ролями
			List<User_Role> ur = us.getRole();
			Iterator<User_Role> iterator1 = ur.iterator();
			// Сохраним наименование ролей
			int chr = 0;
			while (iterator1.hasNext()) {
				String str = ((User_Role) iterator1.next()).getRole().getRoleName();
				ui.add_(chr, str, "selected");
				chr++;
			}
			// Получим роли не связаные с user=:name но связанные хотябы с одним пользователем
			List<Role> res = roleRepository.find5(name);
			Iterator<Role> iterator3 = res.iterator();
			// Сохраним наименование ролей
			while (iterator3.hasNext()) {
				String str = ((Role) iterator3.next()).getRoleName();
				
				//Переписать проверку в запрос
				//Проверим есть ли в списке повторяющиеся значения
				int ch = 0;
				for(int i = 0; i < ui.getRole_List().size(); i++) {
					if(ui.getRole_List().get(i).getText().equals(str)) ch++;
				}
				if(ch==0) ui.add_(chr, str, "");
				
				//ui.add_(chr, str, "");
			}
			// Получим таблицу с ролями не относящимися не к какому пользователю
			List<Role> resu = roleRepository.find6();
			Iterator<Role> iterator2 = resu.iterator();
			// Сохраним наименование ролей
			while (iterator2.hasNext()) {
				String str = ((Role) iterator2.next()).getRoleName();
				ui.add_(chr, str, "");
			}
			return ui;
		} else {// Если данный пользователь не имеет ролей
			User us = userRepository.getUserInfo(name);
			UserInfoV2 ui = new UserInfoV2(us.getFirstname(), us.getSecondname(), us.getThirdname(), us.getUsername());
			return ui;
		}
	}

		@ResponseBody
		@RequestMapping(value = "/ajax/errorCable_info")
		/**
		 * Получение информации об аварийных кабелях
		 * @param name наименование кабеля
		 * @param elem порядковый номер записи с которого будет возвращено 20 записей
		 * @return Список кабелей
		 */
		public errorCableInfo get_errorCable_info(@RequestParam(value = "name") String name,
				@RequestParam(value = "elem") Integer elem) {
			// Узнаем число записей и выберем записи с по
			List<ErrorCable> adsl = errorCableRepository.findAll('%' + name + '%');
			// Сортируем полученные значения
			adsl.sort(Comparator.comparing(ErrorCable::getName));
			Integer ch = errorCableRepository.findAllcount('%' + name + '%');
			// Инициализация число элементов номер страницы
			errorCableInfo adsl_view = new errorCableInfo(ch, elem);
			// Сделаем набор
			Iterator<ErrorCable> iter2 = adsl.iterator();
			Integer ch1 = 0;
			while (iter2.hasNext()) {
				ch1++;
				if (ch1 <= elem * 20 && ch1 > (elem - 1) * 20) {
					adsl_view.add(((ErrorCable) iter2.next()).getName());
				} else
					iter2.next();
			}
			return adsl_view;
		}
	
		@ResponseBody
		@RequestMapping(value = "/errorCable/errorCable_del")
		/**
		 * Получение списка аварийных точек кабеля
		 * @param name наименование кабеля
		 * @return список аварий
		 */
		public String get_errorCable_del(@RequestParam(value = "name") List<String> name) {
			//Обновим данные
			for(int i = 0; i < name.size(); i++) {
				List<ErrorCable> adsl = errorCableRepository.findAll(name.get(i));
				Iterator<ErrorCable> iter2 = adsl.iterator();
				while (iter2.hasNext()) {
					ErrorCable ad = ((ErrorCable) iter2.next());
					errorCableRepository.delete(ad);
				}
			}
				return "Delete success";
		}
		
		@ResponseBody
		@RequestMapping(value = "/errorCable/errorCable_update")
		public String get_errorCable_update(@RequestParam(value = "name") String name,
				@RequestParam(value = "oldName") String oldName) {
			//Обновим данные
			if(errorCableRepository.findAllcount(name)<1) {
				List<ErrorCable> adsl = errorCableRepository.findAll(oldName);
				Iterator<ErrorCable> iter2 = adsl.iterator();
				while (iter2.hasNext()) {
					ErrorCable ad = ((ErrorCable) iter2.next());
					ad.setName(name);
					errorCableRepository.save(ad);
				}
				return "Save success";
			}
			else{
				return "The record already exists";
			}
		}
		
		@ResponseBody
		@RequestMapping(value = "/errorCable/errorCable_create")
		public String get_errorCable_create(@RequestParam(value = "name") String adsl) {
			if(errorCableRepository.findAllcount(adsl)>0) {
	        	return "entry more then zero";
	        }
	        else {
	        	ErrorCable ad = new ErrorCable();
	        	ad.setName(adsl);
	        	errorCableRepository.save(ad);
	        }
			return "success";
		}
		
		@ResponseBody
		@RequestMapping(value = "/subdivision/subdivision_info")
		/**
		 * Получение данных о подразделениях
		 * @param name наименование
		 * @param elem число запрошенных строк
		 * @param code Код подразделения
		 * @return
		 */
		public subdivision get_department_info(@RequestParam(value = "name") String name,
				@RequestParam(value = "elem",defaultValue="1") Integer elem, @RequestParam(value= "code") String code) {
			// Узнаем число записей и выберем записи с по
			List<Subdivision> adsl = subdivisionRepository.findAll_('%' + name + '%', '%' + code + '%');
			// Сортируем полученные значения
			adsl.sort(Comparator.comparing(Subdivision::getName));
			Integer ch = subdivisionRepository.findAllcount_('%' + name + '%', '%' + code + '%');
			// Инициализация число элементов номер страницы
			subdivision adsl_view = new subdivision(ch, elem);
			// Сделаем набор
			Iterator<Subdivision> iter2 = adsl.iterator();
			Integer ch1 = 0;
			while (iter2.hasNext()) {
				ch1++;
				if (ch1 <= elem * 20 && ch1 > (elem - 1) * 20) {
					Object obj = iter2.next();
					adsl_view.add(((Subdivision) obj).getName(),((Subdivision) obj).getCode());
				} else
					iter2.next();
			}
			return adsl_view;
		}
	
		@ResponseBody
		@RequestMapping(value = "/subdivision/department_del")
		/**
		 * Удаление подразделения
		 * @param name Наименование подразделения(Уникальное значение)
		 * @return
		 */
		public String department_del(@RequestParam(value = "name") List<String> name) {
			//Обновим данные
			for(int i = 0; i < name.size(); i++) {
				List<Subdivision> adsl = subdivisionRepository.findAll(name.get(i));
				Iterator<Subdivision> iter2 = adsl.iterator();
				while (iter2.hasNext()) {
					Subdivision ad = ((Subdivision) iter2.next());
					subdivisionRepository.delete(ad);
				}
			}
				return "Delete success";
		}
		
		@ResponseBody
		@RequestMapping(value = "/subdivision/department_update")
		public String department_update(@RequestParam(value = "name") String name,
				@RequestParam(value = "oldName") String oldName) {
			//Обновим данные
			if(departmentRepository.findAllcount(name)<1) {
				List<Department> adsl = departmentRepository.findAll(oldName);
				Iterator<Department> iter2 = adsl.iterator();
				while (iter2.hasNext()) {
					Department ad = ((Department) iter2.next());
					ad.setName(name);
					departmentRepository.save(ad);
				}
				return "Save success";
			}
			else{
				return "The record already exists";
			}
		}
		
		@ResponseBody
		@RequestMapping(value = "/subdivision/subdivision_del")
		/**
		 * Удаление подразделения
		 * @param name Наименование подразделения(Уникальное значение)
		 * @return
		 */
		public String get_department_del(@RequestParam(value = "name") List<String> name) {
			//Обновим данные
			for(int i = 0; i < name.size(); i++) {
				List<Subdivision> adsl = subdivisionRepository.findAll(name.get(i));
				Iterator<Subdivision> iter2 = adsl.iterator();
				while (iter2.hasNext()) {
					Subdivision ad = ((Subdivision) iter2.next());
					subdivisionRepository.delete(ad);
				}
			}
				return "Delete success";
		}
		
		@ResponseBody
		@RequestMapping(value = "/subdivision/subdivision_update")
		/**
		 * Иззменение наименования подразделения
		 * @param name название подразделения
		 * @param oldName старое наименование
		 * @param code код подразделения
		 * @return статус
		 */
		public String get_department_update(@RequestParam(value = "name") String name,
				@RequestParam(value = "oldName") String oldName,
				@RequestParam(value = "code", defaultValue = "0") int code) {
			//Обновим данные
			if(subdivisionRepository.findAllcount(name)<1) {
				List<Subdivision> adsl = subdivisionRepository.findAll(oldName);
				Iterator<Subdivision> iter2 = adsl.iterator();
				while (iter2.hasNext()) {
					Subdivision ad = ((Subdivision) iter2.next());
					ad.setName(name);
					subdivisionRepository.save(ad);
				}
				return "Save success";
			}
			else{
				return "The record already exists";
			}
		}
		
		@ResponseBody
		@RequestMapping(value = "/subdivision/subdivision_create")
		public String get_department_create(@RequestParam(value = "name") String name, @RequestParam(value = "code") String code) {
			if(subdivisionRepository.findAllcount(name)>0) {
	        	return "entry more then zero";
	        }
	        else {
	        	Subdivision ad = new Subdivision();
	        	ad.setName(name);
	        	ad.setCode(code);
	        	subdivisionRepository.save(ad);
	        }
			return "success";
		}
		
	@ResponseBody
	@RequestMapping(value = "/ajax/adsl_info")
	/**
	 * Информация об ADSL
	 * @param name
	 * @param elem
	 * @param count
	 * @return Список элементов
	 */
	public adslInfo get_adsl_info(@RequestParam(value = "name") String name,
			@RequestParam(value = "elem") Integer elem,
			@RequestParam(value = "count", defaultValue = "20") Integer count) {
		// Узнаем число записей и выберем записи с по
		List<Adsl> adsl = adslRepository.findAll('%' + name + '%');
		// Сортируем полученные значения
		adsl.sort(Comparator.comparing(Adsl::getName));
		Integer ch = adslRepository.findAllcount('%' + name + '%');
		// Инициализация число элементов номер страницы
		adslInfo adsl_view = new adslInfo(ch, elem);
		// Сделаем набор
		Iterator<Adsl> iter2 = adsl.iterator();
		Integer ch1 = 0;
		while (iter2.hasNext()) {
			ch1++;
			if (ch1 <= elem * count && ch1 > (elem - 1) * count) {
				adsl_view.add(((Adsl) iter2.next()).getName());
			} else
				iter2.next();
		}
		return adsl_view;
	}

	@ResponseBody
	@RequestMapping(value = "/adsl/adsl_update")
	/**
	 * Обновление записей об ADSL
	 * @param name наименование ADSL(Все записи уникальны)
	 * @param oldName старое наименование
	 * @return сообщение об успехе/ошибке сохранения
	 */
	public String get_adsl_update(@RequestParam(value = "name") String name,
			@RequestParam(value = "oldName") String oldName) {
		//Обновим данные
		if(adslRepository.findAllcount(name)<1) {
			List<Adsl> adsl = adslRepository.findAll(oldName);
			Iterator<Adsl> iter2 = adsl.iterator();
			while (iter2.hasNext()) {
				Adsl ad = ((Adsl) iter2.next());
				ad.setName(name);
				adslRepository.save(ad);
			}
			return "Save success";
		}
		else{
			return "The record already exists";
		}
	}
	
	
	@ResponseBody
	@RequestMapping(value = "/adsl/adsl_create", method=RequestMethod.POST)
	/**
	 * Создание новой записи ADSL
	 * @param adsl наименование ADSL
	 * @return
	 */
	public String get_test_del(@RequestParam(value = "adsl") String name) {
		Adsl adsl = new Adsl();
		adsl.setName(name);
		adslRepository.save(adsl);
		return "success";
	}
	
	@ResponseBody
	@RequestMapping(value = "/adsl/adsl_del")
	/**
	 * Удаление записи ADSL
	 * @param name наименование записи
	 * @return сообщение об успехе/ошибке удаления
	 */
	public String get_adsl_del(@RequestParam(value = "name") List<String> name) {
		//Обновим данные
		for(int i = 0; i < name.size(); i++) {
			List<Adsl> adsl = adslRepository.findAll(name.get(i));
			Iterator<Adsl> iter2 = adsl.iterator();
			while (iter2.hasNext()) {
				Adsl ad = ((Adsl) iter2.next());
				adslRepository.delete(ad);
			}
		}
			return "Delete success";
	}
	
	@ResponseBody
	@RequestMapping(value = "/ajax/kartoteka_create")
	/**
	 * Создание новой записи
	 * @param number Телефонный номер
	 * @param addaedNumber Добавочный номер
	 * @param security Сопоставляемый пульт безопасности
	 * @param location Местоположение
	 * @param subdivision Подразделение
	 * @param subdivisionCode Код подразделения
	 * @param d1 Параметр 1
	 * @param d2 Параметр 2
	 * @param d3 Параметр 3
	 * @param d4 Параметр 4
	 * @param d5 Параметр 5
	 * @param note Заметки
	 * @return сообщение об успехе/ошибке
	 */
	public String get_kartoteka_create(
			@RequestParam(value = "number") String number,
			@RequestParam(value = "addedNumber") String addaedNumber,//at1
			@RequestParam(value = "security") String security,//att2
			@RequestParam(value = "location") String location,//room
			@RequestParam(value = "subdivision") String subdivision,
			@RequestParam(value = "subdivisionCode") String subdivisionCode,
			@RequestParam(value = "cross1") String d1,
			@RequestParam(value = "cross2") String d2,
			@RequestParam(value = "cross3") String d3,
			@RequestParam(value = "cross4") String d4,
			@RequestParam(value = "cross5") String d5,
			@RequestParam(value = "note") String note
			) {
		Telephone tp = new Telephone();
		Subdivision sd = subdivisionRepository.findOne(subdivision, subdivisionCode);
		tp.setNumber(number);
		tp.setAtt1(addaedNumber);
		tp.setAtt2(security);
		tp.setRoom(location);
		Department dpp = new Department();
		dpp.setName("newDepartment");
		Subdivision sdd = new Subdivision();
		sdd.setName(subdivision);
		sdd.setCode(subdivisionCode);
		dpp.setSubdivision(sdd);
		tp.setDepartment(dpp);
		tp.setNote(note);
		if(d1 != "")
		{
			Dots d = new Dots();
			d.setDot(d1);
			dotsRepository.save(d);
		}
		if(d2 != "")
		{
			Dots d = new Dots();
			d.setDot(d2);
			dotsRepository.save(d);
		}
		if(d3 != "")
		{
			Dots d = new Dots();
			d.setDot(d3);
			dotsRepository.save(d);
		}
		if(d4 != "")
		{
			Dots d = new Dots();
			d.setDot(d4);
			dotsRepository.save(d);
		}
		if(d5 != "")
		{
			Dots d = new Dots();
			d.setDot(d5);
			dotsRepository.save(d);
		}
		return "success";
	}
	
	@RequestMapping(value = "/errorCable")
	/**
	 * Страница с записияи об авариях
	 * @return
	 */
	public String errorCable() {
		return "errorCable";
	}
	
	@RequestMapping(value = "/adsl")
	/**
	 * Страница ADSL
	 * @return
	 */
	public String adsl() {
		return "adsl";
	}
	
	@ResponseBody
	@RequestMapping(value = "/ajax/adsl_create")
	/**
	 * Создание новой записи ADSL
	 * @param adsl
	 * @return
	 */
	public String get_adsl_create(@RequestParam(value = "adsl") String adsl) {
		if(adslRepository.findAllcount(adsl)>0) {
        	return "entry more then zero";
        }
        else {
        	Adsl ad = new Adsl();
        	ad.setName(adsl);
        	adslRepository.save(ad);
        }
		return "success";
	}
	
	@RequestMapping(value = "/department", method = RequestMethod.GET)
	/**
	 * Страница отдел
	 * @return
	 */
	public String department(Model model) {
		return "department";
	}

	@RequestMapping(value = "/getUserNameRole", method = RequestMethod.GET)
	@ResponseBody
	/**
	 * Получим логины роли пользователей для прорисовки элементов навигации доступных конкретному пользователю
	 * @return Все логины сопоставленные с ними роли
	 */
	public SecurityView greeting() {
		SecurityView sw = new SecurityView((String) WebSecurityConfig.getCurrentUsername());// Добавим в представление имя текущего пользователя
		Iterator iterator = WebSecurityConfig.getCurrentUserrole();// Найдём и вернём роли
		while (iterator.hasNext()) {
			sw.add(iterator.next().toString());
		}
		return sw;
	}

	@RequestMapping(value = "/getUsers", method = RequestMethod.GET)
	@ResponseBody
	/**
	 * Получение списка имён пользователей
	 * @return
	 */
	public UserNameId getUsers() {
		UserNameId unr = new UserNameId();
		List<User> results = userRepository.findName();
		Iterator<User> iter = results.iterator();
		while (iter.hasNext()) {
			User user = (User) iter.next();
			unr.add(user.getUsername(), user.getId());
		}
		return unr;
	}

	/**
	 * Тест соединения
	 * @return test OK
	 */
	@RequestMapping(value = "/test")
	public String test() {
		return "test OK";
	}

	@RequestMapping(value = "/ajaxtest", method = RequestMethod.GET)
	@ResponseBody
	/**
	 * Тестовое заполнение
	 * @param number телефонный номер
	 * @param att1 аттрибут1
	 * @param att2 аттрибут2
	 * @param room аудитория
	 * @param department отдел
	 * @param adsl адсл
	 * @param subdivision подразделение
	 * @param subdivision_code код подразделения
	 * @param page номер страницы
	 * @param count число строк в возвращаемом наборе
	 * @return набор строк
	 */
	public table1 ajaxTest(@RequestParam String number,
			@RequestParam String att1,
			@RequestParam String att2,
			@RequestParam String room,
			@RequestParam String department,
			@RequestParam String adsl,
			@RequestParam String subdivision,
			@RequestParam String subdivision_code,
			@RequestParam Integer page,
			@RequestParam(value="count", defaultValue = "20") Integer count) {
		List<Telephone> results = telephoneRepository.find("%" + number + "%", "%" + att1 + "%", "%" + att2 + "%",
				"%" + room + "%", "%" + department + "%", "%" + adsl + "%", "%" + subdivision + "%",
				"%" + subdivision_code + "%");
		Iterator<Telephone> iterator = results.iterator();
		int ch_page = 1;// Номер строки
		while (iterator.hasNext()) {
			iterator.next();
			ch_page++;
		}
		table1 tb = new table1(page, ch_page);
		// Вставляем через итератор (Модифицированный метод)
		Iterator<Telephone> iterator2 = results.iterator();
		int ch = 1;// Номер строки
		while (iterator2.hasNext()) {
			Telephone tl = (Telephone) iterator2.next();
			if (ch > (page - 1) * count) {
				if (ch <= (page * count)) {
					for(Department dddd:tl.getDepartment())
						for(Subdivision sddd:dddd.getSubdivision())
							tb.add(ch, tl.getNumber(), tl.getAtt1(), tl.getAtt2(), tl.getRoom(),
									dddd.getName(), dddd.getName(),
									sddd.getCode(), tl.getAdsl().getName());
				} else
					break;
			}
			ch++;
		}
		return tb;
	}

	@ResponseBody
	@RequestMapping(value = "/subdivision/get_dataList")
	/**
	 * Получение списка подразделений
	 * @return Список подразделений
	 * @throws JsonProcessingException
	 */
	public ResponseEntity<String> get_datatry() throws JsonProcessingException {
		ArrayList<String> sd = new ArrayList<String>();
		sd = (ArrayList<String>) subdivisionRepository.findAll_();
		String cs2 = "{"+
				  "\"results\": [";
		for(int i = 1; i < sd.size()+1; i++) {
			cs2+="{\"text\": \"" + sd.get(i - 1) + "\"" + "}";
			if(i + 1 != sd.size() + 1) cs2 += ",";
		}
		cs2 +="]}";
		HttpHeaders responseHeaders = new HttpHeaders();
	    responseHeaders.add("Content-Type", "application/json; charset=UTF-8");
	    return new ResponseEntity<String>(cs2,responseHeaders, HttpStatus.OK);
		//return cs2;
	}
	
	@ResponseBody
	@RequestMapping(value = "/subdivision/get_dataListJson")
	/**
	 * Получение списка подразделений в формате Json
	 * @param search наименование подразделения
	 * @param code код подразделения
	 * @return Список подразделений в фоормате json(Cформатирован для загрузки в выпадающий список/select2)
	 * @throws JsonProcessingException
	 */
	public ResponseEntity<String> get_dataList(@RequestParam(value = "search", defaultValue = "") String search, @RequestParam(value = "type", defaultValue = "") String code) throws JsonProcessingException {
		ArrayList<String> sd = new ArrayList<String>();
		sd = (ArrayList<String>) subdivisionRepository.findAll_();
		String cs2 = "{"+
				  "\"results\": [";
		for(int i = 1; i < sd.size()+1; i++) {
			cs2+="{" + "\"id\": " + i + "," + "\"text\": \"" + sd.get(i - 1) + "\"" + "}";
			if(i + 1 != sd.size() + 1) cs2 += ",";
		}
		cs2 +="],"+
				  "\"pagination\": {"+
				    "\"more\": false"+
				  "}"+
				  "}";
		/*
		String cs2 = "{"+
		  "\"results\": ["+
				
		    "{"+
		      "\"id\": 1,"+
		      "\"text\": \"Option 1\""+
		    "},"+
		      
		    "{"+
		      "\"id\": 2,"+
		      "\"text\": \"Option 2\""+
		    "}"+
		      
		  "],"+
		  "\"pagination\": {"+
		    "\"more\": true"+
		  "}"+
		  "}";
		  */
		HttpHeaders responseHeaders = new HttpHeaders();
	    responseHeaders.add("Content-Type", "application/json; charset=UTF-8");
	    return new ResponseEntity<String>(cs2,responseHeaders, HttpStatus.OK);
	}
	
	@ResponseBody
	@RequestMapping(value = "/cooperators/update")
	/**
	 * Получение списка подразделений
	 * @return Список подразделений
	 * @throws JsonProcessingException
	 */
	public String updateCooperators(@RequestParam(value="code1") String code) {
		//Если поле заполнено применим изменения в базу
		/*
		String str = userRepository
		user_roleRepository
		roleRepository
		*/
		System.out.println("dd");
		return "Create successful";
	}

	//Удалить!! restful manual https://devcolibri.com/rest-%D0%BD%D0%B0-%D0%BF%D1%80%D0%B8%D0%BC%D0%B5%D1%80%D0%B5-spring-mvc/
	@RequestMapping(value = "/cooperators", method = RequestMethod.GET)
	/**
	 * Страница сотрудники
	 * @param model
	 * @return
	 */
	public String cooperatorsGet(Model model) {
		return "cooperators";
	}
	
	@RequestMapping(value = "/cooperators", method = RequestMethod.POST)
    @ResponseBody
    /**
     * Обновление данных
     * @return статус операции
     */
    public String cooperatorsPOST(@RequestBody CooperatorsDataObject cdo) {
		User user = userRepository.getUserInfo(cdo.getLogin());//Добавить старый логин в параметры запроса //Обновить список пользователей после создания пользователей
		user.setFirstname(cdo.getFName());
		user.setSecondname(cdo.getSName());
		user.setThirdname(cdo.getTName());
		user.setUsername(cdo.getLogin());
		user.setPassword(cdo.getPass());
		user.setEnabled(1);
		
		//Получим список ролей пользователя
		List<Role> role = roleRepository.find(cdo.getLogin());
		//Сравним с переданным списком
		
		//Сформируем списки ролей
		List<String> save = new ArrayList<String>();//1.На сохранение в бд
		List<Role> del = new ArrayList<Role>();//2.На удаление из бд
		
		//Формируем список на сохранение в бд
		for(int i = 0; i < cdo.getRoles().length; i++) {
			int ch = 0;
			for(int j = 0; j < role.size(); j++) {//Поиск попереданному списку ролей
				if(cdo.getRoles()[i].equals(role.get(j).getRoleName())) {//Если в обоих списках нашлась роль
					ch++;
					break;
				}
			}
			if(ch == 0)//Если роль не нашлась
				save.add(cdo.getRoles()[i]);
		}
		
		//Формируем список на удаление из бд
		for(int i = 0; i < role.size(); i++) {
			int ch = 0;
			for(int j = 0; j < cdo.getRoles().length; j++) {//Поиск по списку ролей из бд
				if(cdo.getRoles()[j].equals(role.get(i).getRoleName())) {//Если в обоих списках нашлась роль
					ch++;
					break;
				}
			}
			if(ch == 0)//Если роль не нашлась
				del.add(role.get(i));
		}
		
		//Скорректируем список ролей в бд
		//1.Добавим новые роли
		if(save.size()>0) {
			//Сопоставим пользователя с его ролями
			String msg = "";
			//Выберем искомые объекты с ролями пользователей
			List<Role> roleList = new ArrayList<Role>();//Список ролей которые необходжимо добавить в бд
			for(int i = 0; i < save.size(); i++) {
				Role r = roleRepository.findRole(save.get(i));
				roleList.add(r);
			}
			//Сохраним список ролей в бд
			for(int i = 0; i <save.size(); i++) {
				User_Role us = new User_Role();
				us.setUser(user);
				us.setRole(roleList.get(i));
				user_roleRepository.save(us);
			}
		}
		//2.Удалим ненужные сопоставления пользователя с ролями
		for(int i = 0; i < del.size(); i++) {
			User_Role ur = user_roleRepository.findObject(user, role.get(i));//Найдём сопоставление
			user_roleRepository.delete(ur);//Удалим
		}
		
        return "Data change completed successfully.";
    }
	
	@RequestMapping(value = "/cooperators", method = RequestMethod.PUT)
    @ResponseBody
    /**
     * Вставка данных
     * @return статус операции
     */
    public String cooperatorsPUT(@RequestBody CooperatorsDataObject cdo) {
		//Проверим есть ли пользователь с таким логином
		if(userRepository.findCountLogin(cdo.getLogin())==0) {
			//Создадим пользователя
			User user = new User();
			user.setFirstname(cdo.getFName());
			user.setSecondname(cdo.getSName());
			user.setThirdname(cdo.getTName());
			user.setUsername(cdo.getLogin());
			user.setPassword(cdo.getPass());
			user.setEnabled(1);
			userRepository.save(user);
		
			//Получим список ролей
			Role role = new Role();
			List<Role> roleList = new ArrayList<Role>();//Список ролей пользователей
			for(int i = 0; i < cdo.getRoles().length; i++) {
				Role r = roleRepository.findRole(cdo.getRoles()[i].toString());
				roleList.add(r);
			}
		
			//Сопоставим пользователя с его ролями
			for(int i = 0; i <roleList.size(); i++) {
				User_Role us = new User_Role();
				us.setUser(user);
				us.setRole(roleList.get(i));
				user_roleRepository.save(us);
			}
			return "User created successfully";
		}
		return "User with this login already exists";
    }
	
	@RequestMapping(value = "/cooperators", method = RequestMethod.DELETE)
    @ResponseBody
    /**
     * Удаление данных
     * @return статус операции
     */
    public String cooperatorsDELETE(@RequestBody String[] userName) {
		System.out.println(userName.length);
		for(int i = 0; i < userName.length; i++) {
			//Найдём пользователя
			User user = userRepository.getUserInfo(userName[i]);
			//Удалим все записи в промежуточной таблице связанные с пользователем
			List<User_Role> ur = user_roleRepository.findListObject(user);
			ur.stream().forEach(x->{
				user_roleRepository.delete(x);
			});
			//Удалим пользователя
			userRepository.delete(user);
		}
        return "Delete successfull";
    }
    
    @RequestMapping(value = "/roleList", method = RequestMethod.GET)
    @ResponseBody
	/**
	 * Получим список ролей
	 * @return список ролей
	 */
	public List<String> getRoleList() {
    	List<String> role = new ArrayList<String>();
    	role = roleRepository.findAllRole();
		return role;
	}
    
}
