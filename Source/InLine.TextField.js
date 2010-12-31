/*
---
description: InLine Input Radio Elements List.

license: MIT-style

authors:
- Daniele Corti

requires:
- core/1.3: '*'
- InLine.Common

provides: [InLine.TextField]


...
*/

/*

extends: 
- InLine.Common

usage:
- new InLine.TextField(container, opts);

arguments:
- container: (string | element) the id or the html element that will contain the InLine Editor
- opts: (object) the options defined in InLine.Common 

...
*/

var InLine = InLine || {};

Object.append(InLine, {
	'TextField': new Class({
		Extends: InLine.Common,
		$generateHTML: function(){
			this.field = new Element('input', {
				'type': 'text',
				'name': this.options.name
			}).set('value', this.options.value);
			
			this.parent();
		},
		stopEditField: function(){
			this.setValue(this.field.get('value'));
			this.parent();
		},
		displayValue: function(){
			return this.options.value || this.options.valueWhenEmpty ;
		}
	})
});