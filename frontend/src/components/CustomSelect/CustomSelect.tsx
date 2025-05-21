import React, { useState, useRef, useEffect } from "react"

import { ISelect, IOption } from "../../types/ISelect"

import "./CustomSelect.scss"

const CustomSelect: React.FC<ISelect> = ({
  options,
  placeholder = "Выберите...",
  registration,
  defaultValue = "0",
  direction = "down",
}: ISelect) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedLabel, setSelectedLabel] = useState(
    options.find((opt) => opt.value === defaultValue)?.label || placeholder
  )

  const wrapperRef = useRef<HTMLDivElement>(null)

  const handleClickOutside = (event: MouseEvent) => {
    if (
      wrapperRef.current && !wrapperRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener(
      "mousedown",
      handleClickOutside,
    )
  }, [])

  const handleSelect = (option: IOption) => {
    setSelectedLabel(option.label)
    setIsOpen(false)

    const changeEvent = {
      target: {
        name: registration.name,
        value: option.value,
      },
    } as unknown as React.ChangeEvent<HTMLInputElement>

    registration.onChange(changeEvent)

  }

  return (
    <div className={`custom-select ${direction}`} ref={wrapperRef}>
      <div className="custom-select__selected" onClick={() => setIsOpen(!isOpen)}>
        {selectedLabel}
        <span className="custom-select__arrow">{isOpen ? "▲" : "▼"}</span>
      </div>
      {isOpen && (
        <div className={`custom-select__options custom-select__options--${direction}`}>
          {options.map((option) => (
            <div
              key={option.value}
              className="custom-select__option"
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
      <input
        type="hidden"
        {...registration}
        value={options.find(o => o.label === selectedLabel)?.value || ""}
      />
    </div>
  )
}

export default CustomSelect

