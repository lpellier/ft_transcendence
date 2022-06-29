import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import {useState} from 'react'
import axios from 'axios'


export default function UploadButtons() {
	const [selectedFile, setSelectedFile] = useState<any>();
	const [isSelected, setisSelected] = useState(false);

	const changeHandler = (event: any) => {
		setSelectedFile(event.target.files[0]);
		setisSelected(true);
	};

	const handleSubmit = () => {

		axios.put("http://127.0.0.1:3001/users/upload-avatar",
		selectedFile,
		{
			withCredentials: true,
		})
		.then(res => {
			console.log("Put avatar request failed")
		})
		.catch(err => {
			console.log("Put avatar request failed : ", err)
		})
	};
	
	return (
			<div>
				<input type="file" name="file" onChange={changeHandler} />
				{isSelected ? (
				<div>
					<p>Filename: {selectedFile.name}</p>
					<p>Filetype: {selectedFile.type}</p>
					<p>Size in bytes: {selectedFile.size}</p>
				</div>
				) : (
				<p>Select a file to show details</p>
				)}
				<div>
					<button onClick={handleSubmit}>Submit</button>
				</div>
			</div>
  	);
}
