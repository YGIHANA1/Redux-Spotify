import React from "react";
import "./MainCss.css";
import { InputGroup, Button, Image } from "react-bootstrap";
import { connect } from "react-redux";
import { selectSongThunk } from "../utilitis";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  selectSong: (id) => dispatch(selectSongThunk(id)),
  togglePlay: () =>
    dispatch({
      type: "TOGGLE_PLAY",
    }),
  likeSong: (id) =>
    dispatch({
      type: "LIKE_SONG",
      payload: id,
    }),
});
class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  playButton = () => {
    if (this.props.playing) {
      this.myRef.current.pause();
      this.props.togglePlay();
    } else {
      this.myRef.current.play();
      this.props.togglePlay();
    }
  };

  playNext = () => {
    const findIndex = this.props.tracksList.indexOf(this.props.selectedSong[0]);
    if (findIndex !== this.props.tracksList.length - 1) {
      const findNext = this.props.tracksList.slice(
        findIndex + 1,
        findIndex + 2
      );

      const findId = this.props.tracksList.find(
        (track) => track.preview === findNext[0].preview
      );

      this.props.selectSong(findId.id);
    }
  };
  playPrevious = () => {
    const findIndex = this.props.tracksList.indexOf(this.props.selectedSong[0]);
    if (findIndex !== 0) {
      const findNext = this.props.tracksList.slice(findIndex - 1, findIndex);
      const findId = this.props.tracksList.find(
        (track) => track.preview === findNext[0].preview
      );

      this.props.selectSong(findId.id);
    }
  };
  render() {
    return (
      <footer>
        <div
          style={{ display: "flex", justifyContent: "space-between" }}
          className='row light-gray-bg'
        >
          <div className='col-3 d-flex p-2 pl-2 align-center footer_hide'>
            <Image src='/assets/avatar.png' width='45px' height='45px' />
            <div className='pb-0 mb-0'>
              <p id='songTitle' className='pl-3 p-0 m-0'>
                {this.props.selectedSong && this.props.selectedSong[0].title}
              </p>
              <label id='artistName' className='pl-3 '>
                {this.props.selectedSong &&
                  this.props.selectedSong[0].artist.name}
              </label>
            </div>
            {this.props.likedSongs &&
            this.props.likedSongs.indexOf(
              this.props.selectedSong && this.props.selectedSong[0].id
            ) !== -1 ? (
              <AiFillHeart
                onClick={() =>
                  this.props.likeSong(this.props.selectedSong[0].id)
                }
                style={{
                  fontSize: "25px",
                  marginTop: "5px",
                  marginLeft: "5px",
                }}
              />
            ) : (
              <AiOutlineHeart
                onClick={
                  this.props.selectedSong !== null
                    ? () => this.props.likeSong(this.props.selectedSong[0].id)
                    : () => {}
                }
                style={{
                  fontSize: "25px",
                  marginTop: "5px",
                  marginLeft: "5px",
                }}
              />
            )}
            <i className='fa fa-window-maximize ml-3 pt-3'></i>
          </div>
          <div className='col p-1'>
            <div className='row-1'>
              <div
                id='icons'
                className='col d-flex justify-content-center align-center'
              >
                <Button>
                  <i className='fa fa-random pr-2 pt-1'></i>
                </Button>
                <Button id='playBack' onClick={this.playPrevious}>
                  <i className='fa fa-step-backward pr-2 pt-1'></i>
                </Button>

                <Button id='play' onClick={this.playButton}>
                  <audio
                    id='audio'
                    ref={this.myRef}
                    autoPlay='true'
                    src={
                      this.props.selectedSong &&
                      this.props.selectedSong[0].preview
                    }
                  ></audio>
                  <i className='fa fa-play-circle pr-2'></i>
                </Button>
                <Button id='playNext' onClick={this.playNext}>
                  <i className='fa fa-step-forward pr-2 pt-1'></i>
                </Button>
                <Button id='loop'>
                  <i className='fa fa-retweet pt-1'></i>
                </Button>
              </div>
              <div className='col d-flex footer_hide'>
                <label id='currentSongTime'>0:00</label>
                <div className='progress'>
                  <div
                    className='progress-bar'
                    role='progressbar'
                    aria-valuenow='25'
                    aria-valuemin='0'
                    aria-valuemax='100'
                  ></div>
                </div>
                <label id='songLength'>2:54</label>
              </div>
            </div>
          </div>
          <div className='col-3 d-flex p-2 pl-2 justify-content-end align-center footer_hide'>
            <Button>
              <i className='fa fa-bars ml-3 pt-3'></i>
            </Button>
            <Button>
              <i className='fa fa-headphones ml-3 pt-3'></i>
            </Button>
            <Button id='volumeIcon'>
              <i className='fa fa-volume-up ml-3 pt-3'></i>
            </Button>
          </div>
        </div>
      </footer>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
