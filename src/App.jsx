import { useState, useCallback, useEffect, useRef } from 'react'


function App() {
  const [length, setLenght] = useState(8);
  const [numAllowd, setNumAllowd] = useState(false);
  const [charAllowd, setCharAllowd] = useState(false);
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllowd) {str += "0123456789"}
    if (charAllowd) {str += "()*&^%$#@!~`[];':=-"}
    
    for (let index = 1; index <= length; index++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)

    }
    setPassword(pass)

  }, [length, numAllowd, charAllowd])

  useEffect(() => {
  passwordGenerator()
  },[length,charAllowd,numAllowd])

   let passwordRef = useRef(null)
  const copyFunction = useCallback(() => {
    window.navigator.clipboard.writeText(password)
  },[password])

  return (
    <>
      <div className='h-auto w-auto bg-slate-800 m-20'>
        <div className='flex justify-center pt-5'>
          <input type="text" className=' w-96 h-10 rounded-l-xl pl-5' placeholder='password' value={password}  ref={passwordRef}/>
          <button className='text-white bg-black w-20 rounded-r-xl' onClick={copyFunction}>COPY</button>
        </div>
        <div className='flex gap-4'>
          <input type="range"
            min={5}
            max={100}
            value={length}
            onChange={(e) => { setLenght(e.target.value) }}
          />
          <label> length {length}</label>

          <input type="checkbox"  
          defaultChecked={numAllowd}
          id="numberInput"
           onChange={() => {
            setNumAllowd ((prev) => !prev)
          }} />
          <label htmlFor="numberInput" className='text-white'>NUMBER</label>

          <input type="checkbox"  
          defaultChecked={charAllowd}
          id="charInput"
           onChange={() => {
            setCharAllowd ((prev) => !prev)
          }} />
          <label htmlFor="charInput" className='text-white'>character</label>


        </div>

      </div>

    </>
  )
}

export default App
