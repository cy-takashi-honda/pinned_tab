chrome.tabs.query({'url': localStorage['first_url']}, function(r){
    if (r.length === 1) {
        location.href = REDIRECT;
    }
});