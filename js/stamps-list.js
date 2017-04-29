var container = document.querySelector('.catalog');

var filters = document.querySelector('.catalog-filter').getElementsByTagName('li');
for (var i = 0; i < filters.length; i++) {
    filters[i].onclick = function (evt) {
        var clickedElementID = evt.target.parentNode.getAttribute('id');
        if (document.querySelector('.filter-active').getAttribute('id') === clickedElementID) {
            console.log("return");
            return
        } else {
            setActiveFilter(clickedElementID);
        }
    };
}

function setActiveFilter(id) {
    document.querySelector('.filter-active').classList.remove('filter-active');// Delete the previous selected filter
    document.querySelector('#' + id).classList.add('filter-active');//Adding active class to the clicked element
    var filteredStamps = stamps.slice(0);//copy the array to the variable is "stamps" has retained the initial value without overwriting

    switch (id) {
        case 'decrease':
            filteredStamps = filteredStamps.sort(function (a, b) {
                return b.namber - a.namber;
            });
            break;
        case 'increase':
            filteredStamps = filteredStamps.sort(function (a, b) {
                return a.namber - b.namber;
            });
            break;
        case 'show-space':
            filteredStamps = filteredStamps.filter(function (stamp) {
                return stamp.subject == 'space';
            });
            break;
        case 'show-post':
            filteredStamps = filteredStamps.filter(function (stamp) {
                return stamp.subject == 'post';
            });
            break;
        case 'show-ship':
            filteredStamps = filteredStamps.filter(function (stamp) {
                return stamp.subject == 'ship';
            });
            break;
        case 'filter-all':
            filteredStamps = filteredStamps.sort(function (a, b) {
                return Math.random() - 0.5;
            });
            break;
    }
    container.innerHTML = '';
    renderStamps(filteredStamps);
}

function renderStamps(stamps) {
    stamps.forEach(function (stamp) {
        var element = getElementFromTemplate(stamp);
        container.appendChild(element);
    });
}

function getElementFromTemplate(data) {
    var template = document.querySelector('#catalog-item-template');
    var element = template.content.children[0].cloneNode(true);
    element.querySelector('.subject').textContent = data.subject;
    var img = element.querySelector('.img-stamp').src = data.preview;
    element.querySelector('.namber').textContent = data.namber;
    element.querySelector('.price').textContent = data.price;

    switch (data.subject) {
        case 'space':
            element.classList.add('space');
            break;
        case 'post':
            element.classList.add('post');
            break;
        case 'ship':
            element.classList.add('ship');
            break;
    }

    return element;


}

setActiveFilter(document.querySelector('.filter-active').getAttribute('id'));