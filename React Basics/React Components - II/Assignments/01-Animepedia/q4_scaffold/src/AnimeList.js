import { Component } from 'react';
import AnimeCard from './AnimeCard';

// Complete the AnimeList Component
class AnimeList extends Component {
  render() {
    const { anime } = this.props;
    return (
      <div className='anime-list'>
        {/* Map the anime list recieved through props and pass the details to the Animecard component*/}
        {anime.map((animeItem, index) => (
          <AnimeCard
            key={index}
            name={animeItem.name}
            image={animeItem.image}
          />
        ))}
      </div>
    );
  }
}

export default AnimeList;
