import useDropClone, { IDropOptions } from './src/hooks/useDropClone';
import useDragClone, { IDragOptions } from './src/hooks/useDragClone';
import useTouchDnd from './src/hooks/useTouchDnd';
import useGlobalStates from './src/hooks/useGlobalStates';

export type DropOption = IDropOptions;

export type DragOption = IDragOptions;

const cloneDnd = {
  useDropClone,
  useDragClone,
  useGlobalStates,
  useTouchDnd
}

export default cloneDnd;