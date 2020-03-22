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
            id: 100,
            section: "condensed",
            title: "Timesheet",
            icon: "far fa-dot-circle", // fas fa-dot-circle
            isOpen: null,
            fn: "selectTimesheet",
            data: [
                {
                    id: 101,
                    title: "employees",
                    icons: ["far fa-user-circle", "fas fa-dot-circle", "far fa-dot-circle"],
                    isOpen: null,
                    onClick: null,
                    types: ["list", "click"],
                    clickType: Types.SET_CHILD_CLICK_OPTION,
                    fn: "selectEmployeeDropwdown",
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
            id: 200,
            section: "condensed",
            title: "Directory",
            icon: "far fa-dot-circle",
            isOpen: null,
            data: []
        },
        {
            id: 300,
            section: "condensed",
            title: "KPI reporting",
            icon: "far fa-dot-circle",
            isOpen: null,
            data: []
        },
        {
            id: 400,
            section: "condensed",
            title: "Kiosk",
            icon: "far fa-dot-circle",
            isOpen: null,
            data: []
        },
        {
            id: 500,
            section: "condensed",
            title: "Document storage",
            icon: "far fa-dot-circle",
            isOpen: null,
            data: []
        },
        {
            id: 600,
            section: "condensed",
            title: "Messaging",
            icon: "far fa-dot-circle",
            isOpen: null,
            data: []
        },
        {
            id: 700,
            section: "condensed",
            title: "Alert",
            icon: "far fa-dot-circle",
            isOpen: null,
            data: []
        }
    ],
    dahsboard: [
        {
            title: "time sheet",
            conditions: [100, 101],
            component: "timesheet"
        },
        {
            title: "history",
            conditions: [300],
            component: "table"
        },
        {
            title: "charts",
            conditions: [300],
            component: "charts"
        }
    ]
}