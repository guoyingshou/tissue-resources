/* Load this script using conditional IE comments if you need to support IE 7 and IE 6. */

window.onload = function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'eightyshades\'">' + entity + '</span>' + html;
	}
	var icons = {
			'icon-grid' : '&#xe000;',
			'icon-users' : '&#xe001;',
			'icon-grid-alt' : '&#xe002;',
			'icon-menu' : '&#xe003;',
			'icon-compose' : '&#xe004;',
			'icon-gallery' : '&#xe005;',
			'icon-question' : '&#xe006;',
			'icon-calculator' : '&#xe007;',
			'icon-windows' : '&#xe008;',
			'icon-newspaper' : '&#xe009;',
			'icon-browser' : '&#xe00a;',
			'icon-comments' : '&#xe00b;'
		},
		els = document.getElementsByTagName('*'),
		i, attr, html, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		attr = el.getAttribute('data-icon');
		if (attr) {
			addIcon(el, attr);
		}
		c = el.className;
		c = c.match(/icon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
};