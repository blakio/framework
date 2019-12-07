import React, {useState} from "react";
import "./Table.css";

const Table = (props) => {

  const [page, setPage] = useState(1);

  const data = {
    head: ["Name", "Age", "Hobby"],
    body: [
      ["Isaiah", 30, "Coding"],
      ["Jasmin", 25, "Dancing"],
      ["Nikea", 25, "Traveling"]
    ]
  }
  const total = 3;
  const onScreen = 3;
  const low = 1;
  const high = 25;
  const maxPages = 125; //Math.floor(data.body.length / high);

  const previous = () => {
    if(page > 1){
      const newPage = page - 1;
      setPage(newPage);
      const newLow = (high * newPage) - high;
      const newHigh = (high * newPage);
    }
  }

  const next = () => {
    if(page <= maxPages){
      const newPage = page + 1;
      setPage(newPage);
      const newLow = (high * newPage) - high;
      const newHigh = (high * newPage);
    }
  }

  return (<div className="Table">
    <table className="TableContainer">
      <tr>
        {data.head.map((data, index) => {
          return (<th key={index}>
            {data}
          </th>)
        })}
      </tr>
      {data.body.map((data, index) => {
        return (<tr key={index} class={`${index % 2 !== 0 && "even"}`}>
          {data.map((d, i) => {
            return (<td key={i}>
              <div className="row">
                {d}
              </div>
            </td>)
          })}
        </tr>)
      })}
    </table>
    <div className="BottomBar flex">
      <div className="flex">
        <div className="BottomBarBtn flex" onClick={previous}>
          <i className="fas fa-angle-left"></i>
        </div>
        <div className="BottomBarBtn flex">
          <p>{`${low} - ${high}`}</p>
        </div>
        <div className="BottomBarBtn flex" onClick={next}>
          <i class="fas fa-angle-right"></i>
        </div>
      </div>
      <p>{`${onScreen} out of ${total}`}</p>
    </div>
  </div>)
}

export default Table;

/*

pass data in the following format, where a, b, and c are match
in data.head and in data.body

const data = {
  head: [a, b, c],
  body: [
    [a, b, c]
  ],
  total: total data length
  onScreen: amount shown
  low: range of data low to high
  high: range of data low to high
}

*/
