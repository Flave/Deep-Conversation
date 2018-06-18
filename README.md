Great things have been achieved in the fields of Machine Learning and the like. Many praising things have been written about the pioneers. It is time to let them speak, take part in the conversation and show off their skills. This is a conversation between two of the most advanced.

## Deployment

Production server runs on `https://smartiez.uber.space/server`. To deploy on uberspace simply push to remote `production`. This pushes to the bare repo in `/home/smartiez/smartiez.git` which subsequently checks out the master branch to `/home/smartiez/smartiez` and restarts the daemon that keeps the server running. If npm modules have been installed, npm install needs to be run manually (because most of the time there will be some trouble). If there's trouble with npm, see that node is at version > 9. Problems with node-gyp can sometimes be solved by deleting package-lock.json. No idea why.

## Daemon

Daemon lies in `~/etc/service.d/smartiez-daemon.ini`. It simply runs `npm run production` to start the server.

## Connection to webserver
To connect to the webserver, the following rewrite rule has been added to `/home/smartiez/html/.htaccess`. 

```
RewriteEngine On
RewriteRule ^server/(.*) http://localhost:61635/$1 [P]
```

If the server should be run at root level change this to
```
RewriteEngine On
RewriteRule (.*) http://localhost:61635/$1 [P]
```

To avoid Apache from appending `index.html` to the redirect add `DirectoryIndex disabled` to the `.htaccess`.


Every request to either `/term` or `/upload` returns an object:

```
{
  labels: ['array', 'of', 'labels'],
  query: 'the entered query or the label that gets selected',
  image: 'the image that was either uploaded or found'
}
```