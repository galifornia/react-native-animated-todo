import * as React from 'react'
import { AnimatePresence, View } from 'moti'
import { useCallback, useRef } from 'react'
import {
  PanGestureHandlerProps,
  ScrollView,
} from 'react-native-gesture-handler'
import { makeStyledComponent } from '../utils/styled'
import TaskItem from './task-item'

const StyledView = makeStyledComponent(View)
const StyledScrollView = makeStyledComponent(ScrollView)

interface TaskItemData {
  id: string
  subject: string
  done: boolean
}

interface TaskItemProps
  extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'> {
  data: TaskItemData
  isEditing: boolean
  onToggleItem: (item: TaskItemData) => void
  onChangeSubject: (item: TaskItemData, newSubject: string) => void
  onFinishEditing: (item: TaskItemData) => void
  onPressedLabel: (item: TaskItemData) => void
  onRemove: (item: TaskItemData) => void
}

export const AnimatedTaskItem = ({
  simultaneousHandlers,
  data,
  isEditing,
  onChangeSubject,
  onFinishEditing,
  onPressedLabel,
  onRemove,
  onToggleItem,
}: TaskItemProps) => {
  const handleToggleCheckbox = useCallback(
    () => onToggleItem(data),
    [data, onToggleItem]
  )

  const handleChangeSubject = useCallback(
    (subject) => onChangeSubject(data, subject),
    [data, onChangeSubject]
  )

  const handleFinishEditing = useCallback(
    () => onFinishEditing(data),
    [data, onFinishEditing]
  )

  const handlePressLabel = useCallback(
    () => onPressedLabel(data),
    [data, onPressedLabel]
  )

  const handleRemove = useCallback(() => onRemove(data), [data, onRemove])

  return (
    <StyledView
      w="full"
      from={{
        opacity: 0,
        scale: 0.5,
        marginBottom: -46,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        marginBottom: 0,
      }}
      exit={{
        opacity: 0,
        scale: 0.5,
        marginBottom: -46,
      }}
    >
      <TaskItem
        simultaneousHandlers={simultaneousHandlers}
        subject={data.subject}
        isDone={data.done}
        isEditing={isEditing}
        onToggle={handleToggleCheckbox}
        onChangeSubject={handleChangeSubject}
        onFinishEditing={handleFinishEditing}
        onPressLabel={handlePressLabel}
        onRemove={handleRemove}
      />
    </StyledView>
  )
}

interface Props {
  data: Array<TaskItemData>
  editingItemId: string | null
  onToggleItem: (item: TaskItemData) => void
  onChangeSubject: (item: TaskItemData, newSubject: string) => void
  onFinishEditing: (item: TaskItemData) => void
  onPressedLabel: (item: TaskItemData) => void
  onRemoveItem: (item: TaskItemData) => void
}

const TaskList = ({
  data,
  editingItemId,
  onToggleItem,
  onChangeSubject,
  onPressedLabel,
  onFinishEditing,
  onRemoveItem,
}: Props) => {
  const refScrollView = useRef(null)
  return (
    <StyledScrollView ref={refScrollView} w="full">
      <AnimatePresence>
        {data.map((item) => (
          <AnimatedTaskItem
            key={item.id}
            data={item}
            simultaneousHandlers={refScrollView}
            isEditing={editingItemId === item.id}
            onChangeSubject={onChangeSubject}
            onToggleItem={onToggleItem}
            onPressedLabel={onPressedLabel}
            onFinishEditing={onFinishEditing}
            onRemove={onRemoveItem}
          />
        ))}
      </AnimatePresence>
    </StyledScrollView>
  )
}

export default TaskList
