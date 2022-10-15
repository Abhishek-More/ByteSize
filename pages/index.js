import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div>
      <p className='text-3xl text-center'>Hello World!</p>
      <p className='text-sm text-center'>Goodbye World!</p>
      <button>Hello</button>
    </div>
  )
}
