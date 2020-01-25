const data = {
    head: String, // the title
    icons: Array, // an array of icons
    isActive: Boolean, // gives the active status
    isOpen: Boolean, // gives the open status
    isDisable: Boolean, // disables the component
    onClick: Function, // click event
    text: Array, // an array of text for the component
    components: Array // an array of compontents to render in the component
}
/*

PaperHead
SideBarOption
SideBarPaper

const PaperHead = {
    text,
    icon
}

const SideBarOption = {
    head,
    icons,
    onClick,
    isOpen,
    data,
    component
}

const SideBarPaper = {
    head,
    icon,
    data: [SideBarOption]
}

*/