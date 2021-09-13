import React from "react"
import { connectSearchBox } from "react-instantsearch-dom"
import useSound from 'use-sound';
import beepSfx from '../../../assets/sounds/beep.mp3';
// sfx is by SoundJay (wolfr.am/YoXMlov6)

export default connectSearchBox(
  ({ refine, currentRefinement, className, onFocus }) => {

  const [play] = useSound(beepSfx);

  return (
    <form
      className={`${className} h-8 text-black dark:text-white transition duration-500 ease-in-out opacity-80 hover:opacity-100 focus:opacity-100`}
    >
      <input
        className="SearchInput overflow-hidden h-8 cursor-pointer tracking-tight text-sm text-black dark:text-white bg-transparent border-b border-gray-200 dark:border-gray-800 focus:outline-none dark:focus:border-yellow-500 focus:border-yellow-500 focus:border-transparent"
        type="text"
        placeholder="Search"
        aria-label="Search"
        onChange={e => refine(e.target.value)}
        value={currentRefinement}
        onFocus={onFocus}
        onClick={() => {
          play();
        }}
      />
      <div
        className='w-8 min-w-12 pb-1 font-bold pointer-events-none text-center align-middle'
        style={{ fontSize: '1.8rem', pointerEvents: 'none', lineHeight: '20px'}}
        aria-label="Search notes"
        title="Search notes"
      >
        ⊹
      </div>
    </form>
  )
  }
)
