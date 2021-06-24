import React from 'react';
import Hero from './Hero.js';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';

const Container = styled.div`
  margin: 10px;
  border: 1px solid lightgrey;
  border-radius: 5px;
  width: 33%;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  padding: 10px;
`;

const HeroList = styled.div`
  padding: 10px;
  flex-grow: 1;
  min-height: 100px;
`;

export default class Column extends React.Component {
  render() {
    return (


<Droppable droppableId={this.props.column}>
{(provided) => (
  <div 
    className="Hero-List" 
    innerRef={provided.innerRef} 
    {...provided.droppableProps}
  >
    {
    
    
      this.props.projects.map((project, index) => (
      <Hero key={project[0]} id={project[0]} hero={project[1]} index={project[0]} />
      ))
  }

   {  
    this.props.inventarios.map((inventario, index) => (
        <Hero key={inventario.inventarioid} id={inventario.inventarioid} hero={inventario.folio} index={inventario.inventarioid} />
      ))
   }
    
    {
     this.props.news.map((n, index) => (
        <Hero key={n[0]} id={n[0]} hero={n[1]} index={n[0]} />
      ))
      
    
    }

    {provided.placeholder}
  </div>
)}
</Droppable>


    );
  }
}