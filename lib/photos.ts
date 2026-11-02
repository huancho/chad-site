type Photo = {
  src: string
  width: number
  height: number
  color: string
  credit: { name: string; profile: string }
}

const unsplash = (photo: string, ixid: string) =>
  `https://images.unsplash.com/${photo}?ixid=${ixid}&ixlib=rb-4.1.0&w=2400&q=80&fm=jpg&fit=max`

const referral = "?utm_source=proposal_demo&utm_medium=referral"

export const photos = {
  hero: {
    src: unsplash(
      "photo-1785412222341-d4eac554748e",
      "M3wxMTE4NjM0fDB8MXxzZWFyY2h8NXx8c2VtaSUyMHRydWNrJTIwcmVhciUyMHZpZXclMjBkZXNlcnQlMjByb2FkfGVufDF8MHx8fDE3OTM2NTkyOTV8MA"
    ),
    width: 2400,
    height: 1351,
    color: "#c0c0c0",
    credit: {
      name: "Mohamed Abira",
      profile: `https://unsplash.com/@moroccopictures${referral}`,
    },
  },
  ciment: {
    src: unsplash(
      "photo-1710141530542-f792450e736e",
      "M3wxMTE4NjM0fDB8MXxzZWFyY2h8MXx8d2FyZWhvdXNlJTIwcGFsbGV0cyUyMHNhY2tzfGVufDF8MHx8fDE3OTM2NTg0MjR8MA"
    ),
    width: 2400,
    height: 1600,
    color: "#262626",
    credit: {
      name: "Zemos",
      profile: `https://unsplash.com/@zemos${referral}`,
    },
  },
  fer: {
    src: unsplash(
      "photo-1763771420303-0f11ccf613d1",
      "M3wxMTE4NjM0fDB8MXxzZWFyY2h8OHx8c3RlZWwlMjByZWJhciUyMGJ1bmRsZXxlbnwxfDB8fHwxNzkzNjU4NTU3fDA"
    ),
    width: 2400,
    height: 1550,
    color: "#402626",
    credit: {
      name: "Zoshua Colah",
      profile: `https://unsplash.com/@zoshuacolah${referral}`,
    },
  },
  toles: {
    src: unsplash(
      "photo-1628002881911-8bcdfbdf320e",
      "M3wxMTE4NjM0fDB8MXxzZWFyY2h8M3x8Y29ycnVnYXRlZCUyMG1ldGFsJTIwcm9vZmluZyUyMHNoZWV0c3xlbnwxfDB8fHwxNzkzNjU4NTQ5fDA"
    ),
    width: 2400,
    height: 1545,
    color: "#f37340",
    credit: {
      name: "chris robert",
      profile: `https://unsplash.com/@chris_robert${referral}`,
    },
  },
  groupes: {
    src: unsplash(
      "photo-1780445392484-38a4852a1fd8",
      "M3wxMTE4NjM0fDB8MXxzZWFyY2h8OHx8ZGllc2VsJTIwZ2VuZXJhdG9yfGVufDF8MHx8fDE3OTM2NTg1NTB8MA"
    ),
    width: 2400,
    height: 1600,
    color: "#402626",
    credit: {
      name: "Sergio Martins",
      profile: `https://unsplash.com/@smartins20${referral}`,
    },
  },
  solaire: {
    src: unsplash(
      "photo-1792465676549-62ba4383cce2",
      "M3wxMTE4NjM0fDB8MXxzZWFyY2h8M3x8c29sYXIlMjBwYW5lbHMlMjByb29mdG9wfGVufDF8MHx8fDE3OTM2NTg1NTF8MA"
    ),
    width: 2400,
    height: 1600,
    color: "#f3f3f3",
    credit: {
      name: "NG Trade Solutions",
      profile: `https://unsplash.com/@ngtradesolutions${referral}`,
    },
  },
  riz: {
    src: unsplash(
      "photo-1586201375761-83865001e31c",
      "M3wxMTE4NjM0fDB8MXxzZWFyY2h8MXx8cmljZSUyMGdyYWlucyUyMGNsb3NlJTIwdXB8ZW58MXwwfHx8MTc5MzY1ODU1M3ww"
    ),
    width: 2400,
    height: 1600,
    color: "#c0c0a6",
    credit: {
      name: "Pierre Bamin",
      profile: `https://unsplash.com/@bamin${referral}`,
    },
  },
  sucre: {
    src: unsplash(
      "photo-1673791031202-ebc0eea03bf2",
      "M3wxMTE4NjM0fDB8MXxzZWFyY2h8M3x8Z3JhbnVsYXRlZCUyMHN1Z2FyJTIwcGlsZXxlbnwxfDB8fHwxNzkzNjU4NjM4fDA"
    ),
    width: 2400,
    height: 1596,
    color: "#595959",
    credit: {
      name: "Immo Wegmann",
      profile: `https://unsplash.com/@tinkerman${referral}`,
    },
  },
  huile: {
    src: unsplash(
      "photo-1768689033119-c3ac1e437d20",
      "M3wxMTE4NjM0fDB8MXxzZWFyY2h8Mnx8Z29sZGVuJTIwb2lsJTIwY2xvc2UlMjB1cHxlbnwxfDB8fHwxNzkzNjU4NjM2fDA"
    ),
    width: 2400,
    height: 1900,
    color: "#8c7359",
    credit: {
      name: "Xavier von Erlach",
      profile: `https://unsplash.com/@xavier_von_erlach${referral}`,
    },
  },
} satisfies Record<string, Photo>
