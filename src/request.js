class ServerAnsver {
    constructor() {
      this.videosIds = '';
      this.videoStatics = [];
      this.infForDOM = [];
      this.nextPageToken = '';
      this.countnerRequest = 0;
    }
  
    getVideoId(request) {
      this.videosIds = '';
      this.videoStatics = [];
      this.infForDOM = [];
      this.nextPageToken = '';
      this.countnerRequest = 0;
  
      const self = this;
      const arr = [];
      const xhr = new XMLHttpRequest();
      xhr.open('GET', 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyDO74eDUPRjBCW_nX9leDLavR0_21rwHVA&type=video&&part=snippet&maxResults=12&pageToken=' + self.nextPageToken + '&q=' + request, false);
      xhr.send();
      const res = JSON.parse(xhr.responseText);
      this.nextPageToken = res.nextPageToken;
      for (let i = 0; i !== 12; i += 1) {
        arr.push(res.items[i].id.videoId);
        this.infForDOM[i] = {};
        const obj = res.items[i].snippet;
        this.infForDOM[i].dateCreate = obj.publishedAt.substring(0, 10);
        this.infForDOM[i].channel = obj.channelTitle;
        this.infForDOM[i].title = obj.title;
        if (obj.description.length < 100) {
          this.infForDOM[i].description = obj.description;
        } else {
          this.infForDOM[i].description = obj.description.substring(0, 100) + '...';
        }
        this.infForDOM[i].picture = obj.thumbnails.medium.url;
        this.infForDOM[i].videoId = res.items[i].id.videoId;
      }
      this.videosIds = arr.join();
      this.getVideoInf();
    }
  
    getVideoInf() {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', 'https://www.googleapis.com/youtube/v3/videos?key=AIzaSyDO74eDUPRjBCW_nX9leDLavR0_21rwHVA&id=' +this.videosIds + '&part=statistics', false);
      xhr.send();
      const res = JSON.parse(xhr.responseText);
      this.videoInf = res.items;
      for (let i = 0; i !== 12; i += 1) {
        const obj = res.items[i].statistics;
        this.infForDOM[i].view = obj.viewCount;
        this.infForDOM[i].like = obj.likeCount;
        this.infForDOM[i].dislike = obj.dislikeCount;
      }
      this.countnerRequest = this.countnerRequest + 1;
    }
  }
  
  export default ServerAnsver;
  