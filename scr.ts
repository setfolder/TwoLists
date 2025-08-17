// listA Items
const listAItems = document.querySelectorAll("#listA > *");
// listB Items
const listBItems = document.querySelectorAll("#listB > *");
// Target
const listB :HTMLElement | null = document.querySelector("#listB");
// variables
let draggingElemet :HTMLElement | null = null;

// All items are draggable and active
for (let list of [ listAItems, listBItems ]) {
    for (let item of list) {
        item.setAttribute("draggable", "true");
        item.addEventListener("dragstart", (event :Event)=> fnOnDragStart(event as DragEvent));
        item.addEventListener("dragend", (event :Event)=> fnOnDragEnd(event as DragEvent));
    }
};
// on drag start
function fnOnDragStart(event: DragEvent) {
    // make selected element outlined
    const target = event.target as HTMLElement;
    let borderColor = window.getComputedStyle(target).borderColor;
    target.style.outline = `solid 2px ${borderColor}`;
    draggingElemet = target; // remember dragging element
};
// on drag end
function fnOnDragEnd(event: DragEvent) {
    const target = event.target as HTMLElement | null;
    if (target) {
        target.style.outline = "none";
    }
};

// the target is ready to be used
if (listB) {
    listB.addEventListener("dragenter", fnOnDragEnter as EventListener);
    listB.addEventListener("dragover", fnOnDragOver as EventListener);
    listB.addEventListener("dragleave", fnOnDragOut as EventListener);
    listB.addEventListener("drop", fnOnDrop as EventListener);
} else {
    console.warn("Element with id 'listB' not found in the DOM.");
};
// on enter in the target
function fnOnDragEnter(event: DragEvent) {
    const currentTarget = event.currentTarget as HTMLElement | null;
    if (currentTarget && currentTarget.parentNode) {
        (currentTarget.parentNode as HTMLElement).style.outline = "solid 1px red";
    };
};
// on drag over the target
let dragOverTimeout: number;
function fnOnDragOver(event: DragEvent) {
    // for drop event
    event.preventDefault();
    // for dragout event
    clearTimeout(dragOverTimeout);
    dragOverTimeout = setTimeout( ()=>{
        if (listB) {
            listB.dispatchEvent(new Event("dragout"));
        } else {
            console.warn("Element with id 'listB' not found in the DOM.");
        }
    }, 110);
};
// on drag out the target
function fnOnDragOut(event :DragEvent){
    const currentTarget = event.currentTarget as HTMLElement | null;
    if (currentTarget && currentTarget.parentNode) {
        (currentTarget.parentNode as HTMLElement).style.outline = "none";
    };
};
// on drop on the target
function fnOnDrop(event: DragEvent) {
    const target = event.currentTarget as HTMLElement | null;
    if (target) {
        if (draggingElemet) {
            target.append(draggingElemet);
        } else {
            console.warn('Dragging element is null');
        };
        setTimeout( ()=>{
            if (target.parentNode && target.parentNode instanceof HTMLElement) {
                target.parentNode.style.outline = "solid 1px blue";
            }
        }, 120);
    };
};