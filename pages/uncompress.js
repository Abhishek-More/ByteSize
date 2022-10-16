import { useState } from "react";
import Image from "next/image";
import S3 from 'react-aws-s3'
import AWS from 'aws-sdk'
import axios from 'axios'
import Link from 'next/link'
import { useToast } from '@chakra-ui/react'
import PacmanLoader from "react-spinners/PacmanLoader";

const config = {
  bucketName: 'bytesize',
  dirName: 'texts', 
  region: 'us-east-2',
  accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY,
}

const s3 = new S3(config);

export default function Uncompress() {
  const toast = useToast()
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("")
  const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [template, setTemplate] = useState('res.txt');


  AWS.config.update({
    accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY,
  });


	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
	};

	const handleFileSubmit = () => {
 
    if(!isFilePicked) {
      toast({
        title: 'Invalid Input',
        description: "Please choose a valid text file!",
        status: 'error',
        position : 'bottom-right',
        duration: 3000,
        isClosable: true,
      })

      return
    }

    setLoading(true)
    setLoadingText("Uploading Text to S3")

    s3.uploadFile(selectedFile)
    .then(data => {
      setSelectedFile(null)
      setIsFilePicked(false)
      setLoadingText("Converting Text to Video (this will take a while)")
      let key = data.key
      console.log(key)
      axios({
        method: 'post',
        url: 'http://localhost:5000/text_to_video',
        data: {
          bucketTextKey: key,
        }
      }).then(function (response) {
        key = response.data.bucketReconstructedVideoLocation;
        setLoadingText("Downloading Video File")
        handleDownload(key);
        setLoading(false)
      });
    })
    .catch(err => console.error(err));

	};

    const handleDownload = (filename) => {
      const s3 = new AWS.S3();
  
      const params = {
        Bucket: "bytesize",
        Key: filename,
      };
  
      function downloadBlob(blob, name = `result.txt`) {
        // Convert your blob into a Blob URL (a special url that points to an object in the browser's memory)
        const blobUrl = URL.createObjectURL(blob);
        // Create a link element
        const link = document.createElement('a');
        // Set link's href to point to the Blob URL
        link.href = blobUrl;
        link.download = name;
        // Append link to the body
        document.body.appendChild(link);
        // Dispatch click event on the link
        // This is necessary as link.click() does not work on the latest firefox
        link.dispatchEvent(
          new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window,
          })
        );
  
        // Remove link from body
        document.body.removeChild(link);
      }
  
      s3.getObject(params, (err, data) => {
        if (err) {
          console.log(err, err.stack);
        } else {
          let videoBlob = new Blob([data.Body], {
            type: 'video/mp4',
          });
          downloadBlob(videoBlob, `${template}`);
        }
      });
  }

  return (
    <div className= ''>
      <div className={`${loading ? "absolute" : "hidden"} left-0 right-0 top-0 bottom-0 items-center flex flex-col justify-center z-40`}>
          <PacmanLoader
            color='rgb(49 46 129)'
            loading={loading}
            size={25}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
          <p className="mt-8 text-center">{loadingText}</p>
      </div>
      <div className='flex items-center justify-between py-1 px-10 z-50'>
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
    
    <div className="grid pt-16 place-items-center">
    <div className='box-border h-[700px] w-[1200px] border-8 border-indigo-50 rounded-md justify-center'> 
      <div className={`flex justify-center ${loading ? "blurred" : "unblurred"}`}>
        <div className="text-center">
          <p className="my-8 text-5xl font-poppins font-bold text-indigo-900 pt-6">Upload your text for <span className="">Uncompression</span></p>
          <p className="text-center mb-2 text-xl font-OP mx-12 font-md text-indigo-900">Submit a compressed text file containing your video content.</p>
          <p className="text-center mb-8 text-xl font-OP mx-12 font-md text-indigo-900"> We'll upscale it using ML so you won't miss a thing!</p>
          <div className="flex justify-center mb-8">
            <Image src="/textart1.svg"  height={300} width={300}/>
          </div>
          <div className="flex justify-center space-x-8 items-center">
            <label className="shadow-md hover:shadow border-2 px-8 py-4 bg-indigo-900 rounded-md cursor-pointer font-OP font-lg text-white">
              <input className="hidden" type="file" name="file" accept="text/plain" onChange={changeHandler}/>
              Select Text File
            </label> 
            <div className="">
              {
                isFilePicked ?
                <a onClick={handleFileSubmit} className="shadow-md hover:shadow border-2 px-8 py-4 bg-indigo-900 rounded-md cursor-pointer font-OP text-md text-white">Submit</a>
                :
                <a onClick={handleFileSubmit} className="shadow-md hover:shadow border-2 border-indigo-900 px-8 py-4 rounded-md font-OP text-md">Submit</a>
              }
            </div>
          </div>
          {isFilePicked && <p className="mt-4 font-OP text-violet-400">Currently Selected: {selectedFile.name}</p>}
        </div>
      </div>
    </div>
    </div>
    </div>
  )
}