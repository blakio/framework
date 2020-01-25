# Blakio Framework
This framework is meant to help accelerate the development process when building dashboards

### CONTAINERS
-----------------------------

### SideBarPaper
The container of each side bar sections

| Attribute                   | Type       | Description           |
| -------------               | -----      | ------------          |
| data                        | Object     | data describes the structure of the side bar paper section |
| data.head                   | String     | the section heading |
| data.icon                   | String     | the icon next to the heading |
| data.data                   | Array      | an array of sub sections |
| data.data.head              | String     | the sub section heading |
| data.data.iconLeft          | String     | The icon that appears on the left side of the heading |
| data.data.iconRight         | String     | The icon that appears on the right side of the heading |
| data.data.isOpen            | Boolean    | Indicates if the sub heading is open |
| data.data.onClick           | Function   | click event |
| data.data.data              | Array      | an array of sub section list items |
| data.data.data.icon         | String     | The icon that appears on the left side of the heading |
| data.data.data.text         | String     | The main text |
| data.data.data.subText      | String     | The sub text |
| data.data.data.isActive     | Boolean    | active status |
| data.data.data.onClick      | Function   | click event |
| data.data.data.component    | Component  | a component that shows in the drop down intead of the list |

### Panel
| Attribute                   | Type       | Description           |
| -------------               | -----      | ------------          |
| heading                     | String     | the section heading |
| components                  | Array      | an array of componentns to display from top to bottom |
| noPadding                   | No Value   | removes the padding |
| overflow                    | No Value   | make the element scrollable |

### Table
| Attribute                   | Type       | Description           |
| -------------               | -----      | ------------          |
|  |  |  |

### Grid
| Attribute                   | Type       | Description           |
| -------------               | -----      | ------------          |
|  |  |  |


### COMPONENTS
-----------------------------

### PaperHead
| Attribute                   | Type       | Description           |
| -------------               | -----      | ------------          |
| text                        | String     | title of the head |
| icon                        | String     | icon of the head |

### Tags
| Attribute                   | Type       | Description           |
| -------------               | -----      | ------------          |
| data                        | Object     | an object with the tag metadata |
| data.isDisabled             | Boolean    | if false, the gets a disabled class |
| data.isSelected             | Boolean    | if true the button gets a selected class |
| data.label                  | String     | the label on the tag |
| data.onClick                | Function   | click event |

### IconButton
| Attribute                   | Type       | Description           |
| -------------               | -----      | ------------          |
| isActive                    | Boolean    | if true the button gets a active class |
| onClick                     | Function   | click event |
| icon                        | String     | The icon that appears on the button |
| text                        | String     | The button text |

### LoadingScreen
| Attribute                   | Type       | Description           |
| -------------               | -----      | ------------          |
| None                        | None       | If shows on page a loading screen shows |

### TopLeftFold
| Attribute                   | Type       | Description           |
| -------------               | -----      | ------------          |
|  |  |  |

### HamburgerMenu
| Attribute                   | Type       | Description           |
| -------------               | -----      | ------------          |
|  |  |  |

### Toggle
| Attribute                   | Type       | Description           |
| -------------               | -----      | ------------          |
|  |  |  |

### DataVisualization
| Attribute                   | Type       | Description           |
| -------------               | -----      | ------------          |
|  |  |  |

### Separator
| Attribute                   | Type       | Description           |
| -------------               | -----      | ------------          |
|  |  |  |

### Table Template
| Attribute                   | Type       | Description           |
| -------------               | -----      | ------------          |
|  |  |  |

```javascript
data = {
    head: String, // the title
    icons: Array, // an array of icons
    isActive: Boolean, // gives the active status
    isDisable: Boolean, // disables the component
    onClick: Function, // click event
    text: Array, // an array of text for the component
    components: Array // an array of compontents to render in the component
}
```
