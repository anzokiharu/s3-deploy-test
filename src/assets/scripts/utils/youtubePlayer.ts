const tag = document.createElement('script');
tag.src = 'https://www.youtube.com/iframe_api';
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
class YouTubeIframeAPI {
  private static playerFuncs: (() => void)[] = [];
  private static players: YoutubePlayer[] = [];

  static addPlayerFunc(func: () => void) {
    YouTubeIframeAPI.playerFuncs.push(func);
  }

  static addPlayer(player: YoutubePlayer) {
    YouTubeIframeAPI.players.push(player);
  }

  static pauseAllPlayers(exceptPlayer?: YoutubePlayer) {
    YouTubeIframeAPI.players.forEach((player) => {
      if (player !== exceptPlayer) {
        player.pauseVideo();
      }
    });
  }

  static onYouTubeIframeAPIReady = () => {
    YouTubeIframeAPI.playerFuncs.forEach((func) => func());
  };
}

export class YoutubePlayer {
  el: HTMLElement;
  link: string;
  player: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  autoPlay: boolean;

  constructor(el: HTMLElement, option: { id: string; autoPlay?: boolean }) {
    this.el = el;
    this.link = option.id;
    this.autoPlay = option.autoPlay || false;

    /* eslint-disable @typescript-eslint/no-explicit-any */
    // YouTubeIframeAPIにプレイヤーの初期化関数を追加
    YouTubeIframeAPI.addPlayerFunc(() => {
      this.player = new (window as any).YT.Player(this.el, {
        height: '100%',
        width: '100%',
        videoId: this.link,
        playerVars: {
          autoplay: this.autoPlay ? 1 : 0,
          modestbranding: 1,
          rel: 0,
        },
        events: {
          onStateChange: this.onPlayerStateChange.bind(this),
        },
      });
    });

    // プレイヤーを管理リストに追加
    YouTubeIframeAPI.addPlayer(this);

    // onYouTubeIframeAPIReadyが呼ばれるのを保証するために設定
    (window as any).onYouTubeIframeAPIReady = YouTubeIframeAPI.onYouTubeIframeAPIReady;
    /* eslint-enable @typescript-eslint/no-explicit-any */
  }

  changeVideo(link: string) {
    this.link = link;
    this.player.loadVideoById(link);
  }

  pauseVideo() {
    this.player.pauseVideo();
  }

  pauseAllVideo() {
    YouTubeIframeAPI.pauseAllPlayers();
  }

  playVideo() {
    YouTubeIframeAPI.pauseAllPlayers(this);
    this.player.playVideo();
  }
  /* eslint-disable @typescript-eslint/no-explicit-any */
  private onPlayerStateChange(event: any) {
    if (event.data === (window as any).YT.PlayerState.PLAYING) {
      YouTubeIframeAPI.pauseAllPlayers(this);
    }
  }
  /* eslint-enable @typescript-eslint/no-explicit-any */
}
