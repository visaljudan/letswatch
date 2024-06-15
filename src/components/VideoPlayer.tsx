import React, { useRef, useState, useEffect } from "react";
import {
  FaPlay,
  FaPause,
  FaCog,
  FaExpand,
  FaVolumeUp,
  FaVolumeDown,
  FaForward,
  FaBackward,
  FaTv,
} from "react-icons/fa";
import Video from "../assets/Video.mp4";
import Thumbnail from "../assets/Cover.png";
interface videoProp{
  
} 

const VideoPlayer: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [resolution, setResolution] = useState<string>("720p");
  const [speed, setSpeed] = useState<string>("x1");
  const [subtitle, setSubtitle] = useState<string>("English");
  const [volume, setVolume] = useState<number>(() => {
    const storedVolume = localStorage.getItem("volume");
    return storedVolume !== null ? parseFloat(storedVolume) : 1;
  });
  const [muted, setMuted] = useState<boolean>(() => {
    const storedMuted = localStorage.getItem("muted");
    return storedMuted !== null ? JSON.parse(storedMuted) : false;
  });
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [showControls, setShowControls] = useState<boolean>(true);

  let hideControlsTimeout: NodeJS.Timeout;

  const resetHideControlsTimeout = () => {
    clearTimeout(hideControlsTimeout);
    hideControlsTimeout = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  useEffect(() => {
    localStorage.setItem("volume", volume.toString());
    localStorage.setItem("muted", JSON.stringify(muted));
  }, [volume, muted]);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const updateCurrentTime = () => {
        setCurrentTime(video.currentTime);
      };
      const updateDuration = () => {
        setDuration(video.duration);
      };

      video.addEventListener("timeupdate", updateCurrentTime);
      video.addEventListener("loadedmetadata", updateDuration);

      return () => {
        video.removeEventListener("timeupdate", updateCurrentTime);
        video.removeEventListener("loadedmetadata", updateDuration);
      };
    }
  }, []);

  useEffect(() => {
    const storedCurrentTime = localStorage.getItem("currentTime");
    if (storedCurrentTime !== null && videoRef.current) {
      videoRef.current.currentTime = parseFloat(storedCurrentTime);
      setCurrentTime(parseFloat(storedCurrentTime));
    }
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (video) {
      setIsPlaying((prevState) => {
        if (!prevState) {
          video.play();
        } else {
          video.pause();
          localStorage.setItem("currentTime", video.currentTime.toString());
        }
        return !prevState;
      });
    }
    setShowControls(true);
    resetHideControlsTimeout();
  };

  const toggleSettings = () => {
    setShowSettings((prevState) => !prevState);
    setShowControls(true);
    resetHideControlsTimeout();
  };

  const handleResolutionChange = (value: string) => {
    setResolution(value);
    setShowControls(true);
    resetHideControlsTimeout();
  };

  const handleSpeedChange = (value: string) => {
    setSpeed(value);
    const playbackRate = parseFloat(value.replace("x", ""));
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackRate;
    }
    setShowControls(true);
    resetHideControlsTimeout();
  };

  const handleSubtitleChange = (value: string) => {
    setSubtitle(value);
    setShowControls(true);
    resetHideControlsTimeout();
  };

  const handleFullScreen = () => {
    const elem = document.documentElement as any;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }
    setShowControls(true);
    resetHideControlsTimeout();
  };

  const toggleMute = () => {
    setMuted((prevMuted) => !prevMuted);
    if (!muted) {
      localStorage.setItem("prevVolume", volume.toString());
      setVolume(0);
    } else {
      const prevVolume = localStorage.getItem("prevVolume");
      setVolume(prevVolume !== null ? parseFloat(prevVolume) : 1);
    }
    setShowControls(true);
    resetHideControlsTimeout();
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    setMuted(vol === 0);
    if (videoRef.current) {
      videoRef.current.volume = vol;
    }
    setShowControls(true);
    resetHideControlsTimeout();
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
    setCurrentTime(time);
    localStorage.setItem("currentTime", time.toString());
    setShowControls(true);
    resetHideControlsTimeout();
  };

  const handleForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime += 10;
      setCurrentTime(videoRef.current.currentTime);
      localStorage.setItem(
        "currentTime",
        videoRef.current.currentTime.toString()
      );
    }
    setShowControls(true);
    resetHideControlsTimeout();
  };

  const handleBackward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime -= 10;
      setCurrentTime(videoRef.current.currentTime);
      localStorage.setItem(
        "currentTime",
        videoRef.current.currentTime.toString()
      );
    }
    setShowControls(true);
    resetHideControlsTimeout();
  };

  const handleTogglePiP = () => {
    const video = videoRef.current;
    if (video) {
      if (document.pictureInPictureElement === video) {
        document.exitPictureInPicture();
      } else if (document.pictureInPictureEnabled) {
        video.requestPictureInPicture();
      }
    }
    setShowControls(true);
    resetHideControlsTimeout();
  };

  const handleMouseMove = () => {
    setShowControls(true);
    resetHideControlsTimeout();
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="relative  ">
      <video
        ref={videoRef}
        className="w-full bg-transparent"
        onClick={togglePlay}
        poster={Thumbnail}
        onMouseEnter={handleMouseMove}
        onMouseLeave={resetHideControlsTimeout}
      >
        <source src={Video} type="video/mp4" />
      </video>
      {!isPlaying && (
        <button
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl"
          onClick={togglePlay}
        >
          <FaPlay className="bg-transparent" />
        </button>
      )}
      {showControls && (
        <>
          <div className="absolute bottom-4 left-4 flex items-center justify-center mb-2 bg-transparent">
            <button onClick={togglePlay} className="mr-2">
              {isPlaying ? (
                <FaPause className="bg-transparent" />
              ) : (
                <FaPlay className="bg-transparent" />
              )}
            </button>
            <button
              className="text-xl mx-2 flex items-center justify-center"
              onClick={handleBackward}
            >
              <p className="m-1 bg-transparent">10s</p>
              <FaBackward className="bg-transparent" />
            </button>
            <button
              className="text-xl mx-2 flex items-center justify-center"
              onClick={handleForward}
            >
              <FaForward className="bg-transparent" />
              <p className="m-1 bg-transparent">10s</p>
            </button>
            <div className="group flex bg-transparent">
              <button className="text-2xl mx-2" onClick={toggleMute}>
                {muted ? (
                  <FaVolumeDown className="bg-transparent" />
                ) : (
                  <FaVolumeUp className="bg-transparent" />
                )}
              </button>
              <div className="group-hover:flex hidden rounded w-40 bg-transparent">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-full bg-transparent accent-aprimary"
                />
                <p className="ml-2 bg-transparent">
                  {Math.round(volume * 100)}%
                </p>
              </div>
            </div>
          </div>
          <div className="absolute bottom-4 right-4 flex items-center justify-center mb-4 bg-transparent">
            <button className="text-2xl mx-2" onClick={toggleSettings}>
              <FaCog className="bg-transparent" />
            </button>
            <button className="text-2xl mx-2" onClick={handleTogglePiP}>
              <FaTv className="bg-transparent" />
            </button>
            <button className="text-2xl ml-2" onClick={handleFullScreen}>
              <FaExpand className="bg-transparent" />
            </button>
            {showSettings && (
              <div className="absolute bottom-full right-0 text-black rounded shadow-md p-2 w-64 space-y-3">
                <div className="flex my-1 justify-between">
                  <p>Video Resolution:</p>
                  <select
                    className="text-red px-4"
                    value={resolution}
                    onChange={(e) => handleResolutionChange(e.target.value)}
                  >
                    <option value="420p">420p</option>
                    <option value="720p">720p</option>
                    <option value="1080p">1080p</option>
                  </select>
                </div>
                <div className="flex my-1 justify-between">
                  <p>Video Speed:</p>
                  <select
                    className="text-red px-4"
                    value={speed}
                    onChange={(e) => handleSpeedChange(e.target.value)}
                  >
                    <option value="x0.5">0.5x</option>
                    <option value="x1">1x</option>
                    <option value="x1.25">1.25x</option>
                    <option value="x1.5">1.5x</option>
                    <option value="x1.75">1.75x</option>
                    <option value="x2">2x</option>
                  </select>
                </div>
                <div className="flex my-1 justify-between">
                  <p>Video Subtitle:</p>
                  <select
                    className="text-red px-4"
                    value={subtitle}
                    onChange={(e) => handleSubtitleChange(e.target.value)}
                  >
                    <option value="English">English</option>
                    <option value="Khemr">Khemr</option>
                  </select>
                </div>
              </div>
            )}
          </div>
          <div className="absolute bottom-0 bg-transparent w-full flex items-center justify-between rounded px-4">
            {formatTime(currentTime)} / {formatTime(duration)}
            <input
              type="range"
              min={0}
              max={duration || 100} // Set max to 100 if duration is not available yet
              value={currentTime}
              onChange={handleSliderChange}
              className="w-11/12 accent-aprimary"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default VideoPlayer;
