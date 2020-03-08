import React from 'react';
import logo from './logo.svg';
import './App.css';

export class Square extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      value:null,
      Color:'white',
      count: '0'
    }
  }
  render() {
    return (
      <div className="square" onClick={() => this.props.onClick()} style={{backgroundColor: this.props.value}}></div>
    );
  }
  }

export class Board extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      array: [],
      startEnd:0,
      searchAlgo:0
    }
  }

componentDidMount()
{
  const array = [];
  let x = 0;
  let y = 0;
  for(let i = 0; i < 729; i++)
  {
    if(i % 27 === 0)
    {
      x = 0;
      y++;
      array.push({"color":"white", "x":x,"y":y, "Nodes":[], "visited":false});
    }
    else
    {
      x++;
      array.push({"color":"white", "x":x,"y":y,"Nodes":[],"visited":false});
    }
  }
// Adding all the neighbours to the Adjacency-list
  for(let i = 0; i < 729; i++)
  {
      array[i].Nodes.push({"x":array[i].x,"y":array[i].y+1})
      array[i].Nodes.push({"x":array[i].x,"y":array[i].y-1})
      array[i].Nodes.push({"x":array[i].x+1,"y":array[i].y})
      array[i].Nodes.push({"x":array[i].x-1,"y":array[i].y})
      // array[i].Nodes.push({"x":array[i].x+1,"y":array[i].y+1})
      // array[i].Nodes.push({"x":array[i].x-1,"y":array[i].y+1})
      // array[i].Nodes.push({"x":array[i].x-1,"y":array[i].y-1})
      // array[i].Nodes.push({"x":array[i].x+1,"y":array[i].y-1})
  }

  this.setState({array});
}

dfs = (node) =>
{
  setInterval(() =>
  {
    let sampleArray = {...this.state.array};
    let neighbours = {...node.Nodes};
      this.visitedNode('red',node.x,node.y);
      for(let i in neighbours)
      {
          if(sampleArray[this.getIndex(neighbours[i])].visited !== true && sampleArray[this.getIndex(neighbours[i])] !== undefined)
          {
            console.log(neighbours[i]);
            this.dfs(sampleArray[this.getIndex(neighbours[i])]);
          }
        }
  }, 500);
}

dfsIterative = (node) =>
{
    var stack = [];
    var visitedList = [];
    let s = 0;
    var index = undefined;
    var sampleArray = {...this.state.array};
    stack.push(sampleArray[node]);
    console.log(stack);
    while(stack.length !== 0)
    { 
      var element = stack.pop();
                  if(!element.visited)
                  {
                    for(let i in sampleArray)
                    {
                        if(sampleArray[i].x === element.x && sampleArray[i].y === element.y)
                        {
                          sampleArray[i].visited = true;
                          visitedList.push(sampleArray[i]);
                        }
                    }
                }
                  let neighbours = element.Nodes;
                  for(let i = 0; i < neighbours.length; i++)
                  {
                      let e1 = neighbours[i];
                      if(this.getIndex(e1) !== undefined)
                      index = this.getIndex(e1);
                      if(sampleArray[index] !== undefined && !sampleArray[index].visited)
                      {
                          stack.push(sampleArray[index]);
                      }
                  }
    }
    this.animation(visitedList);
  }

  bfsIterative = (node) =>
{
    var queue = [];
    var visitedList = [];
    let s = 0;
    var index = undefined;
    var sampleArray = {...this.state.array};
    queue.push(sampleArray[node]);
    let comNode = sampleArray[node];
    for(let i in sampleArray)
    {
        if(sampleArray[i].x === comNode.x && sampleArray[i].y === comNode.y)
        {
          sampleArray[i].visited = true;
          visitedList.push(sampleArray[i]);
        }
    }
    console.log(queue);
    while(queue.length !== 0)
    { 
      var element = queue.shift();
      let neighbours = element.Nodes;
                  for(let i = 0; i < neighbours.length; i++)
                  {
                      let e1 = neighbours[i];
                      if(this.getIndex(e1) !== undefined)
                      index = this.getIndex(e1);
                      if(sampleArray[index] !== undefined && !sampleArray[index].visited)
                      {
                        sampleArray[index].visited = true;
                        queue.push(sampleArray[index]);
                        visitedList.push(sampleArray[index]);
                      }
                  }
    }
    this.animation(visitedList);
  }

animation = (list) =>
{
  for(let i = 0; i < list.length; i++)
  {
  setInterval(
    ()=>{
      this.visitedNode('red',list[i].x,list[i].y);
        }
    ,100*i);   }
}

getIndex = (node) =>
{
  let sampleArray = {...this.state.array};
  let num = 0;
  for(let i in sampleArray)
  {
      if(sampleArray[i].x === node.x && sampleArray[i].y === node.y)
      {
           num = i;
          return num;
      }
  }
}

visitedNode = (color,x,y) =>
{
    let sampleArray = {...this.state.array};
    for(let i in sampleArray)
    {
        if(sampleArray[i].x === x && sampleArray[i].y === y)
        {
          sampleArray[i].color = color;
          sampleArray[i].visited = true;
        }
    }
    this.setState({sampleArray});
}


handleClick =(idx) =>
{
  let sampleArray = {...this.state.array}
  console.log(sampleArray[idx]);
  if(this.state.startEnd === 0)
  {
    sampleArray[idx].color = 'red'; 
    this.setState({sampleArray}); 
    this.setState({startEnd:1});
  if(this.state.searchAlgo === 0)
    this.bfsIterative(idx);
    else
    this.dfsIterative(idx);

  }
  else if(this.state.startEnd === 1)
  {
    sampleArray[idx].color = 'green';
    this.setState({sampleArray});
    this.setState({startEnd:5});
  }
}
  renderSquare(i,idx) {
    return <Square onClick={() => this.handleClick(idx)} key={idx} value={i} />;
  }

  handleInputChange= (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    if(this.state.searchAlgo === 0)
    this.setState({searchAlgo:1});
    else 
    this.setState({searchAlgo:0});
  }

render() {
  const {array} = this.state;
  return (
    <>
    <div className="board-area">
    <form onSubmit={this.handleSubmit}>
   <label>
          DFS
          <input
            name="DFS"
            type="checkbox"
            checked={this.state.searchAlgo === 0 ? false : true}
            onChange={this.handleInputChange} />
        </label>
        <label>
          BFS
          <input
            name="BFS"
            type="checkbox"
            checked={this.state.searchAlgo === 0 ? true : false}
            onChange={this.handleInputChange} />
        </label>
      </form>
    <div className="table-grid">
     {
       array.map((value,idx)=>{
       return this.renderSquare(value.color,idx)
       })}
   </div>
   </div>
   </>
  );
}
}

export default Board;
