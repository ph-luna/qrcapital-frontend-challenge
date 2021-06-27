import { FC } from 'react'
import TextInput, { TextInputProps } from 'react-autocomplete-input'

const InputAutoComplete: FC<TextInputProps> = ({ placeholder, options, trigger, className }) => {
  return <TextInput className={className} Component="input" placeholder={placeholder} options={options} trigger={trigger} />
}

export default InputAutoComplete
