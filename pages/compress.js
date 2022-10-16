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
  dirName: 'videos', 
  region: 'us-east-2',
  accessKeyId: 'AKIA4PDABZIF3WRI5P5G',
  secretAccessKey: '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',
}

const s3 = new S3(config);

export default function Compress() {
  const toast = useToast()
  let [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [template, setTemplate] = useState('res.txt');


  AWS.config.update({
    accessKeyId: 'AKIA4PDABZIF3WRI5P5G',
    secretAccessKey: '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',
  });


	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
	};

	const handleFileSubmit = () => {
 
    if(!isFilePicked) {
      console.log("AAA")
      toast({
        title: 'Invalid Input',
        description: "Please choose a valid video file!",
        status: 'error',
        position : 'bottom-right',
        duration: 3000,
        isClosable: true,
      })
    }

    setLoading(true)

    s3.uploadFile(selectedFile)
    .then(data => {
      setSelectedFile(null)
      setIsFilePicked(false)
      let key = data.key
      console.log(key)

      setLoading(false)
      toast({
        title: 'Success uploading video!',
        status: 'success',
        position : 'bottom-right',
        duration: 3000,
        isClosable: true,
      })
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
          let csvBlob = new Blob([data.Body.toString()], {
            type: 'text/plain',
          });
          downloadBlob(csvBlob, `${template}`);
        }
      });
  }

  return (
    <div className= ''>
      <div className={`${loading ? "absolute" : "hidden"} left-0 right-0 top-0 bottom-0 items-center flex justify-center z-50`}>
        <PacmanLoader
          color='rgb(49 46 129)'
          loading={loading}
          size={25}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
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

      <div className={`flex justify-center ${loading ? "blur-sm" : ""}`}>
        <div className="text-center">
          <p className="my-8 text-5xl font-poppins font-bold text-indigo-900 pt-24">Upload your video for compression</p>
          <p className="mb-8 text-xl font-OP font-md text-indigo-900">Submit any video and get a compressed text file containing your video content.</p>
          <div className="flex justify-center mb-8">
            <Image src="/videoart3.svg"  height={300} width={300}/>
          </div>
          <div className="flex justify-center space-x-8 items-center">
            <label className=" px-8 py-4 bg-indigo-900 rounded-md cursor-pointer font-OP font-lg text-white">
              <input className="hidden" type="file" name="file" accept="video/*" onChange={changeHandler}/>
              Select Video File
            </label> 
            <div className="">
              {
                isFilePicked ?
                <a onClick={handleFileSubmit} className="px-8 py-4 bg-indigo-900 rounded-md cursor-pointer font-OP text-md text-white">Submit</a>
                :
                <a onClick={handleFileSubmit} className="border-2 border-indigo-900 px-8 py-4 rounded-md font-OP text-md">Submit</a>
              }
            </div>
          </div>
          {isFilePicked && <p className="mt-4 font-OP text-violet-400">Currently Selected: {selectedFile.name}</p>}
        </div>
      </div>
    </div>
  )
}