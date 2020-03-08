import Types from "../Context/Types";

export default {
    head: [
        {
            section: "timeBar",
            components: [
                "date",
                "weather"
            ]
        }
    ],
    sideBar: [
        {
            id: 200,
            section: "condensed",
            title: "Timesheet",
            icon: "far fa-dot-circle", // fas fa-dot-circle
            isOpen: null,
            data: [
                {
                    id: 101,
                    title: "employees",
                    icons: ["far fa-user-circle", "fas fa-dot-circle", "far fa-dot-circle"],
                    isOpen: null,
                    onClick: null,
                    types: ["list", "click"],
                    clickType: Types.SET_CHILD_CLICK_OPTION,
                    data: [
                        {
                            id: 102,
                            text: "Sample",
                            subText : "Sample",
                            icon: "fas fa-id-card-alt",
                            isActive: null,
                            types: ["customFunction"],
                            fn: "selectEmployee",
                            onClick: null
                        }
                    ]
                }
            ]
        },
        {
            id: 201,
            section: "condensed",
            title: "Directory",
            icon: "far fa-dot-circle",
            isOpen: null,
            data: []
        },
        {
            id: 202,
            section: "condensed",
            title: "KPI reporting",
            icon: "far fa-dot-circle",
            isOpen: null,
            data: []
        },
        {
            id: 203,
            section: "condensed",
            title: "Kiosk",
            icon: "far fa-dot-circle",
            isOpen: null,
            data: []
        },
        {
            id: 204,
            section: "condensed",
            title: "Document storage",
            icon: "far fa-dot-circle",
            isOpen: null,
            data: []
        },
        {
            id: 205,
            section: "condensed",
            title: "Messaging",
            icon: "far fa-dot-circle",
            isOpen: null,
            data: []
        },
        {
            id: 206,
            section: "condensed",
            title: "Alert",
            icon: "far fa-dot-circle",
            isOpen: null,
            data: []
        }
    ],
    dahsboard: []
}