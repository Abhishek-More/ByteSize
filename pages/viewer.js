import { useState } from "react";
import Link from 'next/link'
import Image from "next/image";
import Script from 'next/script'
import { useToast } from '@chakra-ui/react'

export default function Compress() {
  const toast = useToast()
  const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);
  const [webcam, setWebcam] = useState(false)

	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
	};

  const handleWebcamASCII = () => {
    console.log("AAAA")
    let video = document.getElementById("vid");
    navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then(function (stream) {
            video.srcObject = stream;
            video.play();
        })
        .catch(function (err) {
            console.log("An error occurred! " + err);
        });

    const script = document.createElement("script");
    script.src = "video.js";
    script.type = "text/javascript";
    script.id = "scripty"
    setWebcam(true)
    setTimeout(() => {
        document.body.appendChild(script);
    }, 2000);
  }

  const stopWebcam = () => {
    setWebcam(false)
    let display = document.getElementById("text-display");
    display.innerHTML = ""
    let script = document.getElementById("scripty")
    let video = document.getElementById("vid");
    document.body.removeChild(script)
    const str = video.srcObject;
    str.getVideoTracks().forEach(function (track) {
        track.stop();
    });

  }

	const handleFileSubmit = () => {
  
    if(!isFilePicked || selectedFile.type != "text/plain") {
          toast({
            title: 'Invalid Input',
            description: "Please choose a valid video file!",
            status: 'error',
            position : 'bottom-right',
            duration: 3000,
            isClosable: true,
          })
      return
    }
    
    let data = ""
    const reader = new FileReader()
    console.log('hello')
    reader.onload = async (e) => { 
      data = e.target.result;
      console.log(data);
      let display = document.getElementById("text-display");
      
      
      let arr = splitToSubstrings(data, 7260)
      console.log(arr.length)
      let iter = 0;
      setInterval(() => {
        if(iter >= arr.length) {
          display.innerHTML = ""
          return
        }
        let content = arr[iter];
        display.innerHTML = content;
        iter += 1;
      }, 15)
    }
    reader.readAsText(selectedFile)
    console.log(data)
	};

  function splitToSubstrings(str, n) {
    const arr = [];
  
    for (let index = 0; index < str.length; index += n) {
      arr.push(str.slice(index, index + n));
    }
  
    return arr;
  }

  return (
    <div className= ''>
      <Script src="/opencv.js"></Script>
      <video className="hidden" id="vid" width="640" height="480" autoPlay></video>
      <div className='flex items-center justify-between py-1 px-10'>
        <div className = 'flex items-center'>
          <div className= 'pb-2 pt-1'> 
            <Image
              src="/Logo1.png"
              alt="Picture of the author"
              width={75}
              height={50}
            />
          </div>
          <Link href = "/">
            <button className='text-2xl font-poppins px-1 text-indigo-900'>  <span className="font-bold">Byte</span><span className = "font-light">Size</span></button>
          </Link>  
        </div>
      <a className='text-md font-OP text-pink-900 bg-purple-200 px-6 py-2 rounded-full' href="https://github.com/Abhishek-More/ByteSize">View on Github</a>
    </div>
    <div 
      className = 'h-1 bg-gradient-to-r from-purple-500 to-pink-500'>
    </div>

    <div className="flex justify-between px-32 py-24 unblurred">
        <div className=''>
          <div className="font-poppins font-bold text-indigo-900 pt-12 w-3/4 text-5xl">View Video</div>
          <div className = 'text-xl font-OP font-md text-indigo-900 w-3/4 whitespace-pre-line pt-8'> Upload a compressed text file here to view its contents... </div>
          <div className="flex space-x-8 items-center pt-12 pb-12">
              <label className="shadow-md hover:shadow border-2 px-8 py-4 bg-indigo-900 text-white rounded-md cursor-pointer font-OP text-md flex justify-start">
                <input className="hidden" type="file" name="file" accept="text/plain" onChange={changeHandler}/>
                Select Text File
              </label>
              <div className="">
                {
                  isFilePicked ?
                  <a onClick={handleFileSubmit} className="shadow-md hover:shadow px-8 py-4 border-2 border-indigo-900 bg-indigo-900 rounded-md cursor-pointer font-OP text-md text-white">Submit</a>
                  :
                  <a onClick={handleFileSubmit} className="shadow-md hover:shadow border-2 border-indigo-900 px-8 py-4 rounded-md text-indigo-900">Submit</a>
                }
              </div> 
              
            </div>
            {isFilePicked && <p className="font-OP text-violet-400 pb-12">Currently Selected: {selectedFile.name}</p>}
  
        {!webcam && <a onClick={handleWebcamASCII} className="cursor-pointer border-2 border-indigo-900 px-8 py-4 mt-8 rounded-md text-indigo-900">Enable Webcam</a>}
        {webcam && <a onClick={stopWebcam} className="cursor-pointer border-2 bg-indigo-900 px-8 py-4 mt-8 rounded-md text-white">Disable Webcam</a>}
        <div className="opacity-10 pt-12">
            <Image
            src="/Image.png"
            alt="Picture of the author"
            width={650}
            height={260}
            />
        </div>
    </div>
      <div className='box-border h-[600px] w-[500px] p-4 border-4 border-pink-500 rounded-lg translate-y-6 translate-x-6'>
        <div className="canvas flex flex-shrink-0 pl- mb-8 h-[600px] w-[500px] bg-black rounded-lg -translate-y-12 -translate-x-12">
            <p id="text-display"></p>
        </div> 
        </div>
      </div>          


    </div>


         
  )
}