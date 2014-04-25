window.onload = function() {
    document.querySelector('#pinned_tab').addEventListener('click', function() {
        action(true);
    });
    document.querySelector('#save_dir').addEventListener('click', function() {
        localStorage['bookmark_dir'] = document.querySelector('#bookmark_dir').value;
        var urls = action(false);
    });
    if (isset(localStorage, 'bookmark_dir')) {
        document.querySelector('#bookmark_dir').value = localStorage['bookmark_dir'];   
    }
};

var action = function(isOpen) {

    chrome.bookmarks.getTree(function(roots){

        var TARGET = document.querySelector('#bookmark_dir').value;

        localStorage['bookmark_dir'] = TARGET;

        var bookmarkBar = roots[0].children[0];

        if (isset(bookmarkBar, 'children') !== true) {
            return false;
        }

        var childrens = bookmarkBar.children;
        var targetBookMark = new Array();
        var urls = new Array();

        searcher(childrens);

        if (targetBookMark.length === 0) {
            localStorage['bookmark_dir'] = '';
            document.querySelector('#error_msg').value = 'フォルダがありません';
            return;
        }

        parser(targetBookMark);

        if (isOpen !== true) {
            draw();
            return;
        }

        var cnt = 0;
        for (var key in urls) {
            if (cnt === 0) {
                localStorage['first_url'] = urls[key];
            }
            chrome.tabs.create({'url': encodeURI(urls[key]), 'pinned': true});
            cnt++;
        }

        location.href = REDIRECT;

        function draw() {
            var tbl = document.querySelector('#collections');
            for (var key in urls) {
                var tr = document.createElement('tr');
                var td = document.createElement('td');
                td.textContent = urls[key];
                tr.appendChild(td);
                tbl.appendChild(tr);
            }
            document.querySelector('#url_collection').style.display = 'block';
        }

        function searcher(node){
            var ret = new Array();
            for (var key in node) {
                if (node[key].title === TARGET) {
                    targetBookMark.push(node[key]);
                }
                if (node[key].children) {
                    searcher(node[key].children);
                }
            }
        }

        function parser(dir) {
            for (var key in dir) {
                if (dir[key].children) {
                    parser(dir[key].children);
                } else if (dir[key].url) {
                    urls.push(dir[key].url);
                }
            }
        }
    });
}


var isset = function(arr, key) {
    if (typeof(arr[key]) !== 'undefined') {
        return true;
    }
    return false;
}

