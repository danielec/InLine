/*
---
description: InLine Input Radio Elements List.

license: MIT-style

authors:
- Daniele Corti

requires:
- core/1.3: '*'
- InLine.Common

provides: [InLine.CheckBox]


...
*/

/*

extends: 
- InLine.Common

usage:
- new InLine.CheckBox(container, opts);

arguments:
- container: (string | element) the id or the html element that will contain the InLine Editor
- opts: (object) the options defined in InLine.Common plus:
	- checkedValue: (string) the value to show in the View Mode if the checkbox is checked
	- uncheckedValue: (string) the value to show in the View Mode if the checkbox is unchecked

...
*/

var InLine = InLine || {};

Object.append(InLine, {
	'CheckBox': new Class({
		Extends: InLine.Common,
		initialize: function(container, opts){
			Object.append(this.options, {
				checkedValue: 'Yes',
				uncheckedValue: 'No'
			});
			
			this.parent(container, opts);
		},
		$generateHTML: function(){
			this.field = new Element('input', {
				'type': 'checkbox',
				'name': this.options.name
			}).set('value', this.options.value);
			
			this.parent();
		},
		stopEditField: function(){
			this.setValue(this.field.get('value'));
			this.parent();
		},
		getValue: function(){
			if(!this.field.get('checked')) return null;
			return this.parent();
		},
		displayValue: function(){
			return this.field.get('checked') ? this.options.checkedValue : this.options.uncheckedValue ;
		}
	})
});