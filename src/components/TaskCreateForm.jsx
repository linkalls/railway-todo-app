import { format } from "date-fns"
import { useCallback, useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { AppButton } from "~/components/AppButton"
import { AppInput } from "~/components/AppInput"
import { CheckIcon } from "~/icons/CheckIcon"
import { createTask } from "~/store/task"
import "./TaskCreateForm.css"

export const TaskCreateForm = () => {
  const dispatch = useDispatch()
  // datetime-local用の初期値（秒なし、Zなし）
  const [dateLimit, setDateLimit] = useState(
    format(new Date(), "yyyy-MM-dd'T'HH:mm"),
  )

  const refForm = useRef(null)
  const [elemTextarea, setElemTextarea] = useState(null)

  const [formState, setFormState] = useState("initial")

  const [title, setTitle] = useState("")
  const [detail, setDetail] = useState("")
  const [done, setDone] = useState(false)

  const handleToggle = useCallback(() => {
    setDone((prev) => !prev)
  }, [])

  const handleFocus = useCallback(() => {
    setFormState("focused")
  }, [])

  const handleBlur = useCallback(() => {
    if (title || detail) {
      return
    }

    setTimeout(() => {
      // フォーム内の要素がフォーカスされている場合は何もしない
      const formElement = refForm.current
      if (formElement && formElement.contains(document.activeElement)) {
        return
      }

      setFormState("initial")
      setDone(false)
    }, 100)
  }, [title, detail])

  const handleDiscard = useCallback(() => {
    setTitle("")
    setDetail("")
    setFormState("initial")
    setDone(false)
  }, [])

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault()

      setFormState("submitting")

      // datetime-local → Z形式へ変換
      let limit = ""
      if (dateLimit) {
        // 入力値は "YYYY-MM-DDTHH:mm" なので、秒とZを付与
        limit = dateLimit + ":00Z"
      }

      void dispatch(createTask({ title, detail, done, limit }))
        .unwrap()
        .then(() => {
          handleDiscard()
        })
        .catch((err) => {
          alert(err.message)
          setFormState("focused")
        })
    },
    [title, detail, done, dateLimit],
  )

  useEffect(() => {
    if (!elemTextarea) {
      return
    }

    const recalcHeight = () => {
      elemTextarea.style.height = "auto"
      elemTextarea.style.height = `${elemTextarea.scrollHeight}px`
    }

    elemTextarea.addEventListener("input", recalcHeight)
    recalcHeight()

    return () => {
      elemTextarea.removeEventListener("input", recalcHeight)
    }
  }, [elemTextarea])

  return (
    <form
      ref={refForm}
      className="task_create_form"
      onSubmit={onSubmit}
      data-state={formState}
    >
      <div className="task_create_form__title_container">
        <button
          type="button"
          onClick={handleToggle}
          className="task_create_form__mark_button"
          onFocus={handleFocus}
          onBlur={handleBlur}
        >
          {done ? (
            <div
              className="task_create_form__mark____complete"
              aria-label="Completed"
            >
              <CheckIcon className="task_create_form__mark____complete_check" />
            </div>
          ) : (
            <div
              className="task_create_form__mark____incomplete"
              aria-label="Incomplete"
            ></div>
          )}
        </button>
        <input
          type="text"
          className="task_create_form__title"
          placeholder="Add a new task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={formState === "submitting"}
        />
      </div>
      {formState !== "initial" && (
        <div>
          <textarea
            ref={setElemTextarea}
            rows={1}
            className="task_create_form__detail"
            placeholder="Add a description here..."
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
            onBlur={handleBlur}
            disabled={formState === "submitting"}
          />
          <AppInput
            type="datetime-local"
            value={dateLimit}
            onChange={(e) => setDateLimit(e.target.value)}
            step="60" // 分単位
          />
          <div className="task_create_form__actions">
            <AppButton
              data-variant="secondary"
              onBlur={handleBlur}
              onClick={handleDiscard}
              disabled={(!title && !detail) || formState === "submitting"}
            >
              Discard
            </AppButton>
            <div className="task_create_form__spacer"></div>
            <AppButton
              onBlur={handleBlur}
              disabled={!title || !detail || formState === "submitting"}
            >
              Add
            </AppButton>
          </div>
        </div>
      )}
    </form>
  )
}
