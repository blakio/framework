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

const employees = [
    {
        id: 1,
        firstName: "Isaiah",
        lastName: "Harrison",
        dob: "05/28/1989",
        phone: "8147530157",
        email: "isaiahharrison@blakio.com",
        title: "CEO",
        department: "N/A",
        hireDate: "07/01/2019",
        status: 1,
        timeClock: [
            {
                date: "01/28/2020",
                updatedById: 1,
                clockedIn: 1,
                time: 1593417600
            },
            {
                date: "01/28/2020",
                updatedById: 1,
                clockedIn: 0,
                time: 1593450000
            }
        ],
        accruedHours: [
            {
                date: "01/28/2020",
                updatedById: 1,
                pto: 45,
                sick: 10,
                vacation: 16,
                personal: 16
            }
        ]
    }
]