import React from 'react'

export default function CurrentVideo({ currentVideo, likeVideo }) {
  return (
    <div className="video">
      <div className="embed-responsive embed-responsive-16by9" style={{ maxHeight: '768px' }}>
        <video
          src={`https://ipfs.infura.io/ipfs/${currentVideo?.hash}`}
          controls
        >
        </video>
      </div>
      <h3><b><i>{currentVideo?.title}</i></b></h3>
      <p>{currentVideo.description}</p>
      <button onClick={likeVideo(currentVideo.id)} className='btn btn-success'>Like Video</button>
    </div>
  )
}
