jQuery(function($) {
    var History = window.History;
    var loading = false;
    var $ajaxContainer = $('#content');

    // Check if history is enabled for the browser
    if ( ! History.enabled) {
        return false;
    }

    History.Adapter.bind(window, 'statechange', function() {
        var State = History.getState();

        // Get the requested url and replace the current content
        // with the loaded content
        $.get(State.url, function(result) {
            var $html = $(result);
            var $newContent = $('#content', $html).contents();

            // Set the title to the requested urls document title
            document.title = $html.filter('title').text();

            $ajaxContainer.fadeOut(100, function() {

                if (!$('#main').hasClass('shrinked')) {
                    $('#content').addClass('col-lg-12');
                    $('#content').removeClass('col-lg-8');
                    $('#main').addClass('col-lg-offset-1');
                    $('#main').addClass('shrinked');
                    $('#main').removeClass('col-lg-offset-4', 100, "easeOutSine");
                    $('#sidebar').addClass('col-lg-2');
                    $('#sidebar').removeClass('col-lg-4', 100, "easeOutSine");
                }

                $ajaxContainer.html($newContent);
                $ajaxContainer.fadeIn(100);

                loading = false;
            });
        });
    });

    $('body').on('click', '.js-ajax-link, .pagination a, .post-tags a, .post-header a', function(e) {
        e.preventDefault();

        if (loading === false) {
            var currentState = History.getState();
            var url = $(this).attr('href');
            var title = $(this).attr('title') || null;

            if (url !== currentState.url.replace(/\/$/, "")) {
                loading = true;

                History.pushState({}, title, url);
            }
        }
    });

});
