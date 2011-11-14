(function() {
    jQuery(function() {
        $("#getNewChatom").unbind('click').click(function(event) {
            event.preventDefault();
            return $.getJSON('http://frattmans.com:3000/chatom.json', function(chatom) {
                return $("#curChatom").text(chatom.text);
            });
        });
    return $(document).keypress(function(e) {
        switch (e.which) {
            case 32:
                return $.getJSON('/chatom.json', function(chatom) {
            return $("#curChatom").text(chatom.text);
            });
            }
        });
    });
}).call(this);