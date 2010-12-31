/*
---
description: InLine Input Radio Elements List.

license: MIT-style

authors:
- Daniele Corti

requires:
- core/1.3: '*'
- InLine.Common

provides: [InLine.Select]


...
*/

/*

extends: 
- InLine.Common

usage:
- new InLine.Select(container, opts);

arguments:
- container: (string | element) the id or the html element that will contain the InLine Editor
- opts: (object) the options defined in InLine.Common plus:
	- list: (object) key value pairs that will be assigned at the option elements in the select; key is the value of the option, value is the inner text in the option element

...
*/

var InLine = InLine || {};

Object.append(InLine, {
	'Select': new Class({
		Extends: InLine.Common,
		initialize: function(container, opts){
			Object.append(this.options, {
				list: null
			});
			this.parent(container, opts);
		},
		$generateHTML: function(){
			this.field = new Element('select', {
				'name': this.options.name
			});
			
			if(typeOf(this.options.list) == 'object')
				Object.each(this.options.list, function(value, key){
					new Element('option', {
						'value': key,
						'selected': this.options.value == key
					}).inject(this.field).set('html', value);
				}, this);
			this.parent();
		},
		stopEditField: function(){
			this.setValue(this.field.getSelected().getLast().get('value'));
			this.parent();
		},
		displayValue: function(){
			return this.options.list[this.options.value] || this.options.valueWhenEmpty ;
		}
	})
});