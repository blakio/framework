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
            title: "Timesheet",
            fn: "selectTimesheet",
            data: [
                // {
                //     id: 101,
                //     title: "employees",
                //     icons: ["far fa-user-circle", "fas fa-dot-circle", "far fa-dot-circle"],
                //     isOpen: null,
                //     onClick: null,
                //     types: ["list", "click"],
                //     clickType: Types.SET_CHILD_CLICK_OPTION,
                //     fn: "selectEmployeeDropwdown",
                //     data: [
                //         {
                //             id: 102,
                //             text: "Sample",
                //             subText : "Sample",
                //             icon: "fas fa-id-card-alt",
                //             isActive: null,
                //             types: ["customFunction"],
                //             fn: "selectEmployee",
                //             onClick: null
                //         }
                //     ]
                // }
            ]
        },
        {
            id: 200,
            title: "Directory",
            data: []
        },
        {
            id: 300,
            title: "KPI reporting",
            data: []
        },
        {
            id: 400,
            title: "Kiosk",
            data: []
        },
        {
            id: 500,
            title: "Document storage",
            data: []
        },
        {
            id: 600,
            title: "Messaging",
            data: []
        },
        {
            id: 700,
            title: "Alert",
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
