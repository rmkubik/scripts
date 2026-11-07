# safari-cloud-tabs

This is a project inspired by this Python project:

- https://github.com/osantana/safari-cloud-tabs

That linked project would only read tabs and open them in your local Safari instance.

I started this project because I wanted to see if you could delete tabs from the CLI too.

What I learned:

- Safari has a Cloud Tabs feature. You can sync tabs from your iPhone and laptop to iCloud. Then, both devices can open these shared tabs.
- Safari on macOS stores the cloud tabs in a local sqlite3 database. You can easily read this db.
- Most of the commands here are just about exploring that data and dumping a list of data in a .yaml file.
- There's also a table about "tab close requests"
- These seem to have a "Cloudkit Identifier" associated with them
- I was experimenting with trying to generate this Cloudkit record to see if you could insert a proper close request that would actually close a tab on my iPhone
- I stopped bothering to do this since it is pretty easy to just close all tabs on my iPhone after I've backed everything up to the .yaml fil with this project

In the future, this tool would still be useful to dump a list of links from my phone to the yaml file.

To run it:

```bash
npm start tabs
```

You may need to open Safari first to sync all the tabs to the sqlite db. I'm not sure about that.

This command will overwrite tabs.yaml with the new list of tabs.
