import { UseFormRegisterReturn } from "react-hook-form"

export interface IOption {
  label: string
  value: string
}

type TDirection = "up" | "down"

export interface ISelect {
  options: IOption[]
  placeholder?: string
  registration: UseFormRegisterReturn
  defaultValue?: string
  direction?: TDirection
}
