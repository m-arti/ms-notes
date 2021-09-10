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
      className={`${className} text-black dark:text-white transition duration-500 ease-in-out opacity-80 hover:opacity-100 focus:opacity-100`}
      onClick={() => {
        play();
        document.myform.submit();
      }}
    >
      <input
        className="SearchInput cursor-pointer tracking-tight text-sm text-black dark:text-white bg-transparent border-b border-gray-200 dark:border-gray-800 focus:outline-none dark:focus:border-yellow-500 focus:border-yellow-500 focus:border-transparent"
        type="text"
        placeholder="Search"
        aria-label="Search"
        onChange={e => refine(e.target.value)}
        value={currentRefinement}
        onFocus={onFocus}
      />
      <div
        className='pt-0 pb-0 font-bold align-middle'
        style={{ fontSize: '1.75rem', minWidth:'35px',  textAlign: 'center', pointerEvents: 'none', lineHeight: '20px'}}
        aria-label="Search notes"
        title="Search notes"
      >
        ⊹
      </div>
    </form>
  )
  }
)
