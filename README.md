InLine
========
This project contains some Widgets that allow to implement the InLine Editor effect on every form field.

![Screenshot](http://farm6.static.flickr.com/5288/5286271314_3be7dbc344_b.jpg)

Introduction
----------
When you create the typical web application that show the data of an entity (e.g. the Users)
usually you create a listView page, with the main data for the users, and a search form, that allow to filter 
the results. 

Then, by clicking on a result, you see the detail page. But, what if you need to allow the changes on the datas?
Usually, you create a button "Edit" that open another page where you have a form with all the fields you can change.

Ok, but I don't really like to change 3 pages, in order to simply correct the last name of one user. Fortunately, JS 
allow you to avoid the third page, using the InLine Fields.

This widgets allow to change the simply view of a value, with the corresponding input field, and perform changes, 
without change the page.

I've see some of these widgets, but I've always slam against the limit that only input text, textarea and select. 

Some time ago, I've started an app at my workplace, where I've implemented a nice InLine Editing form, where the fields
became editable by clicking, becoming inputs text, textareas, selects, even datepickers.

So, after my first version, I've decided to create some easy to use classes in order to allow the InLine Edinting of
every form fields.

How to use
----------
The classes are all dependent of MooTools 1.3 Core. There is a Main Class, which are extended by the others.

###  InLine.Common
This class is simply an internal utility the is used by all the others, you'll never need to use it.
Each class is independent for the others, but needs the InLine.Common class.

The Widget has two status:
	* View Mode: when you only see the value
	* Edit Mode: when you can edit the value

The HTML generated for the View Mode is
	#HTML
	<span>{options.value || options.valueWhenEmpty}</span>
	
The HTML generated for the Edit Mode depends of the Class used.
	
#### Implements
	Options:
	* name: (string) the name of the form element, 
	* value: (string) the value to insert in the element and in the View Mode,
	* valueWhenEmpty: (string) the value to show in the View mode, if the form element's value is empty, default 'Click to Change',
	* startEdited: (boolean) if the element must start edited, default false,
	* stopOnBlur: (boolean) if the widget have to change the status to View mode when blur on the form element, default false

	Events:
	* edit: fired when the Widget enter in the Edit Mode
	* stop: fired when the Widget enter in the View Mode
	* mouseenterSpan: when the mouse enter on the span element, in View Mode
	* mouseenterField: when the mouse enter on the form element, in Edit Mode
	* mouseleaveSpan: when the mouse leave the span element, in View Mode
	* mouseleaveField: when the mouse leave the form element, in Edit Mode
		
#### Public Methods:

	* startEditField: set the Widget in the Edit Mode, firing the event "onEdit"
	* stopEditField: set the Widget in the View Mode, firing the event "onStop"
	* toogleField: toogle the status, calling the corresponding method, between startEditField and stopEditField
	* setValue: set the value for the Widget
	* getValue: get the value that would be passed by the form element
	* displayValue: get the value that would be showed in View Mode


###  InLine.TextField
This is the basic input text InLine Editor. This class create an object that do all the work, you only need to implement the events of the class.

#### Syntax:

	#JS
	new InLine.TextField(container, opts);
	
#### Parameters
* container (string | element): the element where the InLine Editor is injected
* opts: (object) with the Options defined in the Common class.

The HTML generated for the Edit Mode is:
	#HTML
	<input type="text" name="{options.name}" value="{options.value}" />



###  InLine.Password
This is the an input password InLine Editor. This class create an object that do all the work, you only need to implement the events of the class.

#### Syntax:

	#JS
	new InLine.Password(container, opts);
	
#### Parameters
* container (string | element): the element where the InLine Editor is injected
* opts: (object) with the Options defined in the Common class.

The HTML generated for the Edit Mode is:
	#HTML
	<input type="password" name="{options.name}" value="{options.value}" />

#### Changed Methods:
	* displayValue: you only get a sequence of * (asterisk) of the length of the input value



### InLine.Select
This is a select element, a popup menu list, with single choice. When you use this Class, you need to give an object in the option named "list", made of pairs of keys/values which represent respectively the values of the select's options and the strings show for the values. For example:
	#JS 
    var obj = {
       '0' : 'zero',
       '1' : 'one',
       '2' : 'two'
   };
will generate:
    #HTML
    <select>
       <option value="0">zero</option>
       <option value="1">one</option>
       <option value="2">two</option>
   </select>


#### Syntax:
	#JS
        new InLine.Select(container, opts);

####Parameters:
* container: (string | element) the id or the html element that will contain the InLine Editor
* opts: (object) the options defined in InLine.Common plus:
	* list: (object) key value pairs that will be assigned at the option elements

####Changed Methods:
* stopEditField: set as value the selected option value
* displayValue: return the text showed in the select when you choose the option, not the value


###InLine.TextArea
This is a textarea, a multiline text field. The workflow is similar for the EditField.

####Syntax:
	#JS
 	new InLine.TextArea(container, opts);

####Parameters:
* container: (string | element) the id or the html element that will contain the InLine Editor
* opts: (object) the options defined in InLine.Common plus:
	* rows: the rows attribute setted to the textarea element
	* cols: the cols attribute setted to the textarea element

####Changed Methods:
* displayValue: return the text in the textarea replacing the \n (newline character) with the HTML tag <br />


###InLine.CheckBox
This class generate a CheckBox Element, the only differences are in the options paramenter where you have to set the text to show as display value in the View Mode when the CheckBox is checked or unchecked.

####Syntax:
	#JS
    new InLine.CheckBox(container, opts);

####Parameters:
* container: (string | element) the id or the html element that will contain the InLine Editor
* opts: (object) the options defined in InLine.Common plus:
	* checkedValue: (string) the value to show in the View Mode if the checkbox is checked
	* uncheckedValue: (string) the value to show in the View Mode if the checkbox is unchecked

####Changed Methods:
* getValue: return the value of the input checkbox if the status is checked, null otherwise
* displayValue: return the options.checkedValue property if the status is checked, otherwise the options.uncheckedValue property


###InLine.RadioList
This widget create a list of input radio and store the value of the radio selected. When you create the instance of the class, you have to pass an object composed of key/value pairs. The object's keys are used as values of the radios and the object's values are used as the displaied value for each radio. The HTML generated for each radio is:
  #HTML
  <label for="{Auto generated Id}">
     <input type="radio" name="{options.name}" value="{key}" id="{Auto generated Id}" />
  </label>
The autogenerated id is create using the String.uniqueID() method. The Array Native is extended with a method named "find"[sup]1[/sup].

####Syntax:
    #JS
    new InLine.RadioList(container, opts);

####Parameters:
* container: (string | element) the id or the html element that will contain the InLine Editor
* opts: (object) the options defined in InLine.Common plus:
	* list: (object) key value pairs that will be assigned at all the input radio; key is the value of the input, value is the inner text in the label element, containing also the input
    	Note: the StopOnBlur action cannot be applied here.

####Changed Methods:
* displayValue: return the corresponding value in the object options.list using as key the value of the selected radio


Screenshots
-----------

![Screenshot 1](http://farm6.static.flickr.com/5289/5285773341_8461f537e7.jpg)
![Screenshot 2](http://farm6.static.flickr.com/5249/5286371050_cc7daa8515.jpg)
![Screenshot 3](http://farm6.static.flickr.com/5002/5286371002_e18717ca96.jpg)
![Screenshot 4](http://farm6.static.flickr.com/5169/5286370948_9f15c5b548.jpg)
![Screenshot 5](http://farm6.static.flickr.com/5090/5286370886_91980300e6.jpg)
![Screenshot 6](http://farm6.static.flickr.com/5246/5286370834_8cfb08b700.jpg)

Extras
-----------

1. Array.find(function, bind): the method iterates on the array and return the first element which makes the passed function return true. You can change the scope of the function by passing the new scope as the bind parameter.