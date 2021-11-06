baseURL = https://floppy-test.herokuapp.com/

GET /api/samples

    - returns an array all unlocked samples from the database

sample query: baseURL/api/samples

returns:

```json
[
  {
    "id": 2,
    "name": "breakbeat1",
    "bpm": 180,
    "playType": "loop",
    "url": null,
    "unlocked": true,
    "createdAt": "2021-11-05T20:41:16.658Z",
    "updatedAt": "2021-11-05T20:41:16.671Z",
    "floppyId": 1
  },
  {
    "id": 7,
    "name": "synth",
    "bpm": 160,
    "playType": "one-shot",
    "url": null,
    "unlocked": true,
    "createdAt": "2021-11-05T20:41:16.658Z",
    "updatedAt": "2021-11-05T20:41:16.671Z",
    "floppyId": 1
  },
  {
    "id": 4,
    "name": "breakbeat3",
    "bpm": 145,
    "playType": "loop",
    "url": null,
    "unlocked": true,
    "createdAt": "2021-11-05T20:41:16.658Z",
    "updatedAt": "2021-11-05T20:41:30.817Z",
    "floppyId": 4
  }
]
```

GET /api/floppys

- returns an array of all floppys with their respective unlocked samples

sample query: baseURL/api/floppys

returns:

```json
[
  {
    "id": 3,
    "color": "purple",
    "createdAt": "2021-11-05T20:41:16.671Z",
    "updatedAt": "2021-11-05T20:41:16.671Z",
    "samples": [
      {
        "id": 1,
        "name": "breakbeat",
        "bpm": 160,
        "playType": "loop",
        "url": null,
        "unlocked": true,
        "createdAt": "2021-11-05T20:41:16.658Z",
        "updatedAt": "2021-11-05T20:41:16.670Z",
        "floppyId": 3
      }
    ]
  },
  {
    "id": 1,
    "color": "yellow",
    "createdAt": "2021-11-05T20:41:16.671Z",
    "updatedAt": "2021-11-05T20:41:16.671Z",
    "samples": [
      {
        "id": 2,
        "name": "breakbeat1",
        "bpm": 180,
        "playType": "loop",
        "url": null,
        "unlocked": true,
        "createdAt": "2021-11-05T20:41:16.658Z",
        "updatedAt": "2021-11-05T20:41:16.671Z",
        "floppyId": 1
      },
      {
        "id": 7,
        "name": "synth",
        "bpm": 160,
        "playType": "one-shot",
        "url": null,
        "unlocked": true,
        "createdAt": "2021-11-05T20:41:16.658Z",
        "updatedAt": "2021-11-05T20:41:16.671Z",
        "floppyId": 1
      }
    ]
  }
]
```

GET /api/floppys/:floppyId - returns a list of all unlocked samples from a specific floppyId

sample query: baseURL/api/floppys/1

returns

```json
[
  {
    "id": 1,
    "color": "yellow",
    "createdAt": "2021-11-05T23:00:54.588Z",
    "updatedAt": "2021-11-05T23:00:54.588Z",
    "samples": [
      {
        "id": 3,
        "name": "breakbeat2",
        "bpm": 150,
        "playType": "loop",
        "url": null,
        "unlocked": true,
        "createdAt": "2021-11-05T23:00:54.576Z",
        "updatedAt": "2021-11-05T23:05:12.836Z",
        "floppyId": 1
      },
      {
        "id": 8,
        "name": "bass2",
        "bpm": 160,
        "playType": "loop",
        "url": null,
        "unlocked": true,
        "createdAt": "2021-11-05T23:00:54.576Z",
        "updatedAt": "2021-11-05T23:05:16.618Z",
        "floppyId": 1
      }
    ]
  }
]
```

PUT /api/floppys/:id

- unlocks first locked sample on disk and returns an updated list of unlocked
  samples for the particular disk

sample query: baseURL/api/floppys/2

returns:

```json
{
  "id": 2,
  "color": "green",
  "createdAt": "2021-11-05T23:00:54.588Z",
  "updatedAt": "2021-11-05T23:00:54.588Z",
  "samples": [
    {
      "id": 7,
      "name": "synth",
      "bpm": 160,
      "playType": "one-shot",
      "url": null,
      "unlocked": true,
      "createdAt": "2021-11-05T23:00:54.576Z",
      "updatedAt": "2021-11-05T23:00:54.588Z",
      "floppyId": 2
    },
    {
      "id": 4,
      "name": "breakbeat3",
      "bpm": 145,
      "playType": "loop",
      "url": null,
      "unlocked": true,
      "createdAt": "2021-11-05T23:00:54.576Z",
      "updatedAt": "2021-11-05T23:15:02.245Z",
      "floppyId": 2
    }
  ]
}
```
