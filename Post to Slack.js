(function(d) {
this.loadScript = function(url, test, callback) {
	if (test == null) {
		script = d.createElement('script');
		script.type = 'text/javascript';
		script.async = true;
		script.onload = callback;
		script.src = url;
		d.getElementsByTagName('head')[0].appendChild(script);
	} else {
		callback();
	}
};

this.showSlackDialog = function() {
	$('<div style=\'text-align: right\'><div><label \'width: 40%; padding: 0; margin: 0; margin-right: .5em;\'>Channel:</label> <select name=\'slackChannel\' style=\'width: 50%; padding: 0; margin: 0\'><option value=\'\'>Default Channel</option></select></div></div>')
		.dialog({
			title: 'Post to Slack',
			resizable: false,
			modal: false,
			buttons: {
				'Post': function() {
					var dia = $(this);
					$.post('https://hooks.slack.com/services/', JSON.stringify({
						'text': '<' + location.href + '> via <@pynej>',
						'username': 'news-bot',
						'icon_emoji': ':newspaper:',
						'unfurl_links': true,
						'channel': $('[name=slackChannel]', this).val()
					}), function() {
						dia.dialog('close');
				}).fail(function(x, s, e) {
					dia.dialog('close');
					alert(s + ': ' + e);
				});
			}
		}
	})
};

	loadScript('https://code.jquery.com/jquery-2.1.4.min.js', $ && $.fn && $.fn.jquery, function() {
		loadScript('https://code.jquery.com/ui/1.11.4/jquery-ui.min.js', $.fn.dialog, function() {
			var cssLink = $('<link>').attr( { rel: 'stylesheet', type: 'text/css', href: 'https://code.jquery.com/ui/1.11.4/themes/humanity/jquery-ui.css' });
			$('head').append(cssLink); 
			showSlackDialog();
		});
	});
	
}(document));
