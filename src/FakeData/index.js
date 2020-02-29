export default (dispatch, Types, openList) => ({
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
            section: "condensed",
            title: "timesheet",
            icon: "fas fa-cog",
            data: [
                {
                    head: "employees",
                    icons: ["far fa-user-circle", "fas fa-circle"],
                    isOpen: (openList === "employees"),
                    onClick: () => {
                        dispatch({
                          type: Types.OPENED_LIST,
                          payload: "employees"
                        })
                    },
                    childrenType: "list",
                    data: [
                        {
                            text: "Isaiah",
                            subTitle: "Isaiah",
                            icon: "fas fa-id-card-alt",
                            isActive: null,
                            onClick: () => {}
                        },
                        {
                            text: "Jamal",
                            subTitle: "Jamal",
                            icon: "fas fa-id-card-alt",
                            isActive: null,
                            onClick: () => {}
                        },
                        {
                            text: "Harrison",
                            subTitle: "Harrison",
                            icon: "fas fa-id-card-alt",
                            isActive: null,
                            onClick: () => {}
                        }
                    ]
                }
            ]
        }
    ],
    dahsboard: []
})