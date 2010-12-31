/*
---
description: InLine Input Radio Elements List.

license: MIT-style

authors:
- Daniele Corti

requires:
- core/1.3: '*'
- InLine.Common

provides: [InLine.Common]


...
*/

/*

usage:
- You never need to use it, simply use the subclasses, and implement the Events defined.

arguments:
- container: (string | element) the id or the html element that will contain the InLine Editor
- opts: (object) the options:
	- name: (string) the name to assign to the Form Element
	- value: (string) the value to assign to the Form Element
	- valueWhenEmpty: (string) the value to show in View Mode if the value option is null; default "Click to Change"
	- startEdited: (boolean) if the InLine Editor must start in Edit Mode; default false
	- stopOnBlur: (boolean) if the InLine Editor must turn in View Mode after the Form Element Blur 

events: 
- edit: fired when turn in Edit Mode
- stop: fired when turn in View Mode
- mouseenterSpan: fired when the mouse enter in the span element (in the View Mode)
- mouseleaveSpan: fired when the mouse leave the span element (in the View Mode)
- mouseenterField: fired when the mouse enter in the form element (in the Edit Mode)
- mouseleaveField: fired when the mouse leave the form element (in the Edit Mode)

public methods:
- startEditField: turn in the Edit Mode, fire onEdit
- stopEditField: turn in the View Mode, fire onStop
- toogleField: toogle the Mode, calling the corresponding method
- setValue: set the value in the option
- getValue: get the value that will be passed if submit
- displayValue: get the value to show in View Mode

...
*/

var InLine = InLine || {};
	
Object.append(InLine, {
	Common: new Class({
		Implements: [Options, Events],
		options:{
			'name': null,
			'value': null,
			'valueWhenEmpty': 'Click to Change',
			'startEdited': false,
			'stopOnBlur': false
		},
		initialize: function(container, opts){
			this.container = document.id(container);
			this.setOptions(opts);
			this.status = this.options.startEdited ? 1 : 0;
			
			this.$generateHTML();
			this.$injectElement();
			this.$applyEvents();
		},
		$generateHTML: function(){
			this.span = new Element('span');
			this.span.set('html', this.displayValue());
			
			//Not create the field in this class 
		},
		$injectElement: function(){
			if(this.status)
				this.container.grab(this.field);
			else
				this.container.grab(this.span);
		},
		$applyEvents: function(){
			//Events: click over span
			this.span.addEvent('click', this.startEditField.bind(this));
			this.span.addEvents({
				'mouseenter': this.mouseenterSpan.bind(this),
				'mouseleave': this.mouseleaveSpan.bind(this)
			});
			
			this.field.addEvents({
				'mouseenter': this.mouseenterField.bind(this),
				'mouseleave': this.mouseleaveField.bind(this)
			});
			
			//If setted in the options, blur over the field
			if(this.options.stopOnBlur){
				this.field.addEvent('blur', this.stopEditField.bind(this));
			}
		},
		startEditField: function(){
			this.span.dispose();
			this.field.inject(this.container);
			this.status = (this.status + 1) % 2;
			this.fireEvent("edit");
		},
		stopEditField: function(){
			//Apply the value of the field in the options.value variable
			//On in the subclasses
			
			this.field.dispose();
			this.span.inject(this.container);
			this.status = (this.status + 1) % 2;
			
			this.span.set('html', this.displayValue());
			
			this.fireEvent("stop");
		},
		mouseenterSpan: function(){
			this.fireEvent('mouseenterSpan');
		},
		mouseenterField: function(){
			this.fireEvent('mouseenterField');
		},
		mouseleaveSpan: function(){
			this.fireEvent('mouseleaveSpan');
		},
		mouseleaveField: function(){
			this.fireEvent('mouseleaveField');
		},
		toogleField: function(status){
			if(typeOf(status) == 'number')
				this.status = status > 0 ? 0 : 1;
			else
				this.status = status == 'edit' ? 0 : 1;
			
			if(this.status == 0)
				this.startEditField();
			else
				this.stopEditField();
		},
		setValue: function(value){
			this.options.value = value;
		},
		getValue: function(){
			return this.options.value;
		},
		displayValue: function(){
			return this.options.value || this.options.valueWhenEmpty;
		}
	})
});