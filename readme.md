# ListDragNDrop

A list repositioning tool without any dependencies, example included.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#Deployment) for notes on how to deploy the project on a live system.

* clone the repository
* run npm install
* run node .
* open the link on the console

### Prerequisites

A browser

### Installing

* Copy either the minified or the pretty version in dist folder
* import the script in the bottom of your html root
* be happy

## Deployment

#### For the html side of things:
* Make sure the list has the **__draggable_list_** class and the list items have the **_draggable_list_item_** so as to prevent editing the tag style property directly.

```
<ul class="_draggable_list">
    <li class="_draggable_list_item"></li>
</ul>
```

* By default, when the dragging stops the moved element will receive the class **_pulse_**
for 2 seconds, which is going to apply a brightness filter of 1.2, you can change it by overwritting @keyframes _bg_pulse_

```
@keyframes pulse {
	0%{
		background-color: #38f;
	}
	100% {
		background-color: #fff;
	}
}
```

* The class **_ghost_** can also be overwritten so as to change the style of the placeholder image of the dragged element. 

```
.ghost {
	background-color: #83f;
}
```

#### For the Javascript:
* In your main js file, create a variable with the ListDragNDropService constructor.

```
var listDragNDropService = new ListDragNDropService();
```

* Then you can register a list container:

```
<ul id="list" class="_draggable_list">
    <li class="_draggable_list_item">1</li>
    <li class="_draggable_list_item">2</li>
    <li class="_draggable_list_item">3</li>
    <li class="_draggable_list_item">4</li>
    <li class="_draggable_list_item">5</li>
    <li class="_draggable_list_item">6</li>
    <li class="_draggable_list_item">7</li>
</ul>
```
```
listDragNDropService.registerElem(document.getElementById('list'));
```

* If you have data attached to the list that must be updated, you can pass it as the second argument like so:

```
var list = document.getElementById('list');
var data = [
    {name:1},
    {name:2},
    {name:3},
    {name:4},
    {name:5},
    {name:6},
    {name:7}
];

listDragNDropService.registerElem(list, data);
```

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Authors

* **ytfox** - *Initial work* - [xXxYtfoxXx](https://github.com/xXxYtfoxXx)