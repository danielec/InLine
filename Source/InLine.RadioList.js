/*
---
description: InLine Input Radio Elements List.

license: MIT-style

authors:
- Daniele Corti

requires:
- core/1.3: '*'
- InLine.Common

provides: [InLine.RadioList, Array.find]


...
*/

/*
extends: 
- InLine.Common

usage:
- new InLine.RadioList(container, opts);

arguments:
- container: (string | element) the id or the html element that will contain the InLine Editor
- opts: (object) the options defined in InLine.Common plus:
	- list: (object) key value pairs that will be assigned at all the input radio; key is the value of the input, value is the inner text in the label element, containing also the input

addon:
- Array.find: return the first element of the array that make the passed function return true.
	- arguments: 
		- fn(item, index, array): function that need to return true or false
		- bind: the bind for the function

*/

Array.implement({
	'find': function(fn, bind){
		for (var i = 0, l = this.length; i < l; i++){
			if ((i in this) && fn.call(bind, this[i], i, this)) return this[i];
		}
		return null;
	}
});



var InLine = InLine || {};

Object.append(InLine, {
	'RadioList': new Class({
		Extends: InLine.Common,
		initialize: function(container, opts){
			Object.append(this.options, {
				list: null
			});
			this.parent(container, opts);
		},
		$generateHTML: function(){
			this.field = null;
			
			this.radios = [];
			
			if(typeOf(this.options.list) == 'object')
				Object.each(this.options.list, function(value, key){
					var id = String.uniqueID();
					var el = new Element('input', {
						'type': 'radio',
						'value': key,
						'selected': this.options.value == key,
						'name': this.options.name,
						'displayValue': value,
						'id': id
					}).store('displayValue', value);
					var lab = new Element('label', {'for': id});
					lab.grab(el).appendText(value);
					this.radios.push(lab);
				}, this);
			this.parent();
		},
		$injectElement: function(){
			if(this.status)
				this.radios.each(function(item){
					this.container.grab(item);
				}, this);
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
			
			this.radios.each(function(lab){
				var rad = lab.getElement('input');
				rad.addEvents({
					'mouseenter': this.mouseenterField.bind(this),
					'mouseleave': this.mouseleaveField.bind(this)
				});
			}, this);
			
			//StopOnBlur cannot be applied here 
		},
		startEditField: function(){
			this.span.dispose();
			
			this.radios.each(function(item){
				this.container.grab(item);
			}, this);
			
			this.status = (this.status + 1) % 2;
			this.fireEvent("edit");
		},
		stopEditField: function(){
			var selected = this.radios.find(function(lab){
				var rad = lab.getElement('input');
				return rad.get('checked');
			});
			this.setValue(selected ? selected.getElement('input').get('value') : null);
			
			this.radios.each(function(item){item.dispose();});
			this.span.inject(this.container);
			this.status = (this.status + 1) % 2;
			
			this.span.set('html', this.displayValue());
			
			this.fireEvent("stop");
		},
		displayValue: function(){
			var selected = this.radios.find(function(lab){
				var rad = lab.getElement('input');
				return rad.get('checked');
			});
			return selected ? selected.getElement('input').retrieve('displayValue') : this.options.valueWhenEmpty;
		}	
	})
});