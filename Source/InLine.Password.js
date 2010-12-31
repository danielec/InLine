/*
---
description: InLine Input Radio Elements List.

license: MIT-style

authors:
- Daniele Corti

requires:
- core/1.3: '*'
- InLine.Common

provides: [InLine.Password, String.repeat]


...
*/

/*

extends: 
- InLine.Common

usage:
- new InLine.Password(container, opts);

arguments:
- container: (string | element) the id or the html element that will contain the InLine Editor
- opts: (object) the options defined in InLine.Common 

addon:
- String.repeat: if not defined, if implement as in MooTools More, String.Extras

...
*/

var InLine = InLine || {};

if(!String.repeat)
	String.implement({repeat: function(times){return new Array(times + 1).join(this);}});
	
Object.append(InLine, {
	'Password': new Class({
		Extends: InLine.Common,
		$generateHTML: function(){
			this.field = new Element('input', {
				'type': 'password',
				'name': this.options.name
			}).set('value', this.options.value);
			
			this.parent();
		},
		stopEditField: function(){
			this.setValue(this.field.get('value'));
			this.parent();
		},
		displayValue: function(){
			return this.options.value ?  '*'.repeat(this.options.value.length) : this.options.valueWhenEmpty ;
		}
	})
});