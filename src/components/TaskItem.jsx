import { useCallback, useState } from "react"
import { useDispatch } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { CheckIcon } from "~/icons/CheckIcon"
import { PencilIcon } from "~/icons/PencilIcon"
import { updateTask } from "~/store/task"
import "./TaskItem.css"

export const TaskItem = ({ task }) => {
  const dispatch = useDispatch()

  const { listId } = useParams()
  const { id, title, detail, done, limit } = task
  console.log("TaskItem", limit)

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleToggle = useCallback(() => {
    setIsSubmitting(true)
    void dispatch(updateTask({ id, done: !done })).finally(() => {
      setIsSubmitting(false)
    })
  }, [id, done])

  return (
    <div className="task_item">
      <div className="task_item__title_container">
        <button
          type="button"
          onClick={handleToggle}
          disabled={isSubmitting}
          className="task__item__mark_button"
        >
          {done ? (
            <div className="task_item__mark____complete" aria-label="Completed">
              <CheckIcon className="task_item__mark____complete_check" />
            </div>
          ) : (
            <div
              className="task_item__mark____incomplete"
              aria-label="Incomplete"
            ></div>
          )}
        </button>
        <div className="task_item__title" data-done={done}>
          {title}
        </div>
        <div aria-hidden className="task_item__title_spacer"></div>
        <Link
          to={`/lists/${listId}/tasks/${id}`}
          className="task_item__title_action"
        >
          <PencilIcon aria-label="Edit" />
        </Link>
      </div>
      <div className="task_item__detail">{detail}</div>
      <div className="task_item__limit">
        {/* UTC to JSTはあんまり考慮しなくていい */}
        {limit ? limit.replace("T", " ").replace("Z", "") : "期限なし"}
      </div>
    </div>
  )
}
