import React, { useRef } from 'react'

export default function VideoForm({ uploadVideo, captureVideoFile }) {
  const titleRef = useRef()

  function submitForm(event) {
    event.preventDefault()
    uploadVideo(titleRef.value)
  }

  return (
    <form onSubmit={submitForm} >
      &nbsp;
      <input type='file' accept=".mp4, .mkv .ogg .wmv" onChange={captureVideoFile} style={{ width: '250px' }} />
      <div className="form-group mr-sm-2">
        <input
          id="videoTitle"
          type="text"
          ref={titleRef}
          className="form-control-sm"
          placeholder="Title..."
          required />
      </div>
      <button type="submit" className="btn btn-danger btn-block btn-sm">Upload!</button>
      &nbsp;
    </form>
  )
}
