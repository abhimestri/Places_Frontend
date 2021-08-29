import React, { useRef, useState, useEffect } from 'react'

import Button from './Button'
import './ImageUpload.css'

const ImageUpload = (props ) => {
    const [file, setFile] = useState()
    const [prevUrl, setPrevUrl] = useState()
    const [isValid, setIsValid] = useState()
    const filePickerRef = useRef()

    useEffect(() => {
        if(!file){
            return
        }
        const fileReader = new FileReader()
        fileReader.onload = () => {
            setPrevUrl(fileReader.result)
        }
        fileReader.readAsDataURL(file)
    }, [file])

    const pickedHandler = (event) => {
        let pickedFiles;
        let fileIsValid = isValid;
        if(event.target.files && event.target.files.length === 1){
            pickedFiles = event.target.files[0]
            setFile(pickedFiles)
            setIsValid(true)
            fileIsValid = true
        }else{
            setIsValid(false)
            fileIsValid = false
        }
        props.onInput(props.id, pickedFiles, fileIsValid)
    }

    const pickImageHandler = () => {
        filePickerRef.current.click()
    }

    return (
        <div className="form-control">
            <input ref={filePickerRef} onChange={pickedHandler} if={props.id} type="file" style={{ display : "none" }} accept=".jpeg, .png, .jpg" />
            <div className={`image-upload ${props.center && 'center'}`}>
                <div className="image-upload__preview">
                    {prevUrl && <img src={prevUrl} alt="Preview " />}
                    {!prevUrl && <p>Please pick an image</p>}
                </div>
                <Button type="button" onClick={pickImageHandler}>PICK IMAGE</Button>
            </div>
            {!isValid && <p>{props.errorText}</p>}
        </div>
    )
}

export default ImageUpload