import { useState } from "react";

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
    <div className="m-8">

      <div className="flex justify-center">
        <div className="text-center">
          <div className="flex justify-center mb-8 h-[600px] w-[550px] bg-black rounded-lg">
            <p id="text-display"></p>
          </div>
          <div className="flex justify-center space-x-8 items-center">
            <label className=" px-8 py-4 bg-[#58CF86] rounded-md cursor-pointer">
              <input className="hidden" type="file" name="file" onChange={changeHandler}/>
              Select Text File
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