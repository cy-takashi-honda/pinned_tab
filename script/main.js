window.onload = function() {
    document.querySelector('#pinned_tab').addEventListener('click', function() {
        action(true);
    });
    document.querySelector('#save_dir').addEventListener('click', function() {
        localStorage['bookmark_dir'] = document.querySelector('#bookmark_dir').value;
        var urls = action(false);
    });
    if (typeof(localStorage['bookmark_dir']) !== 'undefined') {
        document.querySelector('#bookmark_dir').value = localStorage['bookmark_dir'];
    }
};

var action = function(isOpen) {

    chrome.bookmarks.getTree(function(roots){

        var TARGET = document.querySelector('#bookmark_dir').value;

        localStorage['bookmark_dir'] = TARGET;

        if (isOpen === true) {
            localStorage['is_open'] = 'TRUE';
        } else {
            localStorage['is_open'] = 'FALSE';
        }

        var bookmarkBar = roots[0].children[0];

        if (typeof(bookmarkBar.children) === 'undefined') {
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


        function parser(dir) {
            for (var key in dir) {
                if (dir[key].children) {
                    parser(dir[key].children);
                } else if (dir[key].url) {
                    urls.push(dir[key].url);
                }
            }
        }

        function searcher(node){
            for (var key in node) {
                if (node[key].title === TARGET) {
                    targetBookMark.push(node[key]);
                }
                if (node[key].children) {
                    searcher(node[key].children);
                }
            }
        }
    });
}

