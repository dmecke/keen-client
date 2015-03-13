$(document).ready(function() {
    var collections = getCollections();

    refreshCollections(collections);

    addDeleteEvent(collections);

    $('#save-new-collection').click(function() {
        var collection = { name: $('#new-collection-name').val(), properties: [] };
        $('.js-new-collection-property').each(function() {
            if ('' != $(this).val()) {
                collection.properties.push($(this).val());
            }
        });
        collections.push(collection);
        localStorage.setItem('collections', JSON.stringify(collections));
        refreshCollections(collections);
        addDeleteEvent(collections);
        $('#new-collection-name').val('');
    });
});

function refreshCollections(collections)
{
    $('#collections').html('');
    $(collections).each(function (key, collection) {
        var properties = [];
        $(collection.properties).each(function(k, property) {
            properties.push('<span class="label label-primary">' + property + '</span>');
        });
        var listItem = '<li class="list-group-item">' + collection.name + ' ' + properties.join(' ') + '<a href="#" class="close js-collection-delete" attr-index="' + key + '">&times;</a></li>';
        $('#collections').append(listItem);
    });
}

function addDeleteEvent(collections)
{
    $('.js-collection-delete').click(function() {
        collections.splice($(this).attr('attr-index'), 1);
        localStorage.setItem('collections', JSON.stringify(collections));
        refreshCollections(collections);
        addDeleteEvent(collections);
    });
}
