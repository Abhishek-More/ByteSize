import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import React from 'react'
import Wave from 'react-wavify'
import Link from 'next/link'

export default function Home() {
  
  return (

    <div>

      <div className='flex items-center justify-between py-1 px-10'>
      <div className = 'flex items-center '>
        <div className= 'pb-2 pt-1'> 
          <Image
        src="/Logo1.png"
        alt="Picture of the author"
        width={75}
        height={50}
        />
        </div>
          <p className='text-2xl font-poppins px-1 text-indigo-900'>  <span class="font-bold">Byte</span><span className = "font-light">Size</span></p>
      </div>
        <a className='text-md font-OP text-pink-900 bg-purple-200 px-6 py-2 rounded-full' href="https://github.com/Abhishek-More/ByteSize">View on Github</a>
      </div>
      <div className = 'h-1 bg-gradient-to-r from-purple-500 to-pink-500'>
      </div>

        <p className='text-[70px] text-center pt-64 font-poppins font-medium text-indigo-900 linear-wipe'>Redefining Video Storage.</p>
        <p className='text-center text-2xl pt-4 font-semibold font-OP text-indigo-900'>ASCII-based video compression</p>
   
      


      <div className= 'flex justify-center space-x-10 pt-24'>
      <Link href="/compress">
        <button className = 'shadow-md hover:shadow border-2 border-indigo-100 rounded-lg w-[250px] h-[75px] font-OP font-semibold text-lg text-indigo-900'>Compress Video</button>
         </Link>
          <Link href="/viewer">
            <button className = 'shadow-md hover:shadow border-2 border-indigo-100 rounded-lg w-[250px] h-[75px] font-OP font-semibold text-lg text-indigo-900'>View Video</button>
          </Link>
      </div>
      
      <div className= 'bottom-0 absolute w-screen translate-y-24 opacity-75'>
        <Wave fill="url(#gradient)">
          <defs>
            <linearGradient id="gradient" gradientTransform="0">
              <stop offset="10%"  stopColor="#a855f7" />
              <stop offset="90%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
        </Wave>
      </div>
      
      
    </div>
  )
}
