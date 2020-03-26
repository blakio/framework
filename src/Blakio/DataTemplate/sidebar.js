const option = {
    title: "string: the title to call the section",
    icon: "string: the icon to the right of the title from font awesome",
    isOpen: "boolean: the open status of the section",
    data: [
        "subsection"
    ]
}

const subSection = {
    head: "string: the title of the sub section",
    icons: ["icon to the left", "fas fa-circle"],
    isOpen: null,
    onClick: null,
    childrenType: "list",
    childrenHasSameClickEvent: true,
    data: [
        {
            text: "Sample",
            subText : "Sample",
            icon: "fas fa-id-card-alt",
            isActive: null,
            onClick: () => {}
        }
    ]
}