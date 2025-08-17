"use strict";
// listA Items
const listAItems = document.querySelectorAll("#listA > *");
// listB Items
const listBItems = document.querySelectorAll("#listB > *");
// Target
const listB = document.querySelector("#listB");
// variables
let draggingElemet = null;
// All items are draggable and active
for (let list of [listAItems, listBItems]) {
    for (let item of list) {
        item.setAttribute("draggable", "true");
        item.addEventListener("dragstart", (event) => fnOnDragStart(event));
        item.addEventListener("dragend", (event) => fnOnDragEnd(event));
    }
};
// on drag start
function fnOnDragStart(event) {
    // make selected element outlined
    const target = event.target;
    let borderColor = window.getComputedStyle(target).borderColor;
    target.style.outline = `solid 2px ${borderColor}`;
    draggingElemet = target; // remember dragging element
};
// on drag end
function fnOnDragEnd(event) {
    const target = event.target;
    if (target) {
        target.style.outline = "none";
    }
};
// the target is ready to be used
if (listB) {
    listB.addEventListener("dragenter", fnOnDragEnter);
    listB.addEventListener("dragover", fnOnDragOver);
    listB.addEventListener("dragleave", fnOnDragOut);
    listB.addEventListener("drop", fnOnDrop);
}
else {
    console.warn("Element with id 'listB' not found in the DOM.");
};
// on enter in the target
function fnOnDragEnter(event) {
    const currentTarget = event.currentTarget;
    if (currentTarget && currentTarget.parentNode) {
        currentTarget.parentNode.style.outline = "solid 1px red";
    };
};
// on drag over the target
let dragOverTimeout;
function fnOnDragOver(event) {
    // for drop event
    event.preventDefault();
    // for dragout event
    clearTimeout(dragOverTimeout);
    dragOverTimeout = setTimeout(() => {
        if (listB) {
            listB.dispatchEvent(new Event("dragout"));
        }
        else {
            console.warn("Element with id 'listB' not found in the DOM.");
        }
    }, 110);
};
// on drag out the target
function fnOnDragOut(event) {
    const currentTarget = event.currentTarget;
    if (currentTarget && currentTarget.parentNode) {
        currentTarget.parentNode.style.outline = "none";
    };
};
// on drop on the target
function fnOnDrop(event) {
    const target = event.currentTarget;
    if (target) {
        if (draggingElemet) {
            target.append(draggingElemet);
        }
        else {
            console.warn('Dragging element is null');
        }
        ;
        setTimeout(() => {
            if (target.parentNode && target.parentNode instanceof HTMLElement) {
                target.parentNode.style.outline = "solid 1px blue";
            }
        }, 120);
    };
};
