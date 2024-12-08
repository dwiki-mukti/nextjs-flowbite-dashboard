import { TextInput } from "flowbite-react"
import { useRef, useState } from "react"
import { HiSearch } from "react-icons/hi";

export default function Search({
    onSubmit
}: {
    onSubmit?: (value: string) => void
}) {
    const [DelaySearch, setDelaySearch] = useState<ReturnType<typeof setTimeout>>()
    return (
        <TextInput
            placeholder="Search..."
            icon={HiSearch}
            onInput={(e) => {
                const value = e.currentTarget.value
                clearTimeout(DelaySearch)
                setDelaySearch(
                    setTimeout(() => {
                        if (onSubmit) onSubmit(value);
                    }, 1000)
                )
            }}
        />
    )
}


