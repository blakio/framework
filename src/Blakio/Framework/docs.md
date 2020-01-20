# Blakio Framework
This framework is meant to help accelerate the development process when building dashboards

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
| data.data.data.component    | Component  | a component that shows in the dtop down intead of the list |

### Panel
### Table
### Grid


### PaperHead
### Tags
### IconButton
### LoadingScreen
### TopLeftFold
### HamburgerMenu
### Toggle
### DataVisualization
### Separator

| Attribute                   | Type       | Description           |
| -------------               | -----      | ------------          |
|  |  |  |