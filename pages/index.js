import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'



export default function Home() {
  
  return (

    <div>
      
      <div className='flex justify-between py-10 px-24'>
        <p className='text-3xl font-poppin'>ByteSize</p>
        <button className='text-lg font-barlow'>View on Github</button>
      </div>

      <div>
        <p className='text-7xl text-center pt-64 whitespace-pre font-poppin font-medium'>Redefining Video Storage.</p>
      </div>
      
      <div>
        <p className='text-center pt-8 pb-12 first-letter text-2xl font-semibold font-barlow'>ACSII-based video compression</p>
      </div>
      
      <div className= 'flex justify-center space-x-10'>
        <button className = 'border-4 rounded-lg w-[250px] h-[75px] font-barlow font-semibold text-lg'>Compress Video</button>
         <button className = 'border-4 rounded-lg w-[250px] h-[75px] font-barlow font-semibold text-lg'>View Video</button>
      </div>
      
    </div>
  )
}
