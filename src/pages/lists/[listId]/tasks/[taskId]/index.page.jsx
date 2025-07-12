import { format } from "date-fns"
import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useHistory, useParams } from "react-router-dom"
import { AppButton } from "~/components/AppButton"
import { AppInput } from "~/components/AppInput"
import { BackButton } from "~/components/BackButton"
import { useId } from "~/hooks/useId"
import { setCurrentList } from "~/store/list"
import { deleteTask, fetchTasks, updateTask } from "~/store/task"
import "./index.css"

const EditTask = () => {
  const id = useId()

  const { listId, taskId } = useParams()
  const history = useHistory()
  const dispatch = useDispatch()

  const [title, setTitle] = useState("")
  const [detail, setDetail] = useState("")
  const [done, setDone] = useState(false)
  const [limit, setLimit] = useState(format(new Date(), "yyyy-MM-dd'T'HH:mm"))

  const [errorMessage, setErrorMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const task = useSelector((state) =>
    state.task.tasks?.find((task) => task.id === taskId),
  )

  useEffect(() => {
    if (task) {
      setTitle(task.title)
      setDetail(task.detail)
      setDone(task.done)
      // limitはinput用にZなしローカル形式でセット
      setLimit(
        task.limit ? format(new Date(task.limit), "yyyy-MM-dd'T'HH:mm") : "",
      )
    }
  }, [task])

  useEffect(() => {
    void dispatch(setCurrentList(listId))
    void dispatch(fetchTasks())
  }, [listId])

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault()

      setIsSubmitting(true)

      // limitをdate-fnsのformatでZ付き（UTC）形式に変換（API用）
      const limitFormatted = format(new Date(limit), "yyyy-MM-dd'T'HH:mm:ss'Z'")

      void dispatch(
        updateTask({ id: taskId, title, detail, done, limit: limitFormatted }),
      )
        .unwrap()
        .then(() => {
          history.push(`/lists/${listId}`)
        })
        .catch((err) => {
          setErrorMessage(err.message)
        })
        .finally(() => {
          setIsSubmitting(false)
        })
    },
    [title, taskId, listId, detail, done, limit],
  )

  const handleDelete = useCallback(() => {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return
    }

    setIsSubmitting(true)

    void dispatch(deleteTask({ id: taskId }))
      .unwrap()
      .then(() => {
        history.push(`/`)
      })
      .catch((err) => {
        setErrorMessage(err.message)
      })
      .finally(() => {
        setIsSubmitting(false)
      })
  }, [taskId])

  return (
    <main className="edit_list">
      <BackButton />
      <h2 className="edit_list__title">Edit List</h2>
      <p className="edit_list__error">{errorMessage}</p>
      <form className="edit_list__form" onSubmit={onSubmit}>
        <fieldset className="edit_list__form_field">
          <label htmlFor={`${id}-title`} className="edit_list__form_label">
            Title
          </label>
          <AppInput
            id={`${id}-title`}
            placeholder="Buy some milk"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </fieldset>
        <fieldset className="edit_list__form_field">
          <label htmlFor={`${id}-detail`} className="edit_list__form_label">
            Description
          </label>
          <textarea
            id={`${id}-detail`}
            placeholder="Blah blah blah"
            value={detail}
            onChange={(event) => setDetail(event.target.value)}
          />
        </fieldset>
        <fieldset className="edit_list__form_field">
          <label htmlFor={`${id}-done`} className="edit_list__form_label">
            Is Done
          </label>
          <div>
            <input
              id={`${id}-done`}
              type="checkbox"
              checked={done}
              onChange={(event) => setDone(event.target.checked)}
            />
          </div>
        </fieldset>
        <fieldset>
          <label htmlFor={`${id}-limit`} className="edit_list__form_label">
            Limit
          </label>
          <AppInput
            id={`${id}-limit`}
            type="datetime-local"
            value={limit}
            onChange={(event) => setLimit(event.target.value)}
            step="60"
          />
        </fieldset>
        <div className="edit_list__form_actions">
          <Link to="/" data-variant="secondary" className="app_button">
            Cancel
          </Link>
          <div className="edit_list__form_actions_spacer"></div>
          <button
            type="button"
            className="app_button edit_list__form_actions_delete"
            disabled={isSubmitting}
            onClick={handleDelete}
          >
            Delete
          </button>
          <AppButton disabled={isSubmitting}>Update</AppButton>
        </div>
      </form>
    </main>
  )
}

export default EditTask
