import { useState } from "react";
import Image from "next/image";
import S3 from 'react-aws-s3'
import axios from 'axios'
import Link from 'next/link'


const config = {
  bucketName: 'bytesize',
  dirName: 'videos', 
  region: 'us-east-2',
  accessKeyId: 'AKIA4PDABZIF3WRI5P5G',
  secretAccessKey: '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',
}

const s3 = new S3(config);

export default function Compress() {
  const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);
  const [submitted, setSubmitted] = useState(false);

	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
	};

	const handleFileSubmit = () => {
 
    if(!isFilePicked) {
      console.log("Select a File")
    }

    let key = ""

    s3.uploadFile(selectedFile)
    .then(data => {
      setSelectedFile(null)
      
    })
    .catch(err => console.error(err));

	};

  return (
    <div className= ''>
      <div className='flex items-center justify-between py-2 px-10'>
      <div className = 'flex items-center'>
          <Image
            src="/Logo.png"
            alt="Picture of the author"
            width={60}
            height={60}
          />
          <Link href = "/">
          <button className='text-2xl font-poppins px-1 text-indigo-900'>  <span class="font-bold">Byte</span><span className = "font-light">Size</span></button>
          </Link>  
      </div>
      <a className='text-lg font-OP text-indigo-900 bg-pink-200 px-6 py-2 rounded-full' href="https://github.com/Abhishek-More/ByteSize">View on Github</a>
    </div>

      <div 
        className = 'h-1 bg-gradient-to-r from-purple-500 to-pink-500'>
      </div>

      <div className="flex justify-center">
        <div className="text-center">
          <p className="my-8 text-5xl font-poppins font-bold pt-12 text-indigo-900 pt-24">Upload your video for compression</p>
          <p className="mb-8 text-xl font-OP font-md text-indigo-900">Submit any video and get a compressed text file containing your video content.</p>
          <div className="flex justify-center mb-8">
            <Image src="/videoart3.svg"  height={300} width={300}/>
          </div>
          <div className="flex justify-center space-x-8 items-center">
            <label className=" px-8 py-4 bg-indigo-900 rounded-md cursor-pointer font-OP font-lg text-white">
              <input className="hidden" type="file" name="file" onChange={changeHandler}/>
              Select Video File
            </label> 
            <div className="">
              {
                isFilePicked ?
                <a onClick={handleFileSubmit} className="px-8 py-4  bg-indigo-900 rounded-md cursor-pointer font-OP text-md text-white">Submit</a>
                :
                <a className="border-2 border-indigo-900 px-8 py-4 rounded-md font-OP text-md">Submit</a>
              }
            </div>
          </div>
          {isFilePicked && <p className="mt-4 font-OP text-violet-400">Currently Selected: {selectedFile.name}</p>}
        </div>
      </div>


    </div>
  )
}