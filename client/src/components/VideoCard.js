import React from 'react'

export default function VideoCard({ video, changeVideo }) {
  return (
    <div className="card mb-4 text-center bg-secondary mx-auto" style={{ width: '175px' }}>
      <div className="card-title bg-dark">
        <small className="text-white"><b>{video.title}</b></small>
      </div>
      <div>
        <p onClick={() => changeVideo(video.hash, video.title)}>
          <video
            src={`https://ipfs.infura.io/ipfs/${video.hash}`}
            style={{ width: '150px' }}
          />
        </p>
      </div>
    </div>
  )
}
