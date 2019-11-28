export default {
  section1: {
    title: "Time Sheet",
    options: [
      {
        isOpen: false,
        icon: "",
        title: "Employees",
        action: "onClickOpen",
        options: {
          options1: {
            title: "option 1",
            icon: "",
            onClick: () => console.log("hey 1")
          },
          options1: {
            title: "option 2",
            icon: "",
            onClick: () => console.log("hey 2")
          },
          options1: {
            title: "option 3",
            icon: "",
            onClick: () => console.log("hey 3")
          }
        }
      },
      {
        isOpen: false,
        icon: "",
        title: "Employees",
        action: "onClickOpen",
        options: {
          options1: {
            title: "option 4",
            icon: "",
            onClick: () => console.log("hey 4")
          },
          options1: {
            title: "option 5",
            icon: "",
            onClick: () => console.log("hey 5")
          },
          options1: {
            title: "option 6",
            icon: "",
            onClick: () => console.log("hey 6")
          }
        }
      },
      {
        isOpen: false,
        icon: "",
        title: "Employees",
        action: "onClickEvent",
        onClick: () => console.log("action type")
      }
    ]
  }
}
