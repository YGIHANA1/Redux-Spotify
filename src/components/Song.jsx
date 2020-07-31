import React from "react";
import { connect } from "react-redux";

const mapStateToProps = (state) => state;

function Song(props) {
  return (
    <div
      onClick={() => props.selectSong(props.song.id)}
      className={
        props.selectedSong && props.selectedSong[0].id === props.song.id
          ? "selected"
          : ""
      }
      key={props.song.id}
    >
      <div className='d-flex justify-content-between'>
        <p>
          <i className='fa fa-music pr-3'></i>
          {props.song.title}
        </p>
        <p>{props.song.duration / 100}</p>
      </div>
      <div className='text-left'>
        <p>{props.song.artist.name}</p>
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(Song);
