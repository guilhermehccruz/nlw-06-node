import express from 'express';

const app = express();

app.get('/test', (request, response) => {
	return response.send('NLW método get');
});

app.post('/test-post', (request, response) => {
	return response.send('NLW método post');
});

app.listen(3000, () => console.log('Server is running at port 3000'));
