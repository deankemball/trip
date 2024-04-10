import clsx from 'clsx'
import { Dispatch, SetStateAction } from 'react'

interface ColorPaletteProps {
  currColor: number,
  setCurrColor: Dispatch<SetStateAction<number>>
}

const ColorPalette = ({currColor, setCurrColor}: ColorPaletteProps) => {
    
    const colors = [
      {name: 'white', hex: '#cfcecb', css: 'bg-white'},
      {name: 'pink', hex: "#ff79b3", css: "bg-pink"},
      {name: 'blue', hex: "#44a5c4", css: "bg-blue"},
      {name: 'orange', hex: "#ff723f", css: "bg-orange"},
    ]
  return (
    <div className='h-24 md:h-[calc(100dvh-48px)] w-full md:w-24 shrink-0 flex md:flex-col gap-2 text-black'>
        {colors.map((color, index)=>{
          return <div key={color.name} className={clsx(color.css, 'select-none flex-1 flex items-center justify-center rounded-md border-2 border-white', currColor === index ? "opacity-100": "opacity-50")} onClick={()=>setCurrColor(index)}>{color.name}</div>
        })}
    
    </div>
  )
}

export default ColorPalette