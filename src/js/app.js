var listDragNDropService = new ListDragNDropService();
var app = {
    dataset: [
        {name:'1'},
        {name:'2'},
        {name:'3'},
        {name:'4'},
        {name:'5'},
        {name:'6'},
        {name:'7'},
    ],
    list: document.getElementById('list')
};

listDragNDropService.registerElem(app.list);

for (var i = 0; i < app.dataset.length; i++) {
    var element = app.dataset[i];

    app.list.innerHTML += '<li class="_draggable_list_item">'+element.name+'</li>';
}

app.list.addEventListener('listupdated', function (e) {
    console.log(e.detail, app.dataset);
});