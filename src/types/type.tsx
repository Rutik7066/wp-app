export interface Root {
    isbusiness: string
    businessdesign: any[]
    todaydesign: Todaydesign[]
    upcomingdesign: Upcomingdesign[]
  }
  
  export interface Todaydesign {
    id: string
    entrydate: string
    eventid: string
    name: string
    date: string
    status: string
    image: string
    retain: string
  }
  
  export interface Upcomingdesign {
    date: string
    list: List[]
  }
  export interface List {
    id: string
    entrydate: string
    eventid: string
    name: string
    date: string
    status: string
    image: string
    retain: string
  }

  export interface UpcomingdesignGallery {
    id: string
    entrydate: string
    i_no: string
    date: string
    name: string
    category: string
    categoryid: string
    languageid: string
    eventid: string
    retain: string
    image: string
    type: string
    isFree: string
    src: any
    status: string
  }
  