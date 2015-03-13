$(document).ready(function() {
    if (!localStorage.getItem('project-id') || !localStorage.getItem('write-key')) {
        window.location = 'settings.html';
    }
    if (0 == JSON.parse(localStorage.getItem('collections')).length) {
        window.location = 'collections.html';
    }

    var collections = getCollections();

    $(collections).each(function(key, collection) {
        var form = '<form>';
        $(collection.properties).each(function(k, property) {
            form += '<div class="input-group"><span class="input-group-addon">' + property + '</span><input type="text" class="form-control" id="property-' + key + '-' + k + '" placeholder="' + property + '" /></div><br />';
        });
        form += '<input type="button" class="btn btn-primary js-send-event" value="send" attr-index="' + key + '" /></form>';
        var listElement = '<div class="panel panel-default"><div class="panel-heading" role="tab" id="heading-' + key + '"><h4 class="panel-title"><a href="#collapse-' + key + '" data-toggle="collapse" data-parent="#collections">' + collection.name + '</a></h4></div><div id="collapse-' + key + '" class="panel-collapse collapse" role="tabpanel"><div class="panel-body">' + form + '</div></div></div>';
        $('#collections').append(listElement);
    });
    $('#collapse-0').addClass('in');

    $('.js-send-event').click(function() {
        var client = new Keen({
            projectId: localStorage.getItem('project-id'),
            writeKey: localStorage.getItem('write-key')
        });

        var collection = collections[$(this).attr('attr-index')];
        var event = {};
        var that = this;
        $(collection.properties).each(function(key, value) {
            var parsedValue = $('#property-' + $(that).attr('attr-index') + '-' + key).val();
            if (parsedValue == parseInt(parsedValue)) {
                parsedValue = parseInt(parsedValue);
            }
            if (parsedValue == parseFloat(parsedValue)) {
                parsedValue = parseFloat(parsedValue);
            }
            event[value] = parsedValue;
        });
        client.addEvent(collection.name, event, function(err, res) {
            if (err) {
                // @todo show error
            } else {
                $('#send-event-success-alert').addClass('in');
                window.setTimeout(function() {
                    $('#send-event-success-alert').addClass('out').removeClass('in');
                }, 2000);
            }
        });
    });
});
