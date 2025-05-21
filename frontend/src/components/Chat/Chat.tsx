import { SubmitHandler, useForm } from "react-hook-form"
import { useState } from "react"
import { IoIosClose } from "react-icons/io"

import IChat from "../../types/IChat"

import CustomSelect from "../CustomSelect"

import "./Chat.scss"

import ImgFileIcon from "../../assets/img/imgFile.svg"
import ArrayIcon from "../../assets/img/arrow.svg"

function Chat() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
  } = useForm<IChat>({
    mode: "onChange",
  })

  const [currentFiles, setCurrentFiles] = useState<File[]>([])
  const [currentFilePreviews, setCurrentFilePreviews] = useState<string[]>([])

  const messageValue = watch("message", "")

  const regeneratePreviews = (files: File[]) => {
    if (files.length === 0) {
      setCurrentFilePreviews([])
      return
    }

    const previewPromises = files.map((file) => {
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result as string)
        reader.onerror = (error) => reject(error)
        reader.readAsDataURL(file)
      })
    })

    Promise.all(previewPromises)
      .then((previews) => {
        setCurrentFilePreviews(previews)
      })
      .catch((error) => {
        console.error("Ошибка при генерации предпросмотров:", error)
      })
  }

  const addFiles = (newFiles: File[]) => {
    const uniqueNewFiles = newFiles.filter(
      (nf) =>
        !currentFiles.some(
          (cf) => (
            cf.name === nf.name
            && cf.size === nf.size
            && cf.lastModified === nf.lastModified
          )
        )
    )

    if (uniqueNewFiles.length > 0) {
      const updatedFiles = [...currentFiles, ...uniqueNewFiles]
      setCurrentFiles(updatedFiles)
      regeneratePreviews(updatedFiles)
    }
  }

  const removeFile = (indexToRemove: number) => {
    const updatedFiles = currentFiles.filter(
      (_, index) => index !== indexToRemove,
    )

    setCurrentFiles(updatedFiles)
    regeneratePreviews(updatedFiles)

    if (updatedFiles.length === 0) {
      const fileInputElement = document.getElementById(
        "chat-file-input",
      ) as HTMLInputElement

      if (fileInputElement) {
        fileInputElement.value = ""
      }
    }
  }

  const onSubmit: SubmitHandler<IChat> = (data) => {
    const formData = new FormData();
    formData.append("message", data.message)

    if (data.style && data.style !== "0") {
      formData.append("style", data.style)
    }

    currentFiles.forEach((file) => {
      formData.append("images", file)
    })

    console.log("Данные формы для отправки:");
    for (const pair of formData.entries()) {
      console.log(pair[0] + ": " + (
        pair[1] instanceof File ? pair[1].name : pair[1]
      ))
    }
    // TODO: Замените эту часть на ваш реальный вызов API для отправки данных
    // fetch('/api/chat', { method: 'POST', body: formData })
    //   .then(response => response.json())
    //   .then(result => console.log('Успех:', result))
    //   .catch(error => console.error('Ошибка:', error));

    setValue("message", "")
    setValue("style", "0")
    setCurrentFiles([])
    setCurrentFilePreviews([])

    const fileInputElement = document.getElementById(
      "chat-file-input"
    ) as HTMLInputElement

    if (fileInputElement) {
      fileInputElement.value = ""
    }
  }

  const handlePaste = (event: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const items = event.clipboardData?.items
    if (!items) return

    const imageFilesToAdd: File[] = []
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.startsWith("image/")) {
        const blob = items[i].getAsFile()

        if (blob) {
          const fileExtension = blob.type.split('/')[1] || 'png'
          const fileName = `pasted_image_${Date.now()}.${fileExtension}`
          const file = new File([blob], fileName, { type: blob.type })

          imageFilesToAdd.push(file)
          event.preventDefault()
        }
      }
    }
    if (imageFilesToAdd.length > 0) {
      addFiles(imageFilesToAdd)
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      addFiles(Array.from(event.target.files))
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      if (event.ctrlKey) {
        event.preventDefault()
        const textarea = event.currentTarget
        const { value, selectionStart, selectionEnd } = textarea
        const newValue = value.substring(
          0, selectionStart,
        ) + "\n" + value.substring(selectionEnd)

        setValue(
          "message",
          newValue,
          { shouldValidate: true, shouldDirty: true },
        )

        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd = selectionStart + 1
        }, 0)
      } else {
        event.preventDefault()

        if (messageValue.trim().length > 0 || currentFiles.length > 0) {
          handleSubmit(onSubmit)()
        }
      }
    }
  }

  return (
    <div className="chat_wrapper">
      <section className="chat">
      </section>
      <form className="userQuery" onSubmit={handleSubmit(onSubmit)}>
        {currentFilePreviews.length > 0 && (
          <div className="file-previews_container">
            {currentFilePreviews.map((previewSrc, index) => (
              <div key={(currentFiles[index]?.name || 'file') + '-' + index} className="file-preview-item">
                <img src={previewSrc} alt={currentFiles[index]?.name || `Файл ${index + 1}`} />
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="remove-file-btn"
                  aria-label={`Удалить ${currentFiles[index]?.name}`}
                >
                  <IoIosClose />
                </button>
              </div>
            ))}
          </div>
        )}

        <textarea
          placeholder="Ask CoverAI anything..."
          id="message"
          {...register("message", {
            required: currentFiles.length === 0 ? "Это поле обязательно, если не загружены изображения" : false,
            maxLength: 8000,
          })}
          onPaste={handlePaste}
          onKeyDown={handleKeyDown}
          rows={3}
        />
        <div className="userQuery__footer">
          <div className="left">
            <div className="file">
              <input
                type="file"
                id="chat-file-input"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
              <label htmlFor="chat-file-input" className="btn_img">
                <img src={ImgFileIcon} alt="Загрузить файл(ы)" />
              </label>
            </div>
            <CustomSelect
              options={[
                { label: "Ну так", value: "0" },
                { label: "Стиль 1", value: "1" },
                { label: "Стиль 2", value: "2" },
              ]}
              registration={register("style")}
              defaultValue="0"
              direction="up"
            />
          </div>
          <button
            type="submit"
            className="btn btn_array"
            disabled={
              messageValue.trim().length === 0 && currentFiles.length === 0
            }
          >
            <img src={ArrayIcon} alt="Отправить" />
          </button>
        </div>
      </form>
    </div>
  )
}

export default Chat
