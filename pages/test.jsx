import { useState } from "react";
import uploadFile from "./utils/mediaUpload";



export default function TestPage() {

	const [file, setFile] = useState(null);

	async function handleUpload(){
		
		const url = await uploadFile(file)
		console.log(url);
	}

	return (
		<>
			<div className="w-[300px] h-[300px] bg-red-500 mx-auto"></div>
			<div className="w-full h-full flex justify-center items-center">
				<input
					type="file"
					onChange={(e) => {
						setFile(e.target.files[0]);
					}}
				/>
				<button onClick={handleUpload} className="bg-red-900 p-2 text-white rounded-xl">
					Upload
				</button>
			</div>
		</>
	);
}