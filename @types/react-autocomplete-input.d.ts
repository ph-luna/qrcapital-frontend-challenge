declare module 'react-autocomplete-input' {
    import { FC } from 'react'

    export interface TextInputProps {
            Component?: string | FC
            defaultValue?: string
            disabled?: boolean
            maxOptions?: number
            onSelect?: (string) => any
            changeOnSelect?: (trigger: any, slug: any) => any
            onRequestOptions?: () => any
            matchAny?: boolean
            offsetX?: number
            offsetY?: number
            options?: string[]
            regex?: string
            requestOnlyIfNoOptions?: boolean
            spaceRemovers?: []
            spacer?: string
            trigger?: string | string[]
            minChars?: number
            value?: string
            passThroughEnter?: boolean
            className?: string
            placeholder?: string
            onChange?: (any) => any
    }

    const TextInput: FC<TextInputProps>

    export default TextInput
}
