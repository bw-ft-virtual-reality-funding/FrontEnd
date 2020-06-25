# FrontEnd

- To compile LESS -- cd into styles folder and use "less-watch-compiler less css index.less" 
    - **MUST INCLUDE INDEX.LESS**

    - [AppUrl] = https://vr-funding.vr-funding-project.vercel.app/
    - [AppUrl] = https://vr-funding-khaki.vercel.app/

## Api Endpoints
- https://virtual-reality-fundraising.herokuapp.com/api/projects
- https://virtual-reality-fundraising.herokuapp.com/api/users
- https://virtual-reality-fundraising.herokuapp.com/api/users/login
- https://virtual-reality-fundraising.herokuapp.com/api/users/register
- https://virtual-reality-fundraising.herokuapp.com/api/users/:id

## Shape of Data: 
    [
    {
        "id": 1,
        "username": "admin",
        "name": "Jane Doe",
        "role": "fundraiser"
    },
    {
        "id": 2,
        "username": "lambda",
        "name": "Lambda Student",
        "role": "funder"
    },
    {
        "id": 3,
        "username": "test user",
        "name": "name",
        "role": "funder"
    },
    ]

    [
    {
        "id": 1,
        "title": "DevDesk Queue",
        "description": "Students at Lambda School need a place where they can escalate their concerns and receive help. This app will allow an admin to manage help desk tickets that come in from Lambda School Students. It also allows students to submit a help desk ticket, categorize it and post it to the help channel.",
        "img_url": "https://picsum.photos/200"
    },
    {
        "id": 2,
        "title": "Use My Tech Stuff",
        "description": "Use My Tech Stuff: like AirBnB, but for high end electronics. Are you tired of paying ridiculous fees for camera and other equipment rentals? Bypass the middleman and rent from a real person!",
        "img_url": "https://picsum.photos/200"
    },
    {
        "id": 3,
        "title": "Saltiest Hacker News Trolls",
        "description": "Use Hacker News comment data to rank commenters based on comment sentiment (saltiness/negativity)",
        "img_url": "https://picsum.photos/200"
    },
    {
        "id": 4,
        "title": "Replate",
        "description": "Replate is an easy to use app that lets them effortlessly have those extras picked up by a Replate volunteer and donated to one of our worthy partner organizations.",
        "img_url": "https://picsum.photos/200"
    },
    {
        "id": 5,
        "title": "Anywhere Fitness",
        "description": "These days, fitness classes can be held anywhere- a park, an unfinished basement or a garage- not just at a traditional gym. Certified fitness instructors need an easy way to take the awkwardness out of attendance taking and client payment processing.",
        "img_url": "https://picsum.photos/200"
    }
    ] 


## ☝️ Proposal

### What problem does your app solve?

- They help underrepresented groups who wouldn’t otherwise have access to technology. One example is helping minorities build virtual reality experiences to tell their story, building empathy and understanding. They work primarily with underrepresented group who wouldn’t otherwise have access to this kind of technology. 


### Be as specific as possible; how does your app solve the problem?

- providing resources for minorities that do not have to said technology.


### What is the mission statement?


- A mission to create an alternate reality for this youth of this world.
- A mission to make alternate reality an actual reality for everyone!

## 💡 Features

### What features are required for your minimum viable product?

- Registration and login capabilities for a user.
- As a fundraiser I can create a project to start fundraising.
- As a funder I can browse the page and find projects I would like to fund.



### What features may you wish to put in a future release?
- Integrate a payment service (Stripe, for example ) to donate to a project.
- Authenticated user can set up push notifications to be triggered when a particular fundraiser reaches a certain percentage of and / or reaches its goal.
- An authenticated user can upload images. If no user image is provided, a placeholder image populates the view.

### What do the top 3 similar apps do for their users?

- gofundme
- kickstarter
- indigogo

## 🛠 Frameworks - Libraries

### What 3rd party frameworks/libraries are you considering using?

- Npm
- axios
- yup
- materialUI
- GSAP
- react-credit-cards
- react-router-dom

- Styling via less/css


### Do the APIs you need require you to contact them to gain access?

- No/Yes


### Are you required to pay to use said API(s)?
- No

## 🎯 Target Audience

### Who is your target audience? Be specific.
- underrepresented groups
### What feedback have you gotten from potential users?
- None
### Have you validated this problem and your solution with a target audience? Describe how,
- No, not applicable.

## 🔑 Prototype Key Feature(s)

### How long do you think it will take to implement these features?
- 1 week
### Do you anticipate working on stretch functionality after completion of a Minimal Viable Product?
- Yes

#####
