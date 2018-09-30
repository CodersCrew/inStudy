import React, { PureComponent, Fragment } from 'react';
import { array, func, bool, string, number } from 'prop-types';
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

const renderDraggableEditState = (modules, onDragEnd, openedModals) => (
  <DragDropContext onDragEnd={onDragEnd}>
    <Droppable droppableId="droppable">
      {({ innerRef: droppableRef }) => (
        <div ref={droppableRef}>
          {modules.map((module, index) => (
            <Draggable key={module.title} draggableId={module.title} index={index} isDragDisabled={openedModals}>
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

const renderModules = ({ editable, modulesCount, modules, onDragEnd, addModule, openedModals }) => {
  if (editable && !modulesCount) return renderEmptyState(addModule);
  if (editable && modulesCount === 1) return renderEditState(modules);
  if (editable && modulesCount > 1) return renderDraggableEditState(modules, onDragEnd, openedModals);
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

@connect(({ ui: { openedModals } }) => ({ openedModals }), { reorderUserModules, reorderInitiativeModules })
class Modules extends PureComponent {
  onDragEnd = ({ source, destination }) => {
    if (!destination) return;

    const reorderedModules = moveInArr(this.props.modules, source.index, destination.index);

    if (isInitiativeView()) {
      this.props.reorderInitiativeModules(this.props.initiativeId, reorderedModules);
    } else {
      this.props.reorderUserModules(reorderedModules);
    }
  }

  render() {
    const { props: { modules, editable, openModal, openedModals }, onDragEnd } = this;
    const modulesCount = modules.length;
    const addModule = () => openModal('AddModule');

    return (
      <Fragment>
        {renderModules({ editable, modulesCount, modules, onDragEnd, addModule, openedModals })}
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
  initiativeId: string,
  openedModals: number,
};

Modules.defaultProps = {
  modules: [],
  reorderUserModules: () => {},
  reorderInitiativeModules: () => {},
  initiativeId: '',
  openedModals: 0,
};

export default Modules;
