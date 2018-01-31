# Chat Room

playing web socket

## architect
```
       message content -->
CLIENT                     Message instance <-> JSON <-> ws <-> JSON <-> Message instance    SERVER
      message instance <--
```

All instances are created at server-side and serializable, rebuilt at client-side.

