Great things have been achieved in the fields of Machine Learning and the like. Many praising things have been written about the pioneers. It is time to let them speak, take part in the conversation and show off their skills. This is a conversation between two of the most advanced 

[image search api]
https://www.drupal.org/files/images/view_1.png&imgrefurl=https%3A//www.drupal.org/project/search_api&docid=S-1O7rheRJb4yM&tbnid=5eN6TBjP4Y5n7M%3A&vet=10ahUKEwjc-KTNlr7TAhWLORQKHc9HCPoQMwgjKAAwAA..i&w=1024&h=608&safe=off&bih=949&biw=1680&q=image%20search%20api&ved=0ahUKEwjc-KTNlr7TAhWLORQKHc9HCPoQMwgjKAAwAA&iact=mrc&uact=8


Every request to either `/term` or `/upload` returns an object:

```
{
  labels: ['array', 'of', 'labels'],
  query: 'the entered query or the label that gets selected',
  image: 'the image that was either uploaded or found'
}
```