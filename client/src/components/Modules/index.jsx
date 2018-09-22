import React, { PureComponent, Fragment } from 'react';
import { array, func, bool } from 'prop-types';
import { connect } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { moveInArr, isInitiativeView } from 'utils';
import { Fab } from 'components';
import { reorderUserModules } from 'store/actions/userModules';
import { reorderInitiativeModules } from 'store/actions/initiativeModules';
import EmptyState from './EmptyState';
import ModuleBase from './ModuleBase';

const renderEmptyState = addModule => <EmptyState addModule={addModule} />;

const renderEditState = modules => modules.map((module, index) => (
  <ModuleBase key={`${module.title}-${module.icon}`} moduleIndex={index} {...module} editable />
));

const renderDraggableEditState = (modules, onDragEnd) => (
  <DragDropContext onDragEnd={onDragEnd}>
    <Droppable droppableId="droppable">
      {({ innerRef: droppableRef }) => (
        <div ref={droppableRef}>
          {modules.map((module, index) => (
            <Draggable key={module.title} draggableId={module.title} index={index}>
              {({ innerRef, draggableProps, dragHandleProps }) => (
                <div ref={innerRef} {...draggableProps} {...dragHandleProps}>
                  <ModuleBase key={`${module.title}-${module.icon}`} moduleIndex={index} {...module} editable />
                </div>
              )}
            </Draggable>
          ))}
        </div>
      )}
    </Droppable>
  </DragDropContext>
);

const renderViewState = modules => modules.map((module, index) => (
  <ModuleBase key={`${module.title}-${module.icon}`} moduleIndex={index} {...module} editable={false} />
));

const renderModules = ({ editable, modulesCount, modules, onDragEnd, addModule }) => {
  if (editable && !modulesCount) return renderEmptyState(addModule);
  if (editable && modulesCount === 1) return renderEditState(modules);
  if (editable && modulesCount > 1) return renderDraggableEditState(modules, onDragEnd);
  if (!editable) return renderViewState(modules);
};

const renderFab = (addModule, editable) => {
  if (editable) {
    const StyledFab = styled(Fab)`
    > div > div {
      background-color: var(--customColor);
    }
  `;
    return <StyledFab iconClass="fal fa-plus" onClick={addModule} title="Dodaj moduł do profilu" />;
  }

  return null;
};

@connect(null, { reorderUserModules, reorderInitiativeModules })
class Modules extends PureComponent {
  onDragEnd = ({ source, destination }) => {
    if (!destination) return;

    const reorderedModules = moveInArr(this.props.modules, source.index, destination.index);

    if (isInitiativeView()) {
      this.props.reorderInitiativeModules(reorderedModules);
    } else {
      this.props.reorderUserModules(reorderedModules);
    }
  }

  render() {
    const { props: { modules, editable, openModal }, onDragEnd } = this;
    const modulesCount = modules.length;
    const addModule = () => openModal('AddModule');

    return (
      <Fragment>
        {renderModules({ editable, modulesCount, modules, onDragEnd, addModule })}
        {renderFab(addModule, editable)}
      </Fragment>
    );
  }
}

Modules.propTypes = {
  modules: array,
  openModal: func.isRequired,
  editable: bool.isRequired,
  reorderUserModules: func,
  reorderInitiativeModules: func,
};

Modules.defaultProps = {
  modules: [],
  reorderUserModules: () => {},
  reorderInitiativeModules: () => {},
};

export default Modules;
