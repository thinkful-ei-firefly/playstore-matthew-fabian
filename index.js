const express = require('express');
const playStoreData = require('./playstore');

const app = express();

app.get('/apps', (req, res) =>{
  let {sort, genres} = req.query;
  const validSort = ['rating', 'app'];
  const validGenre = ['action', 'puzzle', 'strategy', 'casual', 'arcade', 'card'];

  if (!validSort.includes(sort.toLowerCase())){
    return res.status(400).json({error: "Sort should be one of: " + validSort.join(', ')});
  }
  if (!validGenre.includes(genres.toLowerCase())){
    return res.status(400).json({error: "Genres should be one of: " + validGenre.join(', ')});
  }

  let filteredData = [...playStoreData];

  if (genres){
    filteredData = filteredData.filter(data => data.Genres.toLowerCase().includes(genres.toLowerCase()));
  }

  res.json(filteredData);
})

app.listen(8080, () => console.log('Server running..'));
