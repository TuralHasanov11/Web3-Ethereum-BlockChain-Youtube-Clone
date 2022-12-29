import React, { useRef } from 'react'
import VideoCard from './VideoCard'
import VideoForm from './VideoForm'
import CurrentVideo from './CurrentVideo'

export default function Main({ changeVideo, captureVideoFile, likeVideo, videos, currentVideo, uploadVideo }) {



  return (
    <div className="container-fluid text-monospace">
      <br></br>
      &nbsp;
      <br></br>
      <div className="row">
        <div className="col-md-10">
          <CurrentVideo currentVideo={currentVideo} likeVideo={likeVideo} />
        </div>
        <div className="col-md-2 border border-danger overflow-auto text-center" style={{ maxHeight: '768px', minWidth: '175px' }}>
          <h4>Post a video</h4>
          <VideoForm uploadVideo={uploadVideo} captureVideoFile={captureVideoFile} />
          {videos.map((video, key) => {
            return (
              <VideoCard key={key} video={video} changeVideo={changeVideo} />
            )
          })}
        </div>
      </div>
    </div>
  )
}
