import { useState } from "react";
import Link from 'next/link'
import Image from "next/image";

export default function Compress() {
  const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);

	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
	};

	const handleFileSubmit = () => {
 
    if(!isFilePicked || selectedFile.type != "text/plain") {
      //TODO: Add an error toast here!
      console.log("Select a text file!")
    }
    
    let data = ""
    const reader = new FileReader()
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
      }, 20)
    };
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
            <button className='text-2xl font-poppins px-1 text-indigo-900'>  <span class="font-bold">Byte</span><span className = "font-light">Size</span></button>
          </Link>  
        </div>
      <a className='text-md font-OP text-pink-900 bg-purple-200 px-6 py-2 rounded-full' href="https://github.com/Abhishek-More/ByteSize">View on Github</a>
    </div>
    <div 
      className = 'h-1 bg-gradient-to-r from-purple-500 to-pink-500'>
    </div>




    <div className="flex justify-between px-40 py-24">
        <div className=''>
          <div className="font-poppins font-bold text-indigo-900 pt-12 w-3/4 text-5xl">View Video</div>
          <div className = 'text-xl font-OP font-md text-indigo-900 w-3/4 whitespace-pre-line pt-8'> Upload a compressed text file here to view it's contents... </div>
          <div className="flex space-x-8 items-center pt-12">
              <label className=" px-8 py-4 bg-indigo-900 text-white rounded-md cursor-pointer font-OP text-md flex justify-start">
                <input className="hidden" type="file" name="file" onChange={changeHandler}/>
                Select Text File
              </label>
              <div className="">
                {
                  isFilePicked ?
                  <a onClick={handleFileSubmit} className="px-8 py-4 border-2 border-indigo-900 bg-indigo-900 rounded-md cursor-pointer font-OP text-md text-white">Submit</a>
                  :
                  <a className="border-2 border-indigo-900 px-8 py-4 rounded-md text-indigo-900">Submit</a>
                }
              </div> 
              
            </div>
            {isFilePicked && <p className="mt-4 font-OP text-violet-400 ">Currently Selected: {selectedFile.name}</p>}
  
    <div className="opacity-10 pt-20">
        <Image
        src="/Image.png"
        alt="Picture of the author"
        width={700}
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