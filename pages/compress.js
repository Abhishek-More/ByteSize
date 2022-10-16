import { useState } from "react";
import Image from "next/image";
import S3 from 'react-aws-s3'
import axios from 'axios'


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
    <div className="m-8">
      <div className="mb-8">
        <p className="text-2xl">Compress Video</p>
      </div>

      <div className="flex justify-center">
        <div className="text-center">
          <p className="my-8 text-4xl font-bold">Upload your video for compression</p>
          <p className="mb-8 text-xl font-md">Submit any video and get a compressed text file containing your video content.</p>
          <div className="flex justify-center mb-8">
            <Image src="/videoart.svg"  height={300} width={300}/>
          </div>
          <div className="flex justify-center space-x-8 items-center">
            <label className=" px-8 py-4 bg-[#58CF86] rounded-md cursor-pointer">
              <input className="hidden" type="file" name="file" onChange={changeHandler}/>
              Select Video File
            </label>
            <div className="">
              {
                isFilePicked ?
                <a onClick={handleFileSubmit} className="px-8 py-4 border-2 border-[#58CF86] bg-[#58CF86] rounded-md cursor-pointer">Submit</a>
                :
                <a className="border-2 border-gray-600 px-8 py-4 rounded-md">Submit</a>
              }
            </div>
          </div>
          {isFilePicked && <p className="mt-4">Currently Selected: {selectedFile.name}</p>}
        </div>
      </div>

    </div>
  )
}