import React from 'react';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  background-color: whitesmoke;
`;

export default class Hero extends React.Component {
  render() {
    return (
    
    <Draggable 
        draggableId={this.props.id} 
        index={this.props.index}
      >
        {provided => (
          <div className="Container"
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            innerRef={provided.innerRef}
          >
            {this.props.hero}
          </div>
        )}
      </Draggable>
    );
  }
}