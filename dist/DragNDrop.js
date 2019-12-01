function ListDragNDropService() {
    var observer = new MutationObserver(onMutate);

    var parent = null;
    var parentBox = null;
    var dataObject = null;
    var children = [];
    var clone = null;
    var copy = null;
    var offset;
    var index;

    this.registerElem = registerElem;

    function registerElem(node, object) {
        parent = node;

        dataObject = object;

        observer.observe(parent, config);
    };

    function bindChildren() {
        children.forEach(function (child) {
            child.setAttribute('draggable', true);
            child.removeEventListener('dragstart', bindClone);
            child.addEventListener('dragstart', bindClone);
        });
    };

    function bindClone(e) {
        copy = e.target;
        index = copy.index;

        hideGhostImage(e);

        offset = copy.getBoundingClientRect().height / 2;

        makeClone(e);

        verticalDrag(e);
        copy.classList.add('ghost');

        copy.addEventListener('drag', verticalDrag);
        copy.addEventListener('dragend', dragEnd);
        document.addEventListener('dragenter', highlightTarget);
        document.addEventListener('dragover', killEvent);
    };

    function verticalDrag(e) {
        parentBox = parent.getBoundingClientRect();
        clone.style.top = (e.pageY - parentBox.top - offset) + 'px';

        if (clone.getBoundingClientRect().top > parentBox.bottom) {
            parent.appendChild(copy);
        };
    };

    function hideGhostImage(e) {
        var img = new Image();
        img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';
        e.dataTransfer.setDragImage(img, 0, 0);
    };

    function makeClone(e) {
        clone = e.target.cloneNode(true);
        clone.classList.add('clone');
        clone.style.top = (e.target.pageY + offset) + 'px';
        parent.appendChild(clone);
    };

    function highlightTarget(e) {
        if (e.target.parentElement === parent && !e.target.classList.contains('ghost')) {
            e.target.insertAdjacentElement('beforebegin', copy);
        };
    };

    function dragEnd(e) {
        clone.remove();
        copy.classList.remove('ghost');

        pulse();
        removeListeners();

        var old = index;
        updateChildren();

        if (old != copy.index) {
            if (dataObject) {
                updateObject(copy.index, old);
            }
            emit(parent, { newValue: copy.index, oldValue: old })
        }
    };

    function removeListeners() {
        document.removeEventListener('dragenter', highlightTarget);
        document.removeEventListener('dragover', killEvent);
    };

    function pulse() {
        copy.classList.add('pulse');

        setTimeout(function () {
            copy.classList.remove('pulse');
        }, 2000);
    };

    function onMutate(...params) {
        updateChildren();
        bindChildren();
    };

    function updateChildren() {
        children = Array.from(parent.children);
        children.forEach(function (child, i) {
            child.index = i;
        });
    };

    function killEvent(e) {
        e.preventDefault();
        e.stopPropagation();
    };

    function updateObject(newValue, oldValue) {
        arrayMove(dataObject, oldValue, newValue);
    };

    function arrayMove(array, oldIndex, newIndex) {
        var temp = [];

        var moved = array.splice(oldIndex, 1);
        var before = array.splice(0, newIndex);
        var after = array.splice(0, array.length);

        temp = temp.concat(before);
        temp = temp.concat(moved);
        temp = temp.concat(after);

        temp.forEach(function (item) {
            array.push(item);
        })
    };

    function emit(target, detail) {
        target.dispatchEvent(new CustomEvent('listupdated', { detail: detail }));
    }

    var config = { childList: true };
};