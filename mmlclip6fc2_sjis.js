/**
 * mml clip board
 * 
 * @author たんらる
 * @since 2011/02/05
 * @update 2012/10/15
 */
//<div class="mmlclip" title="MML@***,***,***;">ボタン</div>

function mmlclip_initialize() {
	ZeroClipboard.setMoviePath("http://blog-imgs-47.fc2.com/b/l/o/blogfourthline/ZeroClipboard.swf");

	var elements = document.getElementsByTagName("div");
	for (var i = 0; i < elements.length; i++) {
		if (elements[i].className == "mmlclip") {
			var mml = elements[i].title;
			if (mml.match("^MML@") == null)
				continue;
			elements[i].title = "";
			elements[i].className = "clip_button";
			createClip6(elements[i], mml);
		}
	}


	//createClip(<copy button element>, <mml text>)
	function createClip6(element, text) {
		var clip = new ZeroClipboard.Client( element );
	
		clip.setHandCursor( true );
		clip.setText( text );
		clip.addEventListener('complete', mmlClipComplete);
	}
	
	function mmlClipComplete(client, text) {
		alert("クリップボードにコピーしました。");
	}

};
var mmlclip_load_timer = setInterval(function() {
	if (/loaded|complete/.test(document.readyState)) {
		if (mmlclip_load_timer) {
			clearInterval(mmlclip_load_timer);
			mmlclip_initialize();
		}
	}
}, 50);
/** サイズ情報も含めて再配置を行います */
function mmlclip_repositionAll() {
	for ( key in ZeroClipboard.clients ) {
		var elem = ZeroClipboard.clients[key];
		var box = ZeroClipboard.getDOMObjectPosition(elem.domElement);
		elem.div.innerHTML = elem.getHTML( box.width, box.height );
		elem.div.style.width = '' + box.width + 'px';
		elem.div.style.height = '' + box.height + 'px';
		elem.reposition();
	}
}
