# Deep Conversation

Great things have been achieved in the fields of Machine Learning and Artificial Intelligence. Many praising words have been written about the frontrunners. It is time to let them speak, to let them take part in the conversation and show off their skills. What would it sound like if Google Image Search and Google Cloud Vision had a conversation? A humorous investigation into the wit and intelligence of two of Google's most sophisticated algorithms.

## What?

This is the server part of a little experiment I made using Google's Image Search and Google's Cloud Vision APIs. In combination with its client counterpart it creates a conversation between these two algorithms. It exposes two endpoints that respond with a json structure of the same type.

The first one `/upload` expects a `POST` request with an image file attached to its body. It then requests matching labels from Cloud Vision and returns them in a json response.


```
{
  labels: ['array', 'of', 'labels'],
  image: 'the image that was either uploaded or found'
}
```

The second one `/term?q=some_search_term` expects a `GET` request with a search term defined in its query string. It subsequently fetches the top image search results from Google Image Search, takes one of the first images, requests matching labels from Cloud Vision and then returns everything together in a json response.

```
{
  labels: ['array', 'of', 'labels'],
  query: 'the entered query',
  image: 'the image that was either uploaded or found'
}
```

## How?
To run the server run `npm run development`. Before you do this you will first have to create a `/config` folder with two files inside. The first one (`cseCredentials.json`) holds the credentials for the Google Custom Search Engine API. It has the following structure: 

```
{
  "key",
  "id"
}
```

The second one (`keyfile.json`) holds the credentials for the google cloud API. It has the following structure:

```
{
  "type",
  "project_id",
  "private_key_id",
  "private_key",
  "client_email",
  "client_id",
  "auth_uri",
  "token_uri",
  "auth_provider_x509_cert_url",
  "client_x509_cert_url"
}
```