function getCollections()
{
    var collections = JSON.parse(localStorage.getItem('collections'));
    if (!collections) {
        collections = [];
    }

    return collections;
}
