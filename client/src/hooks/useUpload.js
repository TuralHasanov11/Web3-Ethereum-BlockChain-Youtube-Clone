import React, { useState } from 'react'
import { Buffer as Buff } from 'buffer';
import { ipfs } from './ipfs';

export default function useUpload({ videoContract, account, setLoading }) {

  const [buffer, setBuffer] = useState()


  function captureVideoFile(event) {
    event.preventDefault()
    const file = event.target.files[0]
    const reader = new FileReader()
    // Preprocess the file to upload to the IPFS
    reader.readAsArrayBuffer(file)
    reader.onload = () => {
      const buff = Buff(reader.result)
      setBuffer(buff)
    }
  }

  async function uploadVideo(title) {
    setLoading(true)
    try {
      const result = await ipfs.add(buffer)
      const transaction = await videoContract.uploadVideo(result.path, title, {
        from: account
      })
      transaction.wait()
      return transaction
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return { captureVideoFile, uploadVideo }
}
