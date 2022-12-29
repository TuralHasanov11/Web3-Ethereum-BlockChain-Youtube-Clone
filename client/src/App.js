import './App.css';
import Navbar from './components/Navbar';
import Main from './components/Main';
import { useEffect, useState } from 'react';
import { FormatTypes, Interface } from 'ethers/lib/utils';
import { ethers, providers } from 'ethers';
import DVideo from './abis/DVideo.json'
import useUpload from "./hooks/useUpload"

const iface = new Interface(DVideo["abi"]);



function App() {


  const [account, setAccount] = useState()
  const [loading, setLoading] = useState()
  const [provider, setProvider] = useState()
  const [videoContract, setvideoContract] = useState()
  const [videos, setVideos] = useState([])
  const [currentVideo, setCurrentVideo] = useState({
    id: null,
    hash: null,
    title: null,
    owner: null
  })

  const videoUploader = useUpload()

  useEffect(() => {
    loadWeb3()

    return () => { }
  }, [])

  useEffect(() => {
    if (provider) {
      loadBlockChainData()
    }

    return () => { }
  }, [provider])

  function loadWeb3() {
    if (window.ethereum) {
      setProvider(new ethers.providers.Web3Provider(window.ethereum))
    } else if (window.web3) {
      setProvider(new providers.Web3Provider(window.web3.currentProvider))
    }
  }

  async function loadBlockChainData() {
    try {
      const signer = provider.getSigner()
      const accounts = await provider?.send("eth_requestAccounts", []);
      setAccount(accounts[0])

      const networkId = await provider.getNetwork()
      const networkData = DVideo.networks["5777"]

      if (networkData) {
        const contract = new ethers.Contract(networkData.address, iface.format(FormatTypes.full), signer)
        setvideoContract(contract)

        const videoCount = await contract.videoCount()

        const _videos = []
        for (let videoId = 1; videoId <= videoCount.toNumber(); videoId++) {
          const video = await contract.images(videoId)
          _videos.push(video)
        }
        setVideos(_videos.sort((a, b) => b.grantAmount - a.grantAmount))
      }
    } catch (error) {
      console.log(error)
    }
  }

  function changeVideo(video) {
    setCurrentVideo(video)
  }

  async function likeVideo(imageId) {
    setLoading(true)
    const transaction = await videoContract.tipImageOwner(imageId.toNumber(), {
      from: account,
    })
    transaction.wait()
    window.location.reload(false);
  }

  return (
    <div className='app'>
      <Navbar
        account={account}
      />
      {loading
        ? <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} className="spinner-grow text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        : <Main
          videos={videos}
          uploadVideo={videoUploader.uploadVideo}
          captureVideoFile={videoUploader.captureVideoFile}
          changeVideo={changeVideo}
          currentVideo={currentVideo}
          likeVideo={likeVideo}
        />
      }
    </div>
  );
}

export default App;
