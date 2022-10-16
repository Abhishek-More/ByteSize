import { useState } from "react";

export default function Viewer() {
  const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);


	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
	};

	const handleSubmission = () => {
    let content = ""
    if(!(isFilePicked && selectedFile.type == 'text/plain')) {
      console.log(".txt file not found")
      return
    }

    console.log("Starting File Reading!");

    var reader = new FileReader();
    reader.onload = function(e) {
      content = reader.result;
    }
    reader.readAsText(selectedFile);    
    console.log(content)
	};

  return (
    <div className="m-8">
      <div className="mb-8">
        <p className="text-2xl">View Video</p>
        <p className="mt-16 text-lg">Upload .txt File Here</p>
      </div>

      <input type="file" name="file" onChange={changeHandler}/>
      <div className="mt-8">
        <a onClick={handleSubmission} className="border-2 border-gray-600 px-4 py-2 rounded-md cursor-pointer">Submit</a>
      </div>

    </div>
  )
}
