import React, { Component } from "react";
import { Image, Col, Row, Spinner } from "react-bootstrap";
import "./MainCss.css";
import { connect } from "react-redux";
import { fetchArtistInfos, selectSongThunk } from "../utilitis";

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  fetchArtist: (id) => dispatch(fetchArtistInfos(id)),
  selectSong: (id) => dispatch(selectSongThunk(id)),
});

class ArtistDetails extends Component {
  componentDidMount = async () => {
    this.props.fetchArtist(this.props.match.params.id);
  };
  render() {
    return (
      <>
        {this.props.artistInfo && console.log(this.props.artistInfo)}
        {this.props.artistInfo && (
          <Col md={10} className='col-10 gray-bg'>
            <Row className='row row-cols-xs-1'>
              <div
                id='content'
                className='col-12 col-md-4 d-flex justify-content-end'
              >
                <div id='artist' className='card mt-5'>
                  <Image
                    src={this.props.artistInfo.artist.picture_xl}
                    style={{ height: "250px" }}
                  />
                  <p></p>
                  <h4 id='label1'>
                    {this.props.artistInfo.artist.name} - Top 50
                  </h4>
                  <button type='button' className='btn'>
                    PLAY
                  </button>
                  <label id='label2'></label>
                </div>
              </div>
              <div id='songs' className='col'>
                <div className='card'>
                  {this.props.artistInfo &&
                    this.props.artistInfo.topSongs.data.map((song, i) => (
                      <div
                        key={i}
                        className={
                          this.props.selectedSong &&
                          this.props.selectedSong[0].id === song.id
                            ? "selected"
                            : ""
                        }
                        onClick={() => this.props.selectSong(song.id)}
                      >
                        <div className='d-flex justify-content-between'>
                          <p>
                            <i className='fa fa-music pr-3'></i>
                            {song.title}
                          </p>
                          <p>{song.duration / 100}</p>
                        </div>
                        <div className='text-left'>
                          <p>{song.artist.name}</p>
                        </div>
                        <p className='songNr'>{i}</p>
                      </div>
                    ))}
                </div>
              </div>
            </Row>
          </Col>
        )}
        {this.props.loading.artistInfo && (
          <Col md={10} style={{ height: "90vh" }} className='col-10 gray-bg'>
            {console.log(this.props)}
            <Row className='row row-cols-xs-1'>
              <div
                id='content'
                className='col-12 col-md-4 d-flex justify-content-end'
              >
                <Spinner
                  className='align-self-center'
                  animation='border'
                  variant='light'
                />
              </div>
              <div id='songs' className='col pt-5'>
                <Spinner
                  className='align-self-center'
                  animation='border'
                  variant='light'
                />
              </div>
            </Row>
          </Col>
        )}
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArtistDetails);
