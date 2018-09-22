import React, { PureComponent } from 'react';
import { array, func, bool } from 'prop-types';
import { connect } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { moveInArr, isInitiativeView } from 'utils';
import { reorderUserModules } from 'store/actions/userModules';
import { reorderInitiativeModules } from 'store/actions/initiativeModules';
import EmptyState from './EmptyState';
import ModuleBase from './ModuleBase';

const renderEmptyState = (modulesCount, openModal) => <EmptyState modulesCount={modulesCount} openModal={openModal} />;

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

@connect(null, { reorderUserModules, reorderInitiativeModules })
class Modules extends PureComponent {
  onDragEnd = ({ source, destination }) => {
    if (!destination) return;

    const reorderedModules = moveInArr(this.props.modules, source.index, destination.index);
    this.props[isInitiativeView() ? 'reorderInitiativeModules' : 'reorderUserModules'](reorderedModules);
  }

  render() {
    const { modules, editable, openModal } = this.props;
    const modulesCount = modules.length;

    if (editable && !modulesCount) return renderEmptyState(modulesCount, openModal);
    if (editable && modulesCount === 1) return renderEditState(modules);
    if (editable && modulesCount > 1) return renderDraggableEditState(modules, this.onDragEnd);
    if (!editable) return renderViewState(modules);
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
