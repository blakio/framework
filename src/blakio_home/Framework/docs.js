const data = {
    head: String,            // the title
    icons: Array,            // an array of icons
    isActive: Boolean,       // gives the active status
    isOpen: Boolean,         // gives the open status
    isDisable: Boolean,      // get isDisabled class
    isSelected: Boolean,     // get isSelected class
    isActive: Boolean,       // get isActive class
    onClick: Function,       // click event
    text: Array,             // an array of text for the component
    components: Array,       // an array of compontents to render in the component,
    noPadding: Boolean,      // add the noPadding class
    scroll: Boolean          // add the scroll class
    height,                  // the height,
    width,                   // the width,
    backgroundColor,         // the backgroundColor
    size,                    // the size
}


/*

DataVisualization
Grid
HamburgerMenu
IconButton
Panel
PaperHead
Separator
SideBarOption
SideBarPaper
Table
Tags
Toggle
TopLeftFold

const DataVisualization = {

}

const Grid = {

}

const HamburgerMenu = {
    size,
    onClick
}

const IconButton = {
    isActive,
    icon,
    text
}

const Panel = {
    heading,
    noPadding,
    overflow,
    components 
}

const PaperHead = {
    text,
    icon
}

const Separator = {
    None
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
    head => PaperHead,
    icon => PaperHead,
    data: [SideBarOption]
}

const Table = {

}

const Tags = {
    data: [{
        onClick
        isSelected
        isDisabled
        label
    }]
}

const Toggle = {
    onClick,
    isActive,
    text
}

const TopLeftFold = {
    height,
    width,
    backgroundColor
}

*/