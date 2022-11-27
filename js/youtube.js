const API_KEY = "AIzaSyDtGctIZbOpdJzjGu9wdtDkgiqb14KPu00";

let currentVideos = [];

const getVideos = async (query) => {
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${API_KEY}&type=video&q=${query}`
  );
  const data = await res.json();
  const videosData = [];
  data.items.forEach((item) => {
    videosData.push({
      title: item.snippet.title,
      id: item.id.videoId,
    });
  });
  return videosData;
};

const handlePlayCommand = async (params) => {
  if (params.length < 1) return "syntax error";
  let query = params[0];
  const videos = await getVideos(query);
  currentVideos = videos;
  let queryOutput = "Press (1 - 5) to select any one of the following: <br/>";
  videos.forEach((video, id) => {
    queryOutput += `${id + 1}. ${video.title} <br/>`;
  });
  // TODO : set mode to accept only 1 - 5 and deal with that
  return queryOutput;
};

const handleEmbedVideo = (value) => {
  console.log("tmkc");
  if (currentVideos.length) {
    const index = parseInt(value) - 1;
    if (index >= 0 && index < 5) {
      const chosenSong = currentVideos[index];
      const youtubePlayer = document.getElementById("youtube-player");
      youtubePlayer.src = `https://www.youtube.com/embed/${chosenSong.id}?autoplay=1`;
      document.dispatchEvent(
        new KeyboardEvent("keydown", {
          key: "s",
          keyCode: 83,
          code: "KeyS",
          which: 83,
        })
      );
      currentVideos = [];
      return `Now Playing ${chosenSong.title}...`;
    }
  } else {
    return "Please search a video to play first...";
  }
};
