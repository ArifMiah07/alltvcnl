import { useEffect, useState } from 'react';
import axios from 'axios';

const IPTVLN = () => {
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const response = await axios.get('https://iptv-org.github.io/api/streams.json');
        setChannels(response.data);
      } catch (error) {
        console.error('Error fetching channels:', error);
      }
    };

    fetchChannels();
  }, []);

  return (
    <div>
      <h1>IPTV Channels</h1>
      <ul>
        {channels.map((channel, index) => (
          <li key={index}>
            <a href={channel.url} target="_blank" rel="noopener noreferrer">{channel.channel}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IPTVLN;
