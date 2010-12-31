/*
---
description: InLine Input Radio Elements List.

license: MIT-style

authors:
- Daniele Corti

requires:
- core/1.3: '*'
- InLine.Common

provides: [InLine.TextArea]


...
*/

/*


extends: 
- InLine.Common

usage:
- new InLine.TextArea(container, opts);

arguments:
- container: (string | element) the id or the html element that will contain the InLine Editor
- opts: (object) the options defined in InLine.Common plus:
	- rows: the rows attribute setted to the textarea element
	- cols: the cols attribute setted to the textarea element

...
*/

var InLine = InLine || {};

Object.append(InLine, {
	'TextArea': new Class({
		Extends: InLine.Common,
		initialize: function(container, opts){
			Object.append(this.options, {
				rows: 5,
				cols: 15
			});
			this.parent(container, opts);
		},
		$generateHTML: function(){
			this.field = new Element('textarea', {
				'name': this.options.name,
				'rows': this.options.rows,
				'cols': this.options.cols
			}).set('value', this.options.value);
			
			this.parent();
		},
		stopEditField: function(){
			this.setValue(this.field.get('value'));
			this.parent();
		},
		displayValue: function(){
			return this.options.value ? this.options.value.replace(/\n/g, '<br />') : this.options.valueWhenEmpty ;
		}
	})
});
